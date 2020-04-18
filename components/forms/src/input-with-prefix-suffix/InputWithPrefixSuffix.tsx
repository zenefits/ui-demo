import React, { Component } from 'react';

import { styled } from 'z-frontend-theme';
import { color, fontSizes } from 'z-frontend-theme/utils';
import { Box, BoxProps, TextInline } from 'zbase';

import { CustomInputProps, InputProps } from '../input/Input';
import { sizeMap, InputSize } from '../input/inputTypes';

export type WithPrefixSuffixProps = {
  prefix?: string;
  suffix?: string;
  s?: InputSize;
};

export type InputWithPrefixSuffixProps = InputProps & WithPrefixSuffixProps;

type InputWrapperProps = BoxProps & CustomInputProps & WithPrefixSuffixProps;

const calculatePadding = (size: string, content: string): string => {
  const { length } = content;
  if (size === 'small') {
    return `calc(8px + ${length}ch + 8px)`;
  }
  return `calc(12px + ${length}ch + 12px)`;
};

const StyledWrapper = styled(Box)<InputWrapperProps>`
  position: relative;

  input {
    padding-left: ${(props: InputWrapperProps) => props.prefix && calculatePadding(props.s, props.prefix)};
    padding-right: ${(props: InputWrapperProps) => props.suffix && calculatePadding(props.s, props.suffix)};
  }
`;

const StyledText = styled(TextInline)<{ placement: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${color('grayscale.e')};
  font-size: ${(props: InputProps) => fontSizes(sizeMap[props.s])};
  ${props => `${props.placement}: ${props.s === 'small' ? `8px` : `12px`}`};
`;

class InputWithPrefixSuffix extends Component<InputWithPrefixSuffixProps> {
  static defaultProps = {
    s: 'medium',
  };

  render() {
    const { prefix, suffix, width, children, w, ...rest } = this.props;
    return (
      <StyledWrapper prefix={prefix} suffix={suffix} s={rest.s} width={width} w={w}>
        {prefix && (
          <StyledText s={rest.s} placement="left">
            {prefix}
          </StyledText>
        )}
        {children}
        {suffix && (
          <StyledText s={rest.s} placement="right">
            {suffix}
          </StyledText>
        )}
      </StyledWrapper>
    );
  }
}

export default InputWithPrefixSuffix;
