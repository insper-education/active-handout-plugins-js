import axios from "axios";
import { isNullOrUndefined } from "../jsutils";
import { ISubmission } from "../models/submission";
import { cache } from "./auth";

const apiBase = window.ihandout_config.report?.["api-base"];

function fetchSubmissionBase(
  url: string,
  exerciseSlug?: string,
  answerId?: number | null
): Promise<ISubmission | null> {
  const user = cache.getUser();
  const token = cache.getToken();
  if (isNullOrUndefined(answerId) || !exerciseSlug || !user?.pk || !token) {
    return Promise.reject(null);
  }

  return axios
    .get(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => {
      if (e?.response?.status !== 404) {
        console.error(e);
      }
      return null;
    });
}

export function fetchSubmission(
  exerciseSlug?: string,
  answerId?: number | null
): Promise<ISubmission | null> {
  const url = `${apiBase}exercises/${exerciseSlug}/answers/${answerId}/`;
  return fetchSubmissionBase(url, exerciseSlug, answerId);
}

export function fetchPreviousSubmission(
  exerciseSlug?: string,
  answerId?: number | null
): Promise<ISubmission | null> {
  const url = `${apiBase}exercises/${exerciseSlug}/answers/${answerId}/previous/`;
  return fetchSubmissionBase(url, exerciseSlug, answerId);
}

export function fetchNextSubmission(
  exerciseSlug?: string,
  answerId?: number | null
): Promise<ISubmission | null> {
  const url = `${apiBase}exercises/${exerciseSlug}/answers/${answerId}/next/`;
  return fetchSubmissionBase(url, exerciseSlug, answerId);
}
