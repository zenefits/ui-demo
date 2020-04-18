import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import MoneyInputDisplay from '../money-input/MoneyInputDisplay';

storiesOf('forms|MoneyInputDisplay', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <MoneyInputDisplay value="1234" />)
  .add('cents', () => <MoneyInputDisplay value="1234.00" />)
  .add('size large', () => <MoneyInputDisplay value="1234" s="large" />);
