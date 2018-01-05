import React from 'react';
import { Box } from 'rebass';
import { storiesOf } from '@storybook/react';
import Text from './Text';

storiesOf('Text', module)
  .addDecorator(getStory => (
    <Box p={10} w={[1, 1 / 2]} bg="white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <Text>Default Text</Text>);
