import { TextareaHTMLAttributes } from 'react';

import { css } from 'z-frontend-theme';

import withWebUtilProps, { ResultWebComponentProps } from './withUtilPropsWeb';

type TextareaAttrs = TextareaHTMLAttributes<HTMLTextAreaElement>;

export type TextareaProps = ResultWebComponentProps<TextareaAttrs>;

export default withWebUtilProps<TextareaAttrs>({
  displayName: 'Textarea',
  additionalCss: css`
    display: inline-block;
    vertical-align: middle;
    appearance: none;
  `,
  defaultUtilProps: {
    p: 1,
    m: 0,
    w: 1,
    color: 'inherit',
    bg: 'transparent',
  },
})('textarea');
