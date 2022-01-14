import React from "react";
import styled from "styled-components";
import Button from "../../../components/Button";

export const SubmitButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const SubmitButton = (props) => {
  return (
    <SubmitButtonContainer>
      <Button {...props} />
    </SubmitButtonContainer>
  );
};
