import styled, { createGlobalStyle } from "styled-components";
import theme from "../../commons/theme";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
`;

const FullPage = styled.section`
  width: 100%;
  height: 100%;
`;

const LoadingContainer = styled.div`
  width: 100%;
  margin-top: ${theme.margin.rem(2)};
  display: flex;
  justify-content: center;
`;

const SignInButtonContainer = styled.div`
  margin-top: ${theme.margin.rem(2)};
  width: 100%;
`;

export { GlobalStyle, FullPage, LoadingContainer, SignInButtonContainer };
