import styled from 'styled-components';

interface ButtonProps {
  marginLeft?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = styled.button<ButtonProps>`
  min-width: 100px;
  max-width: 250px;
  margin-top: 24px;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: ${(props) => props.marginLeft || '0px'};
`;

export const PrimaryButton = styled(Button)`
  background: rgb(252 97 12);
  color: #fff;
  border: none;
`;

export const SecondaryButton = styled(Button)`
  background: #fff;
  color: rgb(252 97 12);
  border: 1px solid rgb(252 97 12);
  margin-left: 5px;
`;

export const CloseButton = styled.button<ButtonProps>`
  cursor: pointer;
  font-size: 16px;
  border-radius: 0.3em;
  border: none;
  padding: 0.4em;
  background: #000;
  color: #fff;
  margin-bottom: 15px;
`;
