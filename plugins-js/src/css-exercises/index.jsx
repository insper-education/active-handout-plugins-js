import React from "react";
import ReactDOM from "react-dom";
import { parseAnswer } from "../components/Answer/index.jsx";
import report from "../report.js";
import CodePen from "./components/CodePen/index.jsx";

function findExercise(container) {
  const anchors = container.getElementsByTagName("a");
  let exercise;
  for (let anchor of anchors) {
    const anchorText = anchor.text.toLowerCase().trim();
    if (anchorText.startsWith("codepen")) {
      exercise = anchor;
    }
  }
  return exercise;
}

function extractUserAndSlug(url) {
  const parts = url.split("/");
  const user = parts[parts.length - 3];
  const slug = parts[parts.length - 1];
  return [user, slug];
}

function markAsSolved(exerciseContainer) {
  exerciseContainer.classList.remove("question");
  exerciseContainer.classList.add("solved");
}

function renderExercise(exerciseContainer) {
  const exercise = findExercise(exerciseContainer);
  if (!exercise) {
    console.error(
      `Couldn't extract data from CSS exercise ${exerciseContainer}`
    );
    return;
  }

  const [penUser, penSlug] = extractUserAndSlug(exercise.href);
  const pageSlug = exerciseContainer.getAttribute("data-pageslug");
  const fullSlug = exerciseContainer.getAttribute("id");
  const exerciseSlug = fullSlug.substring(pageSlug.length);

  const solvedKey = `${fullSlug}-solved`;
  const solved = localStorage.getItem(solvedKey) === "true";
  if (solved) {
    markAsSolved(exerciseContainer);
  }

  const submit = (isCorrect) => {
    return report
      .sendAnswer(fullSlug, isCorrect ? 1 : 0, {}, {})
      .finally(() => {
        localStorage[solvedKey] = "true";
        markAsSolved(exerciseContainer);
      });
  };

  const answerDiv = exerciseContainer.querySelector(".admonition.details");
  let answerData;
  if (answerDiv) {
    answerData = parseAnswer(answerDiv);
    exerciseContainer.removeChild(answerDiv);
  }

  const root = document.createElement("div");
  ReactDOM.render(
    <CodePen
      penUser={penUser}
      penSlug={penSlug}
      exerciseSlug={exerciseSlug}
      onComplete={submit}
      solved={solved}
      answerData={answerData}
    />,
    root
  );
  exerciseContainer.replaceChild(root, exercise.parentElement);
}

function renderEmbed(embedDiv) {
  const embed = findExercise(embedDiv);
  if (!embed) {
    console.error(`Couldn't extract data from CSS exercise ${embedDiv}`);
    return;
  }

  const [penUser, penSlug] = extractUserAndSlug(embed.href);

  const root = document.createElement("div");
  ReactDOM.render(<CodePen penUser={penUser} penSlug={penSlug} />, root);
  embedDiv.innerHTML = "";
  embedDiv.classList.remove("admonition");
  embedDiv.appendChild(root);
}

{
  const cssExerciseDivs = document.getElementsByClassName("css-exercise");
  for (let cssExerciseDiv of cssExerciseDivs) {
    renderExercise(cssExerciseDiv);
  }

  const codepenEmbedDivs = document.getElementsByClassName("codepen-embed");
  console.log(codepenEmbedDivs[0], codepenEmbedDivs[1]);
  for (let embedDiv of codepenEmbedDivs) {
    renderEmbed(embedDiv);
  }
}
