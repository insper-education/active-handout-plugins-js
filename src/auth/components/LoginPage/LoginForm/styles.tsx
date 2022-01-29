import styled from "styled-components";
import theme from "../../../../commons/theme";

const ForgotPasswordLinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: -${theme.margin.rem(3)} 0 ${theme.margin.rem(4)};
  a {
    color: ${theme.colors.primary.default};
  }
`;

export { ForgotPasswordLinkContainer };
