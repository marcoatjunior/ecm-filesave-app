import React, { Dispatch, useState } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { acoes } from 'resources/strings';
import { CapturaActions } from 'store/captura';
import styled from 'styled-components';
import { Display } from '../Shared/Body';
import { PrimaryButton, SecondaryButton } from '../Shared/Button';

const CameraWrapper = styled.div`
  .react-html5-camera-photo {
    video {
      border-radius: 20px;
      width: 600px;
      height: auto;
      max-width: 100%;
    }
  }

  @media (max-width: 768px) {
    .react-html5-camera-photo {
      video {
        width: 300px !important;
        height: 450px !important;
      }
    }
  }
`;

type CaptureProps = {
  dispatch: Dispatch<any>;
};

export const CameraCapture = ({ dispatch }: CaptureProps) => {
  const [isCapturada, setIsCapturada] = useState(false);
  const [isFacingModeEnvironment, setIsFacingModeEnvironment] = useState(true);

  const handleTiraFoto = (uri: string) => {
    fetch(uri)
      .then((imagem) => imagem.blob())
      .then((previa) => {
        setIsCapturada(true);
        dispatch({ type: CapturaActions.CAPTURA, previa });
      });
  };

  const handleRejeite = () => {
    setIsCapturada(false);
    dispatch({ type: CapturaActions.REJEITA });
  };

  const handleAprovacao = () => {
    setIsCapturada(false);
    dispatch({ type: CapturaActions.APROVA });
  };

  const handleAlteraCamera = () => {
    setIsFacingModeEnvironment((state) => !state);
  };

  return (
    <React.Fragment>
      {!isCapturada && (
        <Display>
          <CameraWrapper>
            <Camera
              isDisplayStartCameraError={false}
              isMaxResolution={true}
              isFullscreen={true}
              idealFacingMode={
                isFacingModeEnvironment
                  ? FACING_MODES.ENVIRONMENT
                  : FACING_MODES.USER
              }
              imageType="jpg"
              onTakePhoto={handleTiraFoto}
            />
            <PrimaryButton onClick={handleAlteraCamera}>
              {acoes.alterarCamera}
            </PrimaryButton>
          </CameraWrapper>
        </Display>
      )}

      {isCapturada && (
        <Display>
          <PrimaryButton onClick={handleRejeite}>
            {acoes.rejeitar}
          </PrimaryButton>
          <SecondaryButton onClick={handleAprovacao}>
            {acoes.aprovar}
          </SecondaryButton>
        </Display>
      )}
    </React.Fragment>
  );
};
