import React, { Component } from 'react';

import { Box, Flex, TextBlock, TextInline } from 'zbase';
import { fontStyleTagMap, styled, FontStyleString } from 'z-frontend-theme';
import { radius } from 'z-frontend-theme/utils';

import RenderWithTheme from '../components/RenderWithTheme';

const FontDetailsBox = styled(Box)`
  white-space: pre-line;
  font-family: monospace;
  border-radius: ${radius()};
`;

const StyledContainer = styled(Flex)`
  border-radius: ${radius()};
`;

interface TypographySwatchProps {
  sample: string;
  textKey: FontStyleString;
  textDetails: string;
}

class TypographySwatch extends Component<TypographySwatchProps> {
  render() {
    const { sample, textKey, textDetails } = this.props;
    const htmlTag = Object.keys(fontStyleTagMap).find(key => fontStyleTagMap[key] === textKey);
    return (
      <StyledContainer w={1} border mb={3}>
        <Flex align="center" p={3} w={1 / 2}>
          <TextInline fontStyle={textKey}>{sample}</TextInline>
        </Flex>
        <Box p={3} w={1} borderLeft>
          <TextBlock mb={2}>
            {textKey}{' '}
            {htmlTag && (
              <TextInline>
                (or <code>{htmlTag}</code>)
              </TextInline>
            )}
          </TextBlock>
          <FontDetailsBox bg="grayscale.g" color="text.default" p={3}>
            {textDetails.trim()}
          </FontDetailsBox>
        </Box>
      </StyledContainer>
    );
  }
}

interface GuideProps {
  group: string;
  sample: string;
}

class TypographyGuide extends Component<GuideProps> {
  render() {
    const { group, sample } = this.props;
    return (
      <RenderWithTheme>
        {theme => {
          return Object.keys(theme.fontStyles)
            .filter(fs => fs.includes(group))
            .map(fs => (
              <TypographySwatch
                key={fs}
                sample={sample}
                textKey={fs as FontStyleString}
                textDetails={theme.fontStyles[fs]}
              />
            ));
        }}
      </RenderWithTheme>
    );
  }
}

export default TypographyGuide;
