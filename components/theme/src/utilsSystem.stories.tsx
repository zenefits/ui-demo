import React from 'react';
import { storiesOf } from '@storybook/react';
import { ZFrontendThemeProvider } from './ThemeProvider';
import { Flex as RFlex, Box as RBox } from 'rebass';

import { Flex, Box } from '../index';

storiesOf('Utils System', module).add('All', () => (
  <ZFrontendThemeProvider>
    <div style={{ width: '100%' }}>
      <Flex w={[1, 1 / 2, 1 / 3, 1 / 4]} bg={['grayscale.e', 'link.active']} mb={2}>
        <Box w={1 / 3} bg="grayscale.d">
          box 1
        </Box>
        <Box w={1 / 3} bg="negation.b">
          box 2
        </Box>
      </Flex>
      <RFlex w={[1, 1 / 2, 1 / 3, 1 / 4]} bg="grayscale.e">
        <RBox w={1 / 3} bg="grayscale.d">
          box 1
        </RBox>
        <RBox bg="negation.b" w={1 / 3}>
          box 2
        </RBox>
      </RFlex>
      <Box bg="affirmation.b" flex="1" w={333} fontSize={4}>
        foo
      </Box>
    </div>
  </ZFrontendThemeProvider>
));
