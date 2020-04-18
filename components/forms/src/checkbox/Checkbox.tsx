import React, { Component, InputHTMLAttributes } from 'react';
import { omitBy, pickBy } from 'lodash';

import { css, styled, theme, ColorString } from 'z-frontend-theme';
import { isUtilProp, Box, Label, LabelProps } from 'zbase';
import { color, fontSizes, icon, radius, space } from 'z-frontend-theme/utils';

const checkboxSize = 3;
const checkboxMarginRight = 2;
const checkboxWrapOffset = `${theme.space[checkboxSize] + theme.space[checkboxMarginRight]}px`;

function borderAndBackground(colorKey: ColorString) {
  return css`
    background-color: ${color(colorKey)};
    border-color: ${color(colorKey)};
  `;
}

const StyledCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  width: ${space(checkboxSize)};
  height: ${space(checkboxSize)};
  margin: 0 ${space(checkboxMarginRight)} 0 0;
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
  display: inline-flex;
  justify-content: center;
  align-items: center;

  ~ span {
    cursor: pointer;
    color: ${color('text.default')};
  }

  ::after {
    font-family: Material-Design-Iconic-Font;
    font-size: ${fontSizes(2)};
    font-weight: bold;
    color: ${color('grayscale.white')};
  }

  :hover,
  &.simulate-hover,
  :focus,
  &.simulate-focus,
  :active,
  &.simulate-active {
    border-color: ${color('link.active')};
  }

  :checked,
  :indeterminate {
    ${borderAndBackground('link.normal')};

    ~ span {
      color: ${color('text.dark')};
    }

    :hover,
    &.simulate-hover,
    :focus,
    &.simulate-focus,
    :active,
    &.simulate-active {
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

  :checked {
    ::after {
      content: '${icon('check')}';
    }
  }

  :indeterminate {
    ::after {
      content: '${icon('minus')}';
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

  :active ~ span,
  &.simulate-active ~ span {
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

export type CheckboxProps = Omit<LabelProps, 'onChange'> &
  InputHTMLAttributes<HTMLInputElement> & {
    /** Short description of what the checkbox means to the user */
    label?: string | JSX.Element;
    /** Identifier for the label, which should be included in aria-labelled-by  */
    labelId?: string;
    /** Is the checkbox disabled? */
    disabled?: boolean;
    /** Is the checkbox indeterminate? (neither checked nor unchecked) */
    indeterminate?: boolean;
    /** Event handler for when the value changes. */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

const StyledCheckboxLabel = styled(Label)`
  display: inline-block; /* do not extend clickable area too far -- leads to accidental clicks */
  line-height: 1.5; /* consecutive radios should stack nicely */

  /* wrapped labels should align on LHS instead of falling under checkbox */
  text-indent: -${checkboxWrapOffset};
  padding-left: ${checkboxWrapOffset};
`;

class Checkbox extends Component<CheckboxProps> {
  checkboxRef: React.RefObject<HTMLInputElement>;

  constructor(props: CheckboxProps) {
    super(props);
    this.checkboxRef = React.createRef<HTMLInputElement>();
  }

  componentDidMount() {
    this.checkboxRef.current.indeterminate = this.props.indeterminate;
  }

  componentDidUpdate(prevProps: CheckboxProps) {
    if (prevProps.indeterminate !== this.props.indeterminate) {
      this.checkboxRef.current.indeterminate = this.props.indeterminate;
    }
  }

  render() {
    const { props } = this;
    const labelProps = pickBy(props, (value, key) => isUtilProp(key));
    const checkboxProps = omitBy(props, (value, key) => isUtilProp(key) || key === 'label');
    return (
      <Box>
        <StyledCheckboxLabel {...labelProps} id={props.labelId}>
          <StyledCheckbox {...checkboxProps} ref={this.checkboxRef} />
          <span>{props.label}</span>
        </StyledCheckboxLabel>
      </Box>
    );
  }
}

export default Checkbox;
