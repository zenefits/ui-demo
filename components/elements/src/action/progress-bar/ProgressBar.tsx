import { ProgressHTMLAttributes } from 'react';

import { css, getColor, ColorString } from 'z-frontend-theme';
import { withUtilProps } from 'zbase';

interface ProgressProps extends ProgressHTMLAttributes<HTMLProgressElement> {}

interface AdditionalProgressProps {
  /**
   * Defines the maximum or "done" value for a progress element.
   */
  max?: number | string;
  /**
   * Sets or gets the current value of a progress element.
   * The value must be a non-negative number between 0 and the max value.
   */
  value?: string | string[] | number;
}

type ProgressUtilProps = {
  bg: ColorString;
  color: ColorString;
};

const progressFirefoxStyles = css`
  background-color: ${(props: ProgressUtilProps) => getColor(props.bg)};
  min-width: 0;

  ::-moz-progress-bar {
    background-color: ${props => getColor(props.color)};
    border-radius: 100px;
  }
`;

const progressChromeStyles = css`
  ::-webkit-progress-value {
    background-color: ${(props: ProgressUtilProps) => getColor(props.color)};
    border-radius: 100px;
  }

  ::-webkit-progress-bar {
    background-color: ${props => getColor(props.bg)};
    border-radius: 100px;
  }
`;

const progressStyle = css`
  height: 8px;
  appearance: none;
  flex: 1 1 auto;
  border: none;
  border-radius: 100px;
  ${progressFirefoxStyles};
  ${progressChromeStyles};
`;

/** @component */
export default withUtilProps<ProgressProps, AdditionalProgressProps>({
  displayName: 'ProgressBar',
  defaultUtilProps: {
    bg: 'secondary.b',
    color: 'auxiliary.a',
  },
  additionalCss: progressStyle,
})('progress');
