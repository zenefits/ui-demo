import React, { Component } from 'react';
import _ from 'lodash';

import { theme } from 'z-frontend-theme';

import { downshiftReducerCreators } from './downshiftReducers';
import MultiDownshift from './MultiDownshift';

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
  createMatchEmphasisHelper,
  createMultiOptionFilter,
  getDropdownContent,
  getSelectControlKeyDown,
  makeGuardedGetOptionText,
} from './utils';
import MultiSelectControl from './MultiSelectControl';
import SelectionWidget from './SelectionWidget';
import Tethered from '../tethered/Tethered';

type FunctionAsChild<OptionValue> = (
  params: {
    SelectOption: React.ComponentClass<SelectOptionInterfaceProps<OptionValue>>;
    SelectGroup?: React.ComponentClass<{ label: string }>;
    NewOption?: React.ComponentClass<{ optionTypeName?: string }>;
    inputValue: string;
    multiOptionFilter: (options: OptionValue[]) => OptionValue[];
    withMatchEmphasis: (text: string) => JSX.Element;
  },
) => React.ReactNode;

export type SharedMultiSelectProps<OptionValue> = {
  /**
   * The name of the control, which is submitted with the control's
   * value as part of the form data.
   * */
  name: string;

  /**
   * Label used to create aria properties from screen-readers
   * */
  label: string;

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
   * Fires when a selection is made
   * */
  onChange?: (value: OptionValue[]) => void;

  /**
   * Should component be focused when it is mounted
   * @default false
   * */
  autoFocus?: boolean;

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

type MultiSelectComponentProps<OptionValue> = {
  error?: string;
  value?: OptionValue[];
  controlAriaDescribedBy?: string;
  // Only use for visual regression test
  openOnFocus?: boolean;
};

type MultiSelectProps<OptionValue> = SharedMultiSelectProps<OptionValue> & MultiSelectComponentProps<OptionValue>;

const DEFAULT_MAX_HEIGHT = 240;

export class MultiSelect<OptionValue> extends Component<MultiSelectProps<OptionValue>> {
  element: HTMLDivElement;
  input: React.RefObject<HTMLInputElement>;
  tetherTarget: React.RefObject<HTMLDivElement>;

  constructor(props: MultiSelectProps<OptionValue>) {
    super(props);
    this.tetherTarget = React.createRef<HTMLDivElement>();
    this.input = React.createRef<HTMLInputElement>();
  }

  static defaultProps: Partial<MultiSelectProps<any>> = {
    s: 'medium',
    maxDropdownHeight: DEFAULT_MAX_HEIGHT,
    renderLoading: defaultRenderLoading,
    autocompleteInputPlaceholder: 'Search...',
    placeholder: 'Select an Option...',
  };

  downshiftStateReducer = downshiftReducerCreators.handleNewOption(this);

  render() {
    const {
      name,
      label,
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
      autoFocus,
      openOnFocus,
      disabled,
      s: size,
    } = this.props;
    const getOptionOrNullText = makeGuardedGetOptionText(getOptionText);
    return (
      <MultiDownshift
        selectedItems={value || []}
        initialInputValue=""
        onChange={onChange}
        onInputValueChange={onInputValueChange}
        itemToString={getOptionOrNullText}
        stateReducer={this.downshiftStateReducer}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          selectedItems,
          inputValue: downshiftInputValue,
          highlightedIndex,
          isOpen,
          setState: setDownshiftState,
          getToggleButtonProps,
          clearItem,
          clearAll,
          openMenu,
        }: any) => {
          const inputValue = downshiftInputValue || '';
          const OptionInterface = createSelectOptionInterface<OptionValue>();
          const multiOptionFilter = createMultiOptionFilter<OptionValue>(inputValue, selectedItems);
          const withMatchEmphasis = createMatchEmphasisHelper(inputValue);
          const renderedChildren = this.props.children({
            inputValue,
            multiOptionFilter,
            withMatchEmphasis,
            SelectOption: OptionInterface,
            SelectGroup: SelectGroupInterface,
            NewOption: NewOptionInterface,
          });

          let numRenderedOptions = 0;

          const optionFactory = new SelectOptionFactory<OptionValue>({
            getItemProps,
            size,
            highlightedIndex,
            selectedItems,
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
            renderLoading,
            renderNoResults,
            numRenderedOptions,
            isLoading,
            options: searchOptions,
          });

          const toggleButtonProps = getToggleButtonProps();
          const inputProps = Object.assign(getInputProps(), {
            name,
            'aria-label': `Autocomplete input for ${label}`,
            'aria-busy': isLoading,
            placeholder: autocompleteInputPlaceholder,
            value: inputValue,
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
              <MultiSelectControl
                aria-describedby={controlAriaDescribedBy}
                aria-label={`Edit ${label}`}
                hasError={!!error}
                selections={selectedItems.map((selectedItem: OptionValue) => getOptionText(selectedItem))}
                placeholder={placeholder}
                {...toggleButtonProps}
                onKeyDown={onSelectControlKeyDown}
                onClearItem={clearItem}
                onClearAll={clearAll}
                s={size}
                autoFocus={autoFocus}
                onFocus={() => {
                  openOnFocus && openMenu();
                }}
                innerRef={this.tetherTarget}
                disabled={disabled}
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
      </MultiDownshift>
    );
  }
}

export default MultiSelect;
