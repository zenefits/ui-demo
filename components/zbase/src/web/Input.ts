import { InputHTMLAttributes } from 'react';

import { css } from 'z-frontend-theme';

import withWebUtilProps, { ResultWebComponentProps } from './withUtilPropsWeb';

type InputAttrs = InputHTMLAttributes<HTMLInputElement>;

export type InputProps = ResultWebComponentProps<InputAttrs>;

export default withWebUtilProps<InputAttrs>({
  displayName: 'Input',
  additionalCss: css`
    display: inline-block;
    vertical-align: middle;
    appearance: none;
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
