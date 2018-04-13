import React, { HTMLAttributes, StatelessComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import withWebUtilProps, { ResultWebComponentProps } from '../withUtilPropsWeb';
import { removeUtilProps, IntlTextProps } from '../../commonTypes';

type ParagraphHtmlProps = HTMLAttributes<HTMLParagraphElement>;
type AdditionalTextProps = IntlTextProps & {
  bold?: boolean;
  // align?: 'left' | 'right' | 'center' | 'justify';
};

export type ParagraphProps = ResultWebComponentProps<ParagraphHtmlProps, AdditionalTextProps>;

const TextContainer: StatelessComponent<ParagraphProps> = ({ textKey, textValues, ...rest }) => {
  if (textKey) {
    return (
      <FormattedMessage id={textKey} values={textValues}>
        {str => <p {...removeUtilProps(rest)}>{str}</p>}
      </FormattedMessage>
    );
  }
  return <p {...removeUtilProps(rest)}>{rest.children}</p>;
};

export default withWebUtilProps<ParagraphHtmlProps, AdditionalTextProps>({
  displayName: 'P',
  additionalPropsMap: {
    // align: {
    //   cssName: 'text-align',
    // },
    bold: {
      cssName: 'font-weight',
      valueHelper: (propValue: boolean, props) => (propValue ? props.theme.weights[1] : null),
    },
  },
  defaultUtilProps: {
    m: 0,
    fontStyle: 'paragraphs.m',
  },
})(TextContainer);
