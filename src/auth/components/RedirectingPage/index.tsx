import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Title } from "./styles";

interface IRedirectingPageProps {
  nextUrl: string;
}

const RedirectingPage = ({ nextUrl }: IRedirectingPageProps) => {
  const { t } = useTranslation();
  let title = t("Please wait");
  let text = t("we are redirecting you to the requested page");
  if (nextUrl?.indexOf("vscode://") >= 0) {
    title = t("Redirecting");
    text = t('click "Open Visual Studio Code" on the dialog to continue');
  }
  return (
    <Container>
      <Title>{title}...</Title>
      {text}
    </Container>
  );
};

export default RedirectingPage;
