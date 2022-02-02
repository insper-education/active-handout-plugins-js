import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { PasswordChangeInputs, schema } from "../../../password-change-schema";
import { api } from "../../../../services/auth";
import { redirectTo } from "../../../../services/request";
import Form from "../../../../components/Form";
import ErrorMessage from "../../../../components/Form/ErrorMessage";
import Button from "../../../../components/Button";
import { LoadingContainer, SignInButtonContainer } from "../../styles";
import LoadingIndicator from "../../../../components/LoadingIndicator";

const MOUNT_POINT = window.ihandout_config["mount-point"];

interface IPasswordChangeForm {
  firstTime: boolean;
  uid?: string | null;
  token?: string | null;
  reason?: string | null;
}

const PasswordChangeForm = ({
  firstTime,
  uid,
  token,
  reason,
}: IPasswordChangeForm) => {
  const mounted = useRef(true);
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordChangeInputs>({
    resolver: yupResolver(schema),
  });

  const [invalidLink, setInvalidLink] = useState<boolean>(false);
  const onSubmit = useCallback((data: PasswordChangeInputs) => {
    setLoading(true);
    api
      .resetPassword(
        uid || "",
        token || "",
        data.password,
        data.passwordConfirmation
      )
      .then((success) => {
        if (success) redirectTo(MOUNT_POINT || "/");
        else setInvalidLink(true);
      })
      .finally(() => mounted.current && setLoading(false));
  }, []);

  const { onChange: onPasswordChange, ...passwordInputProps } =
    register("password");

  const {
    onChange: onPasswordConfirmationChange,
    ...passwordConfirmationInputProps
  } = register("passwordConfirmation");

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.TextInput
          label={t("Password")}
          inputId="password"
          type="password"
          placeholder={t("Password")}
          {...passwordInputProps}
          onChange={onPasswordChange}
          error={t(errors?.password?.message || "")}
        />
        <Form.TextInput
          label={t("Repeat password")}
          inputId="passwordConfirmation"
          type="password"
          placeholder={t("Password")}
          {...passwordConfirmationInputProps}
          onChange={onPasswordConfirmationChange}
          error={t(errors?.passwordConfirmation?.message || "")}
        />
        {!!reason && <ErrorMessage>{t(reason || "")}</ErrorMessage>}
        {invalidLink && (
          <ErrorMessage>{t("Invalid password reset link")}</ErrorMessage>
        )}
        <SignInButtonContainer>
          <Button
            variant="secondary"
            fullWidth={true}
            type="submit"
            disabled={loading}
          >
            {firstTime ? t("Set password") : t("Reset password")}
          </Button>
        </SignInButtonContainer>
        {loading && (
          <LoadingContainer>
            <LoadingIndicator size="xs" />
          </LoadingContainer>
        )}
      </Form>
    </>
  );
};

export default PasswordChangeForm;
