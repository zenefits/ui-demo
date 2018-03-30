import React from 'react';
import { Flex, Text } from 'zbase';
import RenderWithTheme from '../src/components/RenderWithTheme';
import { FontStyleString } from 'z-frontend-theme';

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
