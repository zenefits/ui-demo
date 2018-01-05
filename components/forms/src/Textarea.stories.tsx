import React from 'react';
import { Box, Flex } from 'rebass';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Textarea from './Textarea';

storiesOf('Textarea', module)
  .addDecorator(getStory => (
    <Box p={20} w={[1, 1 / 2]} bg="white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <Textarea />)
  .add('placeholder', () => <Textarea placeholder="Placeholder" />)
  .add('rebass props', () => <Textarea placeholder="Placeholder" my={50} />)
  .add('sizes', () => (
    <Flex wrap align="center">
      <Box w={1 / 3}>Large</Box>
      <Box w={2 / 3} mb={1}>
        <Textarea s="large" placeholder="Placeholder" />
      </Box>
      <Box w={1 / 3}>Medium</Box>
      <Box w={2 / 3} mb={1}>
        <Textarea s="medium" placeholder="Placeholder" />
      </Box>
      <Box w={1 / 3}>Small</Box>
      <Box w={2 / 3} mb={1}>
        <Textarea s="small" placeholder="Placeholder" />
      </Box>
    </Flex>
  ))
  .add('default value', () => <Textarea defaultValue="Default" />)
  .add('rows', () => <Textarea defaultValue="1\n2\n3\n4" rows={4} />)
  .add('disabled', () => <Textarea defaultValue="Cannot be edited, focused or submitted" disabled />)
  .add('readOnly', () => <Textarea defaultValue="Cannot be edited, but can be focused and submitted" readOnly />)
  .add('resize', () => <Textarea defaultValue="Cannot be resized by dragging corner" resize="none" />)
  .add('maxLength', () => <Textarea defaultValue="Max 12 chars" maxLength={12} />)
  .add('error', () => <Textarea defaultValue="Invalid input" className="error" />)
  .add('fires events', () => (
    <Textarea
      defaultValue="Try interacting"
      onFocus={action('textarea-onfocus')}
      onBlur={action('textarea-onblur')}
      onClick={action('textarea-onclick')}
      onKeyUp={action('textarea-onkeyup')}
      onChange={action('textarea-onchange')}
    />
  ));
