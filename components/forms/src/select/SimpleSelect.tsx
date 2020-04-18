import React, { Component, SelectHTMLAttributes } from 'react';
import { isNil } from 'lodash';

import { styled, theme } from 'z-frontend-theme';
import { color, heights, px } from 'z-frontend-theme/utils';
import { Flex, FlexProps, Icon } from 'zbase';

import { commonTextInputStyles } from '../input/Input';
import {
  createSelectOptionInterface,
  doesComponentMatchType,
  SelectGroupInterface,
  SelectOptionInterfaceProps,
  SelectOptionSize,
} from './SelectOptions';
import { recursivelyTransformChildren } from './utils';
import { getErrorId } from '../formik/FormFieldWrapper';

export type SimpleSelectSubcomponents<OptionValue> = {
  SelectOption: React.ComponentClass<SelectOptionInterfaceProps<OptionValue>>;
  SelectGroup?: React.ComponentClass<{ label: string }>;
};

type FunctionAsChild<OptionValue> = (subcomponents: SimpleSelectSubcomponents<OptionValue>) => React.ReactNode;

export type SharedSimpleSelectProps<OptionValue> = {
  /**
   * The name of the control, which is submitted with the control's
   * value as part of the form data.
   * */
  name: string;

  /**
   * Size of input
   * @default "medium"
   * */
  s?: SelectOptionSize;

  /**
   * Is input disabled
   * */
  disabled?: boolean;

  /**
   * Value of field
   * */
  value?: OptionValue | null;

  /**
   * Width of field
   * */
  width?: number | string;

  /**
   * Text to show when no option is selected
   * */
  placeholder?: string;

  /**
   * Should the component be focused when the component is rendered
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Callback fired with option value when select value is updated
   */
  onChange?: (value: OptionValue | null) => void;

  /**
   * Function to get text label for option
   * @default
   * (option: string) => option
   * */
  getOptionText?: (option: OptionValue) => string;

  /**
   * Should user be able to clear the input?
   * SETTING THIS PROP DOES NOT MAKE FORM-LEVEL VALIDATION UNNECESSARY!!!
   * @default true
   * */
  clearable?: boolean;

  /**
   * Render function that specified that options (and possibly option groups) for the select as JSX
   * */
  children: FunctionAsChild<OptionValue>;

  /** Test ID to find the element in tests */
  'data-testid'?: string;
};

type SimpleSelectComponentProps<OptionValue> = {
  error?: string;
};

type OmitSharedProps<T, K> = Pick<T, Exclude<keyof T, keyof K>>;

export type SimpleSelectProps<OptionValue> = SharedSimpleSelectProps<OptionValue> &
  SimpleSelectComponentProps<OptionValue> &
  OmitSharedProps<FlexProps, SharedSimpleSelectProps<OptionValue>>;

type HtmlSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  s: SelectOptionSize;
  isPlaceholder: boolean;
  hasError: boolean;
};

const untypedCommonTextInputStyles = commonTextInputStyles as any;

const StyledSelect = styled.select<HtmlSelectProps>`
  appearance: none;
  width: 100%;
  height: ${props => heights(props.s)};
  ${untypedCommonTextInputStyles};
  background-color: ${color('grayscale.white')};
  line-height: 1.43;

  padding-right: ${props => (props.s === 'small' ? px(theme.space[2] + 8) : px(theme.space[3] + 8))};

  /* color within the select: */
  color: ${props => (props.isPlaceholder ? color('text.light') : color('text.dark'))};
  /* color of the options (esp in Firefox): */
  option {
    color: ${color('text.dark')};
  }

  /* hide redundant focus ring in Firefox */
  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 ${color('text.dark')};
  }
`;

const SelectContainer = styled(Flex)`
  position: relative;
`;

const IconContainer = styled(Flex)`
  position: absolute;
  right: 0;
  z-index: 1;
  pointer-events: none;
  height: 100%;
`;

IconContainer.defaultProps = {
  align: 'center',
};

function prepareValue(value: any, optionType: string) {
  if (optionType === 'string') {
    return value;
  }
  return JSON.stringify(value);
}

class SimpleSelect<OptionValue> extends Component<SimpleSelectProps<OptionValue>> {
  static defaultProps = {
    s: 'medium',
    clearable: true,
    placeholder: 'Select Option',
    getOptionText: (option: string) => option,
  };

  render() {
    const {
      s: size,
      name,
      placeholder,
      value,
      error,
      disabled,
      autoFocus,
      getOptionText,
      clearable,
      children,
      onChange,
      'data-testid': dataTestId,
      ...containerProps
    } = this.props;
    const OptionInterface = createSelectOptionInterface<OptionValue>();
    const renderedChildren = children({
      SelectOption: OptionInterface,
      SelectGroup: SelectGroupInterface,
    });

    let optionType: 'string' | 'object' | 'number';
    const transformedOptions = recursivelyTransformChildren(renderedChildren, [
      {
        condition: element => doesComponentMatchType(element, OptionInterface),
        transformation: (option: React.ReactElement<SelectOptionInterfaceProps<OptionValue>>) => {
          if (!optionType) {
            optionType = typeof option.props.option as any;
            if (!['string', 'object', 'number'].includes(optionType)) {
              throw new Error('Option values must be string, number, or object.');
            }
          }
          const optionValue = prepareValue(option.props.option, optionType);
          return (
            <option value={optionValue} disabled={option.props.disabled}>
              {option.props.children || getOptionText(option.props.option)}
            </option>
          );
        },
      },
      {
        condition: element => doesComponentMatchType(element, SelectGroupInterface),
        transformation: (
          group: React.ReactElement<{
            label: string;
            children: React.ReactChild;
          }>,
        ) => <optgroup label={group.props.label}>{group.props.children}</optgroup>,
      },
    ]);

    const nullValue = optionType === 'string' ? '' : null;
    const isValueUnspecified = (value as any) === '' || isNil(value); // allow 0
    return (
      <SelectContainer {...containerProps}>
        <StyledSelect
          id={name}
          s={size}
          value={prepareValue(value, optionType)}
          isPlaceholder={clearable && isValueUnspecified}
          disabled={disabled}
          data-testid={dataTestId}
          onChange={(event: any) => {
            const { onChange } = this.props;
            if (!onChange) {
              return;
            }
            if (optionType === 'string') {
              onChange(event.target.value);
            } else {
              onChange(JSON.parse(event.target.value));
            }
          }}
          hasError={!!error}
          aria-describedby={getErrorId(name)}
          autoFocus={autoFocus}
        >
          {clearable && <option value={prepareValue(nullValue, optionType)}>{placeholder}</option>}
          {transformedOptions}
        </StyledSelect>
        <IconContainer px={size === 'small' ? 2 : 3}>
          <Icon color="grayscale.e" iconName="chevron-down" s={size} />
        </IconContainer>
      </SelectContainer>
    );
  }
}

export default SimpleSelect;
