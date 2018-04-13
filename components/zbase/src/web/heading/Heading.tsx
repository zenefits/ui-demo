import React, { HTMLAttributes, StatelessComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import withWebUtilProps, { ResultWebComponentProps } from '../withUtilPropsWeb';
import { removeUtilProps, IntlTextProps } from '../../commonTypes';

type HeadingAttrs = HTMLAttributes<HTMLHeadingElement>;
type LevelProps = {
  /**
   * The section level of the heading: `1` is the highest (most prominent) and `6` is the lowest.
   */
  level: number | string;
};
type HeadingAdditionalProps = LevelProps & IntlTextProps;

export type HeadingProps = ResultWebComponentProps<HeadingAttrs, HeadingAdditionalProps>;

const HeadingContainer: StatelessComponent<HeadingProps> = ({ level, textKey, textValues, ...rest }) => {
  let resultLevel = parseInt(level as string, 10);
  if (level < 1 || level > 6) {
    console.error('trying to render a Heading with level out of 1-6 range');
    resultLevel = 6;
  }

  if (rest.children) {
    return React.createElement(`h${resultLevel}`, removeUtilProps(rest), rest.children);
  }

  return (
    <FormattedMessage id={textKey} values={textValues}>
      {str => React.createElement(`h${resultLevel}`, removeUtilProps(rest), str)}
    </FormattedMessage>
  );
};

export default withWebUtilProps<HeadingAttrs, HeadingAdditionalProps>({
  displayName: 'Heading',
  defaultUtilProps: {
    m: 0,
  },
})(HeadingContainer);
