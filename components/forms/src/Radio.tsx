import React, { StatelessComponent, InputHTMLAttributes } from 'react';
import { styled, css } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';
import { Label, LabelProps } from 'zbase';

const radioWidth = '16px';

export declare type RadioProps = LabelProps &
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
  };

function gradientWithColor(colorKey) {
  return css`
    background: radial-gradient(circle at center, ${color(colorKey)} 0, ${color(colorKey)} 35%, transparent 40%);
  `;
}

const StyledRadioInput = styled.input.attrs({ type: 'radio' })`
  appearance: none;
  background: transparent;
  outline: none;
  border: 2px solid ${color('grayscale.e')};
  border-radius: 50%;
  width: ${radioWidth};
  height: ${radioWidth};
  margin: 0 5px 0 0;
  vertical-align: text-bottom;
  cursor: pointer;

  ~ span {
    cursor: pointer;
    color: ${color('grayscale.c')};
  }

  :checked {
    ${gradientWithColor('tertiary.a')};

    ~ span {
      color: ${color('grayscale.b')};
    }

    :hover {
      ${gradientWithColor('link.normal')};
    }

    :active {
      ${gradientWithColor('link.hover')};
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
      color: ${color('grayscale.d')};
    }
  }

  :hover,
  :focus,
  :active {
    border-color: ${color('grayscale.d')};
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
  display: block;
  line-height: 1.5; /* consecutive radios should stack nicely */
`;

const Radio: StatelessComponent<RadioProps> = props => {
  const { onFocus, onBlur, onClick, onChange, label, name, value, ...labelProps } = props;
  return (
    <StyledRadioLabel {...labelProps}>
      <StyledRadioInput {...props} /> <span>{props.label}</span>
    </StyledRadioLabel>
  );
};

export default Radio;
