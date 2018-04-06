import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box } from 'zbase';
import { action } from '@storybook/addon-actions';
import Checkbox from './Checkbox';

storiesOf('Checkbox', module)
  .addDecorator(getStory => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <Checkbox label="Label" />)
  .add('util props', () => <Checkbox label="Label" my={50} />)
  .add('default value', () => <Checkbox defaultChecked name="name" label="Label" />)
  .add('disabled', () => (
    <Box>
      <Checkbox disabled label="Label" />
      <Checkbox checked disabled label="Label" />
    </Box>
  ))
  .add('error', () => <Checkbox label="Label" className="error" />)
  .add('fires events', () => (
    <Checkbox
      label="Try interacting"
      onFocus={action('checkbox-onfocus')}
      onBlur={action('checkbox-onblur')}
      onKeyUp={action('checkbox-onkeyup')}
      onChange={action('checkbox-onchange')}
    />
  ));
