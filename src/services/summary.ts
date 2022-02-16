import { IExerciseSummary } from "../models/summary";
import { cache } from "./auth";

export function fetchAnswerSummary(
  exerciseSlug?: string
): Promise<IExerciseSummary | null> {
  const user = cache.getUser();
  const token = cache.getToken();
  if (!user || !token || !exerciseSlug) {
    return Promise.resolve(null);
  }

  const summariesUrl = `${window.ihandout_config.report?.["api-base"]}summaries/${exerciseSlug}/?user=${user.pk}`;

  return fetch(summariesUrl, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((summaries) => summaries[0])
    .catch((err) => {
      console.error(err);
      return null;
    });
}
