import React, { Component } from 'react';

import { InputProps } from '../input/Input';
import MaskedInput from '../masked-input/MaskedInput';

export type DigitInputProps = InputProps;

/**
 * This component is a text input that only accepts numerical digits 0-9.
 * It is useful to input things like account numbers with leading zeros, e.g. '000123456'.
 */
export default class DigitInput extends Component<DigitInputProps> {
  render() {
    return <MaskedInput {...this.props} mask={maskFunction} />;
  }
}

export function maskFunction(rawValue: string) {
  return rawValue.split('').map(() => /\d/);
}
