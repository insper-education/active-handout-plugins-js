import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Choice from "../Choice";
import Answer from "../Answer";
import { SubmitButton } from "../SubmitButton";
import { ANSWER_FROM_SERVER } from "../../events";

const ChoiceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

function Quiz({
  exerciseSlug,
  choices,
  answer,
  twoCols,
  studentAnswerIdx,
  submit,
}) {
  const [answered, setAnswered] = useState(!Number.isNaN(studentAnswerIdx));
  const [selectedChoice, setSelectedChoice] = useState(studentAnswerIdx);
  const hasSelectedChoice =
    !Number.isNaN(selectedChoice) && selectedChoice !== null;
  const handleChoiceSelected = useCallback(
    (idx) => setSelectedChoice((current) => (current === idx ? null : idx)),
    [setSelectedChoice]
  );

  const handleAnswerFromServer = useCallback((e) => {
    if (e.detail.slug !== exerciseSlug) {
      return;
    }

    setAnswered(true);
    setSelectedChoice(e.detail.answer);
  }, []);
  useEffect(() => {
    window.addEventListener(ANSWER_FROM_SERVER, handleAnswerFromServer);
    return () => {
      window.removeEventListener(ANSWER_FROM_SERVER, handleAnswerFromServer);
    };
  }, []);

  const handleSubmit = useCallback(() => {
    if (!hasSelectedChoice || !submit) return;
    submit(selectedChoice, choices[selectedChoice].isAnswer).finally(() =>
      setAnswered(true)
    );
  }, [hasSelectedChoice, submit, selectedChoice, setAnswered]);

  return (
    <>
      <ChoiceContainer>
        {choices.map((choice, idx) => (
          <Choice
            key={`choice__${idx}`}
            idx={idx}
            choiceData={choice}
            onSelected={handleChoiceSelected}
            isSelected={idx === selectedChoice}
            halfWidth={twoCols}
            submitted={answered}
          />
        ))}
      </ChoiceContainer>
      <SubmitButton
        disabled={answered || !hasSelectedChoice}
        onClick={handleSubmit}
      >
        Enviar
      </SubmitButton>
      <Answer data={answer} visible={answered} />
    </>
  );
}

Quiz.propTypes = {
  choices: PropTypes.array.isRequired,
  answer: PropTypes.object.isRequired,
  twoCols: PropTypes.bool,
  studentAnswerIdx: PropTypes.number,
  submit: PropTypes.func,
};

Quiz.defaultProps = {
  twoCols: false,
};

export default Quiz;
