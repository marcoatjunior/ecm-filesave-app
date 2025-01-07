import { Loading } from '@/components/Shared';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { consulta } from 'services';
import { useAppDispatch } from 'store';
import { decodificaQrcode, erroSolicitacao } from 'store/solicitacao';
import { Solicitacao } from 'types';

type SolicitacaoPageProps = { corsciApiUrl: string };

const SolicitacaoPage: NextPage<SolicitacaoPageProps> = ({
  corsciApiUrl: apiUrl,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const [isLido, setIsLido] = useState(false);
  const [isConsultando, setIsConsultando] = useState(false);
  const dispatcher = useAppDispatch();

  const populaState = (solicitacao: Solicitacao | null | undefined) => {
    if (!!solicitacao) {
      dispatcher(decodificaQrcode(solicitacao));
      setIsLido(true);
    }
  };

  useEffect(() => {
    if (!isConsultando && !!id) {
      setIsConsultando(true);
      consulta(apiUrl, +id)
        .then((res) => {
          populaState(res.data);
          setIsLido(true);
          setIsConsultando(false);
        })
        .catch(({ response }) => {
          dispatcher(erroSolicitacao(response));
        });
    }
  });

  useEffect(() => {
    if (isLido) {
      router.push('/captura');
      return;
    }
  }, [isLido, router]);

  return <Loading />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
    },
  };
};

export default SolicitacaoPage;
