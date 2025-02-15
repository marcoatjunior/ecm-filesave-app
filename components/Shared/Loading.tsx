import styled from 'styled-components';

interface LoaderProps {
  className?: string;
  children?: React.ReactNode; // Adiciona suporte para children
}

const Loader = styled.div.attrs<LoaderProps>(() => ({
  className: 'loader',
}))`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: none;

  @keyframes spinner-1 {
    0% {
      top: 36px;
      height: 128px;
    }
    50% {
      top: 60px;
      height: 80px;
    }
    100% {
      top: 60px;
      height: 80px;
    }
  }
  @keyframes spinner-2 {
    0% {
      top: 41.99999999999999px;
      height: 116.00000000000001px;
    }
    50% {
      top: 60px;
      height: 80px;
    }
    100% {
      top: 60px;
      height: 80px;
    }
  }
  @keyframes spinner-3 {
    0% {
      top: 48px;
      height: 104px;
    }
    50% {
      top: 60px;
      height: 80px;
    }
    100% {
      top: 60px;
      height: 80px;
    }
  }
`;

const Spinner = styled.div.attrs<LoaderProps>(() => ({
  className: 'spinner',
}))`
  width: 200px;
  height: 200px;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
  overflow: hidden;

  div {
    position: absolute;
    width: 30px;
    box-sizing: content-box;
  }

  div:nth-child(1) {
    left: 35px;
    background: rgb(252 97 12);
    animation: spinner-1 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    animation-delay: -0.2s;
  }

  div:nth-child(2) {
    left: 85px;
    background: rgb(252 97 12);
    animation: spinner-2 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    animation-delay: -0.1s;
  }

  div:nth-child(3) {
    left: 135px;
    background: rgb(252 97 12);
    animation: spinner-3 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    animation-delay: undefineds;
  }
`;

export const Loading: React.FC = () => (
  <Loader>
    <Spinner>
      <div></div>
      <div></div>
      <div></div>
    </Spinner>
  </Loader>
);
