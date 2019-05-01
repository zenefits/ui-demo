import React, { Component } from 'react';

import { Flex, FlexProps, Icon } from 'zbase';
import { styled, ColorString, IconNameString } from 'z-frontend-theme';
import { IconButton } from 'z-frontend-elements';

type BannerType = 'success' | 'info' | 'error';

type BannerState = {
  closed: boolean;
};

type BannerFlexContainerProps = Pick<FlexProps, 'm' | 'my' | 'mx' | 'mr' | 'ml' | 'mb' | 'mt' | 'w'>;

type BannerOwnProps = {
  /** Type of banner  */
  type: BannerType;
  /** Allow the banner to be dismissed via a close IconButton */
  isClosable?: boolean;
  /** Show an icon prepending banner content. The rendered icon is dependent on the type */
  showIcon?: boolean;
};

type BannerColors = {
  borderColor: ColorString;
  bg: ColorString;
  color: ColorString;
};

const stateColorsMap: { [key in BannerType]: BannerColors } = {
  success: { borderColor: 'affirmation.c', bg: 'affirmation.d', color: 'affirmation.a' },
  info: { borderColor: 'secondary.b', bg: 'secondary.c', color: 'secondary.a' },
  error: { borderColor: 'negation.c', bg: 'negation.d', color: 'negation.a' },
};

const iconNameMap: { [key in BannerType]: IconNameString } = {
  success: 'check-circle',
  info: 'info',
  error: 'close-circle',
};

const StyledIconButton = styled(IconButton)`
  align-self: flex-start;
`;

export default class Banner extends Component<BannerOwnProps & BannerFlexContainerProps, BannerState> {
  static defaultProps = {
    isClosable: true,
    showIcon: true,
  };
  state = {
    closed: false,
  };

  clickClose = () => {
    this.setState({ closed: true });
  };

  render() {
    const { type, isClosable, children, showIcon } = this.props;
    const colors = stateColorsMap[type];
    const iconName = showIcon && iconNameMap[type];

    if (this.state.closed) {
      return null;
    }
    return (
      <Flex
        py={2}
        px={3}
        align="center"
        justify="space-between"
        fontStyle="paragraphs.m"
        border
        borderColor={colors.borderColor}
        color={colors.color}
        bg={colors.bg}
      >
        <Flex align="baseline">
          {iconName && <Icon mr={2} iconName={iconName} />}
          {children}
        </Flex>
        {isClosable && (
          <StyledIconButton
            ml={2}
            mr={-2}
            s="small"
            color={colors.color}
            iconName="close"
            aria-label="Close"
            onClick={this.clickClose}
          />
        )}
      </Flex>
    );
  }
}
