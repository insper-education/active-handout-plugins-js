import React, { useCallback, useState } from "react";
import Answer from "./components/Answer";
import { SubmitButton } from "./components/SubmitButton";
import { registerAnswer, renderExercise } from "./utils";

function SelfAssessedExercise({ answer, previouslyAnswered, submit }) {
  const [answered, setAnswered] = useState(previouslyAnswered);
  const handleClick = useCallback(() => {
    setAnswered(true);
    submit();
  }, [setAnswered, submit]);

  return (
    <>
      <SubmitButton onClick={handleClick} disabled={answered}>
        Marcar como feito
      </SubmitButton>
      {answer && <Answer data={answer} visible={answered} />}
    </>
  );
}

export function renderSelfAssessedExercise(
  exerciseContainer,
  { previousAnswer },
  answerData
) {
  const submit = () =>
    registerAnswer(
      exerciseContainer,
      1,
      {
        done: "true",
      },
      {},
      "true"
    );

  renderExercise(
    <SelfAssessedExercise
      answer={answerData}
      previouslyAnswered={!!previousAnswer}
      submit={submit}
    />,
    exerciseContainer
  );
}

export function transformSelfAssessedExercise(serverAnswer) {
  return serverAnswer?.test_results?.done;
}
