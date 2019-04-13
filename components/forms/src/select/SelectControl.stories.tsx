import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import SelectControl from './SelectControl';

storiesOf('forms|SelectControl', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => (
    <SelectControl
      placeholder="test"
      onKeyDown={() => {
        console.log('test');
      }}
    />
  ))
  .add('with selection', () => <SelectControl selection="Chicken" placeholder="test" />)
  .add('disabled', () => <SelectControl selection="Chicken" placeholder="test" disabled />);
