import React, { Component } from 'react';

import NumberInput, { NumberInputProps } from './NumberInput';

class PercentageInput extends Component<NumberInputProps> {
  render() {
    return <NumberInput suffix="%" {...this.props} />;
  }
}
export default PercentageInput;
