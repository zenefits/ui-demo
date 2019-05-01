import React, { Component } from 'react';

import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

const StyledSpan = styled.span`
  color: ${color('primary.a')};
`;

type Props = {};

export default class MyComponent extends Component<Props> {
  render() {
    return <StyledSpan>{this.props.children}</StyledSpan>;
  }
}
