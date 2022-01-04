import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { registerAnswer, renderExercise } from "./utils";
import Answer from "./components/Answer";
import { SubmitButton } from "./components/SubmitButton";
import { ANSWER_FROM_SERVER } from "./events";

const SingleLinePrompt = styled.input.attrs({ type: "text " })`
  border-radius: 0.1rem;
  border: 1px solid #aeafae;
  padding: 0.5rem 0.5rem;
  margin-bottom: 4px;
  display: block;
  width: 100%;

  &:focus {
    border: 1px solid var(--md-primary-fg-color--light);
  }

  &:disabled {
    color: #aeafae;
  }
`;

const MultiLinePrompt = styled.textarea`
  border-radius: 0.1rem;
  border: 1px solid #aeafae;
  padding: 0.5rem 0.5rem;
  margin-bottom: 4px;
  display: block;
  width: 100%;
  height: 200px;

  &:focus {
    outline: none;
    border: 1px solid var(--md-primary-fg-color--light);
  }

  &:disabled {
    color: #aeafae;
  }
`;

const TextQuestion = ({
  exerciseSlug,
  answer,
  studentAnswer,
  isMultiLine,
  submit,
}) => {
  const [answered, setAnswered] = useState(!!studentAnswer);
  const [currentAnswer, setCurrentAnswer] = useState(studentAnswer);

  const handleSubmit = useCallback(() => {
    setAnswered(true);
    if (!!submit) submit(currentAnswer);
  }, [currentAnswer, setAnswered, submit]);

  const handleChange = useCallback(
    (event) => {
      const el = event.target;
      setCurrentAnswer(el.value);
    },
    [setCurrentAnswer]
  );

  const handleAnswerFromServer = useCallback(
    (e) => {
      if (e.detail.slug !== exerciseSlug) {
        return;
      }

      setAnswered(true);
      setCurrentAnswer(e.detail.answer);
    },
    [setAnswered, setCurrentAnswer]
  );
  useEffect(() => {
    window.addEventListener(ANSWER_FROM_SERVER, handleAnswerFromServer);
    return () => {
      window.removeEventListener(ANSWER_FROM_SERVER, handleAnswerFromServer);
    };
  }, []);

  return (
    <>
      {!isMultiLine && (
        <SingleLinePrompt
          onChange={handleChange}
          disabled={answered}
          value={currentAnswer}
        />
      )}
      {isMultiLine && (
        <MultiLinePrompt
          onChange={handleChange}
          disabled={answered}
          value={currentAnswer}
        />
      )}
      <SubmitButton onClick={handleSubmit} disabled={answered}>
        Enviar
      </SubmitButton>
      <Answer data={answer} visible={answered} />
    </>
  );
};

export function renderTextExercise(
  textQuestionContainer,
  { previousAnswer },
  answerData
) {
  const submit = (answer) => {
    registerAnswer(
      textQuestionContainer,
      1,
      {
        text: answer,
      },
      {},
      answer
    );
  };

  renderExercise(
    <TextQuestion
      exerciseSlug={textQuestionContainer.id}
      answer={answerData}
      isMultiLine={textQuestionContainer.classList.contains("long")}
      studentAnswer={previousAnswer}
      submit={submit}
    />,
    textQuestionContainer
  );
}

export function transformTextExercise(serverAnswer) {
  return serverAnswer?.test_results?.text;
}
