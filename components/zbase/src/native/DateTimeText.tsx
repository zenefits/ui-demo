import React, { StatelessComponent } from 'react';
import { DateSource, FormattedDate } from 'react-intl';

import withWebUtilProps, { ResultNativeComponentProps } from './withUtilPropsNative';
import { removeUtilProps } from '../commonTypes';
import { Text, TextProps } from './Text';

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
// TODO: document these
type ExtendedDateFormat = {
  // localeMatcher?: 'lookup' | 'best fit';
  weekday?: 'narrow' | 'short' | 'long';
  era?: 'narrow' | 'short' | 'long';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'short' | 'long';
  formatMatcher?: 'basic' | 'best fit';
  hour12?: boolean;
  timeZone?: string;
};

type AdditionalProps = ExtendedDateFormat & {
  /**
   * Date value to format.
   */
  raw?: boolean;
  value: DateSource;
  format?: string;
};

export type DateTimeTextProps = ResultNativeComponentProps<TextProps, AdditionalProps>;

const TextContainer: StatelessComponent<DateTimeTextProps> = ({
  value,
  format,
  // localeMatcher,
  weekday,
  era,
  year,
  month,
  day,
  hour,
  minute,
  second,
  timeZoneName,
  formatMatcher,
  hour12,
  timeZone,
  raw,
  ...rest
}) => {
  const propsWithNoUtils = removeUtilProps(rest);
  return (
    <FormattedDate
      {...propsWithNoUtils}
      value={value}
      format={format}
      // localeMatcher={localeMatcher}
      weekday={weekday}
      era={era}
      year={year}
      month={month}
      day={day}
      hour={hour}
      minute={minute}
      second={second}
      timeZoneName={timeZoneName}
      formatMatcher={formatMatcher}
      hour12={hour12}
      timeZone={timeZone}
    >
      {(str: string) => (raw ? str : <Text {...propsWithNoUtils}>{str}</Text>)}
    </FormattedDate>
  );
};

export const DateTimeText = withWebUtilProps<TextProps, AdditionalProps>({
  displayName: 'DateTimeText',
})(TextContainer);
