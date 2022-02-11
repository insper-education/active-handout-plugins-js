import React from "react";
import styled from "styled-components";

const ProgressContainer = styled.div`
  width: 100%;
  height: 1.5rem;
  background-color: #fafafa;
  border-radius: 0.2rem;
`;

const Progress = styled.div`
  display: flex;
  justify-content: ${({ disabled }) => (disabled ? "center" : "flex-end")};
  align-items: center;
  width: ${({ percentage }) => `${percentage}%`};
  min-width: min-content;
  height: 100%;
  background-color: ${({ disabled }) => (disabled ? "#f3f3f3c3" : "#27a5a2")};
  border-radius: 0.2rem;
  transition: width 0.5s;

  ::after {
    content: "${({ disabled, percentage }) =>
      disabled ? "N/A" : `${percentage}%`}";
    color: ${({ disabled }) => (disabled ? "#c3c3c3" : "#f3f3f3")};
    padding: 0 0.2rem;
  }
`;

function ProgressBar({ current, total }) {
  const percentage = total ? Math.round((100 * current) / total) : 0;
  return (
    <ProgressContainer>
      <Progress percentage={percentage} disabled={!total} />
    </ProgressContainer>
  );
}

export default ProgressBar;
