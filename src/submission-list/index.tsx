import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import SubmissionListComponent from "./components/SubmissionList";

const queryClient = new QueryClient();

function extractClassName(classList: DOMTokenList, prefix: string) {
  for (let c of classList) {
    if (c.startsWith(prefix)) {
      return c.substring(prefix.length);
    }
  }
}

function extractExerciseData(submissionListContainer: HTMLDivElement) {
  const classList = submissionListContainer.classList;
  return {
    slug: extractClassName(classList, "slug_"),
  };
}

function SubmissionList({ slug }: { slug?: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SubmissionListComponent slug={slug} />
    </QueryClientProvider>
  );
}

{
  const submissionLists = document.getElementsByClassName("submission-list");

  if (submissionLists.length > 0) {
    const submissionList = submissionLists[0];

    const { slug } = extractExerciseData(submissionList as HTMLDivElement);
    const root = document.createElement("div");
    ReactDOM.render(<SubmissionList slug={slug} />, root);
    submissionList.parentElement?.replaceChild(root, submissionList);
  }
}
