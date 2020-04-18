/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-array-index-key */
import React, { Component, KeyboardEvent } from 'react';

import { css, styled } from 'z-frontend-theme';
import { Box, BoxProps, Flex } from 'zbase';
import { color, fontSizes, heights, px, radius, space, zIndex } from 'z-frontend-theme/utils';

import SearchInput, {
  Props as SearchInputProps,
  SearchInputSize,
  State as SearchInputState,
} from './SearchInputDeprecated';

import { KEY_CODES } from '../select/utils';

const sizeMap: { [size in SearchInputSize]: number } = {
  small: 0,
  medium: 1,
  large: 2,
};

export type SearchSelectOption = {
  value: string;
  data?: any;
};

type SharedSearchProps = SearchInputProps & {
  // onSelectOption is called when Enter is pressed with a selection, or an option is clicked
  onSelectOption?: (option: SearchSelectOption, query: string) => void;
  // Default is false. If set to true, selection will trigger submission
  // If you only care about the string in input, you can set this to true and just use onSubmit
  submitOnSelect?: boolean;
  // Whether it is async to get options, default is true.
  async?: boolean;
  // A render prop to display options
  renderOption?: (option: SearchSelectOption, query?: string) => JSX.Element;
  // Whether to use distinguished color for matching characters in options
  showMatchingChars?: boolean;
};

type StandardSearchProps = SharedSearchProps & {
  getOptions: (str: string) => SearchSelectOption[] | Promise<SearchSelectOption[]>;
};

type BasicSearchSelectProps = SharedSearchProps & {
  options: SearchSelectOption[];
  limit?: number;
};

interface SearchState extends SearchInputState {
  loading: boolean;
  options: SearchSelectOption[];
  displayOptions: boolean;
  selectionIndex: number;
}

class SearchSelect extends Component<StandardSearchProps, SearchState> {
  static defaultProps = {
    s: 'medium',
    async: true,
    debounce: true,
    debounceTimeout: 300,
    placeholder: 'Search',
    buttonText: 'Search',
    showMatchingChars: true,
    submitOnSelect: false,
  };

  constructor(props: StandardSearchProps) {
    super(props);
    this.state = {
      query: Array.isArray(props.defaultValue) ? String(props.defaultValue[0]) : props.defaultValue || '',
      focused: false,
      expanded: !!props.defaultValue,
      loading: false,
      options: [],
      selectionIndex: -1,
      displayOptions: false,
    };
  }

  updateSelection = (selectionIndex: number) => {
    this.setState({ selectionIndex });
  };

  cycleDownSelection = () => {
    if (this.state.options && this.state.options.length > 0) {
      const nextSelection = Math.min(this.state.selectionIndex + 1, this.state.options.length - 1);
      this.updateSelection(nextSelection);
    }
  };

  cycleUpSelection = () => {
    if (this.state.options && this.state.options.length > 0 && this.state.selectionIndex > 0) {
      const nextSelection = this.state.selectionIndex - 1;
      this.updateSelection(nextSelection);
    }
  };

  select = (selectionIndex: number) => {
    const selection = this.state.options[selectionIndex];
    this.props.onSelectOption && this.props.onSelectOption(selection, this.state.query);
    this.setState({ selectionIndex: -1, displayOptions: false });

    if (this.props.submitOnSelect) {
      this.submit(this.state.query);
    }
  };

  submit = (query: string) => {
    this.props.onSubmit && this.props.onSubmit(query);
  };

  onSearchInputSubmit = (query: string) => {
    this.setState({ displayOptions: false });
    const { selectionIndex } = this.state;
    if (selectionIndex > -1) {
      this.select(selectionIndex);
    } else {
      this.submit(query);
    }
  };

  onSearchInputClear = () => {
    this.props.onClear && this.props.onClear();
  };

  onSearchInputChange = (query: string) => {
    this.setState({ query, selectionIndex: -1 });

    if (this.props.async || this.props.debounce) {
      this.setState({ loading: true });
    }

    this.props.onChange && this.props.onChange(query);
    this.updateOptions(query);
  };

  onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.keyCode) {
      case KEY_CODES.TAB:
        if (this.state.options && this.state.options.length > 0) {
          this.select(Math.max(this.state.selectionIndex, 0));
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

  updateOptions = async (query: string) => {
    if (query) {
      const options = await this.props.getOptions(query);
      this.setState({
        options,
        displayOptions: true,
        selectionIndex: -1,
        loading: false,
      });
    } else {
      this.setState({
        options: [],
        selectionIndex: -1,
        loading: false,
        displayOptions: false,
      });
    }
  };

  MatchingChar = styled.span`
    color: ${color('grayscale.b')};
  `;

  defaultRenderOption = (option: SearchSelectOption, query: string) => {
    const { value } = option;
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

  render() {
    const { s: size, debounce, debounceWaitTime, placeholder, buttonText, defaultValue, ...rest } = this.props;
    const showOptionsBox = this.state.displayOptions || this.state.loading;

    return (
      <SearchContainer onKeyDown={this.onKeyDown}>
        <SearchInput
          {...rest}
          s={size}
          onChange={this.onSearchInputChange}
          onSubmit={this.onSearchInputSubmit}
          onClear={this.onSearchInputClear}
          debounce={debounce}
          debounceWaitTime={debounceWaitTime}
          placeholder={placeholder}
          buttonText={buttonText}
          defaultValue={defaultValue}
        />
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
                  onMouseDown={() => this.select(i)}
                  selected={this.state.selectionIndex === i}
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
    );
  }
}

export const SearchContainer = styled(Box)`
  position: relative;
`;

export default SearchSelect;

type SearchOptionsProps = {
  s?: SearchInputSize;
  isTethered?: boolean;
  maxHeight?: string;
  highlightTop?: boolean;
};

export const SearchOptions = styled(Box)<SearchOptionsProps>`
  position: ${props => !props.isTethered && 'absolute'};
  width: 100%;
  z-index: ${zIndex('dropdown')};
  border-radius: 0 0 ${radius()} ${radius()};
  border: 1px solid ${color('secondary.b')};
  border-top: 2px solid ${color('tertiary.a', 0.5)};
  background-color: ${color('grayscale.white')};
  box-shadow: none;
  margin-top: -1px;
  font-size: ${props => fontSizes(sizeMap[props.s as SearchInputSize])};
  max-height: ${props => props.maxHeight && px(props.maxHeight)};
  overflow-y: auto;
`;

type SearchOptionProps = { s?: SearchInputSize; selected?: boolean; selectable?: boolean };
const optionStyles = css<SearchOptionProps>`
  cursor: ${props => props.selectable && 'pointer'};
  color: ${color('grayscale.d')};
  background-color: ${props => props.selected && color('tertiary.c')};
`;

const createSearchItemComponent = (defaultProps: Partial<SearchOptionProps & BoxProps>) => {
  const OptionComponent = styled(Box)<BoxProps & SearchOptionProps>`
    ${optionStyles}
    min-height: ${space(5)};
  `;
  const sharedDefaults = { px: 3, py: 2 };
  OptionComponent.defaultProps = {
    ...sharedDefaults,
    ...defaultProps,
  };
  return OptionComponent;
};

export const SearchOption = createSearchItemComponent({ selectable: true, fontStyle: 'paragraphs.m' });
export const SearchHeader = createSearchItemComponent({ selectable: false, fontStyle: 'headings.xs' });

export const FixedHeightSearchOption = styled(Flex)<{ height?: string }>`
  ${optionStyles};
  height: ${props => heights(props.height)(props)};
`;
FixedHeightSearchOption.defaultProps = {
  height: 'small',
  align: 'center',
  fontStyle: 'paragraphs.m',
  px: 3,
};

// BasicSearchSelect uses a predefined set of options
export const BasicSearchSelect: React.StatelessComponent<BasicSearchSelectProps> = ({ options, limit, ...rest }) => {
  const getOptions = (query: string) => {
    const filtered = options.filter(option => option.value.toLowerCase().includes(query.toLowerCase()));
    return limit ? filtered.slice(0, limit) : filtered;
  };
  return <SearchSelect {...rest} getOptions={getOptions} async={false} debounce={false} />;
};
