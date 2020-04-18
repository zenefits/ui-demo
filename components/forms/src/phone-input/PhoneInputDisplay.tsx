import React, { Component } from 'react';
// @ts-ignore
import { formatDate } from 'react-day-picker/moment';
// @ts-ignore
import { conformToMask } from 'react-text-mask';

import { ResponsiveUtilProp } from 'zbase';

import InputDisplay from '../input/InputDisplay';
import { InputSize } from '../input/inputTypes';
import { createPhoneMask, PhoneInputOnlyProps } from './PhoneInput';

export type PhoneInputDisplayProps = PhoneInputOnlyProps & {
  /** Phone value to display like an input. */
  value: string;

  s?: InputSize;
  width?: ResponsiveUtilProp;
};

class PhoneInputDisplay extends Component<PhoneInputDisplayProps> {
  mask: Function | any[];

  static defaultProps = {
    s: 'medium',
    allowInternational: false,
  };

  constructor(props: PhoneInputDisplayProps) {
    super(props);
    this.mask = createPhoneMask(props.allowInternational);
  }

  render() {
    const { value, s, width } = this.props;
    const formatted = value ? conformToMask(value, this.mask, { guide: false }).conformedValue : value;
    return <InputDisplay s={s} width={width} value={formatted} />;
  }
}
export default PhoneInputDisplay;
