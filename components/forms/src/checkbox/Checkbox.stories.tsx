import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { skipVisualTest } from 'z-frontend-app-bootstrap';
import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import Checkbox from './Checkbox';

storiesOf('forms|Checkbox', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <Checkbox label="Label" />)
  .add('hover', () => <Checkbox label="Label" className="simulate-hover" />)
  .add('default value (active)', () => <Checkbox defaultChecked name="name" label="Label" />)
  .add('error', () => <Checkbox label="Label" className="error" />)
  .add('disabled', () => (
    <Box>
      <Checkbox disabled label="Label" />
      <Checkbox checked disabled label="Label" />
    </Box>
  ))
  .add('util props', () => <Checkbox label="Label" my={50} />)
  .add(
    'fires events',
    () => (
      <Checkbox
        label="Try interacting"
        onFocus={action('checkbox-onfocus')}
        onBlur={action('checkbox-onblur')}
        onKeyUp={action('checkbox-onkeyup')}
        onChange={action('checkbox-onchange')}
      />
    ),
    skipVisualTest,
  );
