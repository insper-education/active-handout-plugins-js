import styled from "styled-components";

export const CodeVisualizerContainer = styled.div`
  code {
    background-color: #202533;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 0.25rem;
    background: #cccccc50;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #808080;
    border-radius: 100vh;
    border: 0.125rem solid #cccccc50 outer;
    opacity: 0.5;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    opacity: 1;
  }
`;
