import { css } from 'z-frontend-theme';
import withWebUtilProps, { ResultWebComponentProps } from './withUtilPropsWeb';
import { TextareaHTMLAttributes } from 'react';

type TextareaAttrs = TextareaHTMLAttributes<HTMLTextAreaElement>;

export type TextareaProps = ResultWebComponentProps<TextareaAttrs>;

export default withWebUtilProps<TextareaAttrs>({
  displayName: 'Textarea',
  additionalCss: css`
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
    p: 1,
    m: 0,
    w: 1,
    color: 'inherit',
    bg: 'transparent',
  },
})('textarea');
