import React, { Component } from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';
import { Button } from 'z-frontend-elements';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../.storybook/storyHelpers';
import RichEditor from './RichEditor';
import ExampleDefault from './exampleDefault';

const text =
  'Managers have been talking about employee satisfaction for what feels like ages, but what’s this new topic called <i>employee engagement</i> that’s entered the HR lexicon in recent years?';

class ValueChangeExample extends Component {
  private count = 0;
  state = {
    text,
  };

  handleClick = () => {
    this.count = 1 + this.count;
    this.setState({ text: `Updated text ${this.count} times` });
  };

  render() {
    const key = this.count; // dynamic key to refresh component
    return (
      <Box>
        <RichEditor key={key} defaultValue={this.state.text} showToolbar={false} />
        <Button mt={2} onClick={this.handleClick}>
          Update Value
        </Button>
      </Box>
    );
  }
}

storiesOf('forms|RichEditor', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', ExampleDefault)
  .add('no toolbar', () => <RichEditor defaultValue={text} showToolbar={false} />)
  .add('no resize', () => <RichEditor defaultValue={text} resize="none" />)
  .add('autofocus', () => <RichEditor defaultValue={text} showToolbar={false} autoFocus />)
  .add('disabled', () => <RichEditor defaultValue={text} showToolbar={false} disabled />)
  .add('handles value change', () => <ValueChangeExample />)
  .add(
    'fires events',
    () => (
      <RichEditor
        defaultValue={text}
        onFocus={action('editor-onfocus')}
        onBlur={action('editor-onblur')}
        onChange={action('editor-onchange')}
      />
    ),
    skipVisualTest,
  );
