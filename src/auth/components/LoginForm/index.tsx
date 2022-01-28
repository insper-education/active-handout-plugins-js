import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../../../components/Form";
import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import { schema, ILoginInputs } from "../../login-schema";
import { api } from "../../../services/auth";
import ErrorMessage from "../../../components/Form/ErrorMessage";
import LoadingIndicator from "../../../components/LoadingIndicator";
import Separator from "../../../components/Separator";
import styled from "styled-components";
import theme from "../../../commons/theme";
import { getQueryParam } from "../../../services/request";

const ForgotPasswordLinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: -${theme.margin.rem(3)} 0 ${theme.margin.rem(4)};
  a {
    color: ${theme.colors.primary.default};
  }
`;

const SignInButtonContainer = styled.div`
  margin-top: ${theme.margin.rem(2)};
  width: 100%;
`;

const LoadingContainer = styled.div`
  width: 100%;
  margin-top: ${theme.margin.rem(2)};
  display: flex;
  justify-content: center;
`;

interface ILoginFormProps {
  lostPasswordUrl: string;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginForm = ({ lostPasswordUrl, setToken }: ILoginFormProps) => {
  const mounted = useRef(true);
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const reason = getQueryParam("reason");

  const [invalidLogin, setInvalidLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ILoginInputs) => {
    setLoading(true);
    api
      .login(data.username, data.password)
      .then((user) => {
        if (!mounted.current) return;
        if (user) setToken(user.token);
        else setInvalidLogin(true);
      })
      .finally(() => mounted.current && setLoading(false));
  };

  const { onChange: onUsernameChange, ...usernameInputProps } =
    register("username");
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidLogin(false);
    onUsernameChange(e);
  };

  const { onChange: onPasswordChange, ...passwordInputProps } =
    register("password");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidLogin(false);
    onPasswordChange(e);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.TextInput
          label={t("Username")}
          inputId="username"
          placeholder={t("Type username")}
          {...usernameInputProps}
          onChange={handleUsernameChange}
          error={t(errors?.username?.message || "")}
        />
        <Form.TextInput
          label={t("Password")}
          inputId="password"
          type="password"
          placeholder={t("Password")}
          {...passwordInputProps}
          onChange={handlePasswordChange}
          error={t(errors?.password?.message || "")}
        />
        <ForgotPasswordLinkContainer>
          <a href={lostPasswordUrl}>{t("Reset password")}</a>
        </ForgotPasswordLinkContainer>
        <SignInButtonContainer>
          <Button
            fullWidth={true}
            variant="secondary"
            type="submit"
            disabled={loading}
          >
            {t("Sign in")}
          </Button>
        </SignInButtonContainer>
        {invalidLogin && (
          <ErrorMessage>{t("Invalid credentials")}</ErrorMessage>
        )}
        {!!reason && <ErrorMessage>{t(reason || "")}</ErrorMessage>}

        {loading && (
          <LoadingContainer>
            <LoadingIndicator size="xs" />
          </LoadingContainer>
        )}
      </Form>
      <Separator>{t("or")}</Separator>
      <p>{t("Ask the instructor to sign you up")}</p>
    </>
  );
};

export default LoginForm;
