import React, { InputHTMLAttributes, StatelessComponent } from 'react';
import { omitBy, pickBy } from 'lodash';

import { css, styled, ColorString } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';
import { isUtilProp, Box, Label, LabelProps } from 'zbase';

const radioWidth = '16px';

export type RadioProps = LabelProps &
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
  };

function gradientWithColor(colorKey: ColorString) {
  return css`
    background: radial-gradient(circle at center, ${color(colorKey)} 0, ${color(colorKey)} 35%, transparent 40%);
  `;
}

const StyledRadioInput = styled.input.attrs({ type: 'radio' })`
  appearance: none;
  background: transparent;
  /*
  !important is specified here to beat exceptionally high specificity styles from
  cascading from ember app
  */
  outline: none !important;
  border: 2px solid ${color('grayscale.e')};
  border-radius: 50%;
  width: ${radioWidth};
  height: ${radioWidth};
  margin: 0 5px 0 0;
  vertical-align: text-bottom;
  cursor: pointer;

  ~ span {
    cursor: pointer;
    color: ${color('text.default')};
  }

  :hover,
  &.simulate-hover,
  :focus,
  &.simulate-focus,
  :active,
  &.simulate-active {
    border-color: ${color('link.active')};
  }

  :checked {
    ${gradientWithColor('link.normal')};

    ~ span {
      color: ${color('text.dark')};
    }

    :hover,
    &.simulate-hover,
    :focus,
    &.simulate-focus,
    :active,
    &.simulate-active {
      ${gradientWithColor('link.hover')};
      border-color: ${color('link.hover')};
    }

    :disabled,
    :disabled:hover {
      ${gradientWithColor('grayscale.f')};
    }
  }

  :disabled,
  :disabled:hover {
    border-color: ${color('grayscale.f')};
    cursor: not-allowed;

    ~ span {
      cursor: not-allowed;
      color: ${color('text.light')};
    }
  }

  :required {
    box-shadow: none; /* prevent firefox default */
  }

  :active ~ span,
  &.simulate-active ~ span {
    color: ${color('text.dark')};
  }

  &.error {
    border-color: ${color('negation.a')};

    &:checked,
    &:hover {
      ${gradientWithColor('negation.a')};
    }
  }
`;

const StyledRadioLabel = styled(Label)`
  display: inline-block; /* do not extend clickable area too far -- leads to accidental clicks */
  line-height: 1.5; /* consecutive radios should stack nicely */
`;

const Radio: StatelessComponent<RadioProps> = props => {
  const utilProps = pickBy(props, (value, key) => isUtilProp(key));
  const radioProps = omitBy(props, (value, key) => isUtilProp(key) || key === 'label');
  return (
    // NOTE: no need for aria-labelledby because label already wraps input
    <Box>
      <StyledRadioLabel {...utilProps}>
        <StyledRadioInput {...radioProps} /> <span>{props.label}</span>
      </StyledRadioLabel>
    </Box>
  );
};

export default Radio;
