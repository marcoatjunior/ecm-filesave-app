import styled from 'styled-components';

interface DisplayProps {
  width?: string;
  display?: string;
  alignItems?: string;
  justifyContent?: string;
}

export const Display = styled.div<DisplayProps>`
  width: ${(props) => props.width || 'auto'};
  display: ${(props) => props.display || 'flex'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'center'};
`;

export const DisplayImage = styled(Display)`
  @media (max-width: 768px) {
    img {
      width: 300px !important;
      height: 450px !important;
    }
  }
`;

export const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #eeebeb;
`;

export const Container = styled.div`
  padding: 30px;
  border 2px solid #fc610c;
  border-radius: 10px;
  background: #fff;
`;
