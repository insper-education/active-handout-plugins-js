import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Check from "../../../components/icons/Check";
import Close from "../../../components/icons/Close";

const ChoiceDiv = styled.div`
  display: flex;
  margin: 0.5rem 0;
  border-radius: 0.1rem;
  border: 1px solid var(--md-primary-fg-color--light);
  width: 100%;

  ${({ isSelected, submitted, isAnswer }) => {
    let width = "1px";
    let borderColor = "var(--md-primary-fg-color--light)";
    let cursor = "cursor: pointer";
    let hover = "border: 1px solid var(--md-primary-fg-color)";

    if (submitted) {
      cursor = "cursor: default";
    }

    if (submitted || isSelected) hover = "";

    if (isSelected) {
      width = "2px";
      if (submitted) {
        borderColor = isAnswer ? "#00c853" : "#ff5252";
      } else {
        borderColor = "var(--md-primary-fg-color)";
      }
    } else if (submitted) borderColor = "#dedfde";

    return `
      border: ${width} solid ${borderColor};
      ${cursor};

      :hover {
        ${hover};
      }
    `;
  }}

  ${({ halfWidth }) =>
    halfWidth &&
    `
    @media (min-width:481px) {
      width: calc(50% - 0.5rem)
    }
    `}
`;

const ChoiceLabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  padding: 0.5rem;
  color: var(--md-primary-bg-color);

  ${({ isSelected, submitted, isAnswer }) => {
    let backgroundColor = "var(--md-primary-fg-color--light)";

    if (isSelected) {
      if (submitted) {
        backgroundColor = isAnswer ? "#00c853" : "#ff5252";
      } else {
        backgroundColor = "var(--md-primary-fg-color)";
      }
    } else if (submitted) {
      backgroundColor = isAnswer ? "#00c853" : "#dedfde";
    }

    return `
      background-color: ${backgroundColor};
    `;
  }}
`;

const ChoiceLabel = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1.5rem;
`;

const ChoiceContent = styled.div`
  flex-grow: 1;
  align-self: center;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
`;

function Choice({
  choiceData,
  onSelected,
  isSelected,
  idx,
  halfWidth,
  submitted,
}) {
  const handleClick = useCallback(() => {
    if (submitted) return;
    onSelected && onSelected(idx);
  }, [onSelected, idx, submitted]);

  let label = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[idx % 26];
  if (submitted) {
    if (choiceData.isAnswer) label = <Check />;
    else if (isSelected) label = <Close />;
  }

  return (
    <ChoiceDiv
      onClick={handleClick}
      isSelected={isSelected}
      halfWidth={halfWidth}
      submitted={submitted}
      isAnswer={choiceData.isAnswer}
    >
      <ChoiceLabelContainer
        isSelected={isSelected}
        submitted={submitted}
        isAnswer={choiceData.isAnswer}
        disabled={!submitted}
      >
        <ChoiceLabel>{label}</ChoiceLabel>
      </ChoiceLabelContainer>
      <ChoiceContent dangerouslySetInnerHTML={choiceData.innerHTML} />
    </ChoiceDiv>
  );
}

Choice.propTypes = {
  choiceData: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  onSelected: PropTypes.func,
  isSelected: PropTypes.bool,
  halfWidth: PropTypes.bool,
  submitted: PropTypes.bool,
};

Choice.defaultProps = {
  isSelected: false,
  halfWidth: false,
  submitted: false,
};

export default Choice;
