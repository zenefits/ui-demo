import React, { StatelessComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import withWebUtilProps, { ResultWebComponentProps, SpanProps } from '../withUtilPropsWeb';
import { removeUtilProps, IntlTextProps } from '../../commonTypes';
import { UtilTypeBg, UtilTypeColor, UtilTypeFont, UtilTypePadding } from '../types';

type AdditionalTextProps = IntlTextProps & {
  bold?: boolean;
};

export type TextProps = ResultWebComponentProps<SpanProps, AdditionalTextProps>;

const TextContainer: StatelessComponent<TextProps> = ({ textKey, textValues, textDefault, ...rest }) => {
  if (textKey) {
    return (
      <FormattedMessage id={textKey} values={textValues} defaultMessage={textDefault}>
        {str => <span {...removeUtilProps(rest)}>{str}</span>}
      </FormattedMessage>
    );
  }
  return <span {...removeUtilProps(rest)}>{rest.children}</span>;
};

export default withWebUtilProps<
  SpanProps,
  AdditionalTextProps,
  UtilTypePadding & UtilTypeFont & UtilTypeColor & UtilTypeBg
>({
  displayName: 'Text',
  additionalPropsMap: {
    bold: {
      cssName: 'font-weight',
      valueHelper: (propValue: boolean, props) => (propValue ? props.theme.weights[1] : null),
    },
  },
  utilTypes: ['padding', 'font', 'color', 'bg'], // omit margin and width, which do not apply to inline elements
})(TextContainer);
