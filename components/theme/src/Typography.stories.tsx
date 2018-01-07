import React from 'react';
import { storiesOf } from '@storybook/react';
import { withTheme } from './ThemeProvider';
import { Subhead, Flex, Box } from 'rebass';
import Text from './Text';
import Heading from './Heading';
import { fontStyleTagMap, fontStyles } from './fonts';

const supportedSizeParam = ['xxl', 'xl', 'l', 'm', 's'];

const placeholders = {
  headings: 'Heading Text',
  paragraphs: 'Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec.',
  controls: 'Control Text',
};

const Page = props => {
  const rulesFlattened = supportedSizeParam.map(s =>
    Object.keys(fontStyles).map(categoryName => ({
      rulePath: `${categoryName}.${s}`,
      placeholder: placeholders[categoryName],
    })),
  );
  // const
  return (
    <Flex direction="column">
      <Box m={1}>
        <Heading is="h3">Typography</Heading>
      </Box>
      <Flex mx={4} direction="column">
        <Box mt={3}>
          <Subhead>Sizes</Subhead>
        </Box>
        <Flex align="center">
          <Box w={1 / 8} />
          <Box w={1 / 4}>
            <Text>Headings</Text>
          </Box>
          <Box w={1 / 4}>
            <Text> Controls(Button, Inputs, Avatars)</Text>
          </Box>
          <Box w={1 / 4}>
            <Text>Paragraphs</Text>
          </Box>
        </Flex>
        {supportedSizeParam.map((s, index) => (
          <Flex key={s} align="center">
            <Box w={1 / 8}>
              <Text m={10}>{s}</Text>
            </Box>
            {rulesFlattened[index].map(rule => (
              <Box key={rule.rulePath} w={1 / 4}>
                <Text fontStyle={`${rule.rulePath}`}>{rule.placeholder}</Text>
              </Box>
            ))}
          </Flex>
        ))}
        <Box mt={5}>
          <Subhead>HTML Tags</Subhead>
        </Box>

        {Object.keys(fontStyleTagMap).map((key, index) => (
          <Flex key={index} flex="1" align="center" m={8}>
            <Box>
              <Text is={key}>
                {key} {fontStyleTagMap[key]}
              </Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

const PageWithTheme = withTheme(Page);

storiesOf('Typography', module).add('All', () => <PageWithTheme />);
