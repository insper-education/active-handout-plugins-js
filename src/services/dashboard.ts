import { compareTopicsByDate, Topic } from "../dashboard/components/exercise";
import { ICalendarBadge, ICalendarData, IDayEntry } from "./calendar";

function findTopicForBadge(badge: ICalendarBadge, topics: Topic[]) {
  const topic = topics.filter(
    (topic) => badge.uri && badge.uri.indexOf(topic.name) >= 0
  )[0];
  return topic;
}

function extractBadgesWithDate(calendarData: ICalendarData): ICalendarBadge[] {
  return Object.entries(calendarData.calendar)
    .map(([date, data]: [Date | string, IDayEntry]) =>
      data?.badges?.map((d) => ({ ...d, date })).filter((d) => !!d?.uri)
    )
    .flat()
    .filter((badge) => !!badge) as ICalendarBadge[];
}

function sortTopicsByDate(
  topics: Topic[] | null,
  calendarData: ICalendarData | null
): Topic[] | null {
  if (!topics || !calendarData) {
    return topics;
  }

  const badgesWithDate = extractBadgesWithDate(calendarData);
  const sorted = badgesWithDate
    .map((badge) => {
      const topic = findTopicForBadge(badge, topics);
      if (topic) return new Topic(topic.name, topic.exercises, badge);
    })
    .filter((topic) => !!topic) as Topic[];
  sorted.sort(compareTopicsByDate);
  return sorted;
}

export { sortTopicsByDate };
