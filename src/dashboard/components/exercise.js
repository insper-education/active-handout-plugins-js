import { parseDate } from "../../services/calendar";

export function fetchExerciseDetails() {
  return fetch("/DevLife/exercises.json")
    .then((res) => res.json())
    .then(hydrateExercises)
    .catch((err) => console.error(err));
}

export class Topic {
  constructor(name, exercises, badge) {
    this.name = name;
    this.exercises = exercises || [];
    this.label = badge?.label;
    this.date = badge?.date ? parseDate(badge?.date) : null;
    this.dtype = badge?.dtype;
    this.uri = badge?.uri;
  }

  addExercise(exercise) {
    this.exercises.push(exercise);
  }

  getExercisesByGroup() {
    const groups = { handout: [], extra: [] };
    for (let exercise of this.exercises) {
      groups[exercise.group].push(exercise);
    }
    return groups;
  }

  getCompetence() {
    return this.dtype || this.name.split("/")[0];
  }
}

export function compareTopicsByDate(topic1, topic2) {
  if (!topic2?.date) return -1;
  if (!topic1?.date) return 1;
  return topic1.date.getTime() - topic2.date.getTime();
}

function hydrateExercises(exercises) {
  const topics = {};
  for (let exercise of exercises) {
    const topicName = exercise.topic;
    if (!topics[topicName]) {
      topics[topicName] = new Topic(topicName);
    }
    topics[topicName].addExercise(exercise);
  }
  return [...Object.values(topics)];
}
