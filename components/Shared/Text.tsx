import styled from 'styled-components';

export interface TextStyleProps {
  margin?: string;
  color?: string;
  textAlign?: string;
  fontSize?: string;
  fontWeight?: number;
  children?: React.ReactNode;
  width?: string;
}

export const Text = styled.p<TextStyleProps>`
  display: inline-block;
  margin: ${(props) => props.margin ?? props.margin};
  color: ${(props) => props.color ?? props.color};
  text-align: ${(props) => props.textAlign ?? props.textAlign};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '600')};
  width: ${(props) => (props.width ? props.width : '100%')};
`;

export const Label = styled(Text)`
  background-color: #eeebeb;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const TextErro = styled(Text)`
  borderradius: '5px';
  backgroundcolor: '#f44336';
  padding: '5px 8px';
`;
