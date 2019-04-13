import React, { AnchorHTMLAttributes, StatelessComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import withWebUtilProps, { ResultWebComponentProps } from './withUtilPropsWeb';
import { removeUtilProps, IntlTextProps } from '../commonTypes';

type AnchorAttrs = AnchorHTMLAttributes<HTMLAnchorElement>;
type AdditionalAnchorProps = IntlTextProps;

export type AnchorProps = ResultWebComponentProps<AnchorAttrs, AdditionalAnchorProps>;

const AContainer: StatelessComponent<AnchorProps> = ({ textKey, textValues, textDefault, ...rest }) => {
  if (textKey) {
    return (
      <FormattedMessage id={textKey} values={textValues} defaultMessage={textDefault}>
        {(str: string) => <a {...removeUtilProps(rest)}>{str}</a>}
      </FormattedMessage>
    );
  }
  return <a {...removeUtilProps(rest)}>{rest.children}</a>;
};

export default withWebUtilProps<AnchorAttrs, AdditionalAnchorProps>({
  displayName: 'A',
})(AContainer);
