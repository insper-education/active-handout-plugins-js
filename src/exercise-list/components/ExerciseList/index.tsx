import React from "react";
import { useQuery } from "react-query";
import { fetchAnswerSummaries } from "../../../exercise/components/HandoutProgress/services";
import { ExerciseListItem } from "./styles";

interface IExerciseEntry {
  difficulty: number;
  slug: string;
  url: string;
  title: string;
}

export interface IExerciseListProps {
  data: IExerciseEntry[];
}

export default function ExerciseList({ data }: IExerciseListProps) {
  const { data: summariesBySlug } = useQuery(`/summaries/`, () => {
    return fetchAnswerSummaries();
  });

  return (
    <ul className="exercise-list">
      {data.map((entry) => {
        const summary = summariesBySlug?.get(entry.slug);
        return (
          <ExerciseListItem
            key={`exercise--${entry.title}`}
            answered={summary?.max_points === 1}
            className={`exercise-list--item difficulty-${entry.difficulty}`}
          >
            <a href={`${entry.url}`}>{entry.title}</a>
          </ExerciseListItem>
        );
      })}
    </ul>
  );
}
