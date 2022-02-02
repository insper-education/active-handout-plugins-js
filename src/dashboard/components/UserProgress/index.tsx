import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  fetchAnswerSummaries,
  IExerciseSummary,
} from "../../../exercise/components/HandoutProgress/services";
import { fetchExerciseDetails, Topic as ExerciseTopic } from "../exercise";
import ProgressBar from "../../../components/ProgressBar";
import { computePoints } from "../../../exercise/utils";
import { IDType, useCalendarData } from "../../../services/calendar";
import { formatDate } from "../../../calendar/components/Calendar";
import {
  CardContainer,
  ProgressContainer,
  ProgressSetContainer,
  ProgressTitle,
  TopicCard,
  TopicDate,
  TopicName,
  TopicNameContainer,
} from "./styles";
import { sortTopicsByDate } from "../../../services/dashboard";

interface ITopicProps {
  topic: ExerciseTopic;
  competence?: IDType;
  summariesBySlug?: Map<string, IExerciseSummary> | null;
}

function Topic({ topic, competence, summariesBySlug }: ITopicProps) {
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
    const extraSlugs = exercisesByGroup.handout.map((e) => e.slug);
    setExtraPoints(computePoints(extraSlugs, summariesBySlug));
  }, [topic.exercises, summariesBySlug]);

  return (
    <TopicCard competence={competence} href={topic.uri}>
      <TopicNameContainer>
        <TopicName>{topic.label || topic.name}</TopicName>
        {topic?.date && (
          <TopicDate>
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
            Handout{" "}
            <em>
              ({handoutPoints}/{handoutTotal})
            </em>
          </ProgressTitle>
          <ProgressBar current={handoutPoints} total={handoutTotal} />
        </ProgressContainer>
        <ProgressContainer>
          <ProgressTitle>
            Exercícios{" "}
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

export default function UserProgress() {
  const { data: summariesBySlug } = useQuery("/summaries/", () =>
    fetchAnswerSummaries()
  );
  const { data: topics } = useQuery("/exercise-details/", () =>
    fetchExerciseDetails()
  );
  const calendarData = useCalendarData();

  const [sortedTopics, setSortedTopics] = useState<ExerciseTopic[] | null>(
    null
  );
  useEffect(() => {
    setSortedTopics(
      sortTopicsByDate(topics as ExerciseTopic[] | null, calendarData)
    );
  }, [topics, calendarData]);

  return (
    <>
      <CardContainer>
        {sortedTopics &&
          sortedTopics.map((topic: ExerciseTopic) => {
            const competenceName = topic.getCompetence();
            const competence = calendarData?.dtypes?.[competenceName];
            return (
              <Topic
                key={`topic--${topic.name}`}
                topic={topic}
                competence={competence}
                summariesBySlug={summariesBySlug}
              />
            );
          })}
      </CardContainer>
    </>
  );
}
