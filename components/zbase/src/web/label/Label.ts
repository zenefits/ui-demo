import { LabelHTMLAttributes } from 'react';

import { css } from 'z-frontend-theme';

import withWebUtilProps, { ResultWebComponentProps } from '../withUtilPropsWeb';
import { makeDummyComponentForDocs } from '../docsUtil';

type LabelAttrs = LabelHTMLAttributes<HTMLLabelElement>;

// TODO: i18n props
export type LabelProps = ResultWebComponentProps<LabelAttrs, {}>;

export const LabelForDocs = makeDummyComponentForDocs<LabelProps>();
LabelForDocs.displayName = 'Label';

export default withWebUtilProps<LabelAttrs, {}>({
  displayName: 'Label',
  additionalCss: css`
    display: flex;
    align-items: center;
  `,
  defaultUtilProps: {
    fontSize__deprecated__doNotUse: 1, // TODO: would prefer controls.m, but raises issues
    mb: 1,
  },
})('label');
