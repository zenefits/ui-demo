import React, { Component } from 'react';
// @ts-ignore
import ReactMaskedInput from 'react-text-mask';

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

class MaskedInput extends Component<MaskedInputProps> {
  public static defaultProps: Partial<MaskedInputProps> = {
    s: 'medium',
    guide: false,
    w: 1,
  };

  render() {
    const { mask, guide, ...rest } = this.props;
    return (
      <ReactMaskedInput
        mask={mask}
        guide={guide}
        {...rest}
        render={(ref: any, props: InputProps) => <Input elementRef={ref} {...props} />}
      />
    );
  }
}

export default MaskedInput;
