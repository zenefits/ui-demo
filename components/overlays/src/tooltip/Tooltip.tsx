import React, { Component } from 'react';

import { styled, theme } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';
import { Box, Flex } from 'zbase';

import BasePopper, { BasePopperProps, PlacementProp } from '../popover/BasePopper';
import ArrowedPopperContainer from '../popover/ArrowedPopperContainer';

export type TooltipProps = Omit<BasePopperProps, 'children'>;

// For tooltips force text to be white rather than getting the default from a <TextBlock> component
const StyledPopperContainer = styled(Flex)`
  display: inline;

  * {
    color: ${color('grayscale.white')};
  }
`;

class Tooltip extends Component<TooltipProps> {
  static defaultProps = {
    showArrow: true,
  };

  render() {
    const { children, showArrow, popperModifiers: customPopperModifiers } = this.props;
    const popperModifiers: BasePopperProps['popperModifiers'] = {
      preventOverflow: {
        boundariesElement: 'viewport',
      },
      ...customPopperModifiers,
    };

    return (
      <BasePopper {...this.props} popperModifiers={popperModifiers}>
        {({ placement, style, ref, arrowProps }) => (
          <div style={{ ...style, zIndex: theme.zIndex.popover }} ref={ref}>
            <StyledPopperContainer>
              <ArrowedPopperContainer
                arrowProps={arrowProps}
                useDefaultPopperContainer
                dataPlacement={placement as PlacementProp}
                showArrow={showArrow}
                bg="secondary.a"
                color="grayscale.white"
              >
                <Box maxWidth={[null, 500]}>{children}</Box>
              </ArrowedPopperContainer>
            </StyledPopperContainer>
          </div>
        )}
      </BasePopper>
    );
  }
}

export default Tooltip;
