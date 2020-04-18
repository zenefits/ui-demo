import React, { FunctionComponent } from 'react';

import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

const StyledSpan = styled.span`
  color: ${color('primary.a')};
`;

type MyComponentProps = {};

const MyComponent: FunctionComponent<MyComponentProps> = props => {
  return <StyledSpan>{props.children}</StyledSpan>;
};

export default MyComponent;
