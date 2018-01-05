import React, { Component } from 'react';
import NumberInput, { NumberInputProps } from './NumberInput';

class MoneyInput extends Component<NumberInputProps> {
  render() {
    return <NumberInput prefix="$" {...this.props} />;
  }
}
export default MoneyInput;
