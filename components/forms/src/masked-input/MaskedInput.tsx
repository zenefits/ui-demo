import React, { Component } from 'react';
// @ts-ignore
import ReactMaskedInput, { conformToMask } from 'react-text-mask';

import Input, { InputProps } from '../input/Input';

export interface MaskedInputProps extends InputProps {
  /** Mask to apply to the input field. */
  mask: (string | RegExp)[] | Function;
  /**
   * Whether or not to show guidance during user input.
   * @default false
   */
  guide?: boolean;
}

export function getMaskedPlaceholder(
  placeholder: string,
  value: MaskedInputProps['value'],
  mask: MaskedInputProps['mask'],
): string {
  if (placeholder !== undefined) {
    return placeholder;
  }
  if (value) {
    // placeholder will not be shown, so don't bother
    return null;
  }
  const placeholderMask = conformToMask(String(value), mask).conformedValue;
  const isJustMasks = /^_+$/.test(placeholderMask); // looks too much like a line
  return isJustMasks ? null : placeholderMask;
}

class MaskedInput extends Component<MaskedInputProps> {
  public static defaultProps: Partial<MaskedInputProps> = {
    s: 'medium',
    guide: false,
    w: 1,
  };

  render() {
    const { mask, guide, placeholder, ...rest } = this.props;
    // react-text-mask supports `showMask` but that makes it impossible for the user to clear the input value
    const maybeMaskedPlaceholder = getMaskedPlaceholder(placeholder, rest.value, mask);
    return (
      <ReactMaskedInput
        mask={mask}
        guide={guide}
        placeholder={maybeMaskedPlaceholder}
        {...rest}
        render={(ref: any, props: InputProps) => <Input elementRef={ref} {...props} />}
      />
    );
  }
}

export default MaskedInput;
