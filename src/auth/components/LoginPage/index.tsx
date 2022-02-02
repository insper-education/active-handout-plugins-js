import React, { useEffect, useMemo, useState } from "react";
import { cache } from "../../../services/auth";
import { getQueryParam, redirectTo } from "../../../services/request";
import LoginForm from "./LoginForm";
import RedirectingPage from "../RedirectingPage";
import SignInContainer from "../SignInContainer";
import { FullPage, GlobalStyle } from "../styles";

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
