import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../../../../components/Button";
import Form from "../../../../components/Form";
import { api } from "../../../../services/auth";
import {
  IPasswordResetInputs,
  passwordResetSchema,
} from "../../../lost-password-schema";
import { FormTitle, MessageContainer, SendMailButtonContainer } from "./styles";

const PasswordLostForm = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordResetInputs>({
    resolver: yupResolver(passwordResetSchema),
  });

  const { onChange: onEmailChange, ...emailInputProps } = register("email");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEmailChange(e);
  };

  const onSubmit = ({ email }: IPasswordResetInputs) => {
    setLoading(true);
    api.sendPasswordResetEmail(email).finally(() => {
      setFinished(true);
    });
  };

  return (
    <>
      {!finished && (
        <>
          <FormTitle>{t("Lost password")}</FormTitle>
          <MessageContainer>{t("lost password message")}</MessageContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.TextInput
              placeholder={t("Type email")}
              inputId="email"
              onChange={handleEmailChange}
              disabled={loading}
              {...emailInputProps}
            />
            <SendMailButtonContainer>
              <Button
                variant="secondary"
                fullWidth={true}
                type="submit"
                disabled={loading}
              >
                {t("Reset password")}
              </Button>
            </SendMailButtonContainer>
          </Form>
        </>
      )}

      {finished && <p>{t("email sent message")}</p>}
    </>
  );
};

export default PasswordLostForm;
