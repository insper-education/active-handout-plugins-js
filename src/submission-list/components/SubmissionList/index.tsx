import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import CodeExplorer from "../../../components/CodeExplorer";
import ChevronLeft from "../../../components/icons/ChevronLeft";
import ChevronRight from "../../../components/icons/ChevronRight";
import { isNullOrUndefined } from "../../../jsutils";
import { ISubmission } from "../../../models/submission";
import {
  fetchNextSubmission,
  fetchPreviousSubmission,
  fetchSubmission,
} from "../../../services/submission";
import { fetchAnswerSummary } from "../../../services/summary";
import { dateWithTimeSeconds } from "../../../utils/date";
import {
  AnswerContainer,
  Points,
  SubmissionListHeader,
  SubmissionListHeaderButton,
  SubmissionListHeaderTitle,
} from "./styles";

interface ISubmissionListProps {
  slug?: string;
}

export default function SubmissionList({ slug }: ISubmissionListProps) {
  const { data: summary, isFetched: summaryFetched } = useQuery(
    `/summaries/${slug}/`,
    () => fetchAnswerSummary(slug)
  );

  const [submission, setSubmission] = useState<ISubmission | null>(null);
  const [prevSubmission, setPrevSubmission] = useState<ISubmission | null>(
    null
  );
  const [nextSubmission, setNextSubmission] = useState<ISubmission | null>(
    null
  );
  useEffect(() => {
    const submissionId = summary?.latest;
    if (isNullOrUndefined(submissionId)) {
      return;
    }

    fetchSubmission(slug, submissionId).then(setSubmission);
    fetchPreviousSubmission(slug, submissionId).then(setPrevSubmission);
    fetchNextSubmission(slug, submissionId).then(setNextSubmission);
  }, [summary?.latest]);

  const handleShowPrev = useCallback(() => {
    const submissionId = prevSubmission?.pk;
    setNextSubmission(submission);
    setSubmission(prevSubmission);
    fetchPreviousSubmission(slug, submissionId).then(setPrevSubmission);
  }, [prevSubmission, submission, slug]);

  const handleShowNext = useCallback(() => {
    const submissionId = nextSubmission?.pk;
    setPrevSubmission(submission);
    setSubmission(nextSubmission);
    fetchNextSubmission(slug, submissionId).then(setNextSubmission);
  }, [nextSubmission, submission, slug]);

  const submissionDate = submission?.submission_date
    ? new Date(submission?.submission_date)
    : null;
  const submissionDateString = dateWithTimeSeconds(submissionDate);
  const files = submission?.student_input;

  if (!slug || !summaryFetched) return null;

  return (
    <AnswerContainer>
      <h2>Suas tentativas</h2>
      {!summary?.answer_count &&
        "Ainda não recebemos nenhuma tentativa para este exercício."}
      {summary?.answer_count && (
        <>
          <ul>
            <li>
              Melhor resultado:{" "}
              <Points points={summary.max_points}>
                {summary.max_points * 100}%
              </Points>{" "}
              dos testes passando.
            </li>
            <li>Total de tentativas: {summary.answer_count}</li>
          </ul>

          {submission && (
            <SubmissionListHeader>
              <SubmissionListHeaderButton
                disabled={!prevSubmission}
                onClick={handleShowPrev}
              >
                <ChevronLeft />
              </SubmissionListHeaderButton>
              <SubmissionListHeaderTitle>
                {submissionDateString} [testes passando:{" "}
                <Points points={submission.points}>
                  {submission.test_results?.passed}
                </Points>
                ]
              </SubmissionListHeaderTitle>
              <SubmissionListHeaderButton
                disabled={!nextSubmission}
                onClick={handleShowNext}
              >
                <ChevronRight />
              </SubmissionListHeaderButton>
            </SubmissionListHeader>
          )}

          {files && <CodeExplorer files={files} />}
        </>
      )}
    </AnswerContainer>
  );
}
