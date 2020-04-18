import React, { Component } from 'react';

import { Box, Flex, Heading, TextBlock } from 'zbase';
import { Button, StatusTag } from 'z-frontend-elements';
import { styled, withTheme, ColorString, ThemeInterface } from 'z-frontend-theme';
import { convertToNestedMap, radius } from 'z-frontend-theme/utils';

const ColorBox = styled(Box)`
  height: 100%;
`;

const StyledContainer = styled(Flex)`
  border-radius: ${radius()};
`;

interface ColorGuideProps {
  theme: ThemeInterface;
}

interface ColorSwatchProps {
  colorString: ColorString;
  colorHex: string;
}

class ColorSwatch extends Component<ColorSwatchProps> {
  render() {
    const { colorString, colorHex } = this.props;
    return (
      <StyledContainer w={1} border mb={3}>
        <ColorBox w={1 / 2} bg={colorString} />
        <Box p={3} borderLeft>
          <TextBlock mb={2}>{colorString}</TextBlock>
          <StatusTag mode="neutral" fontStyle="controls.s" mx={0}>
            {colorHex}
          </StatusTag>
        </Box>
      </StyledContainer>
    );
  }
}

class ColorGuide extends Component<ColorGuideProps> {
  state = {
    showAll: false,
  };

  render() {
    const { showAll } = this.state;
    const colorsMap = convertToNestedMap(this.props.theme.colors);
    delete colorsMap.inherit;
    delete colorsMap.initial;
    delete colorsMap.transparent;

    let categories = Object.keys(colorsMap);
    if (!this.state.showAll) {
      categories = categories.slice(0, 2);
    }

    const colors = categories.map(categoryKey => (
      <Box key={categoryKey} mb={4}>
        <Heading level={5} mb={2} textTransform="capitalize">
          {categoryKey}
        </Heading>
        <Flex wrap>
          {Object.keys(colorsMap[categoryKey]).map(colorKey => (
            <ColorSwatch
              key={colorKey}
              colorString={`${categoryKey}.${colorKey}` as ColorString}
              colorHex={colorsMap[categoryKey][colorKey]}
            />
          ))}
        </Flex>
      </Box>
    ));
    return (
      <div>
        {colors}
        {!showAll && (
          <Flex justify="center">
            <Button s="large" onClick={() => this.setState({ showAll: !showAll })}>
              Show All Colors
            </Button>
          </Flex>
        )}
      </div>
    );
  }
}

export default withTheme(ColorGuide);
