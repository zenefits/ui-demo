import React, { Component } from 'react';
import styled from 'styled-components';

const checkboxBorderSize = '2px';
const checkboxBorderRadius = '2px';
const checkboxDisabledOpacity = 0.5;
const checkboxSize = '14px';
const checkboxSizeIncludingBorders = '18px'; // checkboxSize + (2 * checkboxBorderSize)

export const StyledCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  width: ${checkboxSizeIncludingBorders};
  height: ${checkboxSizeIncludingBorders};
  margin: ${props => props.theme.space[0]};
  padding: ${props => props.theme.space[0]};
  cursor: pointer;
  border: ${checkboxBorderSize} solid ${props => props.theme.colors.greyScale['15']};
  border-radius: ${checkboxBorderRadius};
  appearance: none;

  :hover {
    border: ${checkboxBorderSize} solid ${props => props.theme.colors.greyScale['38']};
  }
  :focus {
    outline: none;
  }
  :checked {
    background-color: ${props => props.theme.colors.primary.blue100};
    border: ${checkboxBorderSize} solid ${props => props.theme.colors.primary.blue100};
  }
  :checked:hover {
    border: ${checkboxBorderSize} solid ${props => props.theme.colors.primary.blue100};
  }
  :disabled {
    cursor: not-allowed;
    opacity: ${checkboxDisabledOpacity};
  }
  :disabled:hover {
    border: ${checkboxBorderSize} solid ${props => props.theme.colors.greyScale['15']};
  }
  :after {
    display: block;
    width: ${checkboxSize};
    font-family: Material-Design-Iconic-Font;
    font-size: 17px;
    line-height: ${checkboxSize};
    color: #fff;
    text-align: center;
    content: '${props => props.theme.icons.check}';
  }
`;

interface Props {
  id?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange?: Function;
}

interface State {}

export default class Checkbox extends Component<Props, State> {
  constructor(props) {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    if (!this.props.isDisabled) {
      this.props.onChange(event.target.checked);
    }
  }

  render() {
    return (
      <StyledCheckbox disabled={!!this.props.isDisabled} checked={this.props.isChecked} onChange={this.onChange} />
    );
  }
}
