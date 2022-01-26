import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import LoginForm from "../LoginForm";
import SignInContainer from "../SignInContainer";

const FullPage = styled.section`
  width: 100%;
  height: 100%;
`;

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

interface ILoginPageProps {
  title: string;
  logo?: string;
  lostPasswordUrl: string;
}

export default function LoginPage({
  title,
  logo,
  lostPasswordUrl,
}: ILoginPageProps) {
  return (
    <FullPage>
      <GlobalStyle />
      <SignInContainer title={title} logo={logo}>
        <LoginForm lostPasswordUrl={lostPasswordUrl} />
      </SignInContainer>
    </FullPage>
  );
}
