import React from 'react';
import { DateSource } from 'react-intl';

import { ResultWebComponentProps, TimeElProps } from '../withUtilPropsWeb';
import DateTimeText from '../date-time-text/DateTimeText';

type AdditionalProps = {
  /**
   * Date value to format.
   */
  value: DateSource;

  /**
   * Use long format? (eg Nov 18, 2017)
   * @default false
   */
  long?: boolean;
};

export type DateTextProps = ResultWebComponentProps<TimeElProps, AdditionalProps>;

/** Component for rendering formatted dates (no time). */
class DateText extends React.Component<DateTextProps> {
  render() {
    const { long, ...rest } = this.props;
    return (
      <DateTimeText
        {...rest}
        year={long ? 'numeric' : undefined}
        month={long ? 'short' : undefined}
        day={long ? 'numeric' : undefined}
      />
    );
  }
}

export default DateText;
