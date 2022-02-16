import React, { useMemo, useState } from "react";
import { computePoints } from "../../../exercise/utils";
import { IExerciseSummary } from "../../../models/summary";
import { ICalendarData, IDType } from "../../../services/calendar";
import { Topic as ExerciseTopic } from "../exercise";
import {
  CardContainer,
  TabContainer,
  TabTitle,
  TabTitlePoints,
} from "../styles";
import { Topic } from "../Topic";

interface ITopicGroupsProps {
  topicsByType: [string, ExerciseTopic[]][];
  summariesBySlug: Map<string, IExerciseSummary>;
  calendarData: ICalendarData;
}

export default function TopicGroups({
  topicsByType,
  summariesBySlug,
  calendarData,
}: ITopicGroupsProps) {
  const [currentTypeIdx, setCurrentTypeIdx] = useState<number>(0);

  const [dtype, topics] = useMemo(() => {
    if (!topicsByType?.length || !calendarData) return [null, null];
    const [dtypeName, topics] = topicsByType[currentTypeIdx];
    const dtype = calendarData?.dtypes?.[dtypeName];
    return [dtype, topics];
  }, [topicsByType, currentTypeIdx, calendarData]);

  const [dtypes, pointsByType, totalsByType] = useMemo(() => {
    if (!topicsByType?.length) return [[], [], []];
    const dtypes = [] as IDType[];
    const pointsByType = [] as number[];
    const totals = [] as number[];
    topicsByType.forEach(([dtypeName, topics]) => {
      const slugs = topics
        .map((topic) => topic.exercises.map((exercise) => exercise.slug))
        .flat();
      dtypes.push(calendarData?.dtypes?.[dtypeName]);
      pointsByType.push(computePoints(slugs, summariesBySlug));
      totals.push(slugs.length);
    });
    return [dtypes, pointsByType, totals];
  }, [topicsByType, calendarData]);

  if (!dtypes?.length || !topics?.length) return null;
  return (
    <div>
      <TabContainer>
        {dtypes.map((dtype, idx) => (
          <TabTitle
            selected={idx === currentTypeIdx}
            dtype={dtype}
            onClick={() => setCurrentTypeIdx(idx)}
          >
            {dtype.title}{" "}
            <TabTitlePoints selected={idx === currentTypeIdx} dtype={dtype}>
              [{pointsByType[idx]}/{totalsByType[idx]}]
            </TabTitlePoints>
          </TabTitle>
        ))}
      </TabContainer>
      <CardContainer>
        {topics.map((topic: ExerciseTopic) => {
          return (
            <Topic
              key={`topic--${topic.name}`}
              topic={topic}
              competence={dtype}
              summariesBySlug={summariesBySlug}
            />
          );
        })}
      </CardContainer>
    </div>
  );
}
