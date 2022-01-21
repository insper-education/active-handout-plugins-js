import React from "react";
import styled from "styled-components";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Percentage = styled.span`
  position: relative;
  display: block;
  font-size: 2rem;
  line-height: 1;
  color: #27a5a2;

  &:after {
    position: absolute;
    bottom: 0;
    content: "%";
    font-size: 1rem;
  }
`;

const Fraction = styled.span`
  display: block;
  font-size: 0.8rem;
  line-height: 1;
  text-align: center;
  color: #7f7f7f;
`;

function ProgressContent({ current, total }) {
  const percentage = (100 * current) / total;
  return (
    <div>
      <Percentage>{Math.round(percentage)}</Percentage>
      <Fraction>
        {current}/{total}
      </Fraction>
    </div>
  );
}

function CircularProgressBar({ current, total }) {
  if (!total) return null;

  const percentage = (100 * current) / total;
  return (
    <CircularProgressbarWithChildren
      value={percentage}
      styles={buildStyles({
        // Colors
        pathColor: "#27a5a2",
        textColor: "#27a5a2",
        trailColor: "#ffffff7f",
      })}
    >
      <ProgressContent current={current} total={total} />
    </CircularProgressbarWithChildren>
  );
}

export default CircularProgressBar;
