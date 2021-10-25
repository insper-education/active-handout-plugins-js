import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Choice from "../Choice";
import Answer from "../Answer";
import Button from "../../../components/Button";

const ChoiceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

function Quiz({ choices, answer, twoCols, studentAnswerIdx, submit }) {
  const [submitted, setSubmitted] = useState(!Number.isNaN(studentAnswerIdx));
  const [selectedChoice, setSelectedChoice] = useState(studentAnswerIdx);
  const hasSelectedChoice =
    !Number.isNaN(selectedChoice) && selectedChoice !== null;
  const handleChoiceSelected = useCallback(
    (idx) => setSelectedChoice((current) => (current === idx ? null : idx)),
    [setSelectedChoice]
  );

  const handleSubmit = useCallback(() => {
    if (!hasSelectedChoice || !submit) return;
    submit(selectedChoice, choices[selectedChoice].isAnswer).then(() =>
      setSubmitted(true)
    );
  }, [hasSelectedChoice, submit, selectedChoice, setSubmitted]);

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
            submitted={submitted}
          />
        ))}
      </ChoiceContainer>
      <ButtonContainer>
        <Button
          disabled={submitted || !hasSelectedChoice}
          onClick={handleSubmit}
        >
          Enviar
        </Button>
      </ButtonContainer>
      <Answer data={answer} visible={submitted} />
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
