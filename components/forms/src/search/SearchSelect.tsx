import React, { Component } from 'react';
import _ from 'lodash';
import Downshift from 'downshift';

import { theme } from 'z-frontend-theme';

import {
  createSelectOptionInterface,
  defaultRenderLoading,
  transformSelectOptions,
  SelectGroupFactory,
  SelectGroupInterface,
  SelectOptions,
  SelectOptionFactory,
  SelectOptionInterfaceProps,
  SelectOptionSize,
} from '../select/SelectOptions';
import {
  createBasicOptionFilter,
  createMatchEmphasisHelper,
  getDropdownContent,
  makeGuardedGetOptionText,
} from '../select/utils';
import { combineReducers, downshiftReducerCreators } from '../select/downshiftReducers';
import SearchInput from './SearchInput';
import { getErrorId, getLabelId } from '../formik/FormFieldWrapper';
import Tethered from '../tethered/Tethered';

type FunctionAsChild<OptionValue> = (
  params: {
    SelectOption: React.ComponentClass<SelectOptionInterfaceProps<OptionValue>>;
    SelectGroup?: React.ComponentClass<{ label: string }>;
    inputValue: string;
    basicOptionFilter: (options: OptionValue[]) => OptionValue[];
    withMatchEmphasis: (text: string) => JSX.Element;
  },
) => React.ReactNode;

export type SharedSearchSelectProps<OptionValue> = {
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
   * Should the field be disabled
   * */
  disabled?: boolean;

  /**
   * Max height for dropdown
   * @default 240
   * */
  maxDropdownHeight?: string | number;

  /**
   * Placeholder text for input
   * */
  placeholder?: string;

  /**
   * Function to get text label for option
   * */
  getOptionText: (option: OptionValue) => string;

  /**
   * Should component always be shown as an input, or use button when inactive?
   * */
  alwaysExpandInput?: boolean;

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
   * Should input be focused when rendered
   * */
  autoFocus?: boolean;

  /**
   * Fires when the a selection is made
   * */
  onSelect?: (selection: OptionValue) => void;

  /**
   * Fires when the input value changed
   * */
  onChange?: (inputValue: string) => void;

  /**
   * Fires when the input value blurred
   * */
  onBlur?: (inputValue: string) => void;

  /**
   * Should search field have icon
   * */
  omitIcon?: boolean;

  children: FunctionAsChild<OptionValue>;
};

type SearchSelectComponentProps<OptionValue> = {
  error?: string;
  value?: string;
  // Used for visual regression testing
  defaultIsOpen?: boolean;
};

type SearchSelectState = {
  isExpanded: boolean;
};

type SearchSelectProps<OptionValue> = SharedSearchSelectProps<OptionValue> & SearchSelectComponentProps<OptionValue>;

const DEFAULT_MAX_HEIGHT = 240;

export class SearchSelect<OptionValue> extends Component<SearchSelectProps<OptionValue>, SearchSelectState> {
  tetherTarget: React.RefObject<HTMLDivElement>;
  element: HTMLDivElement;

  static defaultProps: Partial<SearchSelectProps<any>> = {
    s: 'medium',
    maxDropdownHeight: DEFAULT_MAX_HEIGHT,
    renderLoading: defaultRenderLoading,
  };

  constructor(props: SearchSelectProps<OptionValue>) {
    super(props);
    this.state = {
      isExpanded: !!(props.alwaysExpandInput || props.value),
    };
    this.tetherTarget = React.createRef<HTMLDivElement>();
  }

  downshiftStateReducer = combineReducers<OptionValue>([
    downshiftReducerCreators.omitSelection(this),
    downshiftReducerCreators.ignoreNullInput(),
    downshiftReducerCreators.closeOnEmptyInput(),
    downshiftReducerCreators.clearHighlightOnInputChange(),
  ]);

  expandInput = () => {
    this.setState({ isExpanded: true });
  };

  collapseInput = () => {
    this.setState({ isExpanded: false });
  };

  render() {
    const {
      name,
      error,
      s: size,
      maxDropdownHeight,
      alwaysExpandInput,
      getOptionText,
      onChange,
      onBlur,
      value,
      autoFocus,
      renderNoResults,
      isLoading,
      renderLoading,
      placeholder,
      defaultIsOpen,
      disabled,
    } = this.props;
    const getOptionOrNullText = makeGuardedGetOptionText(getOptionText);
    return (
      <Downshift
        inputValue={value}
        initialIsOpen={defaultIsOpen}
        itemToString={getOptionOrNullText}
        stateReducer={this.downshiftStateReducer}
        onInputValueChange={onChange}
        labelId={getLabelId(name)}
        inputId={name}
      >
        {({ getInputProps, getItemProps, inputValue, selectedItem, highlightedIndex, isOpen }) => {
          const OptionInterface = createSelectOptionInterface<OptionValue>();
          const basicOptionFilter = createBasicOptionFilter<OptionValue>(inputValue);
          const withMatchEmphasis = createMatchEmphasisHelper(inputValue);
          const renderedChildren = this.props.children({
            inputValue,
            basicOptionFilter,
            withMatchEmphasis,
            SelectOption: OptionInterface,
            SelectGroup: SelectGroupInterface,
          });

          let numRenderedOptions = 0;
          const optionFactory = new SelectOptionFactory<OptionValue>({
            getItemProps,
            size,
            selectedItem,
            highlightedIndex,
            withMatchEmphasis,
            getOptionText,
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

          const shouldShowDropdown = isOpen && (numRenderedOptions > 0 || renderNoResults || isLoading);
          const dropdownContent = getDropdownContent({
            isLoading,
            numRenderedOptions,
            renderLoading,
            renderNoResults,
            options: searchOptions,
          });

          return (
            <div>
              <div ref={this.tetherTarget}>
                <SearchInput
                  {...getInputProps({
                    onBlur: () => {
                      if (inputValue === '' && !alwaysExpandInput) {
                        this.collapseInput();
                      }
                      onBlur && onBlur(inputValue);
                    },
                  })}
                  name={name}
                  hasError={error}
                  aria-describedby={error ? getErrorId(name) : undefined}
                  aria-busy={isLoading}
                  isExpanded={this.state.isExpanded}
                  expand={this.expandInput}
                  autoFocus={autoFocus}
                  omitIcon={this.props.omitIcon}
                  placeholder={placeholder}
                  disabled={disabled}
                />
              </div>
              {shouldShowDropdown && (
                <Tethered containerProps={{ zIndex: theme.zIndex.dropdown }} target={this.tetherTarget} matchWidth>
                  <SelectOptions role="listbox" position="static" maxHeight={maxDropdownHeight} s={size}>
                    {dropdownContent}
                  </SelectOptions>
                </Tethered>
              )}
            </div>
          );
        }}
      </Downshift>
    );
  }
}

export default SearchSelect;
