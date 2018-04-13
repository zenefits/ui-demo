import React from 'react';

import { Flex, Text } from 'zbase';
import { FontStyleString } from 'z-frontend-theme';

import RenderWithTheme from '../src/components/RenderWithTheme';

export default () => (
  <Flex align="baseline">
    <RenderWithTheme>
      {theme =>
        Object.keys(theme.fontStyles)
          .filter(fs => fs.indexOf('headings') === 0)
          .map(fs => (
            <Text fontStyle={fs as FontStyleString} key={fs}>
              Aa
            </Text>
          ))
      }
    </RenderWithTheme>
  </Flex>
);
