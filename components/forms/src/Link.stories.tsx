import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box } from 'zbase';

import Link from './Link';

storiesOf('Link', module).add('default', () => (
  <Box p={4} bg="grayscale.white">
    <Link href="https://help.zenefits.com/" target="_blank">
      This is a link. It'll go to help.zenefits.com
    </Link>
  </Box>
));
