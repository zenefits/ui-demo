import React from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react';

import { ThemeProvider } from 'z-frontend-theme';

import { Box, Flex } from '../index';

storiesOf('zbase|Utils System', module).add('responsive props', () => (
  <ThemeProvider>
    <div style={{ width: '100%' }}>
      <Flex
        w={[1, 1 / 2, 1 / 3, 1 / 4]}
        justify={['flex-start', 'space-between', 'space-around', 'flex-end']}
        bg={['grayscale.e', 'link.active']}
        mb={2}
      >
        <Box w={30} bg="grayscale.d">
          box 1
        </Box>
        <Box w={30} bg="negation.b">
          box 2
        </Box>
      </Flex>
    </div>
  </ThemeProvider>
));
