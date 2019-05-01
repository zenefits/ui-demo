import React, { Component } from 'react';

import { Button } from 'z-frontend-elements';
import { Icon } from 'zbase';

import Input, { InputProps } from '../input/Input';
import InputWithIcon from '../input-with-icon/InputWithIcon';

type SearchInputOwnProps = {
  // onClear is called when 'x' button is clicked
  onClear?: () => void;
  // placeholder for input, default is 'Search'
  placeholder?: string;
  // placeholder for text on button, default is 'Search'
  buttonText?: string;
  // whether the input is expanded or not
  isExpanded: boolean;
  // called when unexpanded button is clicked
  disabled: boolean;
  expand: () => void;
  omitIcon?: boolean;
  innerRef?: React.RefObject<any>;
};

// export type Props = ObjectOmit<SearchPresentationProps, keyof SearchInputOwnProps> & SearchInputOwnProps;
type SearchInputProps = SearchInputOwnProps & InputProps;

type SearchInputState = { hasExpanded: boolean | null };

/** Component that starts as a search button and expands into an input. Includes input debouncing and enter submit. */
class SearchInput extends Component<SearchInputProps, SearchInputState> {
  static defaultProps = {
    placeholder: 'Search',
    buttonText: 'Search',
    isExpanded: false,
  };

  // Track if component has just expanded on this render cycle
  static getDerivedStateFromProps(props: SearchInputProps, state: SearchInputState) {
    return {
      hasExpanded: props.isExpanded && !state.hasExpanded && state.hasExpanded !== null,
    };
  }

  constructor(props: SearchInputProps) {
    super(props);
    this.state = {
      hasExpanded: null,
    };
  }

  getInput() {
    const { s: size, isExpanded, omitIcon, disabled, autoFocus, ...inputProps } = this.props;
    return omitIcon ? (
      <Input s={size} disabled={disabled} {...inputProps} autoFocus={autoFocus || this.state.hasExpanded} />
    ) : (
      <InputWithIcon s={size} leftIconName="search" disabled={disabled} {...inputProps} />
    );
  }

  render() {
    const { s: size, disabled, isExpanded } = this.props;
    return isExpanded ? (
      this.getInput()
    ) : (
      <Button onClick={this.props.expand as any} mode="transparent" disabled={disabled} s={size}>
        <Icon iconName="search" mr={2} />
        {this.props.buttonText}
      </Button>
    );
  }
}

export default SearchInput;
