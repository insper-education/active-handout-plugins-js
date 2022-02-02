import React from "react";
import {
  CardContainer,
  CardTitle,
  Container,
  ContentCard,
  ContentContainer,
  LargeScreenHeader,
  LargeScreenHeaderContent,
  LargeScreenTitle,
  LogoImg,
} from "./styles";

interface ISignInContainerProps {
  title: string;
  logo?: string;
  children: React.ReactNode;
}

const SignInContainer = ({ title, logo, children }: ISignInContainerProps) => {
  return (
    <Container>
      <LargeScreenHeader>
        <LargeScreenHeaderContent>
          <LargeScreenTitle>{title}</LargeScreenTitle>
          {logo && <LogoImg src={logo} alt="Insper Logo" />}
        </LargeScreenHeaderContent>
      </LargeScreenHeader>
      <CardContainer>
        <ContentCard>
          <CardTitle>{title}</CardTitle>
          <ContentContainer>{children}</ContentContainer>
        </ContentCard>
      </CardContainer>
    </Container>
  );
};

export default SignInContainer;
