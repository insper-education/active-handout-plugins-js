import styled from "styled-components";
import theme from "../../../commons/theme";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: ${theme.padding.rem(8)};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${theme.colors.primary.default};
  ${theme.text["5xl"]};
  margin-bottom: ${theme.margin.rem(4)};
`;

export { Container, Title };
