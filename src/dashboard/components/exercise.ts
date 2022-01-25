import { ICalendarBadge, parseDate } from "../../services/calendar";

export function fetchExerciseDetails() {
  return fetch("/DevLife/exercises.json")
    .then((res) => res.json())
    .then(hydrateExercises)
    .catch((err) => console.error(err));
}

interface IExercisesByGroup {
  handout: IExercise[];
  extra: IExercise[];
}

interface IExercise {
  slug: string;
  url: string;
  type: string;
  topic: string;
  group: string;
}

export class Topic {
  name: string;
  exercises: IExercise[];
  label?: string;
  date?: Date | null;
  dtype?: string;
  uri?: string;

  constructor(name: string, exercises?: IExercise[], badge?: ICalendarBadge) {
    this.name = name;
    this.exercises = exercises || [];
    this.label = badge?.label;
    this.date = badge?.date ? parseDate(badge?.date) : null;
    this.dtype = badge?.dtype;
    this.uri = badge?.uri;
  }

  addExercise(exercise: IExercise) {
    this.exercises.push(exercise);
  }

  getExercisesByGroup(): IExercisesByGroup {
    const groups: IExercisesByGroup = { handout: [], extra: [] };
    for (let exercise of this.exercises) {
      groups[exercise.group as "handout" | "extra"].push(exercise);
    }
    return groups;
  }

  getCompetence() {
    return this.dtype || this.name.split("/")[0];
  }
}

export function compareTopicsByDate(topic1: Topic, topic2: Topic) {
  if (!topic2?.date) return -1;
  if (!topic1?.date) return 1;
  return topic1.date.getTime() - topic2.date.getTime();
}

function hydrateExercises(exercises: IExercise[]) {
  const topics = new Map<string, Topic>();
  for (let exercise of exercises) {
    const topicName = exercise.topic;
    let topic = topics.get(topicName);
    if (!topic) {
      topic = new Topic(topicName);
      topics.set(topicName, topic);
    }
    topic.addExercise(exercise);
  }
  return [...topics.values()];
}
