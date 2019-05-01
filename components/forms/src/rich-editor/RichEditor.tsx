import React, { Component } from 'react';
// @ts-ignore
import Editor from 'squire-rte';

import { IconButton } from 'z-frontend-elements';
import { Box, Flex } from 'zbase';
import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

import { commonTextareaStyles } from '../textarea/Textarea';

// NOTE: this component is WIP
// it forms the foundation for MentionTextarea but will eventually be used on its own

function testPresenceInSelection(editor: Editor, format: string, regex: RegExp) {
  return regex.test(editor.getPath()) || editor.hasFormat(format);
}

function toggleAction(editor: Editor, activeFn: string, removeFn: string, format: string, regex: RegExp) {
  if (testPresenceInSelection(editor, format, regex)) {
    (editor as any)[removeFn]();
  } else {
    (editor as any)[activeFn]();
    editor.focus();
  }
}

const EditorContainer = styled(Box)`
  > div {
    ${commonTextareaStyles};
    /* match textarea defaults */
    overflow: auto; /* required to show resize */
    min-height: 60px;
    font-weight: normal;
  }

  /* note: :disabled doesn't work for contenteditable */
  > div:read-only {
    background-color: ${color('grayscale.g')};
    border-color: ${color('grayscale.g')};
    color: ${color('text.light')};
  }
`;

type RichEditorProps = {
  /** Initial text to show in the editor. Because this is an uncontrolled component, the DOM then owns the value. */
  defaultValue?: string;

  /**
   * Show the formatting toolbar.
   * @default true
   */
  showToolbar?: boolean;

  /**
   * Allows the input to be resized. See https://developer.mozilla.org/en-US/docs/Web/CSS/resize
   * @default vertical
   */
  resize?: string;

  /** Event handler for when the value changes. */
  onChange?: (event: any) => void;
  /**
   * Event handler for when a key that produces a character is pressed.
   * https://developer.mozilla.org/en-US/docs/Web/Events/keypress
   */
  onKeyPress?: (event: any) => void;
  /**
   * Event handler for when a key is pressed down, whether it produces a character or not.
   * https://developer.mozilla.org/en-US/docs/Web/Events/keydown
   */
  onKeyDown?: (event: any) => void;
  /**
   * Event handler for when the element gains focus.
   * https://developer.mozilla.org/en-US/docs/Web/Events/focus
   */
  onFocus?: (event: any) => void;
  /**
   * Event handler for when the element loses focus.
   * https://developer.mozilla.org/en-US/docs/Web/Events/blur
   */
  onBlur?: (event: any) => void;

  /**
   * Should the input have focus when the page loads?
   * @default false
   */
  autoFocus?: boolean;

  id?: string;
  name?: string;
  hasError?: boolean;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;

  /**
   * Is the editor disabled?
   * @default false
   */
  disabled?: boolean;

  /** Callback to get reference to underlying Squire editor. */
  editorRef?: (editor: any) => void;
};

class RichEditor extends Component<RichEditorProps> {
  editorDiv: HTMLDivElement;
  editor: Editor;
  mentionId = 0;

  static defaultProps = {
    showToolbar: true,
    resize: 'vertical',
  };

  toggleBold = () => toggleAction(this.editor, 'bold', 'removeBold', 'B', />B\b/);

  toggleItalic = () => toggleAction(this.editor, 'italic', 'removeItalic', 'I', />I\b/);

  toggleUnderline = () => toggleAction(this.editor, 'underline', 'removeUnderline', 'U', />U\b/);

  handleInput = (event: any) => {
    // call it onChange instead of onInput only for consistency with react
    this.props.onChange && this.props.onChange(event);
  };
  handleKeyPress = (event: any) => {
    this.props.onKeyPress && this.props.onKeyPress(event);
  };
  handleKeyDown = (event: any) => {
    this.props.onKeyDown && this.props.onKeyDown(event);
  };
  handleFocus = (event: any) => {
    this.props.onFocus && this.props.onFocus(event);
  };
  handleBlur = (event: any) => {
    this.props.onBlur && this.props.onBlur(event);
  };
  handlePaste = (event: any) => {
    // Remove useless classes (like "MSONormal") and confusing white backgrounds that show up when pasting from MS Word.
    const list = event.fragment.querySelectorAll('*') as HTMLElement[];
    Array.from(list).forEach(item => {
      item.removeAttribute('class');
      item.style.background = '';
    });
  };

  componentDidMount() {
    // NOTE: not setting value; doing so causes cursor issues
    const { editorRef, defaultValue, disabled, autoFocus } = this.props;

    this.editor = new Editor(this.editorDiv);
    editorRef && editorRef(this.editor);

    this.editor
      .setHTML(defaultValue || '')
      .addEventListener('input', this.handleInput)
      .addEventListener('keypress', this.handleKeyPress)
      .addEventListener('keydown', this.handleKeyDown)
      .addEventListener('focus', this.handleFocus)
      .addEventListener('blur', this.handleBlur)
      .addEventListener('willPaste', this.handlePaste);

    if (disabled) {
      this.editorDiv.setAttribute('contenteditable', 'false');
      this.editorDiv.setAttribute('disabled', 'true');
    }
    if (autoFocus) {
      this.editor.focus().moveCursorToEnd();
    }
  }

  componentWillUnmount() {
    this.editor
      .removeEventListener('input', this.handleInput)
      .removeEventListener('keypress', this.handleKeyPress)
      .removeEventListener('keydown', this.handleKeyDown)
      .removeEventListener('focus', this.handleFocus)
      .removeEventListener('blur', this.handleBlur)
      .removeEventListener('willPaste', this.handlePaste)
      .destroy();
  }

  render() {
    // TODO: placeholder prop
    const { showToolbar, resize, hasError, id, name } = this.props;

    const containerProps = { resize, hasError, s: 'medium' as any };
    const editorProps = {
      id,
      name,
      'aria-labelledby': this.props['aria-labelledby'],
      'aria-describedby': this.props['aria-describedby'],
    };
    return (
      <Box>
        {/* toolbar */}
        {showToolbar && (
          <Flex justify="flex-end" mb={1}>
            <IconButton iconName="format-bold" s="small" onClick={this.toggleBold} />
            <IconButton iconName="format-italic" s="small" onClick={this.toggleItalic} />
            <IconButton iconName="format-underlined" s="small" onClick={this.toggleUnderline} />
          </Flex>
        )}
        <EditorContainer {...containerProps}>
          <div
            role="textbox"
            ref={ref => {
              this.editorDiv = ref;
            }}
            {...editorProps}
          />
        </EditorContainer>
      </Box>
    );
  }
}

export default RichEditor;
