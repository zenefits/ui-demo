import React, { Component } from 'react';
import { pickBy } from 'lodash';
import { Box, BoxProps, Text, Image, ImageProps, isUtilProp, UtilProps } from 'zbase';

import { heights, color, fontSizes, radius } from 'z-frontend-theme/utils';
import { styled, css, avatarColors } from 'z-frontend-theme';

interface AvatarCommonProps {
  /** Background color to use for the initials avatar, otherwise randomized. */
  customColor?: string;
  /** Is the avatar disabled? */
  disabled?: Boolean;
  /** Size of the avatar */
  s?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  /** Description of the avatar, typically rendered as a tooltip by browsers. Defaults to a combination of firstName and lastName. */
  title?: string;
  isSquare?: Boolean;
}

const styleSpecMap = {
  fontStyleMap: {
    xsmall: 0,
    small: 0,
    medium: 1,
    large: 2,
    xlarge: 3,
    xxlarge: 4,
  },
  paddingSpaceMap: {
    xsmall: 4,
    small: 8,
    medium: 10,
    large: 12,
    xlarge: 18,
    xxlarge: 24,
  },
  // uses actual pixel sizes, some sizes are not in the spaces array
};

interface InitialsAvatarProps extends AvatarCommonProps {
  /** Name used for initials if no photo available. */
  firstName?: string;
  /** Name used for initials if no photo available. */
  lastName?: string;
}

const AvatarInitials = styled<InitialsAvatarProps>(Text)`
  display: block;
  line-height: 1.33;
  letter-spacing: 1px;
  font-size: ${props => fontSizes(styleSpecMap.fontStyleMap[props.s])};
  text-align: center;
  padding-top: ${props => styleSpecMap.paddingSpaceMap[props.s] + 'px'};
`;

interface ImageAvatarProps extends AvatarCommonProps {
  /** URL of the photo to display, if available. */
  photoUrl?: string;
}

const AvatarStyle = css`
  box-sizing: border-box;
  width: ${props => heights(props.s)};
  height: ${props => heights(props.s)};
  color: ${color('grayscale.white')};
  border-radius: ${props => (props.isSquare ? radius : '50%')};
  box-shadow: 0 0 0 2px ${color('button.defaultNormal')};
  background-color: ${props => props.customColor};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  object-fit: cover; /* preserve aspect ratio */
`;

const StyledImageAvatar = styled<ImageProps & ImageAvatarProps>(Image)`
  ${AvatarStyle};
`;

const StyledInitialsAvatar = styled<BoxProps & InitialsAvatarProps>(Box)`
  ${AvatarStyle};
`;

function hash(str) {
  let hashResult = 0;
  for (let i = 0; i < str.length; i += 1) {
    hashResult += str.charCodeAt(i);
  }
  return hashResult;
}

function getDefaultColor(initials) {
  const colors = Object.values(avatarColors);
  const index = hash(initials) % colors.length;
  return colors[index];
}

type AvatarProps = BoxProps & InitialsAvatarProps & ImageAvatarProps;

/**
 * A component that renders an avatar using either a photo (if provided) or name initials.
 */
export default class Avatar extends Component<AvatarProps> {
  static defaultProps = {
    s: 'medium',
    disabled: false,
    isSquare: false,
  };
  render() {
    const { firstName, lastName, customColor, photoUrl, s, disabled, title, isSquare } = this.props;
    const utilProps: UtilProps = pickBy(this.props, (value, key) => isUtilProp(key));

    if (photoUrl) {
      const altText = firstName && lastName ? `${firstName} ${lastName}'s picture` : null;
      return (
        <StyledImageAvatar
          s={s}
          src={photoUrl}
          title={title || altText}
          alt={altText}
          disabled={disabled}
          isSquare={isSquare}
          {...utilProps}
        />
      );
    }

    const initialsComputed = ((firstName || ' ')[0] + (lastName || ' ')[0]).toUpperCase();
    return (
      <StyledInitialsAvatar
        s={s}
        customColor={customColor || getDefaultColor(initialsComputed)}
        disabled={disabled}
        isSquare={isSquare}
        {...utilProps}
      >
        <AvatarInitials s={s} title={title || `${firstName} ${lastName}`}>
          {initialsComputed}
        </AvatarInitials>
      </StyledInitialsAvatar>
    );
  }
}
