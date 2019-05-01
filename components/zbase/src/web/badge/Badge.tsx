import React, { StatelessComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { css } from 'z-frontend-theme';
import { radius } from 'z-frontend-theme/utils';

import withWebUtilProps, { ResultWebComponentProps, SpanProps } from '../withUtilPropsWeb';
import { removeUtilProps, IntlTextProps } from '../../commonTypes';

// define badge contexts like warning, success, etc? (so client need not choose colors)
type AdditionalBadgeProps = IntlTextProps;

export type BadgeProps = ResultWebComponentProps<SpanProps, AdditionalBadgeProps>;

const BadgeContainer: StatelessComponent<BadgeProps> = ({ textKey, textValues, textDefault, ...rest }) => {
  if (textKey) {
    return (
      <FormattedMessage id={textKey} values={textValues} defaultMessage={textDefault}>
        {(str: string) => <span {...removeUtilProps(rest)}>{str}</span>}
      </FormattedMessage>
    );
  }
  return <span {...removeUtilProps(rest)}>{rest.children}</span>;
};

export default withWebUtilProps<SpanProps, AdditionalBadgeProps>({
  displayName: 'Badge',
  defaultUtilProps: {
    p: 1, // better would be scaling with font size, eg '0.25em 0.4em'
    mx: 1,
    color: 'grayscale.white',
    bg: 'affirmation.b',
  },
  additionalCss: css`
    display: inline-block;
    vertical-align: middle;
    border-radius: ${radius()};
  `,
})(BadgeContainer);
