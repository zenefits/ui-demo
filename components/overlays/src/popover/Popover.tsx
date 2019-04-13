import React, { Component } from 'react';
import { ObjectOmit } from 'typelevel-ts';

import { styled, HideFor, RenderFor } from 'z-frontend-theme';
import { CardContainer, CardHeader, IconButton } from 'z-frontend-elements';
import { space } from 'z-frontend-theme/utils';
import { Flex, Heading } from 'zbase';

import BasePopper, { BasePopperProps, PlacementProp } from './BasePopper';
import ArrowedPopperContainer from './ArrowedPopperContainer';
import PopoverModal from './PopoverModal';

type PopoverOwnProps = {
  /**
   * Wrap the popover in a StyledPopperContainer component which provides a container with a border and depth for the content to live in
   * @default true
   */
  useDefaultPopperContainer?: boolean;
  title?: string;
  /**
   * Should the popover take up the full screen on mobile devices?
   * @default true
   **/
  showFullScreenMobile?: boolean;
};
export type PopoverProps = ObjectOmit<BasePopperProps, 'children'> & PopoverOwnProps;

const Body = styled(CardContainer)`
  margin-bottom: 0;
  padding: 0 ${space(5)} ${space(4)} ${space(3)};
`;

const Header = styled(CardHeader)`
  border: none;
  padding: ${space(2)} ${space(3)};
`;

const DefaultModalContainer = styled(Flex)`
  padding: ${space(2)} ${space(3)};
`;

class Popover extends Component<PopoverProps> {
  static defaultProps = {
    useDefaultPopperContainer: true,
    showFullScreenMobile: true,
  };

  static Header = Header;
  static Body = Body;

  renderContent = (closePopper: () => void) => {
    if (this.props.title) {
      return (
        <>
          <Popover.Header>
            <Flex justify="space-between" align="center">
              <Heading level={5} fontStyle="controls.m">
                {this.props.title}
              </Heading>
              <IconButton iconName="close" s="small" color="grayscale.d" onClick={closePopper} mr={-2} />
            </Flex>
          </Popover.Header>
          {this.props.children}
        </>
      );
    } else if (!this.props.showFullScreenMobile) {
      return this.props.children;
    }

    return (
      <>
        <RenderFor breakpoints={[true]}>
          <DefaultModalContainer direction="row" justify="space-between" align="baseline">
            {this.props.children}
            <IconButton iconName="close" s="small" color="grayscale.d" onClick={closePopper} />
          </DefaultModalContainer>
        </RenderFor>
        <HideFor breakpoints={[true]}>{this.props.children}</HideFor>
      </>
    );
  };

  render() {
    const { showArrow, useDefaultPopperContainer, showFullScreenMobile, title } = this.props;
    return (
      <BasePopper {...this.props}>
        {({ popperProps: { 'data-placement': dataPlacement, ref, style }, restProps }, isVisible, closePopper) => (
          <>
            <HideFor breakpoints={showFullScreenMobile ? [true] : []}>
              <div {...restProps} style={style} ref={ref}>
                <ArrowedPopperContainer
                  dataPlacement={dataPlacement as PlacementProp}
                  showArrow={showArrow}
                  useDefaultPopperContainer={useDefaultPopperContainer}
                  bg="grayscale.white"
                  color="text.default"
                >
                  {this.renderContent(closePopper)}
                </ArrowedPopperContainer>
              </div>
            </HideFor>

            <RenderFor breakpoints={showFullScreenMobile ? [true] : []}>
              <PopoverModal title={title} onCancel={closePopper} isVisible={isVisible}>
                {this.renderContent(closePopper)}
              </PopoverModal>
            </RenderFor>
          </>
        )}
      </BasePopper>
    );
  }
}

export default Popover;
