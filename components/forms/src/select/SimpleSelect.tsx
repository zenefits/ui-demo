import React, { Component, SelectHTMLAttributes } from 'react';
import _ from 'lodash';

import { styled } from 'z-frontend-theme';
import { color, heights } from 'z-frontend-theme/utils';
import { Flex, FlexProps, Icon } from 'zbase';

import { commonTextInputStyles } from '../input/Input';
import {
  createSelectOptionInterface,
  SelectGroupInterface,
  SelectOptionInterfaceProps,
  SelectOptionSize,
} from './SelectOptions';
import { recursivelyTransformChildren } from './utils';
import { getErrorId } from '../formik/FormFieldWrapper';

type FunctionAsChild<OptionValue> = (
  params: {
    SelectOption: React.ComponentClass<SelectOptionInterfaceProps<OptionValue>>;
    SelectGroup?: React.ComponentClass<{ label: string }>;
  },
) => React.ReactNode;

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
};

type SimpleSelectComponentProps<OptionValue> = {
  error?: string;
};

type SimpleSelectProps<OptionValue> = SharedSimpleSelectProps<OptionValue> & SimpleSelectComponentProps<OptionValue>;

type HtmlSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  s: SelectOptionSize;
  isPlaceholder: boolean;
  hasError: boolean;
};

const untypedCommonTextInputStyles = commonTextInputStyles as any;

const StyledSelect = styled.select<HtmlSelectProps>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: 100%;
  ${untypedCommonTextInputStyles};
  background-color: rgba(0, 0, 0, 0);
  height: ${props => heights(props.s)};
  line-height: 1.43;
  color: ${props => (props.isPlaceholder ? color('text.off') : color('text.dark'))};
`;

const SelectContainer = styled(Flex)`
  position: relative;
`;

const IconContainer = styled<FlexProps>(Flex)`
  position: absolute;
  right: 0;
  z-index: 1;
  pointer-events: none;
  height: 100%;
`;

IconContainer.defaultProps = {
  align: 'center',
};

class SimpleSelect<OptionValue> extends Component<SimpleSelectProps<OptionValue>> {
  static defaultProps = {
    s: 'medium',
    clearable: true,
    placeholder: 'Select an option...',
    getOptionText: (option: string) => option,
  };

  render() {
    const { s: size, placeholder, value, error, disabled, autoFocus, getOptionText, clearable, children } = this.props;
    const OptionInterface = createSelectOptionInterface<OptionValue>();
    const renderedChildren = children({
      SelectOption: OptionInterface,
      SelectGroup: SelectGroupInterface,
    });

    let optionType: 'string' | 'object' | 'number';
    const transformedOptions = recursivelyTransformChildren(renderedChildren, [
      {
        condition: element => element.type === OptionInterface,
        transformation: (option: React.ReactElement<SelectOptionInterfaceProps<OptionValue>>) => {
          if (!optionType) {
            optionType = typeof option.props.option as any;
            if (!['string', 'object', 'number'].includes(optionType)) {
              throw new Error('Option values must be string, number, or object.');
            }
          }
          return (
            <option value={JSON.stringify(option.props.option)} disabled={option.props.disabled}>
              {option.props.children || getOptionText(option.props.option)}
            </option>
          );
        },
      },
      {
        condition: element => element.type === SelectGroupInterface,
        transformation: (
          group: React.ReactElement<{
            label: string;
            children: React.ReactChild;
          }>,
        ) => <optgroup label={group.props.label}>{group.props.children}</optgroup>,
      },
    ]);

    const nullValue = optionType === 'string' ? '' : null;

    return (
      <SelectContainer>
        <StyledSelect
          id={name}
          s={size}
          value={JSON.stringify(value)}
          isPlaceholder={clearable && !value}
          disabled={disabled}
          onChange={(event: any) => {
            this.props.onChange && this.props.onChange(JSON.parse(event.target.value));
          }}
          hasError={!!error}
          aria-describedby={getErrorId(name)}
          autoFocus={autoFocus}
        >
          {clearable && <option value={JSON.stringify(nullValue)}>{placeholder}</option>}
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
