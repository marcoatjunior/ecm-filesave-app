import { Container, Display } from '@/components/Shared';
import { SecondaryButton } from '@/components/Shared/Button';
import { Text } from '@/components/Shared/Text';
import { ChangeEvent, Dispatch, useState } from 'react';
import { acoes, upload } from 'resources/strings';
import { UploadActions } from 'store/upload';
import { Arquivo } from 'types';

type FileUploaderProps = { arquivo: Arquivo; dispatch: Dispatch<any> };

export const FileUploader = ({ arquivo, dispatch }: FileUploaderProps) => {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [mensagemErro, setMensagemErro] = useState('');
  const [erro, setErro] = useState(false);

  const files = fileList ? [...fileList] : [];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErro(false);
    setFileList(e.target.files);
    dispatch({
      type: UploadActions.SELECIONA,
      selectedFiles: !!e.target.files ? [...e.target.files] : [],
    });
  };

  const handleUploadClick = () => {
    if (
      files.length > 0 &&
      files.some((file) => file.type !== 'application/pdf')
    ) {
      setMensagemErro(upload.mensagemPermitidoArquivosPdf);
      setErro(true);
      return;
    }
    setErro(false);
    dispatch({ type: UploadActions.UPLOAD });
  };

  return (
    <Container>
      <Display>
        <Text fontSize="18px" textAlign="center" fontWeight={600}>
          {upload.selecioneArquivos}
        </Text>
      </Display>
      {erro && (
        <Display style={{ marginTop: '12px' }}>
          <Text
            fontSize="16px"
            textAlign="center"
            fontWeight={600}
            color="#fff"
            style={{
              borderRadius: '5px',
              backgroundColor: '#f44336',
              padding: '5px 8px',
            }}
          >
            {mensagemErro}
          </Text>
        </Display>
      )}
      {files.length > 0 && (
        <Display style={{ marginTop: '12px' }}>
          <Text fontSize="16px" textAlign="center" fontWeight={600}>
            {`${files.length} arquivo(s) selecionado(s)`}
          </Text>
        </Display>
      )}
      <Display>
        <label
          style={{
            background: 'rgb(252 97 12)',
            color: '#fff',
            border: 'none',
            minWidth: '100px',
            maxWidth: '250px',
            marginTop: '24px',
            padding: '12px 24px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: 'sans-serif',
            fontSize: '100%',
            lineHeight: '1.15',
          }}
        >
          {acoes.fazerUpload}
          <input
            type="file"
            onChange={handleFileChange}
            accept="application/pdf"
            style={{ display: 'none' }}
          />
        </label>
        {files.length > 0 && (
          <SecondaryButton
            onClick={handleUploadClick}
            style={{ marginLeft: '10px' }}
          >
            {acoes.confirmar}
          </SecondaryButton>
        )}
      </Display>
    </Container>
  );
};
