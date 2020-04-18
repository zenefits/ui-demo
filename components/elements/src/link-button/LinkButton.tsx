import React, { Component } from 'react';

import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

import Button, { ButtonBasicProps } from '../action/button/Button';
import { linkStyle } from '../action/link/Link';

function maybeInheritFont(props: ButtonBasicProps) {
  if (props.fontStyle || props.s) {
    /* just rely on those */
    return;
  }
  return 'font: inherit;';
}

const StyledButton = styled(Button)`
  min-height: unset;
  min-width: unset;
  ${maybeInheritFont}
  ${linkStyle}
  text-align: inherit; /* override Button default of 'center' */

  /* override some problematic things from Button */
  :disabled {
    opacity: 1;
    color: ${color('text.off')};
  }
  :active:not(:disabled) {
    background: none;
  }
  &.simulate-focus,
  :focus:not(:disabled) {
    /* follow Link style */
    outline: 5px auto;
    box-shadow: none;
  }
`;

type LinkButtonProps = ButtonBasicProps;

export default class LinkButton extends Component<LinkButtonProps> {
  static defaultProps = {
    p: 0,
  };

  render() {
    const { disabled, inProgress, ...rest } = this.props;
    return (
      <StyledButton mode="transparent" disabled={disabled || inProgress} {...rest}>
        {inProgress ? 'Loading...' : this.props.children}
      </StyledButton>
    );
  }
}
