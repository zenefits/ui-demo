import React, { Component } from 'react';
// @ts-ignore
import { conformToMask } from 'react-text-mask';

import { ResponsiveUtilProp } from 'zbase';

import InputDisplay from '../input/InputDisplay';
import { InputSize } from '../input/inputTypes';
import { maskFunction } from './DigitInput';

export type DigitInputDisplayProps = {
  value: string;
  s?: InputSize;
  width?: ResponsiveUtilProp;
};

class DigitInputDisplay extends Component<DigitInputDisplayProps> {
  static defaultProps = {
    s: 'medium',
  };

  render() {
    const { value, s, width } = this.props;
    const conformedValue = value ? conformToMask(value, maskFunction(value), { guide: false }).conformedValue : value;
    return <InputDisplay s={s} width={width} value={conformedValue} />;
  }
}
export default DigitInputDisplay;
