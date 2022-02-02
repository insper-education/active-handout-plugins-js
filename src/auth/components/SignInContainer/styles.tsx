import styled from "styled-components";
import breakpoints from "../../../commons/breakpoints";
import theme from "../../../commons/theme";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  background-color: ${theme.colors.gray[100]};

  ${breakpoints.device.md} {
    background-color: transparent;
  }
`;

const LargeScreenHeader = styled.div`
  display: none;
  margin-bottom: {theme.margin.rem(8)};
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.gray[100]}
  height: 100%;

  ${breakpoints.device.md} {
    grid-column: ${theme.grid.column.span(1)};
    display: flex;
  }
`;

const LargeScreenHeaderContent = styled.div`
  max-width: ${theme.maxWidth["2xl"]};
  padding: ${theme.padding.rem(4)};
`;

const LargeScreenTitle = styled.h1`
  ${theme.text["8xl"]};
  font-weight: 400;
  color: ${theme.colors.primary.default};
  margin-bottom: ${theme.margin.rem(4)};
`;

const LogoImg = styled.img`
  height: ${theme.height.rem(16)};
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-column: ${theme.grid.column.span(3)};
  max-width: ${theme.maxWidth.xs};
  margin: 0 auto;

  ${breakpoints.device.md} {
    grid-column: ${theme.grid.column.span(1)};
  }
`;

const ContentCard = styled.div`
  border-radius: ${theme.borderRadius.rounded};
  box-shadow: ${theme.boxShadow.default};

  ${breakpoints.device.md} {
    box-shadow: ${theme.boxShadow.none};
  }
`;

const CardTitle = styled.h2`
  font-weight: 400;
  ${theme.text["3xl"]};
  text-transform: uppercase;
  padding: ${theme.padding.rem(4)} ${theme.padding.rem(6)};
  background-color: ${theme.colors.primary.default};
  color: ${theme.colors.gray[50]};
  border-top-left-radius: ${theme.borderRadius.rounded};
  border-top-right-radius: ${theme.borderRadius.rounded};
  text-align: center;

  ${breakpoints.device.md} {
    display: none;
  }
`;

const ContentContainer = styled.div`
  background-color: white;
  padding: ${theme.padding.rem(4)};
  border-radius: ${theme.borderRadius.rounded};

  ${breakpoints.device.md} {
    padding: ${theme.padding.rem(6)};
  }
`;

export {
  Container,
  LargeScreenHeader,
  LargeScreenHeaderContent,
  LargeScreenTitle,
  LogoImg,
  CardContainer,
  ContentCard,
  CardTitle,
  ContentContainer,
};
