import styled from "styled-components";
import theme from "../../../commons/theme";

export const AnswerContainer = styled.div`
  margin-top: 3rem;
`;

export const Points = styled.span<{ points: number }>`
  color: ${({ points }) => {
    if (points < 0.1) {
      return theme.colors.red[500];
    }
    if (points < 0.99) {
      return theme.colors.yellow[500];
    }
    return theme.colors.green[500];
  }};
`;

export const SubmissionListHeader = styled.div`
  width: 100%;
  margin-top: 2rem;

  display: flex;
  align-items: center;
`;

export const SubmissionListHeaderButton = styled.button`
  cursor: pointer;
  padding: 0.5rem;
  min-width: 2rem;

  :disabled {
    cursor: default;
  }
`;

export const SubmissionListHeaderTitle = styled.span`
  text-align: center;
  flex-grow: 1;
`;
