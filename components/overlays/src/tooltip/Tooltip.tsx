import React, { Component } from 'react';
import { ObjectOmit } from 'typelevel-ts';

import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';
import { Flex } from 'zbase';

import BasePopper, { BasePopperProps, PlacementProp } from '../popover/BasePopper';
import ArrowedPopperContainer from '../popover/ArrowedPopperContainer';

export type TooltipProps = ObjectOmit<BasePopperProps, 'children'>;

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
    const { children, showArrow } = this.props;
    return (
      <BasePopper {...this.props}>
        {({ popperProps: { 'data-placement': dataPlacement, ref, style }, restProps }) => (
          <div {...restProps} style={style} ref={ref}>
            <StyledPopperContainer>
              <ArrowedPopperContainer
                useDefaultPopperContainer
                dataPlacement={dataPlacement as PlacementProp}
                showArrow={showArrow}
                bg="secondary.a"
                color="grayscale.white"
              >
                {children}
              </ArrowedPopperContainer>
            </StyledPopperContainer>
          </div>
        )}
      </BasePopper>
    );
  }
}

export default Tooltip;
