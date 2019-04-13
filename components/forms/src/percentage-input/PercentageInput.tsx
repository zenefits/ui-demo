import React, { Component } from 'react';

import NumberInput from '../number-input/NumberInput';
import { InputProps } from '../input/Input';

export interface PercentageInputProps extends InputProps {
  /** Whether or not to allow negative values. */
  allowNegative?: boolean;
  /** Whether or not to allow decimal values. */
  allowDecimal?: boolean;
  /** Maximum value that user should be able to enter. */
  integerLimit?: number | null;
}

class PercentageInput extends Component<PercentageInputProps> {
  render() {
    return <NumberInput suffix="%" {...this.props} />;
  }
}
export default PercentageInput;
