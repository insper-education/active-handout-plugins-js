import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery, useQueryClient } from "react-query";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { fetchAnswerSummaries } from "./services";
import { ANSWER_SUBMITTED } from "../../events";
import { ExerciseType, getExerciseType } from "../../utils";

const ProgressContainer = styled.div`
  position: sticky;
  top: 2.4rem;
  width: 10rem;
  padding: 1.2rem 1rem;
  margin: 0 0.2rem 0 1rem;
  align-self: flex-start;
  flex-shrink: 0;

  @media screen and (max-width: 76.1875em) {
    display: none;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
`;

const Percentage = styled.span`
  display: block;
  font-size: 2.5rem;
  line-height: 1;
  color: #27a5a2;

  &:after {
    content: "%";
    font-size: 1.5rem;
  }
`;

const ExerciseCount = styled.span`
  display: block;
  font-size: 0.8rem;
  line-height: 1;
  text-align: center;
  color: #7f7f7f;
`;

function ProgressContent({ points, total }) {
  const percentage = (100 * points) / total;
  return (
    <div>
      <Percentage>{Math.round(percentage)}</Percentage>
      <ExerciseCount>
        {points}/{total}
      </ExerciseCount>
    </div>
  );
}

function pointsFromSummary(summary) {
  if (!summary) {
    return 0;
  }
  const slug = summary.exercise_slug;
  const container = document.getElementById(slug);
  if (!container) {
    return 0;
  }

  const exerciseType = getExerciseType(container);
  if (exerciseType === ExerciseType.CODE || exerciseType === ExerciseType.CSS) {
    return summary.max_points;
  }
  return summary.answer_count > 0;
}

export function HandoutProgress({ exerciseSlugs }) {
  const queryClient = useQueryClient();
  const { data: summariesBySlug } = useQuery("/summaries/", () =>
    fetchAnswerSummaries(exerciseSlugs)
  );

  const handleAnswerSubmitted = useCallback(() => {
    queryClient.invalidateQueries("/summaries/");
  }, [queryClient]);

  useEffect(() => {
    window.addEventListener(ANSWER_SUBMITTED, handleAnswerSubmitted);
    return () => {
      window.removeEventListener(ANSWER_SUBMITTED, handleAnswerSubmitted);
    };
  }, []);

  const [points, setPoints] = useState(0);
  const total = exerciseSlugs.length;
  useEffect(() => {
    if (!exerciseSlugs || !summariesBySlug) {
      return;
    }
    const summaries = exerciseSlugs.map((slug) => summariesBySlug[slug]);
    setPoints(summaries.map(pointsFromSummary).reduce((a, b) => a + b, 0));
  }, [exerciseSlugs, summariesBySlug]);

  const percentage = (100 * points) / total;
  return (
    <ProgressContainer>
      <label>Progresso</label>
      <CircularProgressbarWithChildren
        value={percentage}
        styles={buildStyles({
          // Colors
          pathColor: "#27a5a2",
          textColor: "#27a5a2",
          trailColor: "#d6d6d6",
        })}
      >
        <ProgressContent points={points} total={total} />
      </CircularProgressbarWithChildren>
    </ProgressContainer>
  );
}
