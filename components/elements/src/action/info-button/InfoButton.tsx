import React, { Component, MouseEventHandler } from 'react';

import { styled } from 'z-frontend-theme';
import { color, radius } from 'z-frontend-theme/utils';

import Button, { ButtonBasicProps } from '../button/Button';

type DisallowedButtonProps =
  | 's' // use `fontStyle` instead
  | 'height' // use `fontStyle` and maybe `p`/`margin` instead
  | 'inProgress' // probably not needed
  | 'type' // do not use InfoButton for "submit"
  | 'mode';

type InfoButtonProps = Omit<ButtonBasicProps, DisallowedButtonProps> & {
  /** Action to take when button is clicked. */
  onClick?: MouseEventHandler<any>;
};

const LabelWrapper = styled.span`
  /* create "underline" with linear gradient to better control spacing and placement */
  background-image: linear-gradient(to right, ${color('grayscale.d')} 40%, ${color('transparent')} 40%);
  background-position-y: bottom;
  background-size: 3px 1px;
  background-repeat: repeat-x;
  padding-bottom: 1px;
`;

const StyledButton = styled(Button)`
  background-color: initial;
  min-height: unset;
  min-width: unset;

  &:focus:not(:disabled) {
    box-shadow: none;
    outline-width: medium;
    outline-offset: 2px;
    outline-style: auto;
    outline-color: ${color('link.hover', 0.5)};
    -moz-outline-radius: ${radius};
  }

  &:active:not(:disabled) {
    background-color: initial;
  }
`;

class InfoButton extends Component<InfoButtonProps> {
  static defaultProps = {
    px: 0,
    py: 0,
    m: 0,
    fontStyle: 'paragraphs.m',
  };

  render() {
    const { children, ...rest } = this.props;
    return (
      <StyledButton mode="transparent" {...rest}>
        <LabelWrapper>{children}</LabelWrapper>
      </StyledButton>
    );
  }
}

export default InfoButton;
