import React, { Component } from 'react';

import NumberInput, { CommonMaskedInputProps } from '../number-input/NumberInput';
import { InputProps } from '../input/Input';

export type PercentageInputOnlyProps = CommonMaskedInputProps;

export type PercentageInputProps = PercentageInputOnlyProps &
  CommonMaskedInputProps &
  Omit<InputProps, keyof PercentageInputOnlyProps>;

class PercentageInput extends Component<PercentageInputProps> {
  render() {
    return <NumberInput suffix="%" {...this.props} />;
  }
}
export default PercentageInput;
