import React, { Component, SelectHTMLAttributes } from 'react';
import { omitBy, pickBy } from 'lodash';
import { styled } from 'z-frontend-theme';
import { Box, BoxProps, isUtilProp } from 'zbase';
import { color, fontSizes, heights, radius, space, zIndex } from 'z-frontend-theme/utils';
import { commonTextInputStyles } from './Input';
import ReactSelect from 'react-select';

// NOTE-DZH: this component will not automatically open upwards when at the bottom of the screen
// see https://github.com/JedWatson/react-select/issues/1515

require('react-select/dist/react-select.css');

export declare type SelectProps = BoxProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    s?: 'small' | 'medium' | 'large'; // 'size' is taken and not compatible (number)
  };

// TODO: use new font styles once PR is merged
const sizeMap = {
  small: 0,
  medium: 1,
  large: 2,
};

const multiSelectItemsMarginsMap = {
  small: '4px',
  medium: '7px',
  large: '10px',
};

const StyledSelect = styled<SelectProps>(ReactSelect)`
  .Select-control {
    ${commonTextInputStyles};
    padding-right: 0;
    height: ${props => heights(props.s)};

    /* !important to defeat high selector precedence in react-select library */
    border: 1px solid ${color('secondary.b')} !important;
    box-shadow: none !important;

    :hover {
      box-shadow: none;
    }
  }

  .Select-input {
    padding: 0;
    height: ${props => `calc(${heights(props.s)(props)} - 2px)`};
  }

  &.Select--multi .Select-input,
  .Select-placeholder + .Select-input {
    margin-left: 0 !important;
  }

  &.Select.is-disabled > .Select-control {
    border-color: ${color('secondary.c')} !important;
    background-color: ${color('secondary.c')} !important;
  }

  &.Select.is-disabled > .Select-control .Select-value .Select-value-label {
    color: ${color('grayscale.d')};
  }

  &.error > .Select-control {
    border-color: ${color('negation.a')} !important;
  }

  .Select-placeholder {
    padding-left: ${props => (props.s === 'small' ? space(2) : space(3))};
    color: ${color('grayscale.d')};
    font-weight: normal;
    line-height: ${props => heights(props.s)} !important;
  }

  .Select-placeholder,
  .Select-input > input {
    padding: 0;
    line-height: ${props => heights(props.s)};
  }

  .Select-placeholder,
  &.Select--single > .Select-control .Select-value {
    padding-left: ${props => (props.s === 'small' ? space(2) : space(3))};
  }

  .Select-value-label {
    font-weight: normal;
  }

  &:not(.Select--multi) .Select-value {
    line-height: ${props => heights(props.s)} !important;
  }

  .Select-option {
    padding-left: ${props => (props.s === 'small' ? space(2) : space(3))};
    border-radius: 0;
  }

  .Select-option.is-focused {
    background-color: ${color('tertiary.c')} !important;
  }

  .Select-menu-outer {
    z-index: ${zIndex('dropdown')};
    border-radius: 0 0 ${radius} ${radius};
    border-color: ${color('secondary.b')};
    box-shadow: none;
    font-size: ${props => fontSizes(sizeMap[props.s])};
  }

  &.Select--multi .Select-value {
    padding-left: 0;
    margin-top: ${props => multiSelectItemsMarginsMap[props.s]};
    margin-left: 0;
    margin-right: 5px; /* same as react-select */
    color: ${color('link.normal')};
    background-color: ${color('tertiary.c')};
    border-color: ${color('tertiary.c')};
  }

  &.Select--multi .Select-value-icon:hover,
  &.Select--multi .Select-value-icon:focus {
    color: ${color('link.normal')};
    background-color: ${color('tertiary.b')};
  }
`;

class Select extends Component<any> {
  static defaultProps = {
    simpleValue: true,
    s: 'medium',
    delimiter: ',',
  };

  constructor(props) {
    super(props);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  onSelectChange(value) {
    const { multi, simpleValue, delimiter, onChange } = this.props;
    if (!onChange) {
      return;
    }
    if (multi && simpleValue) {
      return onChange(value ? value.split(delimiter) : []);
    }
    return onChange(value);
  }

  render() {
    const { value, onChange, onBlur, s: size, ...rest } = this.props;
    const utilProps: BoxProps = pickBy(this.props, (value, key) => isUtilProp(key));
    const selectProps = omitBy(rest, (value, key) => isUtilProp(key));
    return (
      <Box {...utilProps}>
        <StyledSelect
          s={size}
          value={value}
          onChange={this.onSelectChange}
          onBlur={() => onBlur && onBlur(value)}
          {...selectProps}
        />
      </Box>
    );
  }
}

export default Select;
