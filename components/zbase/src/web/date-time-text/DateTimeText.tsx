import React, { StatelessComponent } from 'react';
import { DateSource, FormattedDate } from 'react-intl';

import withWebUtilProps, { ResultWebComponentProps, TimeElProps } from '../withUtilPropsWeb';
import { removeUtilProps } from '../../commonTypes';
import TimeTag from '../time-tag/TimeTag';
import { makeDummyComponentForDocs } from '../docsUtil';

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
  value: DateSource;
  format?: string;
};

export type DateTimeTextProps = ResultWebComponentProps<TimeElProps, AdditionalProps>;

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
      {(str: string) => (
        <TimeTag {...propsWithNoUtils} value={value}>
          {str}
        </TimeTag>
      )}
    </FormattedDate>
  );
};

export const DateTimeTextForDocs = makeDummyComponentForDocs<DateTimeTextProps>();
DateTimeTextForDocs.displayName = 'DateTimeText';

export default withWebUtilProps<TimeElProps, AdditionalProps>({
  displayName: 'DateTimeText',
})(TextContainer);
