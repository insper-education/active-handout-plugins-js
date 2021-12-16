import React from "react";
import ReactDOM from "react-dom";
import report from "../report";
import notification from "../notification";
import Quiz from "./components/Quiz";
import { parseAnswer } from "../components/Answer";

{
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

  const documentAddr = document.location.pathname;
  const multipleChoiceQuestions = document.querySelectorAll(
    ".admonition.question.choice"
  );
  multipleChoiceQuestions.forEach((multipleChoiceQuestion) => {
    const twoCols = multipleChoiceQuestion.classList.contains("two-cols");
    const choicesUl = multipleChoiceQuestion.querySelector(".task-list");
    const answerDiv = multipleChoiceQuestion.querySelector(
      ".admonition.details"
    );
    const choicesData = parseQuestion(choicesUl);
    const answerData = parseAnswer(answerDiv);

    multipleChoiceQuestion.removeChild(answerDiv);

    const storageKey = documentAddr + "/" + multipleChoiceQuestion.id;
    const previousAnswerIdx = parseInt(localStorage.getItem(storageKey));

    multipleChoiceQuestion.dataset.answered = !Number.isNaN(previousAnswerIdx);

    const submit = (choice, isCorrect) => {
      return report
        .sendAnswer(
          multipleChoiceQuestion.id,
          isCorrect ? 1 : 0,
          {
            choice,
            num_choices: choicesData.length,
          },
          {}
        )
        .finally(() => {
          localStorage[storageKey] = choice;
          multipleChoiceQuestion.dataset.answered = true;
        });
    };

    const root = document.createElement("div");
    ReactDOM.render(
      <Quiz
        choices={choicesData}
        answer={answerData}
        twoCols={twoCols}
        studentAnswerIdx={previousAnswerIdx}
        submit={submit}
      />,
      root
    );

    multipleChoiceQuestion.replaceChild(root, choicesUl);
  });
}
