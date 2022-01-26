import React, { HTMLProps } from "react";
import styled from "styled-components";
import theme from "../../../commons/theme";

const StyledLabel = styled.label`
  display: block;
  color: ${theme.colors.gray[700]};
  ${theme.text.sm};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.margin.rem(1)};
`;

const Label = ({ htmlFor, children }: HTMLProps<HTMLLabelElement>) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

export default Label;
