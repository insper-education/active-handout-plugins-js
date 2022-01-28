import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import theme from "../../../commons/theme";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: ${theme.padding.rem(8)};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${theme.colors.primary.default};
  ${theme.text["5xl"]};
  margin-bottom: ${theme.margin.rem(4)};
`;

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
