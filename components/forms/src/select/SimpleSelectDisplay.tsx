import React, { Component, HTMLAttributes } from 'react';
import { isNil } from 'lodash';

import { ResponsiveUtilProp } from 'zbase';

import InputDisplay from '../input/InputDisplay';
import { InputSize } from '../input/inputTypes';

export type SimpleSelectDisplayProps = {
  /** Value to display like a select. */
  value: string | object;

  /**
   * Function to get text label for option
   * @default
   * (option: string) => option
   * */
  getOptionText?: (option: any) => string;

  s?: InputSize;
  width?: ResponsiveUtilProp;
} & HTMLAttributes<HTMLDivElement>;

class SimpleSelectDisplay extends Component<SimpleSelectDisplayProps> {
  static defaultProps = {
    s: 'medium',
    getOptionText: (option: string) => option,
  };

  render() {
    const { value, getOptionText, s, width } = this.props;
    const isValueSpecified = (value as any) !== '' && !isNil(value); // allow 0
    const formattedValue = getOptionText && isValueSpecified ? getOptionText(value) : (value as string);
    return <InputDisplay s={s} width={width} value={formattedValue} />;
  }
}

export default SimpleSelectDisplay;
