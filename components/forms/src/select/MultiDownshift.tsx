import React from 'react';

import Downshift, { DownshiftProps, DownshiftState, StateChangeOptions } from 'downshift';

class MultiDownshift<OptionValue> extends React.Component<
  DownshiftProps<OptionValue> & {
    onChange?: (selections: OptionValue[]) => void;
    selectedItems?: OptionValue[];
  }
> {
  stateReducer = (state: DownshiftState<OptionValue>, originalChanges: StateChangeOptions<OptionValue>) => {
    let changes = { ...originalChanges };
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        changes = {
          ...changes,
          highlightedIndex: state.highlightedIndex,
          isOpen: true,
          inputValue: '',
        };
    }

    return this.props.stateReducer ? this.props.stateReducer(state, changes) : changes;
  };

  clearItem = (index: number) => {
    const { selectedItems } = this.props;
    this.props.onChange(selectedItems.slice(0, index).concat(selectedItems.slice(index + 1)));
  };

  clearAll = () => {
    this.props.onChange([]);
  };

  addSelectedItem = (item: OptionValue) => {
    this.props.onChange([...this.props.selectedItems, item]);
  };

  getStateAndHelpers(downshift: any) {
    return {
      ...downshift,
      selectedItems: this.props.selectedItems,
      clearItem: this.clearItem,
      clearAll: this.clearAll,
    };
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <Downshift {...props} stateReducer={this.stateReducer} onChange={this.addSelectedItem} selectedItem={null}>
        {downshift => children(this.getStateAndHelpers(downshift))}
      </Downshift>
    );
  }
}

export default MultiDownshift;
