import React, { Component } from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';

import withWebUtilProps, { ResultWebComponentProps, SpanProps } from '../withUtilPropsWeb';
import TextInline, { TextInlineTagProps, TextInlineUtilProps } from '../text-inline/TextInline';
import { TextCommonProps } from '../../commonTypes';
import { TextTransformProps } from '../types';

// from https://github.com/yahoo/react-intl/wiki/Components#formattedplural
type AdditionalProps = TextCommonProps &
  TextTransformProps &
  TextInlineTagProps & {
    /** Number used as a basis for determining pluralization. */
    count: number;

    /** Unique identifier of the message to find and display when count is exactly 0 (regardless of locale). */
    noneKey?: string;
    /**
     * Unique identifier of the message to find and display when count is 1 and the locale's language has a plural
     * category for single items.
     * */
    oneKey?: string;
    /** Unique identifier of the message to find and display when none of the other plural categories are matched. */
    otherKey?: string;

    /** Message to display when count is exactly 0 (regardless of locale). */
    none?: string; // this is non-standard, but common use case
    /** Message to display when count is 1 and the locale's language has a plural category for single items. */
    one?: string;
    /** Message to display when none of the other plural categories are matched. */
    other?: string;

    // NOTE: English has only "one" and "other" pluralization cases
    // http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html#en
    // it would add confusion to add the others now, so they're disabled until we need to support them
    // https://github.com/yahoo/react-intl/issues/473
    // zero?: string; // only certain languages have special zero case; should probably match `none`
    // two?: string;
    // few?: string;
    // many?: string;

    // pluralStyle?: 'cardinal' | 'ordinal';
    // eg 23rd birthday
    // not yet supported: uses different plural mappings
    // https://formatjs.io/guides/message-syntax/#selectordinal-format
  };

export type PluralTextProps = ResultWebComponentProps<SpanProps, AdditionalProps>;

class PluralText extends Component<PluralTextProps & { intl: InjectedIntl }> {
  render() {
    const { count, intl, none, one, other, noneKey, oneKey, otherKey, ...rest } = this.props;

    const pluralKey = count === 0 ? 'none' : intl.formatPlural(count);
    const defaultMessage = (this.props as any)[pluralKey]; // default is none, one, other etc.
    const isTextKeySpecified = noneKey || oneKey || otherKey;
    const textKey = isTextKeySpecified ? (this.props as any)[`${pluralKey}Key`] : 'unspecified';

    const messageDescriptor = {
      defaultMessage,
      id: textKey,
    };
    const formatted = intl.formatMessage(messageDescriptor, { count });
    return <TextInline {...rest}>{formatted}</TextInline>;
  }
}

const withIntl = injectIntl<PluralTextProps>(PluralText);

export default withWebUtilProps<SpanProps, AdditionalProps, TextInlineUtilProps>({
  displayName: 'PluralText',
  utilTypes: ['padding', 'font', 'color', 'bg'], // omit margin and width, which do not apply to inline elements
})(withIntl);
