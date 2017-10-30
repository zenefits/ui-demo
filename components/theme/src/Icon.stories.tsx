import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { withTheme } from 'styled-components';
import Icon from './Icon';
import { Flex, Heading, Box, Text } from 'rebass';

const Page = props => {
  const icons = props.theme.icons;
  return (
    <div>
      <Heading is="h3">Icons</Heading>
      <Flex mb={5} wrap>
        {Object.keys(icons).map(iconName => (
          <Flex key={iconName} w={[1, 1 / 2, 1 / 4]} mb={3} align="center" direction="column">
            <Icon iconName={iconName} size={60} />
            <Text mb={2}>{iconName}</Text>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

const PageWithTheme = withTheme(Page);

storiesOf('Icons', module).add('All', () => <PageWithTheme />);
