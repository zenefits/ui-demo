import React, { Component } from 'react';

import { Box, Flex } from 'zbase';
import { styled } from 'z-frontend-theme';
import { zIndex } from 'z-frontend-theme/utils';

import { AppContentContainerFlex } from '../AppContentContainer';

const AbsoluteNav = styled(Box)`
  position: fixed;
  height: 48px;
  left: 0;
  right: 0;
  top: ${props => props.theme.topNavHeight};
  z-index: ${zIndex('fixed')};
  box-shadow: 0 2px 6px 0 rgba(18, 52, 102, 0.1);
`;

const AbsoluteNavPlaceholder = styled(Box)`
  height: 48px;
`;

interface ProductNavContainerProps {
  /**
   * Stretch to full width? By default, a max-width is being used.
   * @default false
   */
  isFullWidth?: boolean;
}

class ProductNavContainer extends Component<ProductNavContainerProps> {
  static defaultProps = {
    isFullWidth: false,
  };

  render() {
    const { children, isFullWidth } = this.props;

    return (
      <AbsoluteNavPlaceholder>
        <AbsoluteNav bg="grayscale.white">
          <AppContentContainerFlex isFullWidth={isFullWidth}>
            <Flex mx={-3} p={0}>
              {children}
            </Flex>
          </AppContentContainerFlex>
        </AbsoluteNav>
      </AbsoluteNavPlaceholder>
    );
  }
}

export default ProductNavContainer;
