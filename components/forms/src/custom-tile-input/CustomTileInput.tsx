import React, { InputHTMLAttributes, StatelessComponent } from 'react';
import { pickBy } from 'lodash';

import { css, getColor, styled, ColorString } from 'z-frontend-theme';
import { isUtilProp, Box, BoxProps, Flex, Icon, Label, LabelProps } from 'zbase';
import { color, radius, space } from 'z-frontend-theme/utils';

const StyledLabel = styled(Label)`
  cursor: pointer;
`;

const StyledCheckIcon = styled(Icon)`
  color: ${color('grayscale.white')};
`;

const generateBorderBoxShadow = (color = 'rgba(18,52,102,0.15)') => `0 0 0 1px ${color}`;

const StyledIconContainer = styled(Flex)`
  visibility: hidden;
  background-color: ${color('tertiary.a')};
  width: ${space(4)};
  height: ${space(4)};
  border-radius: 16px;
  text-align: center;
  position: absolute;
  top: -${space(2)};
  right: -${space(2)};
`;

export const StyledBox = styled(Box)`
  overflow: visible;
  background-color: ${color('grayscale.white')};
  border-radius: ${radius()};
  box-shadow: ${generateBorderBoxShadow()};
  position: relative;
`;

StyledBox.defaultProps = {
  bg: 'grayscale.white' as ColorString,
};

const errorStyle = css`
  box-shadow: ${generateBorderBoxShadow(getColor('negation.a'))};
  cursor: not-allowed;

  > ${StyledIconContainer} {
    visibility: hidden;
  }
`;

const StyledInput = styled.input`
  height: 0;
  opacity: 0;
  width: 0;
  padding: 0;
  margin: 0;
  /*
  !important is specified here to beat exceptionally high specificity styles from
  cascading from ember app
  */
  outline: none !important;
  /* NOTE: not setting transition: doing so makes responsiveness of selecting radio feel sluggish */

  :checked ~ ${StyledBox} {
    /* Box shadow needs to render over the base and hover ones for grouped inputs */
    z-index: 3;
    box-shadow: ${generateBorderBoxShadow(getColor('tertiary.a'))}, 0 0 0 2px rgba(47, 205, 208, 0.5);
  }

  :disabled ~ ${StyledBox} {
    cursor: not-allowed;
    background-color: ${color('grayscale.g')};
    color: ${color('grayscale.e')};
    box-shadow: ${generateBorderBoxShadow()};
  }

  :hover:not(:disabled):not(:checked) ~ ${StyledBox} {
    z-index: 1;
    box-shadow: ${generateBorderBoxShadow(getColor('grayscale.e'))};
  }

  :active:not(:disabled):not(:checked) ~ ${StyledBox} {
    z-index: 2;
    box-shadow: ${generateBorderBoxShadow(getColor('grayscale.d'))};
  }

  :checked ~ ${StyledBox} > ${StyledIconContainer} {
    visibility: visible;
  }

  &.error ~ ${StyledBox} {
    ${errorStyle};
  }

  &.error:checked ~ ${StyledBox} {
    ${errorStyle};
  }

  &.error:hover:not(:checked) ~ ${StyledBox} {
    ${errorStyle};
  }

  &.error:active:not(:checked) ~ ${StyledBox} {
    ${errorStyle};
  }
`;

export type CustomTileInputProps = LabelProps &
  InputHTMLAttributes<HTMLInputElement> & {
    /**
     * Does the input act as a checkbox (multiple can be selected)? If false, defaults to acting as a radio button.
     * @default false
     */
    isCheckbox?: boolean;
    /**
     * Props applied to container of the input to allow for customization of tile styling
     */
    boxProps?: BoxProps;
    /**
     * When in checkbox mode omit the check icon on the top right corner of selected tiles.
     * This should only be used when using with the CustomTileInputGroup component.
     * @default false
     */
    omitCheckIcon?: boolean;
  };

const CustomTileInput: StatelessComponent<CustomTileInputProps> = props => {
  const { isCheckbox, children, boxProps, omitCheckIcon, ...rest } = props;
  const utilProps = pickBy(props, (value, key) => isUtilProp(key));
  const inputType = isCheckbox ? 'checkbox' : 'radio';

  return (
    <StyledLabel {...utilProps}>
      <StyledInput {...rest} type={inputType} />
      <StyledBox w={1} {...boxProps}>
        {inputType === 'checkbox' && !omitCheckIcon && (
          <StyledIconContainer align="center" justify="center">
            <StyledCheckIcon iconName="check" />
          </StyledIconContainer>
        )}
        {children}
      </StyledBox>
    </StyledLabel>
  );
};

CustomTileInput.defaultProps = {
  isCheckbox: false,
  omitCheckIcon: false,
};

export default CustomTileInput;
