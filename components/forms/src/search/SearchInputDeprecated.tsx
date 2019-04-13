import React, { ChangeEvent, Component } from 'react';
import { debounce, pickBy } from 'lodash';
import { ObjectOmit } from 'typelevel-ts';

import { styled } from 'z-frontend-theme';
import { Button } from 'z-frontend-elements';
import { isUtilProp, Box, BoxProps, Icon } from 'zbase';
import { color, heights, radius, space } from 'z-frontend-theme/utils';

import { commonTextInputStyles } from '../input/Input';
import { KEY_CODES } from '../select/utils';

export type SearchInputSize = 'small' | 'medium' | 'large';

type SearchPresentationProps = BoxProps & {
  s?: SearchInputSize;
};

type SearchInputOwnProps = {
  /** Event handler for when the value changes. */
  onChange?: (query: string) => void;
  /** onSubmit is called when Enter is pressed */
  onSubmit?: (query: string) => void;
  /** onClear is called when 'x' button is clicked */
  onClear?: () => void;
  /** Whether we debounce the onChange handler when the user is typing, default is true */
  debounce?: boolean;
  /** wait time in milliseconds for debounce, default is 300 */
  debounceWaitTime?: number;
  /** placeholder for input, default is 'Search' */
  placeholder?: string;
  /** placeholder for text on button, default is 'Search' */
  buttonText?: string;
};

export type Props = ObjectOmit<SearchPresentationProps, keyof SearchInputOwnProps> & SearchInputOwnProps;

export interface State {
  query: string;
  expanded: boolean;
  focused: boolean;
}

/** Component that starts as a search button and expands into an input. Includes input debouncing and enter submit. */
class SearchInput extends Component<Props, State> {
  static defaultProps = {
    s: 'medium',
    debounce: true,
    debounceWaitTime: 300,
    placeholder: 'Search',
    buttonText: 'Search',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      query: (Array.isArray(props.defaultValue) ? props.defaultValue[0] : props.defaultValue) || '',
      focused: false,
      expanded: !!props.defaultValue,
    };
  }

  input: HTMLElement;

  expand = () => {
    this.setState({ expanded: true });
  };

  onBlur = () => {
    if (this.state.query === '') {
      this.setState({ expanded: false, focused: false });
    } else {
      this.setState({ focused: false });
    }
  };

  onFocus = () => {
    // This may be triggered by enclosing div, so ensure focus is set to actual div.
    if (this.input !== document.activeElement) {
      this.input.focus();
    }
    this.setState({ focused: true });
  };

  submit = (query: string) => {
    this.props.onSubmit && this.props.onSubmit(query);
  };

  clear = () => {
    this.setState({ query: '' });
    this.handleQueryChange('');
    this.props.onClear && this.props.onClear();
  };

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    this.setState({ query });
    this.props.debounce ? this.debouncedQueryChange(query) : this.handleQueryChange(query);
  };

  onKeyDown = (e: any) => {
    if (e.keyCode === KEY_CODES.ENTER) this.submit(e.target.value);
  };

  handleQueryChange = (query: string) => {
    this.props.onChange && this.props.onChange(query);
  };

  debouncedQueryChange = debounce(this.handleQueryChange, this.props.debounceWaitTime);

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.expanded && !prevState.expanded) {
      this.input.focus();
    }
  }

  render() {
    const { s: size, ...rest } = this.props;
    const utilProps = pickBy(rest, (value, key) => isUtilProp(key));

    return this.state.expanded ? (
      <SearchControl
        onBlur={this.onBlur}
        s={size}
        focused={this.state.focused}
        onClick={this.onFocus}
        {...{
          ...utilProps,
          onChange: null,
          onSubmit: null,
        }}
      >
        <InputIcon>
          <Icon iconName="search" />
        </InputIcon>
        <input
          value={this.state.query}
          onChange={this.onInputChange}
          onKeyDown={this.onKeyDown}
          onFocus={this.onFocus}
          ref={input => (this.input = input)}
          placeholder={this.props.placeholder}
          role="combobox"
        />
        {this.state.query && (
          <InputIcon pr={2}>
            <Icon iconName="close" onClick={this.clear} />
          </InputIcon>
        )}
      </SearchControl>
    ) : (
      <Button onClick={this.expand} mode="transparent" s={size}>
        <Icon iconName="search" mr={2} />
        {this.props.buttonText}
      </Button>
    );
  }
}

const InputIcon = styled(Box)`
  cursor: pointer;
  width: 25px;
  color: ${color('grayscale.d')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchControl = styled<SearchPresentationProps & { focused?: boolean }>(Box)`
  ${commonTextInputStyles};
  display: flex;
  height: ${props => heights(props.s)};
  box-shadow: ${props => (props.focused ? `0 0 0 1px ${color('tertiary.a', 0.5)(props)}` : 'none')};
  width: 100%;
  border: 1px solid ${props => (props.focused ? color('tertiary.a', 0.5) : color('secondary.b'))} !important;
  padding-left: ${props => (props.s === 'small' ? space(1) : space(2))};
  padding-right: 0;
  border-bottom-right-radius: ${radius()};
  border-bottom-left-radius: ${radius()};

  > input {
    flex-grow: 1;
    background: none;
    border: 0 none;
    outline: none;
    font-family: inherit;
    font-size: inherit;
  }
`;

export default SearchInput;
