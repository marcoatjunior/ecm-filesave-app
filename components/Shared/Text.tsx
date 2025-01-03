import styled from 'styled-components';

interface TextStyleProps {
  margin?: string;
  color?: string;
  textAlign?: string;
  fontSize?: string;
  fontWeight?: number;
}

export const Text = styled.p<TextStyleProps>`
  display: inline-block;
  margin: ${(props) => props.margin ?? props.margin};
  color: ${(props) => props.color ?? props.color};
  text-align: ${(props) => props.textAlign ?? props.textAlign};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '600')};
`;

export const Label = styled(Text)`
  background-color: #eeebeb;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
`;
