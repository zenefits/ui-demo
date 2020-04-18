import React, { Component } from 'react';
// @ts-ignore
import { formatDate } from 'react-day-picker/moment';

import { ResponsiveUtilProp } from 'zbase';

import InputDisplay from '../input/InputDisplay';
import { InputSize } from '../input/inputTypes';

export type TimeInputDisplayProps = {
  /** Time value to display like an input. */
  value: string;

  s?: InputSize;
  width?: ResponsiveUtilProp;
};

class TimeInputDisplay extends Component<TimeInputDisplayProps> {
  static defaultProps = {
    s: 'medium',
  };

  render() {
    const { value, s, width } = this.props;
    return <InputDisplay s={s} width={width} value={value} />;
  }
}
export default TimeInputDisplay;
