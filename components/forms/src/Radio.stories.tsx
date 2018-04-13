import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Box, Flex, Label } from 'zbase';

import Radio from './Radio';

storiesOf('Radio', module)
  .addDecorator(getStory => (
    <Flex p={20} w={[1, 1 / 2]} bg="grayscale.white">
      <Label w={[1, 1 / 3]}>Label</Label>
      <Box w={[1, 2 / 3]}>{getStory()}</Box>
    </Flex>
  ))
  .add('default', () => (
    <Box>
      <Radio name="option" value="one" label="Option 1" />
      <Radio name="option" value="two" label="Option 2" />
    </Box>
  ))
  .add('supports util props', () => (
    <Box>
      <Radio name="option" value="one" label="Option 1 (margin)" my={20} />
      <Radio name="option" value="two" label="Option 2 (font)" fontSize__deprecated__doNotUse={4} />
    </Box>
  ))
  .add('default value', () => (
    <Box>
      <Radio name="option" value="one" label="Option 1" />
      <Radio name="option" value="two" defaultChecked label="Option 2 (default)" />
    </Box>
  ))
  .add('disabled', () => (
    <Box>
      <Radio name="option" value="one" disabled label="Disabled" />
      <Radio name="option" value="two" label="Okay" />
    </Box>
  ))
  .add('error', () => (
    <Box>
      <Radio name="option" value="one" className="error" label="Error" />
      <Radio name="option" value="two" label="Okay" />
    </Box>
  ))
  .add('handles events', () => (
    <Box>
      <Radio
        name="option"
        value="one"
        label="Option 1"
        onFocus={action('radio-onfocus')}
        onBlur={action('radio-onblur')}
        onKeyUp={action('radio-onkeyup')}
        onChange={action('radio-onchange')}
        onClick={action('radio-onclick')}
      />
      <Radio
        name="option"
        value="two"
        label="Option 2"
        onFocus={action('radio-onfocus')}
        onBlur={action('radio-onblur')}
        onKeyUp={action('radio-onkeyup')}
        onChange={action('radio-onchange')}
        onClick={action('radio-onclick')}
      />
    </Box>
  ));
