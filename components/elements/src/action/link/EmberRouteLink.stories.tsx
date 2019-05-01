import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import ExampleEmberLink from './exampleEmber';
import ExampleEmberLinkQueryParams from './exampleEmberLinkQueryParams';

storiesOf('elements|EmberRouteLink', module)
  .addDecorator((getStory: Function) => (
    <Box p={4} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', ExampleEmberLink)
  .add('with queryParams', ExampleEmberLinkQueryParams);
