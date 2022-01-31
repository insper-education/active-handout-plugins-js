import styled from "styled-components";
import theme from "../../../commons/theme";

const Container = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  color: var(--md-primary-bg-color);
  cursor: pointer;
  padding: ${theme.padding.rem(1)} ${theme.padding.rem(2)};

  :after {
    content: "▾";
    margin-left: ${theme.margin.rem(2)};
  }
`;

export { Container, UserButton };
