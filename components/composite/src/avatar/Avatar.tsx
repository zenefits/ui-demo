import React, { Component, Fragment, ReactChild } from 'react';
import { pickBy } from 'lodash';
import { FlattenInterpolation } from 'styled-components';

import { isUtilProp, Box, BoxProps, Image, ImageProps, TextBlock, TextBlockProps, UtilProps } from 'zbase';
import { color, radius } from 'z-frontend-theme/utils';
import { avatarColors, css, styled, theme, ColorString, FontStyleString } from 'z-frontend-theme';
import { TooltipProps } from 'z-frontend-overlays';

import AvatarTooltip from './AvatarTooltip';
import CircularBadge from './CircularBadge';

type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge';

export type AvatarBadge = 'contingent';

type AvatarImageFit = 'cover' | 'contain';

type AvatarTooltipProps = Partial<TooltipProps>;

interface AvatarCommonProps {
  /**
   * Is the avatar disabled?
   * @default false
   */
  disabled?: boolean;
  /**
   * Size of the avatar.
   * @default medium
   * */
  s?: AvatarSize;
  /**
   * Is the outside edge of the avatar square instead of round?
   * @default false
   * */
  isSquare?: boolean;
  /**
   * Should the image cover all available space (cover) or stay contained (contain)?
   * Typically photos should use cover while logos should use contain.
   * @default cover
   */
  imageFit?: AvatarImageFit;
  /**
   * type of badge to include in the avatar
   * @default ''
   * */
  badge?: AvatarBadge;
  /**
   * Pass props to underlying tooltip component.
   * */
  tooltipProps?: AvatarTooltipProps;
  /**
   * Override default tooltip content.
   * By default, if (badge === 'contingent') we also show `Contingent Worker - ${workerType}`
   * To disable the tooltip, use tooltipBody=""
   * @default `${firstName} ${lastName}`
   * */
  tooltipBody?: ReactChild;
}

const fontStyleMap: { [key: string]: FontStyleString } = {
  xsmall: 'paragraphs.s',
  small: 'paragraphs.s',
  medium: 'paragraphs.m',
  large: 'paragraphs.l',
  xlarge: 'paragraphs.xl',
  xxlarge: 'paragraphs.xxl',
  xxxlarge: 'headings.xxl',
};

interface InitialsAvatarProps extends AvatarCommonProps, TextBlockProps {
  /** Name used for initials if no photo available. */
  firstName?: string;
  /** Name used for initials if no photo available. */
  lastName?: string;
  /**
   * Email used in default tooltip
   * */
  email?: string;
  /**
   * Worker type used in default tooltip of `badge === contingent`
   */
  workerType?: string;
}

const AvatarInitials = styled<InitialsAvatarProps>(TextBlock)`
  line-height: 1;
  color: inherit;
  letter-spacing: ${props => (props.s === 'xsmall' ? '0' : '1px')};
  font-size: inherit;
  font-weight: normal;
`;

interface ImageAvatarProps extends AvatarCommonProps {
  /** URL of the photo to display, if available. */
  photoUrl?: string;
  crossOrigin?: '' | 'anonymous' | 'use-credentials';
  /** Custom alternative text description used by screen readers, for example. */
  alt?: string;
}

const AvatarStyle: FlattenInterpolation<AvatarCommonProps>[] = css`
  box-sizing: border-box;
  border-radius: ${props => (props.isSquare ? radius : '50%')};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  box-shadow: 0px 0px 0px 2px ${color('secondary.b')};

  :hover {
    opacity: 1;
    box-shadow: 0 0 0 3px ${color('button.defaultNormal')};
  }
`;

const StyledImageAvatar = styled<ImageProps & ImageAvatarProps>(Image)`
  ${AvatarStyle};
  object-fit: ${props => props.imageFit}; /* preserve aspect ratio */
`;

const StyledInitialsAvatar = styled<BoxProps & InitialsAvatarProps>(Box)`
  ${AvatarStyle};
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface badgeDetailsType {
  badgeText: string;
  bg: ColorString;
  position: 'br' | 'bl' | 'tr' | 'tl';
}

export const badgeTypeMap: { [key: string]: badgeDetailsType } = {
  contingent: {
    badgeText: 'C',
    bg: 'tertiary.a',
    position: 'br',
  },
};

const badgePositionAdjustments: { [key: string]: { [key: string]: string } } = {
  xsmall: {
    top: '-8px',
    bottom: '-4px',
  },
  small: {
    top: '-6px',
    bottom: '-4px',
  },
  medium: {
    top: '-4px',
  },
  large: {
    top: '-2px',
  },
};

// contingent is the only type right now and its on br, but could potentially have different positions
function calculateBadgePosition(props: AvatarProps) {
  const desiredPosition = badgeTypeMap[props.badge].position;
  let yPosition = '0';
  if (desiredPosition === 'br' || desiredPosition === 'bl') {
    if (badgePositionAdjustments[props.s] && badgePositionAdjustments[props.s].bottom) {
      yPosition = badgePositionAdjustments[props.s].bottom;
    }
    return css`
      bottom: ${yPosition};
      ${desiredPosition === 'br' ? 'right: 0' : 'left: 0'};
    `;
  }
  // tl and tr
  if (badgePositionAdjustments[props.s] && badgePositionAdjustments[props.s].top) {
    yPosition = badgePositionAdjustments[props.s].top;
  }
  return css`
    top: ${yPosition};
    ${desiredPosition === 'tr' ? 'right: 0' : 'left: 0'};
  `;
}

const StyledContainer = styled(Box)`
  position: relative;
  height: 100%;
`;

const StyledAvatarContainer = styled<AvatarProps>(Box)`
  position: absolute;
  ${props => calculateBadgePosition(props)};
`;

function hash(str: string) {
  let hashResult = 0;
  for (let i = 0; i < str.length; i += 1) {
    hashResult += str.charCodeAt(i);
  }
  return hashResult;
}

function getDefaultColor(initials: string): ColorString {
  const colors = Object.keys(avatarColors);
  const index = hash(initials) % colors.length;
  return colors[index] as ColorString;
}

export type AvatarProps = BoxProps & InitialsAvatarProps & ImageAvatarProps;

class Avatar extends Component<AvatarProps> {
  static defaultProps = {
    s: 'medium' as AvatarSize,
    disabled: false,
    isSquare: false,
    imageFit: 'cover' as AvatarImageFit,
    color: 'grayscale.white' as ColorString,
  };

  getAvatarBadge = (sizeProps: any, utilProps: UtilProps) => {
    return (
      <StyledAvatarContainer s={this.props.s} badge={this.props.badge}>
        <CircularBadge {...sizeProps} {...utilProps} s={this.props.s} badge={this.props.badge} align-self="flex-end">
          {this.props.s === 'small' || this.props.s === 'xsmall' ? '' : badgeTypeMap[this.props.badge].badgeText}
        </CircularBadge>
      </StyledAvatarContainer>
    );
  };

  render() {
    const { firstName, lastName, photoUrl, s, disabled, isSquare, imageFit, badge, alt, onClick } = this.props;
    const utilProps: UtilProps = pickBy(this.props, (value, key) => isUtilProp(key));
    const optionalProps = onClick ? { onClick: onClick as any } : {};

    const computedSize = utilProps.w || utilProps.width || theme.heights[s];
    const sizeProps = {
      width: computedSize,
      height: computedSize,
    };
    const Container = badge ? StyledContainer : Fragment;

    if (photoUrl) {
      const altText = alt || (firstName && lastName ? `${firstName} ${lastName}'s picture` : null);
      return (
        <AvatarTooltip {...this.props}>
          <Container>
            <StyledImageAvatar
              className={this.props.className}
              src={photoUrl}
              alt={altText}
              disabled={disabled}
              isSquare={isSquare}
              imageFit={imageFit}
              {...utilProps}
              {...sizeProps}
              {...optionalProps}
            />
            {badge && this.getAvatarBadge(sizeProps, utilProps)}
          </Container>
        </AvatarTooltip>
      );
    }

    const initialsComputed = ((firstName || ' ')[0] + (lastName || ' ')[0]).toUpperCase();
    if (!utilProps.bg) {
      utilProps.bg = getDefaultColor(initialsComputed);
    }
    if (!utilProps.fontStyle) {
      utilProps.fontStyle = fontStyleMap[s];
    }
    return (
      <AvatarTooltip {...this.props}>
        <Container>
          <StyledInitialsAvatar
            className={this.props.className}
            disabled={disabled}
            isSquare={isSquare}
            {...utilProps}
            {...sizeProps}
          >
            <AvatarInitials s={s}>{initialsComputed}</AvatarInitials>
          </StyledInitialsAvatar>
          {badge && this.getAvatarBadge(sizeProps, utilProps)}
        </Container>
      </AvatarTooltip>
    );
  }
}

export default Avatar;
