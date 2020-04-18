import React, { Component, SelectHTMLAttributes, StatelessComponent } from 'react';
import { omitBy, pickBy } from 'lodash';
// @ts-ignore
import ReactSelect, { Async } from 'react-select';

import { styled, theme } from 'z-frontend-theme';
import { isUtilProp, Box, BoxProps } from 'zbase';
import { color, fontSizes, heights, radius, space, zIndex } from 'z-frontend-theme/utils';

import { commonTextInputStyles } from '../input/Input';

// NOTE-DZH: this component will not automatically open upwards when at the bottom of the screen
// see https://github.com/JedWatson/react-select/issues/1515

require('react-select/dist/react-select.css');

type SelectOption<ValueType = any> = { value: ValueType; label: string; [field: string]: any };

type SelectSize = 'small' | 'medium' | 'large';

interface SelectOwnProps<ValueType = any> {
  /**
   * Should the input have focus when the page loads?
   * @default false
   */
  autoFocus?: boolean;
  /**
   * Is the input disabled?
   * @default false
   */
  disabled?: boolean;
  /**
   * Controls the size of the input.
   * @default medium
   */
  s?: SelectSize;
  /**
   * Is the component in an error state?
   * @default false
   */
  hasError?: boolean;
  /**
   * function that returns a promise or calls a callback with the options: function(input, [callback])
   * https://github.com/JedWatson/react-select#async-props
   */
  loadOptions?: (input: any) => any;
  /**
   * the option property to use for the value, default is 'value'
   * https://github.com/JedWatson/react-select#select-props
   */
  valueKey?: string;
  /**
   * the option property to use for the label, default is 'label'
   * https://github.com/JedWatson/react-select#select-props
   */
  labelKey?: string;
  /**
   * pass the value to onChange as a string
   * https://github.com/JedWatson/react-select#select-props
   */
  simpleValue?: boolean;
  /**
   * boolean to enable default filtering or
   * function to filter the options array ([options], filterString, [values]) => [options]
   * https://github.com/JedWatson/react-select#select-props
   */
  filterOptions?: (options: SelectOption<ValueType>[], filter: any, currentValues: any) => any | boolean;
  /**
   * custom function to render the options in the menu
   * https://github.com/JedWatson/react-select#select-props
   */
  optionRenderer?: (option: SelectOption<ValueType>) => React.ReactNode;

  delimiter?: string;
  isOptionsAsync?: boolean;
  /**
   * Can the user select multiple values?
   * @default false
   */
  multi?: boolean;
  value?: ValueType | ValueType[];
  autoComplete?: string;
  /**
   * Options the user can choose from.
   */
  options?: SelectOption<ValueType>[];
  /**
   * Should a button to clear the input be provided?
   * @default true
   */
  clearable?: boolean;
  searchable?: boolean;
  /**
   * onChange handler
   */
  onChange?: (value: ValueType | ValueType[]) => void;
  /**
   * Should the menu open when the input is clicked?
   * @default true
   */
  openOnClick?: boolean;
  /**
   * Should the menu open when the input is focused?
   * @default false
   */
  openOnFocus?: boolean;
}

export type SelectProps<ItemType = any> = Omit<
  BoxProps & SelectHTMLAttributes<HTMLSelectElement>,
  keyof SelectOwnProps<ItemType>
> &
  SelectOwnProps<ItemType>;

// TODO: use new font styles once PR is merged
const sizeMap: { [size in SelectSize]: number } = {
  small: 0,
  medium: 1,
  large: 2,
};

const multiSelectItemsMarginsMap: { [size in SelectSize]: string } = {
  small: '4px',
  medium: '7px',
  large: '10px',
};

const StyledSelectFunction = (select: StatelessComponent<SelectProps>) => styled(select)<SelectProps>`
  .Select-control {
    cursor: default;
    display: table;
    border-spacing: 0;
    border-collapse: separate;
    outline: none;
    overflow: hidden;
    position: relative;
    width: 100%;
    ${commonTextInputStyles};
    padding-right: 0;
    height: ${props => heights(props.s)};
    /* !important to defeat high selector precedence in react-select library */
    border: 1px solid ${props => (props.hasError ? color('negation.a') : color('secondary.b'))} !important;
    box-shadow: none !important;

    :hover {
      box-shadow: none;
    }
  }

  .Select-arrow-zone,
  .Select-clear-zone {
    vertical-align: middle;
  }

  .Select-clear {
    font-size: 18px;
    font-weight: ${props => theme.weights[1]};
    color: ${color('grayscale.e')};
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
    border-color: ${color('grayscale.g')} !important;
    background-color: ${color('grayscale.g')} !important;
  }

  &.Select.is-disabled > .Select-control .Select-value .Select-value-label {
    color: ${color('grayscale.d')} !important;
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
    padding: 8px 10px;
    padding-left: ${props => (props.s === 'small' ? space(2) : space(3))};
    border-radius: 0;
  }

  .Select-option.is-focused {
    background-color: ${color('tertiary.c')} !important;
  }

  .Select-menu-outer {
    z-index: ${zIndex('dropdown')};
    border-radius: 0 0 ${radius()} ${radius()};
    border-color: ${color('secondary.b')};
    box-shadow: none;
    font-size: ${props => fontSizes(sizeMap[props.s as SelectSize])};
    margin-top: -1px;
  }

  &.Select--multi .Select-value {
    padding-left: 0;
    margin-top: ${props => multiSelectItemsMarginsMap[props.s as SelectSize]};
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

export const StyledSelect = StyledSelectFunction(ReactSelect);

const StyledSelectAsync = StyledSelectFunction(Async);

/**
 * @deprecated Please use Form.Select instead
 */
class Select<ValueType = any> extends Component<SelectProps<ValueType>> {
  static defaultProps = {
    simpleValue: true,
    s: 'medium',
    delimiter: ',',
    isOptionsAsync: false,
    hasError: false,
  };

  constructor(props: SelectProps<ValueType>) {
    super(props);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  onSelectChange(value: ValueType) {
    const { multi, simpleValue, delimiter, onChange } = this.props;
    if (!onChange) {
      return;
    }
    if (multi && simpleValue) {
      return onChange(value ? ((value as any).split(delimiter) as ValueType[]) : []);
    }
    return onChange(value);
  }

  render() {
    const { isOptionsAsync, value, onChange, onBlur, s: size, ...rest } = this.props;
    const utilProps = pickBy(this.props, (value, key) => isUtilProp(key));
    const selectProps = omitBy(rest, (value, key) => isUtilProp(key));
    // TODO: current version of react-select (v1) does not pass down aria-invalid prop
    return (
      <Box
        {...{
          ...utilProps,
          onChange: null,
        }}
      >
        {!!isOptionsAsync ? (
          <StyledSelectAsync
            s={size}
            value={value}
            onChange={this.onSelectChange}
            onBlur={() => onBlur && onBlur(value as any)}
            {...selectProps}
          />
        ) : (
          <StyledSelect
            s={size}
            value={value}
            onChange={this.onSelectChange}
            onBlur={() => onBlur && onBlur(value as any)}
            {...selectProps}
          />
        )}
      </Box>
    );
  }
}

export default Select;
