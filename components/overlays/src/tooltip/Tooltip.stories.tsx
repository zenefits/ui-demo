import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import ExampleHoverTop from './exampleHoverTop';
import ExampleDefaultVisible from './exampleDefaultVisible';
import ExampleRendersOverFixed from './exampleRendersOverFixed';

storiesOf('overlays|Tooltip', module)
  .addDecorator((getStory: Function) => (
    <Box py={70} px={150} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default (hover)', ExampleHoverTop)
  .add('visible by default', ExampleDefaultVisible)
  .add('renders over other positioned elements', ExampleRendersOverFixed);
