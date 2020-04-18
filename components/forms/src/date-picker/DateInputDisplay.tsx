import React, { Component } from 'react';
// @ts-ignore
import { formatDate } from 'react-day-picker/moment';

import { ResponsiveUtilProp } from 'zbase';

import InputDisplay from '../input/InputDisplay';
import { InputSize } from '../input/inputTypes';

export type DateInputDisplayProps = {
  /** Date value to display like an input. */
  value: string;

  s?: InputSize;
  width?: ResponsiveUtilProp;
};

class DateInputDisplay extends Component<DateInputDisplayProps> {
  static defaultProps = {
    s: 'medium',
  };

  render() {
    const { value, s, width } = this.props;
    const formatted = value && formatDate(value);
    return <InputDisplay s={s} width={width} value={formatted} />;
  }
}
export default DateInputDisplay;
