import { omit } from 'lodash';
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift';

import { NEW_OPTION_DUMMY_VALUE } from './SelectOptions';

type DownshiftReducer<OptionValue> = (
  state: DownshiftState<OptionValue>,
  changes: StateChangeOptions<OptionValue>,
  originalChanges?: StateChangeOptions<OptionValue>,
) => Partial<StateChangeOptions<OptionValue>>;

// If option value matches the new option dummy value, call onCreateNewOption callback
// and do not update downshift selected item state
function createHandleNewOptionReducer<OptionValue>(context: {
  props: {
    onCreateNewOption?: (inputValue: string) => void;
  };
}) {
  const reducer: DownshiftReducer<OptionValue> = (state, changes) => {
    if (changes.selectedItem === (NEW_OPTION_DUMMY_VALUE as any)) {
      context.props.onCreateNewOption && context.props.onCreateNewOption(state.inputValue);
      return omit(changes, 'selectedItem');
    }
    return changes;
  };
  return reducer;
}

// Clear input value when menu is clicked open
//
// This is useful for Select and MultiSelect because each time we open the menu it should start a fresh search
function createResetOnOpenReducer<OptionValue>() {
  const reducer: DownshiftReducer<OptionValue> = (state, changes) => {
    if (changes.type === Downshift.stateChangeTypes.clickButton && changes.isOpen) {
      return {
        ...changes,
        inputValue: '',
        highlightedIndex: undefined,
      };
    }
    return changes;
  };
  return reducer;
}

// On selection, fire callback but do not update downshift selectedItem state
// We do this for SearchSelect because the input is free text, and the selectedItem
// is not retained after the input is edited further.
//
// If we don't include this, then we can't select the same item twice, and there is
// a highlight for the last value selected even if the field is edited
function createOmitSelectionReducer<OptionValue>(context: {
  props: {
    onSelect?: (selection: OptionValue) => void;
  };
}) {
  const reducer: DownshiftReducer<OptionValue> = (state, changes) => {
    if (changes.selectedItem) {
      context.props.onSelect && context.props.onSelect(changes.selectedItem);
      return omit(changes, 'selectedItem');
    }
    return changes;
  };
  return reducer;
}

// Ignore changes updating input to empty value, unless it was explicitly edited
// Otherwise, the input value will clear on blur (assuming value wasn't selected)
//
// This is useful for SearchSelect because all input values are valid, so blurring
// should not clear the input
function createIgnoreNullInputReducer<OptionValue>() {
  const reducer: DownshiftReducer<OptionValue> = (state, changes) => {
    if (
      changes.hasOwnProperty('inputValue') &&
      !changes.inputValue &&
      changes.type !== Downshift.stateChangeTypes.changeInput
    ) {
      return omit(changes, 'inputValue');
    } else {
      return changes;
    }
  };
  return reducer;
}

// Close the menu when we clear text input
function createCloseOnEmptyInputReducer<OptionValue>() {
  const reducer: DownshiftReducer<OptionValue> = (state, changes) => {
    if (changes.type === Downshift.stateChangeTypes.changeInput && !changes.inputValue) {
      return {
        ...changes,
        isOpen: false,
      };
    }
    return changes;
  };
  return reducer;
}

// Removes highlight when text input is edited
function createClearHighlightOnInputChangeReducer<OptionValue>() {
  const reducer: DownshiftReducer<OptionValue> = (state, changes) => {
    if (changes.inputValue) {
      return {
        ...changes,
        highlightedIndex: null,
      };
    }
    return changes;
  };
  return reducer;
}

export const downshiftReducerCreators = {
  handleNewOption: createHandleNewOptionReducer,
  resetOnOpen: createResetOnOpenReducer,
  omitSelection: createOmitSelectionReducer,
  ignoreNullInput: createIgnoreNullInputReducer,
  closeOnEmptyInput: createCloseOnEmptyInputReducer,
  clearHighlightOnInputChange: createClearHighlightOnInputChangeReducer,
};

export function combineReducers<OptionValue>(reducers: DownshiftReducer<OptionValue>[]) {
  return (state: DownshiftState<OptionValue>, originalChanges: StateChangeOptions<OptionValue>) =>
    reducers.reduce(
      (accumulatedChanges, reducer) => reducer(state, accumulatedChanges, originalChanges),
      originalChanges,
    );
}
