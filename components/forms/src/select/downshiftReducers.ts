import _ from 'lodash';
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift';

import { NEW_OPTION_DUMMY_VALUE } from './SelectOptions';

type DownshiftReducer<OptionValue> = (
  state: DownshiftState<OptionValue>,
  changes: StateChangeOptions<OptionValue>,
  originalChanges?: StateChangeOptions<OptionValue>,
) => Partial<StateChangeOptions<OptionValue>>;

function createHandleNewOptionReducer<OptionValue>(context: {
  props: {
    onCreateNewOption?: (inputValue: string) => void;
  };
}) {
  const reducer: DownshiftReducer<OptionValue> = (state, changes) => {
    if (changes.selectedItem === (NEW_OPTION_DUMMY_VALUE as any)) {
      context.props.onCreateNewOption && context.props.onCreateNewOption(state.inputValue);
      return _.omit(changes, 'selectedItem');
    }
    return changes;
  };
  return reducer;
}

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

function createOmitSelectionReducer<OptionValue>(context: {
  props: {
    onSelect?: (selection: OptionValue) => void;
  };
}) {
  const reducer: DownshiftReducer<OptionValue> = (state, changes) => {
    if (changes.selectedItem) {
      context.props.onSelect && context.props.onSelect(changes.selectedItem);
      return _.omit(changes, 'selectedItem');
    }
    return changes;
  };
  return reducer;
}

function createIgnoreNullInputReducer<OptionValue>() {
  const reducer: DownshiftReducer<OptionValue> = (state, changes) => {
    if (
      changes.hasOwnProperty('inputValue') &&
      !changes.inputValue &&
      changes.type !== Downshift.stateChangeTypes.changeInput
    ) {
      return _.omit(changes, 'inputValue');
    } else {
      return changes;
    }
  };
  return reducer;
}

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
