import React, { ReactNode } from "react";
import styled from "styled-components";
import theme from "../../../commons/theme";

const StyledError = styled.p`
  color: ${theme.colors.red[500]};
  ${theme.text.xs};
  font-style: italic;
`;

interface IErrorMessageProps {
  children: ReactNode;
}

const ErrorMessage = ({ children }: IErrorMessageProps) => {
  return <StyledError>{children}</StyledError>;
};

export default ErrorMessage;
