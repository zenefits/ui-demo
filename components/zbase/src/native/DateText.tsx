import React, { Component } from 'react';
import { DateSource } from 'react-intl';

import { ResultNativeComponentProps } from './withUtilPropsNative';
import { DateTimeText, DateTimeTextProps } from './DateTimeText';

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

export type DateTextProps = ResultNativeComponentProps<DateTimeTextProps, AdditionalProps>;

/** Component for rendering formatted dates (no time). */
export class DateText extends Component<DateTextProps> {
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
