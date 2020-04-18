import React, { Component } from 'react';

import NumberInput, { CommonMaskedInputProps } from '../number-input/NumberInput';
import { InputProps } from '../input/Input';
import { getPrefixSuffixForCurrency } from './getPrefixSuffixForCurrency';

export type MoneyInputOnlyProps = CommonMaskedInputProps & { currency?: string };

export type MoneyInputProps = MoneyInputOnlyProps & Omit<InputProps, keyof MoneyInputOnlyProps>;

class MoneyInput extends Component<MoneyInputProps> {
  static defaultProps = {
    allowDecimal: true,
    currency: 'USD',
  };

  render() {
    const currencySymbol = getPrefixSuffixForCurrency(this.props.currency, this.props.value);
    return <NumberInput {...currencySymbol} {...this.props} />;
  }
}
export default MoneyInput;
