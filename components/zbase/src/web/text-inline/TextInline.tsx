import React, { StatelessComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import withWebUtilProps, { ResultWebComponentProps, SpanProps } from '../withUtilPropsWeb';
import { removeUtilProps, IntlTextProps, TextCommonProps } from '../../commonTypes';
import { TextTransformProps, UtilTypeBg, UtilTypeColor, UtilTypeFont, UtilTypePadding } from '../types';
import { makeDummyComponentForDocs } from '../docsUtil';

export interface TextInlineTagProps {
  /**
   * Customized HTML tag to render
   * @default span
   * */
  tag?: 'abbr' | 'small' | 'strong'; // NOTE: only inline elements
}

type AdditionalTextProps = IntlTextProps & TextCommonProps & TextTransformProps & TextInlineTagProps;

export type TextInlineProps = ResultWebComponentProps<SpanProps, AdditionalTextProps>;

const VariableTagTextContainer: StatelessComponent<TextInlineProps> = ({
  textKey,
  textValues,
  textDefault,
  tag,
  ...rest
}) => {
  const ResultTag = tag || 'span';
  const remainingProps = removeUtilProps(rest);
  remainingProps.ref = rest.elementRef;
  if (textKey) {
    return (
      <FormattedMessage id={textKey} values={textValues} defaultMessage={textDefault}>
        {(str: string) => <ResultTag {...remainingProps}>{str}</ResultTag>}
      </FormattedMessage>
    );
  }
  return <ResultTag {...remainingProps}>{rest.children}</ResultTag>;
};

export type TextInlineUtilProps = UtilTypePadding & UtilTypeFont & UtilTypeColor & UtilTypeBg;

export const TextInlineForDocs = makeDummyComponentForDocs<TextInlineProps>();
TextInlineForDocs.displayName = 'TextInline';

export default withWebUtilProps<SpanProps, AdditionalTextProps, TextInlineUtilProps>({
  displayName: 'TextInline',
  additionalPropsMap: {
    bold: {
      cssName: 'font-weight',
      valueHelper: (propValue: boolean, props) => (propValue ? props.theme.weights[1] : null),
    },
    textTransform: {
      cssName: 'text-transform',
    },
    whiteSpace: { cssName: 'white-space' },
    wordBreak: { cssName: 'word-break' },
  },
  utilTypes: ['padding', 'font', 'color', 'bg'], // omit margin and width, which do not apply to inline elements
})(VariableTagTextContainer);
