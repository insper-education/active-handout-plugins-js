import styled from "styled-components";
import theme from "../../commons/theme";
import { CodeVisualizerContainer } from "../CodeViewer/styles";

export const ExplorerContainer = styled.div`
  display: grid;
  grid-template-columns: 15ch 1fr;
`;

export const ExplorerNavigation = styled.div``;

export const FileList = styled.ul`
  .md-typeset.md-typeset && {
    list-style: none;
    margin: ${theme.margin.rem(7)} 0 0;
    padding: 0;
  }
`;

export const Filename = styled.li<{ selected?: boolean }>`
  .md-typeset.md-typeset && {
    margin: 0;
    padding: ${theme.padding.rem(1)} ${theme.padding.rem(2)};
    border-radius: ${theme.borderRadius.rounded};
    background-color: ${({ selected }) =>
      selected ? theme.colors.primary[50] : "transparent"};
    cursor: ${({ selected }) => (selected ? "default" : "pointer")};
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const CodeTitle = styled.div`
  font-family: monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 ${theme.padding.rem(10)};
`;

export const CodeContainer = styled.div`
  overflow-x: hidden;

  > ${CodeVisualizerContainer} {
    display: flex;
    flex-direction: column;
    height: ${theme.height.rem(160)};
  }

  pre {
    flex-grow: 1;
    margin: 0;
  }

  pre code {
    min-height: 100%;
  }
`;
