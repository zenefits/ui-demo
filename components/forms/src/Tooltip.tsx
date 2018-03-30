import React, { Component } from 'react';
import { color, zIndex } from 'z-frontend-theme/utils';
import Popover, { PopoverProps } from './Popover';
import { Flex } from 'zbase';
import { styled } from 'z-frontend-theme';

const StyledContainer = styled(Flex)`
  display: inline-block;
  vertical-align: bottom;

  .popper-container {
    background-color: ${color('secondary.a')};
    color: ${color('grayscale.white')};
    box-shadow: unset;
  }

  .popper {
    z-index: ${zIndex('tooltip')};
  }

  .popper[data-placement^='right'] {
    .popper-arrow {
      left: 3px;
      border-color: transparent ${color('secondary.a')} transparent transparent;
    }
  }

  .popper[data-placement^='top'] {
    .popper-arrow {
      border-color: ${color('secondary.a')} transparent transparent transparent;
      bottom: 3px;
    }
  }

  .popper[data-placement^='left'] {
    .popper-arrow {
      border-color: transparent transparent transparent ${color('secondary.a')};
      right: 3px;
    }
  }

  .popper[data-placement^='bottom'] {
    .popper-arrow {
      top: 3px;
      border-color: transparent transparent ${color('secondary.a')} transparent;
    }
  }
`;

class Tooltip extends Component<PopoverProps> {
  render() {
    return (
      <StyledContainer>
        <Popover event="hover" {...this.props}>
          {this.props.children}
        </Popover>
      </StyledContainer>
    );
  }
}

export default Tooltip;
