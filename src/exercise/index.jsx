import { renderCodeExercise } from "./code-exercise";
import { renderCSSExercise } from "./css-exercises";
import { renderHandoutProgress } from "./handout-progress";
import { renderMultipleChoiceExercise } from "./multiple-choice";
import { renderSelfAssessedExercise } from "./self-assessed-exercise";
import { renderTextExercise } from "./text-question";
import {
  ExerciseType,
  extractAnswerData,
  getExerciseType,
  initExercise,
} from "./utils";

{
  const exercises = document.querySelectorAll(".admonition.exercise");

  if (exercises.length) {
    const slugs = [...exercises].map((admonition) => admonition.id);
    const mainContainer = document.querySelector(".md-sidebar__inner");
    renderHandoutProgress(mainContainer, slugs);
  }

  const renderFunctions = {
    [ExerciseType.TEXT]: renderTextExercise,
    [ExerciseType.CHOICE]: renderMultipleChoiceExercise,
    [ExerciseType.CSS]: renderCSSExercise,
    [ExerciseType.CODE]: renderCodeExercise,
    [ExerciseType.SELF]: renderSelfAssessedExercise,
  };

  exercises.forEach((exerciseContainer) => {
    const answerData = extractAnswerData(exerciseContainer);
    const exerciseData = initExercise(exerciseContainer);

    const render = renderFunctions[getExerciseType(exerciseContainer)];
    render(exerciseContainer, exerciseData, answerData);
  });
}
