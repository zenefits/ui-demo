import React, { Component } from 'react';

import { styled, theme, Hide, Render } from 'z-frontend-theme';
import { CardContainer, CardHeader, IconButton } from 'z-frontend-elements';
import { space } from 'z-frontend-theme/utils';
import { Flex, Heading } from 'zbase';

import BasePopper, { BasePopperProps, PlacementProp } from './BasePopper';
import ArrowedPopperContainer from './ArrowedPopperContainer';
import PopoverModal from './PopoverModal';

type PopoverOwnProps = {
  /**
   * Show popover content when the user clicks or hovers on the target element.
   * Note: Popover on hover is not encouraged.
   * @default click
   */
  event?: 'click' | 'hover';
  /**
   * Wrap the popover in a StyledPopperContainer component which provides a container with a border and depth for the content to live in
   * @default true
   */
  useDefaultPopperContainer?: boolean;
  title?: string;
  /**
   * Should the popover take up the full screen on mobile devices?
   * @default true
   * */
  showFullScreenMobile?: boolean;
};
export type PopoverProps = Omit<BasePopperProps, 'children' | 'event'> & PopoverOwnProps;

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
    event: 'click',
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
        <Render forBreakpoints={[true]}>
          <DefaultModalContainer direction="row" justify="space-between" align="baseline">
            {this.props.children}
            <IconButton iconName="close" s="small" color="grayscale.d" onClick={closePopper} />
          </DefaultModalContainer>
        </Render>
        <Hide forBreakpoints={[true]}>{this.props.children}</Hide>
      </>
    );
  };

  render() {
    const {
      showArrow,
      useDefaultPopperContainer,
      showFullScreenMobile,
      title,
      popperModifiers: customPopperModifiers,
    } = this.props;

    const popperModifiers: BasePopperProps['popperModifiers'] = {
      preventOverflow: {
        boundariesElement: 'viewport',
      },
      ...customPopperModifiers,
    };

    return (
      <BasePopper event={this.props.event} {...this.props} popperModifiers={popperModifiers}>
        {({ placement, style, ref, arrowProps }, isVisible, closePopper) => (
          <>
            <Hide forBreakpoints={showFullScreenMobile ? [true] : []}>
              <div style={{ ...style, zIndex: theme.zIndex.popover }} ref={ref}>
                <ArrowedPopperContainer
                  arrowProps={arrowProps}
                  dataPlacement={placement as PlacementProp}
                  showArrow={showArrow}
                  useDefaultPopperContainer={useDefaultPopperContainer}
                  bg="grayscale.white"
                  color="text.default"
                >
                  {this.renderContent(closePopper)}
                </ArrowedPopperContainer>
              </div>
            </Hide>

            <Render forBreakpoints={showFullScreenMobile ? [true] : []}>
              <PopoverModal title={title} onCancel={closePopper} isVisible={isVisible}>
                {this.renderContent(closePopper)}
              </PopoverModal>
            </Render>
          </>
        )}
      </BasePopper>
    );
  }
}

export default Popover;
