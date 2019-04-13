import React, { Component, InputHTMLAttributes } from 'react';
import { omitBy, pickBy } from 'lodash';

import { css, styled, ColorString } from 'z-frontend-theme';
import { isUtilProp, Box, Label, LabelProps } from 'zbase';
import { color, fontSizes, icon, radius, space } from 'z-frontend-theme/utils';

const checkboxSize = '16px';

function borderAndBackground(colorKey: ColorString) {
  return css`
    background-color: ${color(colorKey)};
    border-color: ${color(colorKey)};
  `;
}

const StyledCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  width: ${checkboxSize};
  height: ${checkboxSize};
  margin: 0 ${space(2)} 0 0;
  padding: 0;
  border: 2px solid ${color('grayscale.e')};
  border-radius: ${radius()};
  /*
  !important is specified here to beat exceptionally high specificity styles from
  cascading from ember app
  */
  outline: none !important;
  appearance: none;
  vertical-align: text-bottom;
  cursor: pointer;

  ~ span {
    cursor: pointer;
    color: ${color('text.default')};
  }

  ::after {
    font-family: Material-Design-Iconic-Font;
    font-size: ${fontSizes(2)};
    font-weight: bold;
    color: ${color('grayscale.white')};
    position: relative;
    top: -2.5px;
  }

  :hover,
  &.simulate-hover,
  :focus,
  :active {
    border-color: ${color('grayscale.d')};
  }

  :checked {
    ${borderAndBackground('tertiary.a')};

    ~ span {
      color: ${color('text.dark')};
    }

    ::after {
      content: '${icon('check')}';
    }

    :hover,
    :focus {
      ${borderAndBackground('link.normal')};
    }

    :active {
      ${borderAndBackground('link.hover')};
    }

    :disabled,
    :disabled:hover {
      ${borderAndBackground('grayscale.f')};
    }

    &.error {
      ${borderAndBackground('negation.a')};
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

  :active ~ span {
    color: ${color('text.dark')};
  }

  :required {
    box-shadow: none; /* prevent firefox default */
  }

  &.error {
    border-color: ${color('negation.a')};

    :hover {
      border-color: ${color('negation.a')};
    }
  }
`;

export type CheckboxProps = LabelProps &
  InputHTMLAttributes<HTMLInputElement> & {
    /** Short description of what the checkbox means to the user */
    label?: string | JSX.Element;
    /** Identifier for the label, which should be included in aria-labelled-by  */
    labelId?: string;
    /** Is the checkbox disabled? */
    disabled?: boolean;
    /** Event handler for when the value changes. */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

const StyledCheckboxLabel = styled(Label)`
  display: inline-block; /* do not extend clickable area too far -- leads to accidental clicks */
  line-height: 1.5; /* consecutive radios should stack nicely */
`;

class Checkbox extends Component<CheckboxProps> {
  render() {
    const props = this.props;
    const labelProps = pickBy(props, (value, key) => isUtilProp(key));
    const checkboxProps = omitBy(props, (value, key) => isUtilProp(key) || key === 'label');
    return (
      <Box>
        <StyledCheckboxLabel {...labelProps} id={props.labelId}>
          <StyledCheckbox {...checkboxProps} />
          <span>{props.label}</span>
        </StyledCheckboxLabel>
      </Box>
    );
  }
}

export default Checkbox;
