import styled from 'styled-components';

interface DisplayProps {
  width?: string;
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  marginTop?: string;
  marginBottom?: string;
  marginRight?: string;
  cursor?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

interface ContainerProps {
  marginBottom?: string;
  children?: React.ReactNode;
}

export const Display = styled.div<DisplayProps>`
  width: ${(props) => props.width || 'auto'};
  display: ${(props) => props.display || 'flex'};
  cursor: ${(props) => props.cursor || 'pointer'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  margin-top: ${(props) => props.marginTop || '0px'};
  margin-bottom: ${(props) => props.marginBottom || '0px'};
  margin-right: ${(props) => props.marginRight || '0px'};
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

export const Container = styled.div<ContainerProps>`
  padding: 30px;
  border 2px solid #fc610c;
  border-radius: 10px;
  background: #fff;
  margin-bottom: ${(props) => props.marginBottom || '0px'};
`;
