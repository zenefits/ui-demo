import React, { Component } from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
// @ts-ignore
import { conformToMask } from 'react-text-mask';

import { ResponsiveUtilProp } from 'zbase';

import InputDisplay from '../input/InputDisplay';
import { InputSize } from '../input/inputTypes';
import { MoneyInputOnlyProps } from './MoneyInput';
import { getPrefixSuffixForCurrency } from './getPrefixSuffixForCurrency';

export type MoneyInputDisplayProps = MoneyInputOnlyProps & {
  /** Monetary value to display like an input. */
  value: string | number;

  /**
   * Prefix before the formatted value.
   */
  prefix?: string;
  /**
   * suffix after the formatted value.
   */
  suffix?: string;

  s?: InputSize;
  width?: ResponsiveUtilProp;
  /**
   * Align text to right, eg for numeric values in a table.
   */
  textAlignRight?: boolean;
};

export default class MoneyInputDisplayWrapper extends Component<MoneyInputDisplayProps> {
  static defaultProps = {
    currency: 'USD',
  };

  render() {
    const { prefix, suffix } = getPrefixSuffixForCurrency(this.props.currency, this.props.value);
    return <MoneyInputDisplay prefix={prefix} suffix={suffix} {...this.props} />;
  }
}

class MoneyInputDisplay extends Component<MoneyInputDisplayProps> {
  static defaultProps = {
    s: 'medium',
    allowDecimal: true,
  };

  mask = (props: MoneyInputDisplayProps) =>
    createNumberMask({
      prefix: props.prefix,
      suffix: props.suffix,
      allowNegative: props.allowNegative,
      allowDecimal: props.allowDecimal,
      integerLimit: props.integerLimit,
    });

  render() {
    const { value, s, width, textAlignRight } = this.props;
    const valueUnspecified = value === undefined || value === null || value === '';
    const formatted = valueUnspecified ? value : conformToMask(String(value), this.mask(this.props)).conformedValue;
    return <InputDisplay s={s} width={width} value={formatted} textAlignRight={textAlignRight} />;
  }
}
