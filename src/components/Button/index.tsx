import React, { HTMLProps } from "react";
import styled, { css } from "styled-components";
import theme from "../../commons/theme";

interface IButtonProps {
  variant: "primary" | "secondary" | "hidden";
  type: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
}

const defaultProps = {
  variant: "primary",
  type: "button",
};

const BaseButton = styled.button<IButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${theme.fontWeight.bold};
  padding: ${theme.padding.rem(2)} ${theme.padding.rem(4)};
  border-radius: ${theme.borderRadius.rounded};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  :focus {
    ${theme.outline.none};
    box-shadow: ${theme.boxShadow.sm};
  }
`;

const PrimaryButton = styled(BaseButton)`
  ${({ disabled }) => {
    if (disabled) {
      return css`
        background-color: ${theme.colors.gray[300]};
        color: ${theme.colors.gray[500]};
        cursor: default;
      `;
    } else {
      return css`
        background-color: ${theme.colors.primary.default};
        color: white;

        :hover {
          background-color: ${theme.colors.primary[500]};
        }
      `;
    }
  }};
`;

const SecondaryButton = styled(BaseButton)`
  ${({ disabled }) => {
    if (disabled) {
      return css`
        background-color: ${theme.colors.gray[300]};
        color: ${theme.colors.gray[500]};
        cursor: default;
      `;
    } else {
      return css`
        background-color: ${theme.colors.secondary.default};
        color: white;

        :hover {
          background-color: ${theme.colors.secondary[500]};
        }
      `;
    }
  }};
`;

const HiddenButton = styled(BaseButton)`
  ${({ disabled }) => {
    if (disabled) {
      return css`
        background-color: transparent;
        color: ${theme.colors.gray[500]};
        cursor: default;
      `;
    } else {
      return css`
        background-color: transparent;
      `;
    }
  }};
`;

const Button = ({
  onClick,
  fullWidth,
  variant,
  children,
  type,
  disabled,
}: IButtonProps & HTMLProps<HTMLButtonElement>) => {
  const Component = {
    primary: PrimaryButton,
    secondary: SecondaryButton,
    hidden: HiddenButton,
  }[variant];

  return (
    <Component
      onClick={onClick}
      variant={variant}
      fullWidth={fullWidth}
      type={type}
      disabled={disabled}
    >
      {children}
    </Component>
  );
};

Button.defaultProps = defaultProps;

export default Button;
