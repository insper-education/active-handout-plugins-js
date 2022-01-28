import React, { forwardRef, HTMLProps } from "react";
import styled from "styled-components";
import theme from "../../../commons/theme";
import ErrorMessage from "../ErrorMessage";
import Label from "../Label";

interface ITextInputProps {
  inputId: string;
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
}

const LabelContainer = styled.div`
  margin-bottom: ${theme.margin.rem(4)};
`;

interface IStyledInputProps {
  error?: string;
}

const StyledInput = styled.input<IStyledInputProps>`
  appearance: none;
  border-width: ${theme.border.base};
  border-color: ${({ error }) =>
    error ? theme.colors.red[500] : theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.rounded};
  width: 100%;
  padding: ${theme.padding.rem(2)} ${theme.padding.rem(3)};
  color: ${theme.colors.gray[700]};
  line-height: ${theme.lineHeight.tight};

  :focus {
    ${theme.outline.none};
    box-shadow: ${theme.boxShadow.sm};
  }
`;

const TextInput = forwardRef<
  HTMLInputElement,
  ITextInputProps & HTMLProps<HTMLInputElement>
>(
  (
    { error, label, placeholder, inputId, name, type = "text", onChange },
    ref
  ) => {
    return (
      <LabelContainer>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <StyledInput
          id={inputId}
          type={type}
          name={name}
          error={error}
          ref={ref as any}
          onChange={onChange}
          placeholder={placeholder || ""}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LabelContainer>
    );
  }
);

export default TextInput;
