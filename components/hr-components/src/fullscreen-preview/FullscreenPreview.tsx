import React, { Component } from 'react';

import { styled, theme } from 'z-frontend-theme';
import { Box, Flex, Icon } from 'zbase';
import { color, zIndex } from 'z-frontend-theme/utils';
import { Button } from 'z-frontend-elements';

const StyledFullScreenBox = styled(Box)`
  border: solid 4px ${color('primary.a')};
  z-index: ${zIndex('modal')};
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  background-color: ${color('grayscale.g')};
`;

const ESC_KEYCODE = 27;

export default class FullScreenPreview extends Component<{ onExit: () => void }> {
  componentWillMount() {
    window.document.addEventListener('keydown', this.onKeyboardPress);
  }

  componentWillUnmount() {
    window.document.removeEventListener('keydown', this.onKeyboardPress);
  }

  onKeyboardPress = (e: any) => {
    if (e.keyCode === ESC_KEYCODE) {
      this.props.onExit();
    }
  };

  render() {
    return (
      <StyledFullScreenBox>
        <Flex justify="center">
          <Button
            mode="primary"
            onClick={this.props.onExit}
            mt={-1}
            style={{ position: 'fixed', zIndex: zIndex('fixed')({ theme }) }}
          >
            <Icon iconName="arrow-left" mr={1} /> Exit Preview
          </Button>
        </Flex>

        {this.props.children}
      </StyledFullScreenBox>
    );
  }
}
