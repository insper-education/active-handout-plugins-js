import React from "react";
import styled from "styled-components";

const SeparatorContainer = styled.div`
  text-transform: uppercase;

  /* https://css-tricks.com/line-on-sides-headers/ */
  width: 100%;
  margin: 2rem 0;

  span {
    color: #98acab;
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;

    &:before,
    &:after {
      content: "";
      flex-grow: 1;
      height: 2px;
      background-color: #98acab;
      margin-top: 0.3rem;
    }

    &:before {
      margin-right: 1rem;
    }

    &:after {
      margin-left: 1rem;
    }
  }
`;

interface ISeparatorProps {
  children: React.ReactNode;
}

const Separator = ({ children }: ISeparatorProps) => {
  return (
    <SeparatorContainer>
      <span>{children || ""}</span>
    </SeparatorContainer>
  );
};

export default Separator;
