import React, { Component, InputHTMLAttributes } from 'react';
import { styled, css } from 'z-frontend-theme';
import { Label, LabelProps, isUtilProp } from 'zbase';
import { color, icon, fontSizes, radius, space } from 'z-frontend-theme/utils';
import { omitBy, pickBy } from 'lodash';

const checkboxSize = '16px';

function borderAndBackground(colorKey) {
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
  border-radius: ${radius};
  outline: none;
  appearance: none;
  vertical-align: text-bottom;
  cursor: pointer;

  ~ span {
    cursor: pointer;
    color: ${color('grayscale.c')};
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
  :focus,
  :active {
    border-color: ${color('grayscale.d')};
  }

  :checked {
    ${borderAndBackground('tertiary.a')};

    ~ span {
      color: ${color('grayscale.b')};
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
      color: ${color('grayscale.d')};
    }
  }

  &.error {
    border-color: ${color('negation.a')};

    :hover {
      border-color: ${color('negation.a')};
    }
  }
`;

export declare type CheckboxProps = LabelProps &
  InputHTMLAttributes<HTMLInputElement> & {
    /** Short description of what the checkbox means to the user */
    label?: string;
    /** Is the checkbox disabled? */
    disabled?: boolean;
    /** Action to take when value changes */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

const StyledCheckboxLabel = styled(Label)`
  display: block;
  line-height: 1.5; /* consecutive radios should stack nicely */
`;

/**
 * An input component that can be checked or unchecked, similar to HTML's `<input type="checkbox">`
 * */
class Checkbox extends Component<CheckboxProps> {
  render() {
    const props = this.props;
    const utilProps = pickBy(props, (value, key) => isUtilProp(key));
    const checkboxProps = omitBy(props, (value, key) => isUtilProp(key) || key === 'label');
    return (
      <StyledCheckboxLabel {...utilProps}>
        <StyledCheckbox {...checkboxProps} />
        <span>{props.label}</span>
      </StyledCheckboxLabel>
    );
  }
}

export default Checkbox;
