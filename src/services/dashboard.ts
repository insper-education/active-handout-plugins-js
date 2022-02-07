import {
  compareTopicsByDate,
  IExercise,
  Topic,
} from "../dashboard/components/exercise";
import { maxDateString } from "../jsutils";
import { ICalendarBadge, ICalendarData, IDayEntry } from "./calendar";

function mergeTopicsForBadge(
  badge: ICalendarBadge,
  topics: Topic[]
): Topic | null {
  const uri = badge.uri;
  if (!uri) return null;
  const badgeTopics = topics.filter((topic) => topic.name.indexOf(uri) >= 0);
  if (badgeTopics.length) {
    const name = badgeTopics[0].name;
    let exercises = [] as IExercise[];
    for (let topic of badgeTopics) {
      exercises = exercises.concat(topic.exercises);
    }
    return new Topic(name, exercises, badge);
  }
  return null;
}

function extractBadgesWithDate(calendarData: ICalendarData): ICalendarBadge[] {
  return Object.entries(calendarData.calendar)
    .map(([date, data]: [Date | string, IDayEntry]) =>
      data?.badges?.map((d) => ({ ...d, date })).filter((d) => !!d?.uri)
    )
    .flat()
    .filter((badge) => !!badge) as ICalendarBadge[];
}

function groupBadgesByTopic(badges: ICalendarBadge[]): ICalendarBadge[] {
  const byTopic = new Map<string, ICalendarBadge>();
  for (let badge of badges) {
    const topic = badge.uri?.split("/").slice(1, 3).join("/");
    if (!topic) continue;
    if (byTopic.has(topic)) {
      const curBadge = byTopic.get(topic) as ICalendarBadge;
      byTopic.set(topic, {
        label: curBadge.label,
        dtype: curBadge.dtype,
        uri: topic,
        date: maxDateString(curBadge.date, badge.date),
      });
    } else {
      byTopic.set(topic, { ...badge, uri: topic });
    }
  }
  return [...byTopic.values()];
}

function sortTopicsByDate(
  topics: Topic[] | null,
  calendarData: ICalendarData | null
): Topic[] | null {
  if (!topics || !calendarData) {
    return topics;
  }

  const badgesWithDate = extractBadgesWithDate(calendarData);
  const badgesByTopic = groupBadgesByTopic(badgesWithDate);
  const sorted = badgesByTopic
    .map((badge) => {
      return mergeTopicsForBadge(badge, topics);
    })
    .filter((topic) => !!topic) as Topic[];
  sorted.sort(compareTopicsByDate);
  return sorted;
}

export function groupTopicsByDType(
  topics: Topic[] | null,
  calendarData: ICalendarData | null
) {
  const byDType = new Map<string, Topic[]>();
  if (!topics) return byDType;

  const sorted = sortTopicsByDate(topics, calendarData);
  if (!sorted) return byDType;
  for (let topic of sorted) {
    const dtype = topic.dtype;
    if (!dtype) continue;
    if (!byDType.has(dtype)) {
      byDType.set(dtype, []);
    }
    byDType.get(dtype)?.push(topic);
  }
  return byDType;
}
