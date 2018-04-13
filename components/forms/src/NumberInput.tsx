import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { heights } from 'z-frontend-theme/utils';
import { styled } from 'z-frontend-theme';

import { commonTextInputStyles, InputProps } from './Input';

export interface NumberInputProps extends InputProps {
  suffix?: string;
  prefix?: string;
  allowNegative?: boolean;
  allowDecimal?: boolean;
  integerLimit?: number | null;
}

interface StyledMaskedInputProps {
  mask?: Function;
  guide?: boolean;
}

const StyledMaskedInput = styled<StyledMaskedInputProps & InputProps>(MaskedInput)`
  ${commonTextInputStyles};
  height: ${props => heights(props.s)};
  line-height: 1.43;
`;

class NumberInput extends Component<NumberInputProps> {
  mask: Function;
  public static defaultProps: NumberInputProps = {
    s: 'medium',
    suffix: '',
    prefix: '',
    allowDecimal: true,
    integerLimit: null,
    allowNegative: false,
  };

  constructor(props) {
    super(props);
    this.mask = createNumberMask({
      suffix: props.suffix,
      prefix: props.prefix,
      allowNegative: props.allowNegative,
      integerLimit: props.integerLimit,
      allowDecimal: props.allowDecimal,
    });
  }
  render() {
    const { allowDecimal, integerLimit, allowNegative, suffix, prefix, ...rest } = this.props;
    return <StyledMaskedInput {...rest} mask={this.mask} guide={false} />;
  }
}

export default NumberInput;
