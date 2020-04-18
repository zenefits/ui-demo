import React, { Component } from 'react';
// @ts-ignore
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
// @ts-ignore
import { conformToMask } from 'react-text-mask';

import MaskedInput from '../masked-input/MaskedInput';
import { InputProps } from '../input/Input';

export type CommonMaskedInputProps = {
  value?: number | string;
  /** Whether or not to allow negative numbers. */
  allowNegative?: boolean;
  /** Whether or not to allow decimal numbers. */
  allowDecimal?: boolean;
  /** Maximum number that user should be able to enter. */
  integerLimit?: number | null;
  /** Callback when user enters a new value */
  onChange?: (value: number | string) => void;
  /**
   * Keep the formatted value as the input value. By default, the input value is a raw number.
   * This is mostly for backwards-compatibility.
   * @default false
   */
  preserveFormattedValue?: boolean;
};

export type NumberInputOnlyProps = {
  /** Extra characters to display after user-entered text. */
  suffix?: string;
  /** Extra characters to display before user-entered text. */
  prefix?: string;
  /** Whether or not to allow commas for numbers greater than a thousand. */
  includeThousandsSeparator?: boolean;
} & CommonMaskedInputProps;

export type NumberInputProps = NumberInputOnlyProps & Omit<InputProps, keyof NumberInputOnlyProps>;

function createMask(props: NumberInputProps) {
  return createNumberMask({
    suffix: '',
    prefix: '',
    allowNegative: props.allowNegative,
    integerLimit: props.integerLimit,
    allowDecimal: props.allowDecimal,
    includeThousandsSeparator: props.includeThousandsSeparator,
  });
}

function unmask(value: string): number {
  // avoid returning NaN
  if (!value || value === '-') {
    return null;
  }
  // mask will disallow input of - and . already, so can always leave those characters
  return parseFloat(value.replace(/[^-\d.]/g, ''));
}

function formatValue(value: number | string, mask: Function) {
  const valueIsUnspecified = value === undefined || value === null || value === '';
  return valueIsUnspecified ? value : conformToMask(String(value), mask).conformedValue;
}

type NumberInputState = {
  prevValue: number | string;
  formattedValue: string;
};

class NumberInput extends Component<NumberInputProps, NumberInputState> {
  mask: Function;

  public static defaultProps: Partial<NumberInputProps> = {
    s: 'medium',
    allowDecimal: true,
    integerLimit: null,
    allowNegative: false,
    includeThousandsSeparator: true,
  };

  constructor(props: NumberInputProps) {
    super(props);
    this.mask = createMask(props);
    this.state = {
      prevValue: props.value,
      formattedValue: formatValue(props.value, this.mask),
    };
  }

  static getDerivedStateFromProps(props: NumberInputProps, state: NumberInputState) {
    // avoid issue with "1." becoming 1 and user losing progress on what they're typing
    // this covers situations where value is changed externally, eg form reset
    if (props.value !== state.prevValue) {
      const formattedValue = formatValue(props.value, createMask(props));
      return {
        formattedValue,
        prevValue: props.value,
      };
    }
    return null;
  }

  render() {
    const {
      allowDecimal,
      integerLimit,
      allowNegative,
      includeThousandsSeparator,
      onChange,
      preserveFormattedValue,
      value, // exclude value deliberately
      ...maskedInputProps
    } = this.props;
    return (
      <MaskedInput
        value={this.state.formattedValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (!onChange) {
            return;
          }

          const formattedValue = event.target.value;
          if (preserveFormattedValue) {
            return onChange(formattedValue);
          }
          if (formattedValue !== this.state.formattedValue) {
            // handle when user types eg "1."
            this.setState({
              formattedValue,
            });
          }
          onChange(unmask(formattedValue));
        }}
        {...maskedInputProps}
        mask={this.mask}
      />
    );
  }
}

export default NumberInput;
