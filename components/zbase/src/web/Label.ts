import { LabelHTMLAttributes } from 'react';

import { css } from 'z-frontend-theme';

import withWebUtilProps, { ResultWebComponentProps } from './withUtilPropsWeb';

type LabelAttrs = LabelHTMLAttributes<HTMLLabelElement>;

export type LabelProps = ResultWebComponentProps<LabelAttrs, {}>;

export default withWebUtilProps<LabelAttrs, {}>({
  displayName: 'Label',
  additionalCss: css`
    display: flex;
    align-items: center;
  `,
  defaultUtilProps: {
    fontSize__deprecated__doNotUse: 1,
    mb: 1,
  },
})('label');
