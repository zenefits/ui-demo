import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import ExampleTypes from './exampleTypes';
import ExampleMultiline from './exampleMultiline';
import ExampleWithLink from './exampleWithLink';

storiesOf('composites|Banner', module)
  .addDecorator((getStory: Function) => (
    <Box py={50} w={[1, 2 / 3]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('Types', () => <ExampleTypes />)
  .add('Multiline', () => <ExampleMultiline />)
  .add('With link', () => <ExampleWithLink />);
