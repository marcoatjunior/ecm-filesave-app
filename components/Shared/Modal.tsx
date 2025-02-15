import Image from 'next/image';
import { useRef } from 'react';
import styled from 'styled-components';
import { Container, Display } from './Body';

const ModalOverlay = styled.div`
  align-items: center;
  animation-duration: 2s;
  animation-fill-mode: both;
  background-color: rgb(0 0 0 / 85%);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0 !important;
  line-height: 1;
  padding: 0;
  margin: 0;
  position: absolute;
  opacity: 1;
  text-align: center;
  top: 0 !important;
  transition: background-color 2s linear;
  user-select: none;
  vertical-align: middle;
  width: 100%;
  will-change: opacity;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  width: 500px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalBody = styled.div`
  display: flex;
  justify-content: center;
`;

export const Modal: React.FC<{
  onClose: any;
  children: any;
}> = (props) => {
  const modalRef = useRef(null);

  const handleCloseClick = (event: any) => {
    if (!(modalRef.current as any)?.contains(event.target)) {
      props.onClose();
    }
  };

  return (
    <ModalOverlay as="div" onClick={handleCloseClick}>
      <ModalWrapper as="div" ref={modalRef}>
        <ModalContainer>
          <ModalBody>{props.children}</ModalBody>
        </ModalContainer>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export const ModalResult: React.FC<{
  isSucesso: boolean;
  children: any;
}> = (props) => {
  return (
    <Modal onClose={() => {}}>
      <Container>
        <Display>
          <Image
            src={props.isSucesso ? '/success.svg' : '/error.svg'}
            alt="result"
            width={80}
            height={80}
          />
        </Display>
        <Display display="block" marginTop="30px">
          {props.children}
        </Display>
      </Container>
    </Modal>
  );
};
