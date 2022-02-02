import React from "react";
import { getQueryParam } from "../../../services/request";
import SignInContainer from "../SignInContainer";
import { FullPage, GlobalStyle } from "../styles";
import PasswordResetForm from "./PasswordResetForm";

interface IPasswordResetPageProps {
  title: string;
  logo?: string;
}

export default function PasswordResetPage({
  title,
  logo,
}: IPasswordResetPageProps) {
  const firstTime = getQueryParam("first") === "true";
  const uid = getQueryParam("uid");
  const token = getQueryParam("token");
  const reason = getQueryParam("reason");

  return (
    <FullPage>
      <GlobalStyle />
      <SignInContainer title={title} logo={logo}>
        <PasswordResetForm
          firstTime={firstTime}
          uid={uid}
          token={token}
          reason={reason}
        />
      </SignInContainer>
    </FullPage>
  );
}
