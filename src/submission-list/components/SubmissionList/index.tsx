import React from "react";
import { useQuery } from "react-query";
import { cache } from "../../../services/auth";
import { fetchLatestSubmission } from "../../../services/submission";

interface ISubmissionListProps {
  slug?: string;
}

export default function SubmissionList({ slug }: ISubmissionListProps) {
  const user = cache.getUser();
  const token = cache.getToken();
  const userId = user?.pk;
  const { data: latestSubmission } = useQuery(
    `/exercises/${slug}/answers/latest/${userId}/`,
    () => fetchLatestSubmission(slug, user, token)
  );

  if (!slug || !userId || !token || !latestSubmission) return null;
  return (
    <ul>
      <li>Pontuação: {latestSubmission.points}</li>
      <li>{latestSubmission.submission_date}</li>
      <li>{JSON.stringify(latestSubmission.test_results)}</li>
      <li>{JSON.stringify(latestSubmission.student_input)}</li>
    </ul>
  );
}
