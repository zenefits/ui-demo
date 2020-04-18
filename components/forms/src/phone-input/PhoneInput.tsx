import React, { Component } from 'react';
import { range } from 'lodash';

import { InputProps } from '../input/Input';
import MaskedInput from '../masked-input/MaskedInput';
import { isUSPhoneNumber } from './utils';
import InputWithIcon from '../input-with-icon/InputWithIcon';

export type PhoneInputOnlyProps = {
  /**
   * Allow international phone numbers. Without this we only allow US/Canadian numbers
   * @default false
   */
  allowInternational?: boolean;
};

export type PhoneInputProps = PhoneInputOnlyProps & InputProps;

const nationalPhoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

// After -,(,), stripped out
const usInternationalRegex = /\+1[1-9]\d{9}/;

// If we think the number is +1 apply the mask. Otherwise just present the raw input with +
function internationalPhoneMask(rawValue: string) {
  if (isUSPhoneNumber(rawValue)) {
    return nationalPhoneMask;
  }
  if (rawValue.match(usInternationalRegex)) {
    return ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  }

  return ['+', ...range(rawValue.length).map(i => /\d/)];
}

export function createPhoneMask(allowInternational: boolean) {
  return allowInternational ? internationalPhoneMask : nationalPhoneMask;
}

export default class PhoneInput extends Component<PhoneInputProps> {
  static defaultProps = {
    allowInternational: false,
  };

  render() {
    const { allowInternational, ...props } = this.props;
    return (
      <InputWithIcon s={props.s} rightIconName="phone">
        <MaskedInput {...props} mask={createPhoneMask(allowInternational)} />
      </InputWithIcon>
    );
  }
}
