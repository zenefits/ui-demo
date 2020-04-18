import React from 'react';

import { keyframes, styled } from 'z-frontend-theme';
import { color, fontStyles } from 'z-frontend-theme/utils';

declare type CircularProgressProps = {
  percent?: number;
  radius?: number;
  text?: string;
};

declare type StyledCircleProps = {
  circumference: number;
  progress: number;
};

const rotate = (props: StyledCircleProps) => keyframes`
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: ${props.progress};
  }
`;

// stroke-dashoffset: ${props => props.progress};
const StyledCircle = styled.div<StyledCircleProps>`
  .CircularProgress__baseCircle {
    stroke: ${color('grayscale.f')};
  }
  .CircularProgress__progress {
    /* axis compensation */
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    stroke: ${color('primary.a')};
    stroke-dasharray: ${props => props.circumference} ${props => props.circumference};
    animation: ${rotate} 0.5s 1s linear forwards;
  }
  text {
    fill: ${color('primary.a')};
    ${fontStyles('controls.s')};
  }
`;

const CircularProgress = ({ percent = 1, radius = 16, text }: CircularProgressProps) => {
  const circumference = radius * 2 * Math.PI;
  const progress = (circumference - percent * circumference) * -1;
  const textValue = text !== undefined ? text : `${percent * 100}%`;
  const strokeWidth = 2;
  const height = radius * 2 + strokeWidth;
  return (
    <StyledCircle progress={progress} circumference={circumference}>
      <svg height={height} width={height}>
        <circle
          className="CircularProgress__baseCircle"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
        />
        <circle
          className="CircularProgress__progress"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
          {textValue}
        </text>
      </svg>
    </StyledCircle>
  );
};

export default CircularProgress;
