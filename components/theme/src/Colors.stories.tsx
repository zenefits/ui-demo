import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { withTheme } from 'styled-components';
import { Flex, Heading, Box, Text, Circle } from 'rebass';

const Page = props => {
  const colors = props.theme.colors;
  return (
    <div>
      {Object.keys(colors).map(category => (
        <Box key={category} mb={4}>
          <Heading is="h3">{category} Colors</Heading>
          <Flex p={3} wrap>
            {Object.keys(colors[category]).map((colorKey, i) => (
              <Flex key={i} w={[1, 1, 1 / 4]} mb={3} align="center">
                <Circle bg={colors[category][colorKey]} size={60} />
                <Box ml={3}>
                  <Text mb={2}>{colorKey}</Text>
                  <Text color="greyScale.38">{colors[category][colorKey]}</Text>
                </Box>
              </Flex>
            ))}
          </Flex>
        </Box>
      ))}
    </div>
  );
};

const PageWithTheme = withTheme(Page);

storiesOf('Colors', module).add('All', () => <PageWithTheme />);
