import { FileUploader } from '@/components/Captura/FileUploader';
import { Container, Display, Main } from '@/components/Shared/Body';
import {
  CloseButton,
  PrimaryButton,
  SecondaryButton,
} from '@/components/Shared/Button';
import { ExpirationTimer } from '@/components/Shared/ExpirationTimer';
import { Modal, ModalResult } from '@/components/Shared/Modal';
import { Label, Text } from '@/components/Shared/Text';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer, useState } from 'react';
import { acoes, capturas, commons } from 'resources/strings';
import { inclui } from 'services/solicitacao.service';
import { useAppDispatch, useAppSelector } from 'store';
import {
  adicionaArquivos,
  cancelaSolicitacao,
  erroSolicitacao,
  finalizaSolicitacao,
  selectSolicitacao,
} from 'store/solicitacao';
import { UploadActions, uploadInitial, uploadReducer } from 'store/upload';

type CapturaPageProps = { apiUrl: string };

const Captura: NextPage<CapturaPageProps> = ({ apiUrl }) => {
  const router = useRouter();
  const dispatcher = useAppDispatch();
  const [upload, dispatchUpload] = useReducer(uploadReducer, uploadInitial);

  const solicitacao = useAppSelector(selectSolicitacao);
  const { arquivos } = solicitacao.dados;

  const arquivosPendentes = arquivos.filter(({ form }) => !form);
  const [pendentes] = useState(arquivosPendentes);

  const [lido, setLido] = useState(0);
  const [enviado, setEnviado] = useState(0);
  const [arquivosEnviados, setArquivosEnviados] = useState(false);

  useEffect(() => {
    if (lido === 0 || lido !== enviado) {
      return;
    }
    setArquivosEnviados(false);
    setLido(0);
    dispatcher(finalizaSolicitacao());
  }, [lido, enviado, dispatcher]);

  useEffect(() => {
    if (!arquivos?.length) {
      router.push('/');
      return;
    }

    if (pendentes.length || solicitacao.enviada || arquivosEnviados) {
      return;
    }
    setArquivosEnviados(true);
    setLido(solicitacao.dados.arquivos.length);

    solicitacao.dados.arquivos.forEach((arquivo) => {
      const conteudo = arquivo.form?.get('arquivos') as unknown as Buffer;
      const form = {
        organizacao: solicitacao.dados.organizacao,
        sistema: solicitacao.dados.sistema,
        nome: arquivo.nome,
        tipo: arquivo.tipo,
        numeroBytes: conteudo?.length,
        usuarioCriacao: arquivo.usuarioCriacao,
        conteudo,
      };
      inclui(apiUrl, form)
        .then(() => {
          setEnviado((enviado) => enviado + 1);
        })
        .catch(({ response }) => {
          const { message } = response.data;
          dispatcher(erroSolicitacao(message));
        });
    });
  }, [
    arquivos.length,
    pendentes.length,
    solicitacao.enviada,
    solicitacao.dados.arquivos,
    arquivosEnviados,
    router,
    dispatcher,
  ]);

  const arquivoAtual = pendentes[0];

  const handleFinalizacao = async () => {
    dispatchUpload({ type: UploadActions.FINALIZA });
    dispatcher(
      adicionaArquivos({
        id: arquivoAtual.id,
        capturas: upload.filesToUpload.map((file) => {
          return new File([file], 'documento.pdf', { type: 'application/pdf' });
        }),
      })
    );
    atualizaPendentes();
  };

  const atualizaPendentes = () => {
    if (!!pendentes.length) {
      pendentes.shift();
      setLido(lido + 1);
    }
  };

  const getExpirationInMilisseconds = () => {
    if (solicitacao.dados.dataHoraExpiracao === '') {
      return 0;
    }
    return new Date(solicitacao.dados.dataHoraExpiracao).getTime();
  };

  const getArquivosCapturados = () =>
    `Processando arquivo ${lido + 1} de ${arquivos.length}...`;

  const PaginaCaptura = () => {
    return (
      <>
        <Display>
          <PrimaryButton
            onClick={() => {
              dispatchUpload({ type: UploadActions.INICIA });
            }}
            style={{ marginLeft: '5px' }}
          >
            {acoes.fazerUpload}
          </PrimaryButton>

          {!!upload.filesToUpload?.length && (
            <SecondaryButton onClick={handleFinalizacao}>
              {acoes.finalizar}
            </SecondaryButton>
          )}
        </Display>
      </>
    );
  };

  return (
    <React.Fragment>
      {!!pendentes.length && (
        <Main>
          <ExpirationTimer
            expirationInMilisseconds={getExpirationInMilisseconds()}
            expiredText={capturas.expirada}
            expiringPrefixText={capturas.expiraEm}
          />
          <Container style={{ marginBottom: 'auto' }}>
            <Display justifyContent="space-between">
              <Text fontSize="16px" textAlign="center" fontWeight={600}>
                {getArquivosCapturados()}
              </Text>
              <CloseButton onClick={() => dispatcher(cancelaSolicitacao())}>
                x
              </CloseButton>
            </Display>

            <Display display="grid" style={{ marginTop: '20px' }}>
              <Label fontSize="20px" textAlign="center">
                {arquivoAtual?.nome.toUpperCase()}
              </Label>
              <PaginaCaptura />
            </Display>
          </Container>
        </Main>
      )}

      {upload.exibeModal && (
        <Modal onClose={() => dispatchUpload({ type: UploadActions.CANCELA })}>
          <Display>
            <FileUploader
              arquivo={arquivoAtual}
              dispatch={dispatchUpload}
            ></FileUploader>
          </Display>
        </Modal>
      )}

      {solicitacao.enviada && (
        <ModalResult isSucesso={!solicitacao.erro}>
          <Text style={{ width: '100%' }}>
            {solicitacao.erro || capturas.finalizada}
          </Text>
          <PrimaryButton onClick={() => dispatcher(cancelaSolicitacao())}>
            {commons.voltarInicio}
          </PrimaryButton>
        </ModalResult>
      )}
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
    },
  };
};

export default Captura;
