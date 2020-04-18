import React, { Component } from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
// @ts-ignore
import { conformToMask } from 'react-text-mask';

import { ResponsiveUtilProp } from 'zbase';

import InputDisplay from '../input/InputDisplay';
import { InputSize } from '../input/inputTypes';
import { NumberInputOnlyProps } from './NumberInput';

export type NumberInputDisplayProps = NumberInputOnlyProps & {
  /** Numeric value to display like an input. */
  value: string | number;

  s?: InputSize;
  width?: ResponsiveUtilProp;
  /**
   * Align text to right, eg for numeric values in a table.
   */
  textAlignRight?: boolean;
};

class NumberInputDisplay extends Component<NumberInputDisplayProps> {
  mask: Function;

  static defaultProps = {
    s: 'medium',
    prefix: '',
    suffix: '',
    allowDecimal: true,
  };

  constructor(props: NumberInputDisplayProps) {
    super(props);
    this.mask = createNumberMask({
      suffix: props.suffix,
      prefix: props.prefix,
      allowNegative: props.allowNegative,
      integerLimit: props.integerLimit,
      allowDecimal: props.allowDecimal,
      includeThousandsSeparator: props.includeThousandsSeparator,
    });
  }

  render() {
    const { value, s, width, textAlignRight } = this.props;
    const valueUnspecified = value === undefined || value === null || value === '';
    const formatted = valueUnspecified ? value : conformToMask(String(value), this.mask).conformedValue;
    return <InputDisplay s={s} width={width} textAlignRight={textAlignRight} value={formatted} />;
  }
}
export default NumberInputDisplay;
