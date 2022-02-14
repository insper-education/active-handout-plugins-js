import axios from "axios";
import { ISubmission } from "../models/submission";
import { IUser } from "../models/user";

export function fetchLatestSubmission(
  exerciseSlug?: string,
  user?: IUser | null,
  token?: string | null
): Promise<ISubmission | null> {
  const apiBase = window.ihandout_config.report?.["api-base"];
  console.log(apiBase);
  if (!exerciseSlug || !user?.pk || !token) return Promise.reject(null);
  const url = `${apiBase}exercises/${exerciseSlug}/answers/latest/${user.pk}/`;
  return axios
    .get(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data);
}
