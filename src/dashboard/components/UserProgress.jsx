import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchAnswerSummaries } from "../../exercise/components/HandoutProgress/services";
import {
  compareTopicsByDate,
  fetchExerciseDetails,
  Topic as ExerciseTopic,
} from "./exercise";
import ProgressBar from "../../components/ProgressBar";
import { computePoints } from "../../exercise/utils";
import { useCalendarData } from "../../services/calendar";
import { formatDate } from "../../calendar/components/Calendar";

const CardContainer = styled.div`
  display: grid;
  gap: 0.8rem;
  grid-template-columns: 1fr;

  @media (min-width: 560px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 820px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1080px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const TopicCard = styled.a`
  && {
    background-color: ${({ competence }) =>
      competence?.color?.default || "#f3f3f3"};
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0.1px 0.1px 0.3px rgba(0, 0, 0, 0.014),
      0.3px 0.3px 0.7px rgba(0, 0, 0, 0.02),
      0.6px 0.6px 1.3px rgba(0, 0, 0, 0.025),
      1.1px 1.1px 2.2px rgba(0, 0, 0, 0.03),
      2.1px 2.1px 4.2px rgba(0, 0, 0, 0.036), 5px 5px 10px rgba(0, 0, 0, 0.05);
    word-break: inherit;
    color: inherit;
  }

  &&:hover,
  &&:focus {
    color: inherit;
    box-shadow: 0.3px 0.3px 0.3px rgba(0, 0, 0, 0.014),
      0.7px 0.7px 0.7px rgba(0, 0, 0, 0.02),
      1.3px 1.3px 1.3px rgba(0, 0, 0, 0.025),
      2.2px 2.2px 2.2px rgba(0, 0, 0, 0.03),
      4.2px 4.2px 4.2px rgba(0, 0, 0, 0.036), 10px 10px 10px rgba(0, 0, 0, 0.05);
  }
`;

const TopicNameContainer = styled.div`
  display: flex;
  flex-grow: 1;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem;
`;

const TopicName = styled.span`
  flex-grow: 1;
`;

const TopicDate = styled.span`
  max-width: 5ch;
  font-size: 1.5em;
  line-height: 1;
  padding-bottom: 0.5rem;
  color: #000;
  mix-blend-mode: overlay;
  margin-left: 0.2rem;
`;

const ProgressSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  gap: 0.5rem;
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 1rem;
`;

const ProgressContainer = styled.div`
  width: 100%;
`;

const ProgressTitle = styled.span`
  display: block;
`;

function Topic({ topic, competence, summariesBySlug }) {
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

function findBadgeForTopic(topic, badges) {
  return badges.filter((badge) => badge.uri.indexOf(topic.name) >= 0)?.[0];
}

function extractBadgesWithDate(calendarData) {
  return Object.entries(calendarData.calendar)
    .map(([date, data]) =>
      data?.badges?.map((d) => ({ ...d, date })).filter((d) => !!d?.uri)
    )
    .flat()
    .filter((badge) => !!badge);
}

function sortTopicsByDate(topics, calendarData) {
  if (!topics || !calendarData) {
    return topics;
  }

  const badgesWithDate = extractBadgesWithDate(calendarData);
  const sorted = topics.map((topic) => {
    const badge = findBadgeForTopic(topic, badgesWithDate);
    return new ExerciseTopic(topic.name, topic.exercises, badge);
  });
  sorted.sort(compareTopicsByDate);
  return sorted;
}

export default function UserProgress() {
  const { data: summariesBySlug } = useQuery("/summaries/", () =>
    fetchAnswerSummaries()
  );
  const { data: topics } = useQuery("/exercise-details/", () =>
    fetchExerciseDetails()
  );
  const calendarData = useCalendarData();

  const [sortedTopics, setSortedTopics] = useState(null);
  useEffect(() => {
    setSortedTopics(sortTopicsByDate(topics, calendarData));
  }, [topics, calendarData]);

  return (
    <>
      <CardContainer>
        {sortedTopics &&
          sortedTopics.map((topic) => {
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
