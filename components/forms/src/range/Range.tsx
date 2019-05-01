import React, { ChangeEvent, Component, InputHTMLAttributes } from 'react';

import { css, styled } from 'z-frontend-theme';
import { Box, Flex, Input, InputProps, Label, TextBlock } from 'zbase';
import { color, fontStyles, space } from 'z-frontend-theme/utils';

type RangeProps = InputProps & {
  showValuePercentage?: boolean;
  label?: string;
};

function convertToPercentage(value: number | string, max: number | string) {
  return `${Math.round((parseInt(value as string, 10) * 100) / parseInt(max as string, 10))}%`;
}

function getGradient(props: InputHTMLAttributes<HTMLInputElement>) {
  // kept names short so style would be on 1 line
  const val = convertToPercentage(props.value as string, props.max);
  const fc = 'auxiliary.a';
  const sc = 'secondary.b';
  return css`
    background: linear-gradient(to right, ${color(fc)} 0%, ${color(fc)} ${val}, ${color(sc)} ${val}, ${color(sc)} 100%);
  `;
}

const trackStyle = css`
  height: ${space(2)};
  background: ${color('secondary.b')};
  border: none;
  border-radius: ${space(1)};
  width: 100%;
`;

const thumbStyle = css`
  border: none;
  height: ${space(3)};
  width: ${space(3)};
  border-radius: ${space(3)};
  background: ${color('auxiliary.a')};
  box-shadow: 0 0 0 2px rgba(18, 52, 102, 0.2);
  margin-top: -${space(1)};
  cursor: pointer;
`;

const hoverThumbStyle = css`
  height: ${space(4)};
  width: ${space(4)};
  box-shadow: 0 0 0 4px rgba(18, 52, 102, 0.2);
  margin-top: -${space(2)};

  &:active {
    box-shadow: 0 0 0 4px rgba(18, 52, 102, 0.3);
    margin-top: -${space(2)};
  }
`;

const StyledRangeInput = styled.input.attrs({ type: 'range' })`
  appearance: none;
  width: 100%;
  background: transparent;

  ::-webkit-slider-runnable-track {
    ${trackStyle};
    ${props => getGradient(props)};
    transition: all 0.25s ease-in-out;
  }

  ::-moz-range-track {
    ${trackStyle};
  }

  ::-ms-track {
    height: ${space(2)};
    background: transparent;
    color: transparent;
    /* hack to get the thumb to overflow out of the range track */
    border: solid 16px transparent;
  }

  ::-ms-fill-lower {
    background: ${color('auxiliary.a')};
    border-radius: ${space(1)};
  }

  ::-ms-fill-upper {
    background: ${color('secondary.b')};
    border-radius: ${space(1)};
  }

  ::-moz-range-progress {
    background: ${color('auxiliary.a')};
    height: ${space(2)};
    border-radius: ${space(1)};
  }

  ::-webkit-slider-thumb {
    appearance: none;
    ${thumbStyle};
  }

  ::-moz-range-thumb {
    ${thumbStyle};
  }

  ::-ms-thumb {
    ${thumbStyle};
  }

  :focus {
    outline: none;
  }

  ::-moz-focus-outer {
    border: 0;
  }

  ::-ms-tooltip {
    display: none;
  }

  &:hover:not(:disabled) {
    ::-webkit-slider-thumb {
      ${hoverThumbStyle};
    }

    ::-moz-range-thumb {
      ${hoverThumbStyle};
    }

    ::-ms-thumb {
      ${hoverThumbStyle};
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
` as typeof Input;

const StyledValueText = styled(TextBlock)`
  color: ${color('auxiliary.a')};
  ${props => fontStyles('controls.m')};
  display: inline-block;
`;

const StyledLabel = styled(Label)`
  color: ${color('grayscale.b')};
  ${props => fontStyles('controls.m')};
  display: inline-block;
`;

interface RangeState {
  max: number;
  value: number | string;
}

class Range extends Component<RangeProps, RangeState> {
  static defaultProps = {
    min: 0,
    max: 100,
    showValuePercentage: false,
  };
  constructor(props: RangeProps) {
    super(props);
    this.state = {
      max: parseInt(props.max as string, 10),
      value:
        (Array.isArray(props.defaultValue) ? props.defaultValue[0] : props.defaultValue) ||
        ((props.max as any) - (props.min as any)) / 2,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      value: e.target.value,
    });
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  render() {
    const { label, showValuePercentage, min, max, defaultValue, onChange, ...rest } = this.props;
    return (
      <Box>
        <Flex justify="space-between">
          <StyledLabel>{label}</StyledLabel>
          {showValuePercentage && <StyledValueText> {convertToPercentage(this.state.value, max)} </StyledValueText>}
        </Flex>
        <StyledRangeInput min={min} max={max} onChange={this.onInputChange} value={this.state.value} {...rest} />
      </Box>
    );
  }
}

export default Range;
