import React from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react';

import { Box, Label } from '../index';
import DefaultExample from './exampleDefault';

storiesOf('zbase|Label', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', DefaultExample)
  .add('util prop', () => <Label color="primary.a">Label with color</Label>);
