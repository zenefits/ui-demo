import React, { InputHTMLAttributes, StatelessComponent } from 'react';
import { pickBy } from 'lodash';

import { css, styled } from 'z-frontend-theme';
import { isUtilProp, Box, Icon, Label, LabelProps } from 'zbase';
import { color, depth, radius, space } from 'z-frontend-theme/utils';
import { Card } from 'z-frontend-layout';

const StyledContainer = styled(Label)`
  cursor: pointer;
`;

const StyledCheckIcon = styled(Icon)`
  vertical-align: middle;
  color: ${color('grayscale.white')};
`;

const StyledIconContainer = styled(Box)`
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

const StyledCard = styled(Card)`
  border: unset;
  box-shadow: ${depth(0)};
  background-color: ${color('grayscale.white')};
  border-radius: ${radius};
  outline: none;
  position: relative;
`;

const errorStyle = css`
  box-shadow: 0 0 0 1px ${color('negation.a')};
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

  :checked ~ ${StyledCard} {
    box-shadow: 0 0 0 1px rgba(47, 205, 208, 0.5), inset 0 0 0 1px ${color('tertiary.a')};
  }

  :disabled ~ ${StyledCard} {
    cursor: not-allowed;
    background-color: ${color('secondary.c')};
    color: ${color('grayscale.e')};
    box-shadow: ${depth(0)};
  }

  :hover:not(:disabled):not(:checked) ~ ${StyledCard} {
    box-shadow: 0 0 0 1px ${color('grayscale.e')};
  }

  :active:not(:disabled):not(:checked) ~ ${StyledCard} {
    box-shadow: 0 0 0 1px ${color('grayscale.d')};
  }

  :checked ~ ${StyledCard} > ${StyledIconContainer} {
    visibility: visible;
  }

  &.error ~ ${StyledCard} {
    ${errorStyle};
  }

  &.error:checked ~ ${StyledCard} {
    ${errorStyle};
  }

  &.error:hover:not(:checked) ~ ${StyledCard} {
    ${errorStyle};
  }

  &.error:active:not(:checked) ~ ${StyledCard} {
    ${errorStyle};
  }
`;

export declare type CustomTileInputProps = LabelProps &
  InputHTMLAttributes<HTMLInputElement> & { isCheckbox?: boolean };

const CustomTileInput: StatelessComponent<CustomTileInputProps> = props => {
  const { isCheckbox = false, children, ...rest } = props;
  const utilProps = pickBy(props, (value, key) => isUtilProp(key));
  let inputType = 'radio';
  if (isCheckbox) {
    inputType = 'checkbox';
  }

  return (
    <StyledContainer {...utilProps}>
      <StyledInput {...rest} type={inputType} />
      <StyledCard w={1}>
        {inputType === 'checkbox' && (
          <StyledIconContainer>
            <StyledCheckIcon iconName="check" />
          </StyledIconContainer>
        )}
        {children}
      </StyledCard>
    </StyledContainer>
  );
};

export default CustomTileInput;
