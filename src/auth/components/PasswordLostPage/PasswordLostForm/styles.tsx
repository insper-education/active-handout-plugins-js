import styled from "styled-components";
import theme from "../../../../commons/theme";

const FormTitle = styled.h2`
  margin: ${theme.margin.rem(4)} 0;
  text-transform: uppercase;
  font-weight: ${theme.fontWeight.bold};
  line-height: ${theme.lineHeight.none};
  letter-spacing: ${theme.letterSpacing.wide};
`;

const MessageContainer = styled.div`
  margin: ${theme.margin.rem(8)} 0 ${theme.margin.rem(4)};
`;

const SendMailButtonContainer = styled.div`
  margin-top: ${theme.margin.rem(12)};
  width: 100%;
`;

export { FormTitle, MessageContainer, SendMailButtonContainer };
