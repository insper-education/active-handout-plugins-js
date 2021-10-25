import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  &&& {
    ${({ disabled }) =>
      disabled &&
      `
      border: .1rem solid #aeafae;
      color: #aeafae;
      cursor: default;

      :hover {
        background-color: transparent;
      }
    `}
  }
`;

function Button({ disabled, onClick, children }) {
  return (
    <StyledButton className="md-button" onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
