import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ExerciseListComponent, {
  IExerciseListProps,
} from "./components/ExerciseList";

const queryClient = new QueryClient();

function extractDifficulty(item: HTMLLIElement) {
  for (let className of item.classList) {
    if (className.startsWith("difficulty-")) {
      return parseInt(className.substring("difficulty-".length));
    }
  }
  return 1;
}

function extractExerciseData(item: HTMLLIElement) {
  const anchors = item.getElementsByTagName("a");
  if (!anchors) return null;

  const slug = item.dataset.slug;
  const anchor = anchors[0];
  const url = anchor.href;
  const title = anchor.innerText;
  return { slug, url, title };
}

function extractExerciseListData(exerciseList: HTMLUListElement) {
  const data = [];
  const items = exerciseList.getElementsByClassName("exercise-list--item");
  for (let item of items) {
    const difficulty = extractDifficulty(item as HTMLLIElement);
    const exerciseData = extractExerciseData(item as HTMLLIElement);
    if (!exerciseData) continue;

    data.push({ ...exerciseData, difficulty });
  }
  return data;
}

function ExerciseList({ data }: IExerciseListProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ExerciseListComponent data={data} />
    </QueryClientProvider>
  );
}

{
  const exerciseLists = document.getElementsByClassName("exercise-list");

  if (exerciseLists.length > 0) {
    const exerciseList = exerciseLists[0];

    const data = extractExerciseListData(exerciseList as HTMLUListElement);
    const root = document.createElement("div");
    ReactDOM.render(<ExerciseList data={data} />, root);
    exerciseList.parentElement?.replaceChild(root, exerciseList);
  }
}
