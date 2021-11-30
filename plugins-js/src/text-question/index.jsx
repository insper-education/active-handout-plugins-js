import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import report from "../report";
import Button from "../components/Button";
import notification from "../notification";


const OneLinePrompt = styled.input.attrs({ type: "text " })`
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

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const TextQuestion = ({ studentAnswer, submit }) => {
  const [answered, setAnswered] = useState(!!studentAnswer);
  const [currentAnswer, setCurrentAnswer] = useState(studentAnswer);

  const handleSubmit = () => {
    setAnswered(true);
    if (!!submit) submit(currentAnswer);
  }

  const handleChange = (event) => {
    const el = event.target;
    setCurrentAnswer(el.value);
  }

  return (
    <div>
      <OneLinePrompt onChange={handleChange} disabled={answered} value={studentAnswer} />
      <ButtonContainer>
        <Button onClick={handleSubmit} disabled={answered}>Enviar</Button>
      </ButtonContainer>
    </div>
  )
}

{
  const textQuestions = document.querySelectorAll(".admonition.question.short");
  const documentAddr = document.location.pathname;

  textQuestions.forEach((item, k) => {
    const answerPanel = item.querySelector(".details");
    if (!answerPanel) return;
    answerPanel.remove();
    item.dataset.answered = false;

    let storageKey = documentAddr + "/" + item.id;
    let previousAnswer = localStorage.getItem(storageKey);

    const submitTextQuestion = (answer) => {
      return report.sendAnswer(
        item.id,
        1,
        {
          text: answer
        }, {})
        .finally(() => {
          item.dataset.answered = true;
          localStorage[storageKey] = answer;
          item.appendChild(answerPanel);
        });
    };

    let root = document.createElement('div');
    ReactDOM.render(
      <TextQuestion studentAnswer={previousAnswer} submit={submitTextQuestion} />,
      root
    );
    item.appendChild(root);

    if (previousAnswer) {
      item.dataset.answered = true;
      item.appendChild(answerPanel);
    }

  });
}