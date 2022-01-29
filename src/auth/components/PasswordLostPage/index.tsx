import React from "react";
import PasswordLostForm from "./PasswordLostForm";
import SignInContainer from "../SignInContainer";
import { FullPage, GlobalStyle } from "../styles";

interface IPasswordLostPageProps {
  title: string;
  logo?: string;
}

export default function PasswordLostPage({
  title,
  logo,
}: IPasswordLostPageProps) {
  return (
    <FullPage>
      <GlobalStyle />
      <SignInContainer title={title} logo={logo}>
        <PasswordLostForm />
      </SignInContainer>
    </FullPage>
  );
}
