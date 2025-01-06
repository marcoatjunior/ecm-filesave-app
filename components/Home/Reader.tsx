import { Result } from "@zxing/library";
import { QrReader } from "react-qr-reader";
import { useAppDispatch } from "store";
import { decodificaQrcode } from "store/solicitacao";
import styled from "styled-components";

const ReaderWrapper = styled.div`
  .reader {
    width: 350px;
    div {
      video {
        border-radius: 20px;
      }
    }
  }
`;

interface ReaderProps {
  onResult: any;
}

export const Reader: React.FC<ReaderProps> = (props) => {
  const dispatcher = useAppDispatch();

  const handleResult = (result: Result | null | undefined) => {
    if (!!result) {
      dispatcher(decodificaQrcode(JSON.parse(result.getText())));
      props.onResult();
    }
  };

  return (
    <ReaderWrapper>
      <QrReader
        videoId="video-reader"
        className="reader"
        onResult={handleResult}
        constraints={{
          facingMode: "environment",
          height: 300,
          width: 300,
        }}
      />
    </ReaderWrapper>
  );
};
