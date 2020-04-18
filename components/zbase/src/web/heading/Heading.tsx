import React, { HTMLAttributes, StatelessComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { css } from 'z-frontend-theme';

import { makeDummyComponentForDocs } from '../docsUtil';

import withWebUtilProps, { ResultWebComponentProps } from '../withUtilPropsWeb';
import { removeUtilProps, IntlTextProps, TextAlignProps } from '../../commonTypes';
import { TextTransformProps } from '../types';

type HeadingAttrs = HTMLAttributes<HTMLHeadingElement>;

type AdditionalHeadingProps = IntlTextProps &
  TextAlignProps &
  TextTransformProps & {
    /**
     * The section level of the heading: `1` is the highest (most prominent) and `6` is the lowest.
     */
    level: number | string;
  };

export type HeadingProps = ResultWebComponentProps<HeadingAttrs, AdditionalHeadingProps>;

const HeadingContainer: StatelessComponent<HeadingProps> = ({ level, textKey, textValues, ...rest }) => {
  let resultLevel = parseInt(level as string, 10);
  if (level < 1 || level > 6) {
    console.error('trying to render a Heading with level out of 1-6 range');
    resultLevel = 6;
  }

  const remainingProps = removeUtilProps(rest);
  remainingProps.ref = rest.elementRef;
  if (rest.children) {
    return React.createElement(`h${resultLevel}`, remainingProps, rest.children);
  }

  return (
    <FormattedMessage id={textKey || ''} values={textValues}>
      {(str: string) => React.createElement(`h${resultLevel}`, remainingProps, str)}
    </FormattedMessage>
  );
};

export const HeadingForDocs = makeDummyComponentForDocs<HeadingProps>();
HeadingForDocs.displayName = 'Heading';

export default withWebUtilProps<HeadingAttrs, AdditionalHeadingProps>({
  displayName: 'Heading',
  additionalCss: css`
    :focus {
      outline: none;
    }
  `,
  additionalPropsMap: {
    textAlign: {
      cssName: 'text-align',
    },
    textTransform: {
      cssName: 'text-transform',
    },
  },
  defaultUtilProps: {
    m: 0,
  },
})(HeadingContainer);
