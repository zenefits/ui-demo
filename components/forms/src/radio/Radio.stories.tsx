import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box, Flex, Label } from 'zbase';
import { skipVisualTest } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../.storybook/storyHelpers';
import Radio from './Radio';

storiesOf('forms|Radio', module)
  .addDecorator((getStory: Function) => (
    <Flex p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {/* TODO: remove this misleading example - should use Form.RadioGroup */}
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
  .add('hover', () => (
    <Box>
      <Radio name="option" value="one" label="Option 1" className="simulate-hover" />
      <Radio name="option" value="two" label="Option 2" />
    </Box>
  ))
  .add('default value (active)', () => (
    <Box>
      <Radio name="option" value="one" label="Option 1" defaultChecked />
      <Radio name="option" value="two" label="Option 2" />
    </Box>
  ))
  .add('error', () => (
    <Box>
      <Radio name="option" value="one" label="Option 1" className="error" />
      <Radio name="option" value="two" label="Option 2" />
    </Box>
  ))
  .add('disabled', () => (
    <Box>
      <Radio name="option" value="one" label="Option 1" disabled />
      <Radio name="option" value="two" label="Option 2" />
    </Box>
  ))
  .add('supports util props', () => (
    <Box>
      <Radio name="option" value="one" label="Option 1 (margin)" my={20} />
      <Radio name="option" value="two" label="Option 2 (font)" fontSize__deprecated__doNotUse={4} />
    </Box>
  ))

  .add(
    'handles events',
    () => (
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
    ),
    skipVisualTest,
  );
