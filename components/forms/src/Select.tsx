import React, { Component, SelectHTMLAttributes } from 'react';
import { omitBy, pickBy } from 'lodash';
import { styled } from 'z-frontend-theme';
import { RebassOnlyProps } from 'z-rebass-types';
import { Box } from 'rebass';
import { color, fontSizes, heights, isRebassProp, radius, space, zIndex } from 'z-frontend-theme/src/utils';
import { commonTextInputStyles } from './Input';
import ReactSelect from 'react-select';

require('react-select/dist/react-select.css');

export declare type SelectProps = RebassOnlyProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    s?: 'small' | 'medium' | 'large'; // 'size' is taken and not compatible (number)
  };

// TODO: use new font styles once PR is merged
const sizeMap = {
  small: 0,
  medium: 1,
  large: 2,
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
  }

  .Select-placeholder + .Select-input {
    margin-left: 0;
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
  }

  .Select-placeholder,
  .Select-input > input {
    ${props => props.s === 'large' && 'padding: 0; line-height: 2.9;'};
  }

  .Select-placeholder,
  &.Select--single > .Select-control .Select-value {
    padding-left: ${props => (props.s === 'small' ? space(2) : space(3))};
  }

  .Select-value-label {
    font-weight: normal;
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
    color: ${color('link.normal')};
    background-color: ${color('tertiary.c')};
    border-color: ${color('tertiary.c')};
  }

  &.Select--multi .Select-value-icon:hover,
  &.Select--multi .Select-value-icon:focus {
    color: ${color('link.normal')};
    background-color: ${color('tertiary.b')};
  }

  &.Select--multi .Select-value:first-child {
    margin-left: 0;
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
    const rebassProps = pickBy(this.props, (value, key) => isRebassProp(key));
    const selectProps = omitBy(rest, (value, key) => isRebassProp(key));
    return (
      <Box {...rebassProps}>
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
