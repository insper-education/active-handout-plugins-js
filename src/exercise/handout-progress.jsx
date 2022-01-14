import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { HandoutProgress } from "./components/HandoutProgress";

const queryClient = new QueryClient();

export function renderHandoutProgress(container, exerciseSlugs) {
  const root = document.createElement("div");
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <HandoutProgress exerciseSlugs={exerciseSlugs} />
    </QueryClientProvider>,
    root
  );

  container.appendChild(root);
}
