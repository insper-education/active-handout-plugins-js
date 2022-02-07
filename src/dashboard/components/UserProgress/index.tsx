import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchAnswerSummaries } from "../../../exercise/components/HandoutProgress/services";
import { fetchExerciseDetails, Topic as ExerciseTopic } from "../exercise";
import { useCalendarData } from "../../../services/calendar";
import { groupTopicsByDType } from "../../../services/dashboard";
import TopicGroups from "../TopicGroups";

export default function UserProgress() {
  const { data: summariesBySlug } = useQuery("/summaries/", () =>
    fetchAnswerSummaries()
  );
  const { data: topics } = useQuery("/exercise-details/", () =>
    fetchExerciseDetails()
  );
  const calendarData = useCalendarData();

  const [topicsByType, setTopicsByType] = useState<
    [string, ExerciseTopic[]][] | null
  >(null);
  useEffect(() => {
    setTopicsByType(
      Array.from(
        groupTopicsByDType(topics as ExerciseTopic[] | null, calendarData)
      )
    );
  }, [topics, calendarData]);

  if (!topicsByType || !calendarData || !summariesBySlug) return null;
  return (
    <TopicGroups
      topicsByType={topicsByType}
      calendarData={calendarData}
      summariesBySlug={summariesBySlug}
    />
  );
}
