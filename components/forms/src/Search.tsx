import React, { Component } from 'react';
import { debounce, pickBy } from 'lodash';
import { styled } from 'z-frontend-theme';
import { Box, BoxProps, Icon, isUtilProp } from 'zbase';
import { color, fontSizes, heights, radius, space, zIndex } from 'z-frontend-theme/utils';
import { commonTextInputStyles } from './Input';
import Button from './Button';

require('react-select/dist/react-select.css');

const KEY_CODES = {
  TAB: 9,
  ENTER: 13,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
};

// TODO: use new font styles once PR is merged
const sizeMap = {
  small: 0,
  medium: 1,
  large: 2,
};

export type Option = {
  value: string;
  data?: any;
};

type SearchPresentationProps = BoxProps & {
  s?: 'small' | 'medium' | 'large';
  value?: string | string[] | number;
};

type SharedSearchProps = SearchPresentationProps & {
  onChange?: (query: string) => void;
  // onSubmit is called when Enter is pressed without a selection
  // It will also be called if submitOnSelect is set to true and onSelect is called
  onSubmit?: (query: string) => void;
  // onSelect is called when Enter is pressed with a selection, or an option is clicked
  onSelection?: (option: Option, query: string) => void;
  // Default is false. If set to true, selection will trigger submission
  // If you only care about the string in input, you can set this to true and just use onSubmit
  submitOnSelect?: boolean;
  async?: boolean;
  debounce?: boolean;
  debounceTimeout?: number;
  renderOption?: (option: Option, query?: string) => JSX.Element;
  showMatchingChars?: boolean;
  placeholder?: string;
  buttonText?: string;
  initialQuery?: string;
};

type StandardSearchProps = SharedSearchProps & {
  getOptions: (string) => Option[] | Promise<Option[]>;
};

type BasicSearchProps = SharedSearchProps & {
  options: Option[];
  limit?: number;
};

type SearchState = {
  query: string;
  expanded: boolean;
  loading: boolean;
  options: Option[];
  displayOptions: boolean;
  focused: boolean;
  selectedOption: number;
};

class Search extends Component<StandardSearchProps, SearchState> {
  static defaultProps = {
    s: 'medium',
    async: true,
    debounce: true,
    debounceTimeout: 200,
    showMatchingChars: true,
    placeholder: 'Search',
    buttonText: 'Search',
    submitOnSelect: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      query: props.initialQuery || '',
      focused: false,
      expanded: !!props.initialQuery,
      loading: false,
      options: [],
      selectedOption: -1,
      displayOptions: false,
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
      this.setState({ displayOptions: false, focused: false });
    }
  };

  onFocus = () => {
    // This may be triggered by enclosing div, so ensure focus is set to actual div.
    if (this.input !== document.activeElement) {
      this.input.focus();
    }
    this.setState({ focused: true });
  };

  updateSelection = (selectionIndex: number) => {
    this.setState({ selectedOption: selectionIndex });
  };

  cycleDownSelection = () => {
    if (this.state.options && this.state.options.length > 0) {
      const nextSelection = Math.min(this.state.selectedOption + 1, this.state.options.length - 1);
      this.updateSelection(nextSelection);
    }
  };

  cycleUpSelection = () => {
    if (this.state.options && this.state.options.length > 0 && this.state.selectedOption > 0) {
      const nextSelection = this.state.selectedOption - 1;
      this.updateSelection(nextSelection);
    }
  };

  submitSelection = (selectionIndex: number) => {
    const selection = this.state.options[selectionIndex];
    const selectionValue = selection.value;
    this.props.onSelection && this.props.onSelection(selection, this.state.query);
    if (this.props.submitOnSelect) {
      this.submit(selectionValue);
    }
  };

  submit = (query: string) => {
    if (this.state.query !== query) {
      this.handleQueryChange(query, false);
    }
    this.setState({ displayOptions: false });
    this.props.onSubmit && this.props.onSubmit(query);
  };

  clear = () => {
    this.setState({ query: '', selectedOption: -1, displayOptions: false });
    this.props.onSubmit && this.props.onSubmit('');
  };

  onChange = e => {
    const query = e.target.value;
    this.setState({ query, selectedOption: -1 });

    if (query === '') {
      this.setState({ displayOptions: false });
    }

    if (this.props.async || this.props.debounce) {
      this.setState({ loading: true });
    }

    this.props.debounce ? this.debouncedQueryChange(query) : this.handleQueryChange(query);
  };

  onKeyDown = e => {
    switch (e.keyCode) {
      case KEY_CODES.ENTER:
        if (this.state.selectedOption > -1) {
          this.submitSelection(this.state.selectedOption);
        } else {
          this.submit(this.state.query);
        }
        break;

      case KEY_CODES.TAB:
        if (this.state.options && this.state.options.length > 0) {
          this.submitSelection(Math.max(this.state.selectedOption, 0));
        }
        break;

      case KEY_CODES.UP_ARROW:
        this.cycleUpSelection();
        break;

      case KEY_CODES.DOWN_ARROW:
        this.cycleDownSelection();
        break;

      default:
        break;
    }
  };

  handleQueryChange = (query: string, displayOptions: boolean = true) => {
    this.setState({ query, selectedOption: -1 });
    this.props.onChange && this.props.onChange(query);
    this.updateOptions(query, displayOptions);
  };

  debouncedQueryChange = debounce(this.handleQueryChange, this.props.debounceTimeout);

  updateOptions = async (query, displayOptions: boolean) => {
    if (query === '' || !displayOptions) {
      this.setState({
        options: [],
        selectedOption: -1,
        loading: false,
        displayOptions: false,
      });
    } else {
      const options = await this.props.getOptions(query);
      this.setState({
        options,
        displayOptions,
        selectedOption: -1,
        loading: false,
      });
    }
  };

  MatchingChar = styled.span`
    color: ${color('grayscale.b')};
  `;

  defaultRenderOption = (option: Option, query: string) => {
    const value = option.value;
    if (this.props.showMatchingChars) {
      const matchStart = value.indexOf(query);
      const matchEnd = matchStart + query.length;
      return (
        <span>
          {(() => {
            const decoratedChars: JSX.Element[] = [];
            for (let i = 0; i < value.length; i += 1) {
              decoratedChars.push(
                i >= matchStart && i < matchEnd ? (
                  <this.MatchingChar key={i}>{value.charAt(i)}</this.MatchingChar>
                ) : (
                  <span key={i}>{value.charAt(i)}</span>
                ),
              );
            }
            return decoratedChars;
          })()}
        </span>
      );
    } else {
      return <span> {option.value} </span>;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.expanded && !prevState.expanded) {
      this.input.focus();
    }
  }

  render() {
    const { value, onChange, onBlur, s: size, ...rest } = this.props;
    const utilProps = pickBy(rest, (value, key) => isUtilProp(key));
    const showOptionsBox = this.state.displayOptions || this.state.loading;

    return this.state.expanded ? (
      <SearchContainer onBlur={this.onBlur}>
        <SearchControl
          s={size}
          focused={this.state.focused}
          optionsAttached={showOptionsBox}
          onClick={this.onFocus}
          {...utilProps}
        >
          <InputIcon>
            <Icon iconName="search" />
          </InputIcon>
          <input
            value={this.state.query}
            onChange={this.onChange}
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

        {showOptionsBox && (
          <SearchOptions s={size}>
            {this.state.loading ? (
              <SearchOption s={size}>Searching...</SearchOption>
            ) : this.state.options.length > 0 ? (
              this.state.options.map((option, i) => (
                <SearchOption
                  key={i}
                  s={size}
                  onMouseEnter={() => this.updateSelection(i)}
                  onMouseDown={() => this.submitSelection(i)}
                  selected={this.state.selectedOption === i}
                >
                  {this.props.renderOption
                    ? this.props.renderOption(option, this.state.query)
                    : this.defaultRenderOption(option, this.state.query)}
                </SearchOption>
              ))
            ) : (
              <SearchOption s={size}>No results found.</SearchOption>
            )}
          </SearchOptions>
        )}
      </SearchContainer>
    ) : (
      <Button onClick={this.expand} mode="transparent" s={size}>
        <Icon iconName="search" mr={2} />
        {this.props.buttonText}
      </Button>
    );
  }
}

const SearchContainer = styled(Box)`
  position: relative;
`;

const InputIcon = styled(Box)`
  cursor: pointer;
  width: 25px;
  color: ${color('grayscale.d')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchOptions = styled<BoxProps & { s?: string }>(Box)`
  position: absolute;
  width: 100%;
  z-index: ${zIndex('dropdown')};
  border-radius: 0 0 ${radius} ${radius};
  border: 1px solid ${color('secondary.b')};
  border-top: 2px solid ${color('tertiary.a', 0.5)};
  background-color: ${color('grayscale.white')};
  box-shadow: none;
  margin-top: -1px;
  font-size: ${props => fontSizes(sizeMap[props.s])};
`;

export const SearchOption = styled<BoxProps & { s?: string; selected?: boolean }>(Box)`
  cursor: pointer;
  font-size: 14px;
  color: ${color('grayscale.d')};
  background-color: ${props => props.selected && color('tertiary.c')};
  padding: ${space(2)} ${space(3)};
`;

const SearchControl = styled<SearchPresentationProps & { optionsAttached?: boolean; focused?: boolean }>(Box)`
  ${commonTextInputStyles};
  display: flex;
  height: ${props => heights(props.s)};
  box-shadow: ${props => (props.focused ? `0 0 0 1px ${color('tertiary.a', 0.5)(props)}` : 'none')};
  width: 100%;
  border: 1px solid ${props => (props.focused ? color('tertiary.a', 0.5) : color('secondary.b'))} !important;
  padding-left: ${props => (props.s === 'small' ? space(1) : space(2))};
  padding-right: 0;
  border-bottom-right-radius: ${props => (props.optionsAttached ? '0px' : radius)};
  border-bottom-left-radius: ${props => (props.optionsAttached ? '0px' : radius)};

  > input {
    flex-grow: 1;
    background: none;
    border: 0 none;
    outline: none;
    font-family: inherit;
    font-size: inherit;
  }
`;

export default Search;

export const BasicSearch: React.StatelessComponent<BasicSearchProps> = ({ options, limit, ...rest }) => {
  const getOptions = query => {
    const filtered = options.filter(option => option.value.toLowerCase().includes(query.toLowerCase()));
    return limit ? filtered.slice(0, limit) : filtered;
  };
  return <Search getOptions={getOptions} async={false} debounce={false} {...rest} />;
};
