import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../../../components/Form";
import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import { schema, ILoginInputs } from "../../login-schema";
import { login } from "../../services/auth";
import ErrorMessage from "../../../components/Form/ErrorMessage";
import LoadingIndicator from "../../../components/LoadingIndicator";
import Separator from "../../../components/Separator";
import useQuery from "../../../hooks/useQuery";
import styled from "styled-components";
import theme from "../../../commons/theme";

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

interface ILoginFormProps {
  lostPasswordUrl: string;
}

const LoginForm = ({ lostPasswordUrl }: ILoginFormProps) => {
  const mounted = useRef(true);
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const params = useQuery();
  const reason = params.get("reason");

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
    login(data.username, data.password)
      .then((user) => {
        if (!mounted.current) return;
        if (!user) setInvalidLogin(true);
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
            onClick={() => {}}
          >
            {t("Sign in")}
          </Button>
        </SignInButtonContainer>
        {invalidLogin && (
          <ErrorMessage>{t("Invalid credentials")}</ErrorMessage>
        )}
        {!!reason && <ErrorMessage>{t(reason || "")}</ErrorMessage>}

        {loading && (
          <div className="w-full flex justify-center">
            <LoadingIndicator size="xs" />
          </div>
        )}
      </Form>
      <Separator>{t("or")}</Separator>
      <p>{t("Ask the instructor to sign you up")}</p>
    </>
  );
};

export default LoginForm;
