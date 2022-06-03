import { isNullOrUndefined } from "../../../jsutils";
import { IExerciseSummary } from "../../../models/summary";
import { cache } from "../../../services/auth";
import { transformCodeExercise } from "../../code-exercise";
import { transformCSSExercise } from "../../css-exercises";
import { makeAnswerFromServerEvent } from "../../events";
import { transformMultipleChoiceExercise } from "../../multiple-choice";
import { transformSelfAssessedExercise } from "../../self-assessed-exercise";
import { transformTextExercise } from "../../text-question";
import {
  ExerciseType,
  getExerciseType,
  isAnswered,
  markAsAnswered,
  setPreviousAnswer,
} from "../../utils";

function checkForUpdates(
  summariesBySlug: Map<string, IExerciseSummary>,
  exerciseSlugs: string[]
) {
  for (let slug of exerciseSlugs) {
    const summary = summariesBySlug.get(slug);
    if (!summary) {
      continue;
    }

    const answeredLocal = isAnswered(slug);
    if (!answeredLocal) {
      updateAnswerToLatest(slug);
    }
  }
}

function getUser() {
  return JSON.parse(localStorage.getItem("user-data") || "");
}

export function fetchAnswerSummaries(
  exerciseSlugs?: string[]
): Promise<Map<string, IExerciseSummary> | null> {
  const user = getUser();
  const token = cache.getToken();
  if (!user || !token) {
    return Promise.resolve(null);
  }

  const summariesUrl = `${window.ihandout_config.report?.["api-base"]}summaries/?user=${user.pk}`;

  return fetch(summariesUrl, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((summaries?: IExerciseSummary[]) => {
      if (!summaries?.length) return new Map<string, IExerciseSummary>();
      const summariesBySlug = new Map<string, IExerciseSummary>(
        summaries.map((summary) => [summary.exercise_slug, summary])
      );
      exerciseSlugs && checkForUpdates(summariesBySlug, exerciseSlugs);
      return summariesBySlug;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}

const transformFunctions = {
  [ExerciseType.TEXT]: transformTextExercise,
  [ExerciseType.CHOICE]: transformMultipleChoiceExercise,
  [ExerciseType.CSS]: transformCSSExercise,
  [ExerciseType.CODE]: transformCodeExercise,
  [ExerciseType.SELF]: transformSelfAssessedExercise,
};

export function updateAnswerToLatest(exerciseSlug: string) {
  const user = getUser();
  const token = cache.getToken();
  if (!user || !token) {
    return null;
  }

  const latestAnswerUrl = `${window.ihandout_config?.report?.["api-base"]}exercises/${exerciseSlug}/answers/latest/${user.pk}/`;
  const container = document.getElementById(exerciseSlug);
  const transformServerAnswer = transformFunctions[getExerciseType(container)];

  return fetch(latestAnswerUrl, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const answer = transformServerAnswer(res);
      if (!isNullOrUndefined(answer)) {
        setPreviousAnswer(exerciseSlug, answer);
        markAsAnswered(container);

        const answerFromServer = makeAnswerFromServerEvent(
          exerciseSlug,
          answer
        );
        window.dispatchEvent(answerFromServer);
      }
      return res;
    })
    .catch((err) => console.error(err));
}
