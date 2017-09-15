import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { withTheme } from 'styled-components';
import { Small, Subhead, Flex, Text } from 'rebass';

import { fontInfo } from './fonts';

const Page = props => {
  const fonts = props.theme.fonts;
  const sizes = props.theme.fontSizes;
  const weights = props.theme.weights;

  return (
    <Flex direction="column">
      <Subhead>Typography</Subhead>
      {fontInfo.map((info, index) => (
        <Flex key={index} flex="1" align="center" m={8}>
          <Flex w={80}>
            <Text is={info.tag}>{info.tag}</Text>
          </Flex>
          <Flex flex="1">
            <Text is={info.tag}>{fonts[info.family]}</Text>
          </Flex>
          <Flex w={120}>
            <Small>font-size: {sizes[info.size]}</Small>
          </Flex>
          <Flex w={120}>
            <Small>font-weight: {weights[info.weight]}</Small>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

const PageWithTheme = withTheme(Page);

storiesOf('Typography', module).add('All', () => <PageWithTheme />);
