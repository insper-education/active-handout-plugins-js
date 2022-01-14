import React from "react";
import { SubmitButtonContainer } from "./components/SubmitButton";
import { renderExercise } from "./utils";

export function renderCodeExercise(exerciseContainer) {
  const buttons = exerciseContainer.getElementsByClassName("md-button");
  const accessExerciseButton = buttons[buttons.length - 1];

  renderExercise(
    <SubmitButtonContainer>
      <a className="md-button" href={accessExerciseButton.href}>
        {accessExerciseButton.innerHTML}
      </a>
    </SubmitButtonContainer>,
    exerciseContainer,
    accessExerciseButton.parentElement
  );
}

export function transformCodeExercise(serverAnswer) {
  const result = serverAnswer?.test_results?.passed;
  if (!result) return null;
  const [passed, total] = result.split("/");
  if (passed === total) return true;
  return null;
}
