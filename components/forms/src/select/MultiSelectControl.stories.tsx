import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import MultiSelectControl from './MultiSelectControl';

storiesOf('forms|MultiSelectControl', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('with selections', () => (
    <MultiSelectControl
      placeholder="test"
      selections={['First', 'Second', 'Third']}
      onKeyDown={action('Key pressed')}
    />
  ))
  .add('disabled', () => <MultiSelectControl placeholder="test" selections={['First', 'Second', 'Third']} disabled />)
  .add('no selections', () => <MultiSelectControl placeholder="This is a placeholder" selections={[]} />)
  .add('error', () => <MultiSelectControl placeholder="test" selections={['First', 'Second', 'Third']} hasError />);
