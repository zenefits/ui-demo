import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../.storybook/storyHelpers';
import ConnectionManager from './ConnectionManager';
import ConnectionErrorBanner from './ConnectionErrorBanner';

storiesOf('network|ConnectionErrorBanner', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={1} bg="grayscale.white">
      {/* This provider is by default included in the render-app function */}
      <ConnectionManager>{getStory()}</ConnectionManager>
    </Box>
  ))
  .add('default', () => <DefaultExample />);

const DefaultExample = () => <ConnectionErrorBanner />;
