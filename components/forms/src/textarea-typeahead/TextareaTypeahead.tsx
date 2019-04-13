import React, { Component } from 'react';
import _ from 'lodash';
import Downshift from 'downshift';

import { theme } from 'z-frontend-theme';

import {
  createSelectOptionInterface,
  transformSelectOptions,
  SelectGroupFactory,
  SelectGroupInterface,
  SelectOptions,
  SelectOptionFactory,
  SelectOptionSize,
} from '../select/SelectOptions';
import { createCurrentWordFilter, createMatchEmphasisHelper, getDropdownContent } from '../select/utils';
import { combineReducers, downshiftReducerCreators } from '../select/downshiftReducers';
import Textarea from '../textarea/Textarea';
import { getErrorId, getLabelId } from '../formik/FormFieldWrapper';
import Tethered from '../tethered/Tethered';

type FunctionAsChild = (
  params: {
    SelectOption: React.ComponentClass<{ option: string }>;
    SelectGroup?: React.ComponentClass<{ label: string }>;
    inputValue: string;
    currentWordFilter: (suggestions: string[], waitForLength: number) => string[];
    withMatchEmphasis: (text: string) => JSX.Element;
  },
) => React.ReactNode;

// Available on OpenListSelect and Form.OpenListSelect
export type SharedTextareaTypeaheadProps = {
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
   * Max height for dropdown
   * @default 240
   * */
  maxDropdownHeight?: string | number;
  /**
   * Placeholder text for input
   * */
  placeholder?: string;

  /**
   * Should input be focused when rendered
   * */
  autoFocus?: boolean;
  /**
   * Fires when the a selection is made
   * */
  onSelect?: (selection: string) => void;
  /**
   * Fires when the input value changed
   * */
  onChange?: (inputValue: string) => void;

  children: FunctionAsChild;
};

type TextareaTypeaheadComponentProps = {
  error?: string;
  value?: string;
};

type TextareaTypeaheadProps = SharedTextareaTypeaheadProps & TextareaTypeaheadComponentProps;

const DEFAULT_MAX_HEIGHT = 240;

class TextareaTypeahead extends Component<TextareaTypeaheadProps> {
  tetherTarget: React.RefObject<HTMLDivElement>;
  element: HTMLDivElement;

  static defaultProps: Partial<TextareaTypeaheadProps> = {
    s: 'medium',
    maxDropdownHeight: DEFAULT_MAX_HEIGHT,
  };

  constructor(props: TextareaTypeaheadProps) {
    super(props);
    this.tetherTarget = React.createRef<HTMLDivElement>();
  }

  downshiftStateReducer = combineReducers<string>([
    downshiftReducerCreators.ignoreNullInput(),
    downshiftReducerCreators.clearHighlightOnInputChange(),
    downshiftReducerCreators.omitSelection(this),
    downshiftReducerCreators.closeOnEmptyInput(),
    (state, changes, originalChanges) => {
      if (originalChanges.selectedItem) {
        return {
          ...changes,
          inputValue: this.getLastWord(state.inputValue).beforeLastWord.concat(originalChanges.inputValue),
        };
      }
      return changes;
    },
  ]);

  getLastWord = (word: string) => {
    const match = word.match(/\s\S*$/);
    return {
      lastWord: match ? word.slice(match.index + 1) : word,
      beforeLastWord: match ? word.slice(0, match.index + 1) : '',
    };
  };

  render() {
    const { name, error, s: size, maxDropdownHeight, onChange, value, autoFocus, placeholder } = this.props;
    return (
      <Downshift
        inputValue={value}
        itemToString={_.identity}
        stateReducer={this.downshiftStateReducer}
        onInputValueChange={onChange}
        labelId={getLabelId(name)}
        inputId={name}
      >
        {({ getInputProps, getItemProps, inputValue, selectedItem, highlightedIndex, isOpen }) => {
          const OptionInterface = createSelectOptionInterface<string>();
          const lastWord = this.getLastWord(inputValue || '').lastWord;
          const currentWordFilter = createCurrentWordFilter(lastWord);
          const withMatchEmphasis = createMatchEmphasisHelper(lastWord);
          const renderedChildren = this.props.children({
            inputValue,
            currentWordFilter,
            withMatchEmphasis,
            SelectOption: OptionInterface,
            SelectGroup: SelectGroupInterface,
          });

          let numRenderedOptions = 0;

          const optionFactory = new SelectOptionFactory<string>({
            getItemProps,
            size,
            selectedItem,
            highlightedIndex,
            withMatchEmphasis,
            getOptionText: _.identity,
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

          const dropdownContent = getDropdownContent({ numRenderedOptions, options: searchOptions });

          return (
            <div>
              <div ref={this.tetherTarget}>
                <Textarea
                  {...getInputProps()}
                  name={name}
                  hasError={error}
                  aria-describedby={error ? getErrorId(name) : undefined}
                  autoFocus={autoFocus}
                  placeholder={placeholder}
                />
              </div>
              {isOpen && (
                <Tethered containerProps={{ zIndex: theme.zIndex.dropdown }} target={this.tetherTarget} matchWidth>
                  <SelectOptions aria-hidden position="static" maxHeight={maxDropdownHeight} s={size}>
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

export default TextareaTypeahead;
