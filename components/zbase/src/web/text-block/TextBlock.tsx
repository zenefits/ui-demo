import React, { Component, ComponentClass } from 'react';
import { FormattedMessage } from 'react-intl';

import withWebUtilProps, { DivProps, ResultWebComponentProps } from '../withUtilPropsWeb';
import { removeUtilProps, IntlTextProps, TextAlignProps, TextCommonProps } from '../../commonTypes';
import { TextTransformProps } from '../types';

type AdditionalTextProps = IntlTextProps &
  TextAlignProps &
  TextCommonProps &
  TextTransformProps & {
    /**
     * Customized HTML tag to render
     * @default div
     * */
    tag?: 'p' | 'pre' | 'blockquote' | 'legend'; // NOTE: only block elements
    /** Whether to restrict content by width and show … */
    ellipsis?: boolean;
  };

export type TextBlockProps = ResultWebComponentProps<DivProps, AdditionalTextProps>;

class VariableTagTextContainer extends Component<TextBlockProps> {
  render() {
    const { textKey, textValues, textDefault, tag, ...rest } = this.props;
    const resultTag = tag || 'div';
    const remainingProps = removeUtilProps(rest);
    remainingProps.ref = rest.elementRef;
    if (textKey) {
      return (
        <FormattedMessage id={textKey} values={textValues} defaultMessage={textDefault}>
          {(str: string) => React.createElement(resultTag, remainingProps, str)}
        </FormattedMessage>
      );
    }
    return React.createElement(resultTag, remainingProps, rest.children);
  }
}

export default withWebUtilProps<DivProps, AdditionalTextProps>({
  displayName: 'TextBlock',
  additionalPropsMap: {
    ellipsis: (propValue, props) => propValue && 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;',
    textAlign: { cssName: 'text-align' },
    textTransform: { cssName: 'text-transform' },
    bold: {
      cssName: 'font-weight',
      valueHelper: (propValue: boolean, props) => (propValue ? props.theme.weights[1] : null),
    },
    whiteSpace: { cssName: 'white-space' },
    wordBreak: { cssName: 'word-break' },
  },
  defaultUtilProps: {
    fontStyle: 'paragraphs.m',
  },
})(VariableTagTextContainer as ComponentClass<TextBlockProps>);
