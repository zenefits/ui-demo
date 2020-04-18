import React, { Component } from 'react';
import { render } from 'react-dom';
import { isEqual } from 'lodash';

import { ThemeProvider } from 'z-frontend-theme';
import { BoxProps } from 'zbase';

import RichEditor from '../rich-editor/RichEditor';
import { nonIDCharRegex, splitIntoMentions, userMentionRegex, MentionsMap } from './MentionText';
import Mention from './Mention';
import MentionSelect, { MentionOption } from './MentionSelect';
import { SearchContainer } from '../search/SearchSelectDeprecated';
import { removeMentionWithBackspace } from './util';

type MentionTextareaOwnProps = {
  /**
   * Should the input have focus when the page loads?
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Is the input in an error state?
   * @default false
   */
  hasError?: boolean;

  name?: string;

  /** Initial editor value. */
  defaultValue?: string;

  /** Event handler for when the value changes. */
  onChange?: (value: string) => void;
  /**
   * Event handler for when the element gains focus.
   * https://developer.mozilla.org/en-US/docs/Web/Events/focus
   */
  onFocus?: any;
  /**
   * Event handler for when the element loses focus.
   * https://developer.mozilla.org/en-US/docs/Web/Events/blur
   */
  onBlur?: any;

  /**
   * Is the editor disabled?
   * @default false
   */
  disabled?: boolean;

  /**
   * Mention options available.
   */
  options?: MentionOption[];

  /**
   * Async mention options available. Typically used when there are many possible options (see `options`).
   */
  // getOptions?: (query: string) => MentionOption[] | Promise<MentionOption[]>;

  /**
   * Allows the input to be resized. See https://developer.mozilla.org/en-US/docs/Web/CSS/resize
   * @default vertical
   */
  resize?: string;

  /** Starting height of textarea, in pixels */
  height?: string | number;
};

export type MentionTextareaProps = Omit<BoxProps, keyof MentionTextareaOwnProps> & MentionTextareaOwnProps;

type MentionTextareaState = {
  showMentionSelect?: boolean;
  mentionSelectedIndex?: number;
  mentionSearchQuery?: string;
  mentionSuggestions: MentionOption[];
};

const maxOptions = 10;

function defaultSearchFilter(query: string, options: MentionOption[]) {
  if (typeof query !== 'string') {
    return [];
  }
  const value = query.toLowerCase();
  const filtered = options.filter(option => {
    return !value || option.menuLabel.toLowerCase().includes(value);
  });
  const length = Math.min(filtered.length, maxOptions);
  return filtered.slice(0, length);
}

function makeMentionFromOption(option: MentionOption) {
  return {
    id: option.id,
    label: option.tagLabel,
  };
}

function prepareMentions(value: string, options: MentionOption[]): string {
  const matches = (value || '').match(userMentionRegex);
  if (!matches) {
    return value;
  }

  const mentionKeysPresent = matches.map(match => match.replace(nonIDCharRegex, ''));
  const mentions: MentionsMap = {};
  options.forEach(option => {
    const mentioned = mentionKeysPresent.includes(option.id);
    if (mentioned && !mentions[option.id]) {
      mentions[option.id] = makeMentionFromOption(option);
    }
  });
  return splitIntoMentions(value, mentions, { usePlaceholders: true }).join('');
}

class MentionTextarea extends Component<MentionTextareaProps, MentionTextareaState> {
  static defaultProps = {
    s: 'medium',
  };

  editor: any; // there's no @typed/squire-rte :(

  constructor(props: MentionTextareaProps) {
    super(props);
    this.state = {
      showMentionSelect: false,
      mentionSelectedIndex: 0,
      mentionSearchQuery: null,
      mentionSuggestions: [],
    };
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (!this.state.showMentionSelect) {
      if (event.key === 'Backspace') {
        const container = this.editor.getSelection().startContainer;
        removeMentionWithBackspace(event, container);
      }
      return;
    }

    const { mentionSelectedIndex, mentionSuggestions } = this.state;
    switch (event.key) {
      case 'Backspace':
        if (!this.state.mentionSearchQuery.length) {
          // must be deleting @
          this.closeMentionSelect();
        } else {
          // delete character off end
          this.setState(prevState => ({
            mentionSearchQuery: prevState.mentionSearchQuery.slice(0, -1),
          }));
        }
        break;
      case 'Escape':
      case 'ArrowLeft':
      case 'ArrowRight':
        this.closeMentionSelect();
        break;
      case 'Enter':
        event.preventDefault();
        this.handleMentionSelected(mentionSelectedIndex);
        break;
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = (1 + mentionSelectedIndex) % mentionSuggestions.length;
        this.updateMentionSelect(nextIndex);
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const previousIndex = mentionSelectedIndex === 0 ? mentionSuggestions.length - 1 : mentionSelectedIndex - 1;
        this.updateMentionSelect(previousIndex);
        break;
      }
    }
  };

  updateMentionSelect = (index: number) => {
    this.setState({ mentionSelectedIndex: index });
  };

  handleKeyPress = (event: KeyboardEvent) => {
    if (this.state.showMentionSelect) {
      if (event.key === ' ') {
        // give up on filtering mentions if user hits space
        this.closeMentionSelect();
      } else {
        this.setState(prevState => ({
          mentionSearchQuery: (prevState.mentionSearchQuery || '') + event.key,
        }));
      }
    } else {
      const { options } = this.props;
      const hasOptions = options && options.length;
      if (event.key === '@' && hasOptions) {
        this.setState({ showMentionSelect: true, mentionSearchQuery: '' });
      }
    }
  };

  componentDidMount() {
    this.renderMentionsJSX();
  }

  componentDidUpdate(prevProps: MentionTextareaProps, prevState: MentionTextareaState) {
    const query = this.state.mentionSearchQuery;
    if (query !== prevState.mentionSearchQuery) {
      this.updateSuggestions(query);
    }
    if (!isEqual(prevProps.options.slice(0, 10), this.props.options.slice(0, 10))) {
      this.renderMentionsJSX();
    }
  }

  updateSuggestions = async (query: string) => {
    if (this.props.options) {
      this.setState({
        mentionSuggestions: defaultSearchFilter(query, this.props.options),
      });
    }
    // else if (this.props.getOptions) {
    //   const mentionSuggestions = await this.props.getOptions(query);
    //   this.setState({
    //     mentionSuggestions,
    //   });
    // }
  };

  getTextFromHtml() {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this.editor.getHTML().replace(/<br\s*[\/]?>/gi, '\n');

    const placeholders = tempDiv.querySelectorAll('.mention-placeholder');
    Array.from(placeholders).forEach((element: HTMLElement) => {
      const mentionKey = element.dataset.mention;
      element.outerHTML = `[@${mentionKey}]`;
    });
    return tempDiv.textContent;
  }

  handleChange = () => {
    this.props.onChange && this.props.onChange(this.getTextFromHtml());
  };

  renderMentionsJSX() {
    const { options } = this.props;

    const elements = document.querySelectorAll(`.mention-placeholder`);
    if (!elements.length) {
      return;
    }

    function lookupMention(key: string) {
      const option = options.find(option => option.id === key);
      if (option) {
        return makeMentionFromOption(option);
      }
    }

    Array.from(elements).forEach((element: HTMLElement) => {
      const mentionKey = element.dataset.mention;
      const mention = lookupMention(mentionKey);
      if (mention) {
        // intentionally omit tooltip because it causes line breaks in the editor
        const jsx = (
          <ThemeProvider>
            <Mention label={mention.label} contentEditable={false} style={{ userSelect: 'none' }} />
          </ThemeProvider>
        );
        render(jsx, element);
      }
    });
  }

  addMentionFromSuggestion(suggestion: MentionOption) {
    const textMention = `[@${suggestion.id}]`;
    const prepared = prepareMentions(textMention, this.props.options);
    this.editor.insertHTML(`${prepared}\u200B`); // zero-width space for smooth editing experience
    this.renderMentionsJSX();
  }

  deleteSearchQueryFromEditor = () => {
    const range = this.editor.getSelection();
    const { mentionSearchQuery } = this.state;
    const charsToDelete = 1 + mentionSearchQuery.length; // mentionPrefix + query
    const newRange = document.createRange();
    newRange.setStart(range.startContainer, range.startOffset - charsToDelete);
    newRange.setEnd(range.startContainer, range.startOffset);

    this.editor.setSelection(newRange);
  };

  handleMentionSelected = (index: number) => {
    this.editor.focus();
    const suggestion = this.state.mentionSuggestions[index];
    if (!suggestion) {
      // eg @xxx no match
      this.closeMentionSelect();
      return;
    }

    this.deleteSearchQueryFromEditor(); // note: order matters here
    this.closeMentionSelect();
    this.addMentionFromSuggestion(suggestion);
  };

  closeMentionSelect = () => {
    this.setState({
      showMentionSelect: false,
      mentionSearchQuery: null,
      mentionSelectedIndex: 0,
    });
  };

  render() {
    const { disabled, defaultValue, onChange, options, ...rest } = this.props;
    const { mentionSelectedIndex } = this.state;
    const contentWithMentions = prepareMentions(defaultValue, options);

    // In the case where the options list is updated, we want to re-render mentions (eg. replace loading tags)
    // Since component uses squire and doesn't respond normally to new React props, remounting is to only way
    // to accomplish this.
    //
    // Just checking first 10 options should be able to handle these use cases while avoiding performance hit
    // when component doesn't need it
    const optionsDerivedKey = JSON.stringify(this.props.options.slice(0, 10));

    return (
      <SearchContainer>
        <RichEditor
          key={optionsDerivedKey}
          disabled={disabled}
          defaultValue={contentWithMentions}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onKeyDown={this.handleKeyDown}
          onBlur={this.closeMentionSelect}
          showToolbar={false}
          editorRef={editor => {
            this.editor = editor;
          }}
          {...rest}
        />
        {this.state.showMentionSelect && (
          <MentionSelect
            selectedIndex={mentionSelectedIndex}
            suggestions={this.state.mentionSuggestions}
            onMentionClick={this.handleMentionSelected}
            onMentionHover={this.updateMentionSelect}
          />
        )}
      </SearchContainer>
    );
  }
}

export default MentionTextarea;
