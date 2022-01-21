export function fetchExerciseDetails() {
  return fetch("/DevLife/exercises.json")
    .then((res) => res.json())
    .then(hydrateExercises)
    .catch((err) => console.error(err));
}

class Topic {
  constructor(name) {
    this.name = name;
    this.exercises = [];
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
    return this.name.split("/")[0];
  }
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
