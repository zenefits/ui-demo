import React, { Component } from 'react';
import _ from 'lodash';
import Downshift from 'downshift';

import { theme } from 'z-frontend-theme';

import {
  createSelectOptionInterface,
  defaultRenderLoading,
  transformSelectOptions,
  NewOptionInterface,
  SelectGroupFactory,
  SelectGroupInterface,
  SelectOptionFactory,
  SelectOptionInterfaceProps,
  SelectOptionSize,
} from './SelectOptions';
import {
  createBasicOptionFilter,
  createMatchEmphasisHelper,
  getDropdownContent,
  getSelectControlKeyDown,
  makeGuardedGetOptionText,
} from './utils';
import { combineReducers, downshiftReducerCreators } from './downshiftReducers';
import SelectControl from './SelectControl';
import SelectionWidget from './SelectionWidget';
import Tethered from '../tethered/Tethered';

type FunctionAsChild<OptionValue> = (
  params: {
    SelectOption: React.ComponentClass<SelectOptionInterfaceProps<OptionValue>>;
    SelectGroup?: React.ComponentClass<{ label: string }>;
    NewOption?: React.ComponentClass<{ optionTypeName?: string }>;
    inputValue: string;
    basicOptionFilter: (options: OptionValue[]) => OptionValue[];
    withMatchEmphasis: (text: string) => JSX.Element;
  },
) => React.ReactNode;

// Available on OpenListSelect and Form.OpenListSelect
export type SharedSelectProps<OptionValue> = {
  /**
   * The name of the control, which is submitted with the control's
   * value as part of the form data.
   * */
  name: string;

  /**
   * Label used to create aria properties from screen-readers
   * */
  label: string | JSX.Element;

  /**
   * Should this field be disabled?
   * */
  disabled?: boolean;

  /**
   * Placeholder text for control
   * */
  placeholder?: string;

  /**
   * Placeholder text for autocomplete input
   */
  autocompleteInputPlaceholder?: string;

  /**
   * Function to get text label for option
   * */
  getOptionText: (option: OptionValue) => string;

  /**
   * Size of input
   * @default "medium"
   * */
  s?: SelectOptionSize;

  /**
   * Max height for dropdown
   * @default 240
   * */
  maxDropdownHeight?: string | number;

  /**
   * Set to true if options are loading
   * */
  isLoading?: boolean;

  /**
   * Function to specify custom loading display
   * */
  renderLoading?: () => JSX.Element;

  /**
   * Function to specify message when no options are found
   * */
  renderNoResults?: () => JSX.Element;

  /**
   * Include control to add option in none found
   * */
  includeAddOption?: true;

  /**
   * Should component be focused when it is mounted
   * @default false
   * */
  autoFocus?: boolean;

  /**
   * Fires when a selection is made
   * */
  onChange?: (OptionValue: string) => void;

  /**
   * If a NewOption component is included in children,
   * this callback will be fired with the current input value
   * when the "new option" is selected
   * */
  onCreateNewOption?: (inputValue?: string) => void;

  /**
   * Fires when the input value changed
   * */
  onInputValueChange?: (inputValue: string) => void;

  children: FunctionAsChild<OptionValue>;
};

type SelectComponentProps<OptionValue> = {
  error?: string;
  value?: OptionValue;
  controlAriaDescribedBy?: string;
  // Only use for visual regression testing
  openOnFocus?: boolean;
};

type SelectProps<OptionValue> = SharedSelectProps<OptionValue> & SelectComponentProps<OptionValue>;

const DEFAULT_MAX_HEIGHT = 240;

export class Select<OptionValue> extends Component<SelectProps<OptionValue>> {
  element: HTMLDivElement;
  input: React.RefObject<HTMLInputElement>;
  tetherTarget: React.RefObject<HTMLDivElement>;

  constructor(props: SelectProps<OptionValue>) {
    super(props);
    this.tetherTarget = React.createRef<HTMLDivElement>();
    this.input = React.createRef<HTMLInputElement>();
  }

  static defaultProps: Partial<SelectProps<any>> = {
    s: 'medium',
    maxDropdownHeight: DEFAULT_MAX_HEIGHT,
    renderLoading: defaultRenderLoading,
    autocompleteInputPlaceholder: 'Search...',
    placeholder: 'Select an Option...',
  };

  downshiftStateReducer = combineReducers<OptionValue>([
    downshiftReducerCreators.handleNewOption(this),
    downshiftReducerCreators.resetOnOpen(),
  ]);

  render() {
    const {
      name,
      label,
      disabled,
      error,
      maxDropdownHeight,
      onChange,
      onInputValueChange,
      value,
      renderNoResults,
      isLoading,
      renderLoading,
      placeholder,
      autocompleteInputPlaceholder,
      getOptionText,
      controlAriaDescribedBy,
      openOnFocus,
      autoFocus,
      s: size,
    } = this.props;
    const getOptionOrNullText = makeGuardedGetOptionText(getOptionText);
    return (
      <Downshift
        stateReducer={this.downshiftStateReducer}
        selectedItem={value}
        onSelect={onChange}
        onInputValueChange={onInputValueChange}
        itemToString={getOptionOrNullText}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          inputValue,
          selectedItem,
          highlightedIndex,
          isOpen,
          setState: setDownshiftState,
          getToggleButtonProps,
          clearSelection,
          openMenu,
        }) => {
          const OptionInterface = createSelectOptionInterface<OptionValue>();
          const basicOptionFilter = createBasicOptionFilter<OptionValue>(inputValue);
          const withMatchEmphasis = createMatchEmphasisHelper(inputValue);
          const renderedChildren = this.props.children({
            inputValue,
            basicOptionFilter,
            withMatchEmphasis,
            SelectOption: OptionInterface,
            SelectGroup: SelectGroupInterface,
            NewOption: NewOptionInterface,
          });

          let numRenderedOptions = 0;

          const optionFactory = new SelectOptionFactory<OptionValue>({
            getItemProps,
            size,
            selectedItem,
            highlightedIndex,
            getOptionText,
            withMatchEmphasis,
            cb: () => {
              numRenderedOptions += 1;
            },
          });

          const groupFactory = new SelectGroupFactory({ size });

          const searchOptions = transformSelectOptions(renderedChildren, {
            OptionInterface,
            optionFactory,
            groupFactory,
          });

          const dropdownContent = getDropdownContent({
            isLoading,
            numRenderedOptions,
            renderLoading,
            renderNoResults,
            options: searchOptions,
          });

          const toggleButtonProps = getToggleButtonProps();

          const inputProps = Object.assign(getInputProps(), {
            name,
            'aria-label': `autocomplete input for ${label}`,
            'aria-busy': isLoading,
            placeholder: autocompleteInputPlaceholder,
          });

          const onSelectControlKeyDown = getSelectControlKeyDown({
            onClick: toggleButtonProps.onClick,
            cb: charValue => {
              setDownshiftState({
                isOpen: true,
                inputValue: inputValue + charValue,
              });
            },
          });

          return (
            <div>
              <SelectControl
                aria-describedby={controlAriaDescribedBy}
                aria-label={`Edit ${label}`}
                hasError={!!error}
                selection={getOptionOrNullText(selectedItem)}
                placeholder={placeholder}
                onCloseIconClick={clearSelection}
                {...toggleButtonProps}
                onKeyDown={onSelectControlKeyDown}
                innerRef={this.tetherTarget}
                onFocus={() => {
                  openOnFocus && openMenu();
                }}
                autoFocus={autoFocus}
                disabled={disabled}
                s={size}
              />
              {isOpen && (
                <Tethered
                  containerProps={{ zIndex: theme.zIndex.dropdown }}
                  target={this.tetherTarget}
                  matchWidth
                  onPosition={() => {
                    this.input.current.focus();
                  }}
                  options={{
                    modifiers: {
                      offset: {
                        offset: '0px, 2px',
                      },
                    },
                  }}
                >
                  <SelectionWidget
                    s="medium"
                    inputProps={inputProps}
                    {...getMenuProps({ refKey: 'elementRef' })}
                    maxHeight={maxDropdownHeight}
                    inputRef={this.input}
                  >
                    {dropdownContent}
                  </SelectionWidget>
                </Tethered>
              )}
            </div>
          );
        }}
      </Downshift>
    );
  }
}

export default Select;
