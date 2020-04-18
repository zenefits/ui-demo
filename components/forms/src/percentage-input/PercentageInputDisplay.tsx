import React, { Component } from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
// @ts-ignore
import { conformToMask } from 'react-text-mask';

import { ResponsiveUtilProp } from 'zbase';

import InputDisplay from '../input/InputDisplay';
import { InputSize } from '../input/inputTypes';
import { PercentageInputOnlyProps } from './PercentageInput';

export type PercentageInputDisplayProps = PercentageInputOnlyProps & {
  /** Percentage value to display like an input. */
  value: string | number;

  /**
   * Suffix after the formatted value.
   * @default %
   */
  suffix?: string;

  s?: InputSize;
  width?: ResponsiveUtilProp;
};

class PercentageInputDisplay extends Component<PercentageInputDisplayProps> {
  mask: Function;

  static defaultProps = {
    s: 'medium',
    suffix: '%',
    allowDecimal: true,
  };

  constructor(props: PercentageInputDisplayProps) {
    super(props);
    this.mask = createNumberMask({
      prefix: '',
      suffix: props.suffix,
      allowNegative: props.allowNegative,
      integerLimit: props.integerLimit,
      allowDecimal: props.allowDecimal,
    });
  }

  render() {
    const { value, s, width } = this.props;
    const valueUnspecified = value === undefined || value === null || value === '';
    const formatted = valueUnspecified ? value : conformToMask(String(value), this.mask).conformedValue;
    return <InputDisplay s={s} width={width} value={formatted} />;
  }
}
export default PercentageInputDisplay;
