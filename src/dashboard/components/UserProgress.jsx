import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchAnswerSummaries } from "../../exercise/components/HandoutProgress/services";
import { fetchExerciseDetails } from "./exercise";
import CircularProgressBar from "../../components/CircularProgressBar";
import { computePoints } from "../../exercise/utils";
import { useCalendarData } from "../../services/calendar";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const colorByCompetence = {
  python: "rgba(255, 242, 204, 1)",
  design: "rgba(227, 240, 218, 1)",
  pygame: "rgba(252, 228, 214, 1)",
  django: "rgba(218, 225, 243, 1)",
};

const TopicCard = styled.div`
  background-color: ${({ competence }) =>
    colorByCompetence[competence] || "#f3f3f3"};
  border-radius: 0.5rem;
  padding: 1rem;
  width: max(15rem, 22%);
`;

const TopicName = styled.span`
  display: block;
  font-size: 1.2em;
  font-weight: bold;
`;

const ProgressSetContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.8rem;
`;

const ProgressContainer = styled.div`
  width: 6rem;
`;

const ProgressTitle = styled.span`
  display: block;
`;

function Topic({ topic, summariesBySlug }) {
  const competence = topic.getCompetence();

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
    <TopicCard competence={competence}>
      <TopicName>{topic.name}</TopicName>
      <ProgressSetContainer>
        {handoutTotal > 0 && (
          <ProgressContainer>
            <ProgressTitle>Handout</ProgressTitle>
            <CircularProgressBar current={handoutPoints} total={handoutTotal} />
          </ProgressContainer>
        )}
        {extraTotal > 0 && (
          <ProgressContainer>
            <ProgressTitle>Exercícios</ProgressTitle>
            <CircularProgressBar current={extraPoints} total={extraTotal} />
          </ProgressContainer>
        )}
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

  const [sortedTopics, setSortedTopics] = useState(null);
  useEffect(() => {
    if (!topics || !calendarData) {
      setSortedTopics(topics);
      return;
    }

    // topics.map(topic => )
    setSortedTopics(topics);
  }, [topics, calendarData]);

  return (
    <>
      <CardContainer>
        {JSON.stringify(calendarData?.calendar)}
        {JSON.stringify(sortedTopics?.map((topic) => topic.name))}
        {sortedTopics &&
          sortedTopics.map((topic) => (
            <Topic
              key={`topic--${topic.name}`}
              topic={topic}
              summariesBySlug={summariesBySlug}
            />
          ))}
      </CardContainer>
    </>
  );
}
