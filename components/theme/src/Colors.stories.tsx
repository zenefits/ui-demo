import React from 'react';
import { storiesOf } from '@storybook/react';
import { styled, withTheme } from './ThemeProvider';
import Heading from './Heading';
import { Flex, Box } from 'rebass';
import { color } from './utils';
import Text from './Text';

const ColorBox = styled(Box)`
  /* stylelint-disable */
  width: 120px;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(18, 52, 102, 0.2), inset 0 -41px 0 0 rgba(0, 0, 0, 0.1),
    inset 0 -40px 0 0 ${color('grayscale.white')};
`;

const Page = props => {
  const colors = props.theme.colors;
  return (
    <div>
      {Object.keys(colors).map(category => (
        <Box key={category} mb={5}>
          <Heading is="h3">{category}</Heading>
          <Flex p={3} wrap>
            {Object.keys(colors[category]).map((colorKey, i) => (
              <Flex direction="column" key={i} w={[1, 1 / 4]} mb={3} align="center">
                <ColorBox bg={colors[category][colorKey]}>
                  <Text align="center" mt="40px" bg={colors.grayscale.g}>
                    {colorKey}
                  </Text>
                  <Text color="grayscale.b" align="center" bg={colors.grayscale.g}>
                    {colors[category][colorKey]}
                  </Text>
                </ColorBox>
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
