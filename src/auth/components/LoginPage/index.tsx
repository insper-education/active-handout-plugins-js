import React, { useEffect, useMemo, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { cache } from "../../../services/auth";
import { getQueryParam, redirectTo } from "../../../services/request";
import LoginForm from "../LoginForm";
import RedirectingPage from "../RedirectingPage";
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
  const nextUrl = getQueryParam("redirectTo");
  const decodedNextUrl = useMemo(
    () => (nextUrl && decodeURIComponent(nextUrl)) || "/",
    [nextUrl]
  );

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => setToken(cache.getToken()), []);
  if (token) {
    redirectTo(decodedNextUrl);
    return <RedirectingPage nextUrl={decodedNextUrl} />;
  }

  return (
    <FullPage>
      <GlobalStyle />
      <SignInContainer title={title} logo={logo}>
        <LoginForm lostPasswordUrl={lostPasswordUrl} setToken={setToken} />
      </SignInContainer>
    </FullPage>
  );
}
