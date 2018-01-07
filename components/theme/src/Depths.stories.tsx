import React from 'react';
import { storiesOf } from '@storybook/react';
import { styled, withTheme } from './ThemeProvider';
import { Flex, Box } from 'rebass';
import depths from './depths';
import { color } from './utils';
import Text from './Text';

const DepthBox = styled(Box)`
  width: 120px;
  border-radius: 2px;
  background-color: ${color('grayscale.white')};
`;

const Page = props => {
  return (
    <Flex align="center">
      {Object.keys(depths).map((depthKey, i) => (
        <DepthBox key={i} my={3} mx={2} style={{ boxShadow: depths[i] }}>
          <Text align="center" my={5}>
            Depth {i + 1}
          </Text>
        </DepthBox>
      ))}
    </Flex>
  );
};

const PageWithTheme = withTheme(Page);

storiesOf('Depths', module).add('All', () => <PageWithTheme />);
