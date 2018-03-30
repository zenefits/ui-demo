import React from 'react';
import { Box, Flex, Heading, P } from 'zbase';
import { ColorString, ThemeInterface, withTheme, styled } from 'z-frontend-theme';
import { depth, heights, radius, convertToNestedMap } from 'z-frontend-theme/utils';

const ColorBox = styled(Box)`
  width: ${heights('xxlarge')};
  border-radius: ${radius};
  box-shadow: ${depth(1)};
`;

const ColorLabel = styled(P)`
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface ColorGuideProps {
  theme: ThemeInterface;
}

class ColorGuide extends React.Component<ColorGuideProps> {
  render() {
    const colorsMap = convertToNestedMap(this.props.theme.colors);
    return Object.keys(colorsMap).map(categoryKey => (
      <Box key={categoryKey} mb={4}>
        <Heading level={5} mb={2}>
          {categoryKey}
        </Heading>
        <Flex wrap>
          {Object.keys(colorsMap[categoryKey]).map((colorKey, i) => (
            <Flex direction="column" key={i} mr={2} mb={2} align="center">
              <ColorBox bg={`${categoryKey}.${colorKey}` as ColorString}>
                <Flex bg="grayscale.white" mt="40px" borderTop justify="center">
                  <ColorLabel title={colorKey} p={1}>
                    {colorKey}
                  </ColorLabel>
                </Flex>
              </ColorBox>
            </Flex>
          ))}
        </Flex>
      </Box>
    ));
  }
}

export default withTheme(ColorGuide);
