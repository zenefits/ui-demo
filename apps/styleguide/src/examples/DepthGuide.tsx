import React, { Component } from 'react';

import { Box, BoxProps, Flex, TextBlock } from 'zbase';
import { styled, withTheme, ThemeInterface } from 'z-frontend-theme';
import { depth } from 'z-frontend-theme/utils';

const DepthBox = styled(Box)<BoxProps & { depthKey?: number }>`
  display: inline-block;
  text-align: center;
  ${props => depth(props.depthKey)};
`;

class DepthGuide extends Component<{ theme: ThemeInterface }> {
  render() {
    const { depths } = this.props.theme;

    return (
      <Flex wrap>
        {depths.map((depthKey, i) => (
          <DepthBox key={depthKey} depthKey={depthKey} bg="grayscale.white" m={1} p={4}>
            <TextBlock>{i < depths.length - 1 ? `DEPTH ${i}` : 'HEADER'}</TextBlock>
          </DepthBox>
        ))}
      </Flex>
    );
  }
}

export default withTheme(DepthGuide);
