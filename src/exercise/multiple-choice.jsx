import React from "react";
import Quiz from "./components/Quiz";
import { registerAnswer, renderExercise } from "./utils";

function parseQuestion(choicesUl) {
  const choices = choicesUl.querySelectorAll(".task-list-item");

  const choicesData = [];
  choices.forEach((choice) => {
    const control = choice.querySelector(".task-list-control");
    const originalCheckbox = control.querySelector("input[type=checkbox]");
    const isAnswer = originalCheckbox.checked;
    choice.removeChild(control);
    if (
      choice.childNodes.length > 0 &&
      choice.childNodes[0].textContent.trim() === "*"
    ) {
      choice.removeChild(choice.childNodes[0]);
    }
    choicesData.push({
      isAnswer,
      innerHTML: { __html: choice.innerHTML },
    });
  });

  return choicesData;
}

export function renderMultipleChoiceExercise(
  multipleChoiceQuestion,
  { previousAnswer },
  answerData
) {
  const twoCols = multipleChoiceQuestion.classList.contains("two-cols");
  const choicesUl = multipleChoiceQuestion.querySelector(".task-list");
  const choicesData = parseQuestion(choicesUl);

  const previousAnswerIdx = parseInt(previousAnswer);

  const submit = (choice, isCorrect) => {
    return registerAnswer(
      multipleChoiceQuestion,
      isCorrect ? 1 : 0,
      {
        choice,
        num_choices: choicesData.length,
      },
      {},
      choice
    );
  };

  renderExercise(
    <Quiz
      exerciseSlug={multipleChoiceQuestion.id}
      choices={choicesData}
      answer={answerData}
      twoCols={twoCols}
      studentAnswerIdx={previousAnswerIdx}
      submit={submit}
    />,
    multipleChoiceQuestion,
    choicesUl
  );
}

export function transformMultipleChoiceExercise(serverAnswer) {
  return serverAnswer?.test_results?.choice;
}
