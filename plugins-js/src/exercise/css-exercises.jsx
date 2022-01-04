import React from "react";
import ReactDOM from "react-dom";
import { registerAnswer, renderExercise } from "./utils.js";
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

export function renderCSSExercise(exerciseContainer, { answered }, answerData) {
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

  const submit = (isCorrect) =>
    registerAnswer(exerciseContainer, isCorrect ? 1 : 0, {}, {});

  renderExercise(
    <CodePen
      penUser={penUser}
      penSlug={penSlug}
      exerciseSlug={exerciseSlug}
      onComplete={submit}
      answered={answered}
      answerData={answerData}
    />,
    exerciseContainer,
    exercise.parentElement
  );
}

export function transformCSSExercise(serverAnswer) {
  return serverAnswer?.submission_date;
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
  const codepenEmbedDivs = document.getElementsByClassName("codepen-embed");
  for (let embedDiv of codepenEmbedDivs) {
    renderEmbed(embedDiv);
  }
}
