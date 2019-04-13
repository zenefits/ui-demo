import React, { Component } from 'react';
// @ts-ignore
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import MaskedInput from '../masked-input/MaskedInput';
import { InputProps } from '../input/Input';

export interface NumberInputProps extends InputProps {
  /** Extra characters to display after user-entered text. */
  suffix?: string;
  /** Extra characters to display before user-entered text. */
  prefix?: string;
  /** Whether or not to allow negative numbers. */
  allowNegative?: boolean;
  /** Whether or not to allow decimal numbers. */
  allowDecimal?: boolean;
  /** Maximum number that user should be able to enter. */
  integerLimit?: number | null;
  /** Whether or not to allow commas for numbers greater than a thousand. */
  allowCommaSeparator?: boolean;
}

class NumberInput extends Component<NumberInputProps> {
  mask: Function;
  public static defaultProps: NumberInputProps = {
    s: 'medium',
    suffix: '',
    prefix: '',
    allowDecimal: true,
    integerLimit: null,
    allowNegative: false,
    allowCommaSeparator: true,
  };

  constructor(props: NumberInputProps) {
    super(props);
    this.mask = createNumberMask({
      suffix: props.suffix,
      prefix: props.prefix,
      allowNegative: props.allowNegative,
      integerLimit: props.integerLimit,
      allowDecimal: props.allowDecimal,
      includeThousandsSeparator: props.allowCommaSeparator,
    });
  }
  render() {
    const { allowDecimal, integerLimit, allowNegative, suffix, prefix, allowCommaSeparator, ...rest } = this.props;
    return <MaskedInput {...rest} mask={this.mask} />;
  }
}

export default NumberInput;
