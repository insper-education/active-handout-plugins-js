import React, { useEffect, useState } from "react";
import { formatDate } from "../../../calendar/components/Calendar";
import ProgressBar from "../../../components/ProgressBar";
import { IExerciseSummary } from "../../../exercise/components/HandoutProgress/services";
import { computePoints } from "../../../exercise/utils";
import { IDType } from "../../../services/calendar";
import { Topic as ExerciseTopic } from "../exercise";
import {
  ProgressContainer,
  ProgressSetContainer,
  ProgressTitle,
  TopicCard,
  TopicDate,
  TopicName,
  TopicNameContainer,
} from "../styles";

interface ITopicProps {
  topic: ExerciseTopic;
  competence?: IDType;
  summariesBySlug?: Map<string, IExerciseSummary> | null;
}

export function Topic({ topic, competence, summariesBySlug }: ITopicProps) {
  const [handoutTotal, setHandoutTotal] = useState(0);
  const [handoutPoints, setHandoutPoints] = useState(0);
  const [extraTotal, setExtraTotal] = useState(0);
  const [extraPoints, setExtraPoints] = useState(0);
  useEffect(() => {
    const exercisesByGroup = topic.getExercisesByGroup();

    setHandoutTotal(exercisesByGroup.handout.length);
    const handoutSlugs = exercisesByGroup.handout.map((e) => e.slug);

    setHandoutPoints(computePoints(handoutSlugs, summariesBySlug));

    setExtraTotal(exercisesByGroup.extra.length);
    const extraSlugs = exercisesByGroup.extra.map((e) => e.slug);
    setExtraPoints(computePoints(extraSlugs, summariesBySlug));
  }, [topic.exercises, summariesBySlug]);

  return (
    <TopicCard dtype={competence} href={topic.uri}>
      <TopicNameContainer>
        <TopicName>{topic.label || topic.name}</TopicName>
        {topic?.date && (
          <TopicDate dtype={competence}>
            {formatDate(topic?.date, {
              day: "2-digit",
              month: "2-digit",
            })}
          </TopicDate>
        )}
      </TopicNameContainer>
      <ProgressSetContainer>
        <ProgressContainer>
          <ProgressTitle>
            Handouts{" "}
            <em>
              ({handoutPoints}/{handoutTotal})
            </em>
          </ProgressTitle>
          <ProgressBar current={handoutPoints} total={handoutTotal} />
        </ProgressContainer>
        <ProgressContainer>
          <ProgressTitle>
            Exercícios adicionais{" "}
            <em>
              ({extraPoints}/{extraTotal})
            </em>
          </ProgressTitle>
          <ProgressBar current={extraPoints} total={extraTotal} />
        </ProgressContainer>
      </ProgressSetContainer>
    </TopicCard>
  );
}
