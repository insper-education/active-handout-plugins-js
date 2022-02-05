import styled from "styled-components";

interface IExerciseListItemProps {
  answered: boolean;
}

export const ExerciseListItem = styled.li<IExerciseListItemProps>`
  text-decoration: ${({ answered }) => (answered ? "line-through" : "inherit")};
`;
