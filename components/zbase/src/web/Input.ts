import { css } from 'z-frontend-theme';
import withWebUtilProps, { ResultWebComponentProps } from './withUtilPropsWeb';
import { InputHTMLAttributes } from 'react';

type InputAttrs = InputHTMLAttributes<HTMLInputElement>;

export type InputProps = ResultWebComponentProps<InputAttrs>;

export default withWebUtilProps<InputAttrs>({
  displayName: 'Input',
  additionalCss: css`
    display: inline-block;
    vertical-align: middle;
    appearance: none;

    &:focus {
      outline: none;
      box-shadow: inset 0 0 0 1px blue;
    }

    &:disabled {
      opacity: 0.25;
    }
  `,
  defaultUtilProps: {
    type: 'text',
    p: 1,
    m: 0,
    w: 1,
    color: 'inherit',
    bg: 'transparent',
  },
})('input');
