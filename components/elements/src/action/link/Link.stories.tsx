import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import ExampleHref from './exampleHref';
import ExampleExternal from './exampleExternal';
import ExampleRoute from './exampleRoute';
import ExampleConvenience from './exampleConvenience';

storiesOf('elements|Link', module)
  .addDecorator((getStory: Function) => (
    <Box p={4} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('href', ExampleHref)
  .add('external', ExampleExternal)
  .add('route', ExampleRoute)
  .add('email/phone', ExampleConvenience);
