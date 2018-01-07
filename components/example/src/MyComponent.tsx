import React from 'react';
import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/src/utils';

const StyledSpan = styled.span`
  color: ${color('primary.a')};
`;
export default ({ children }) => {
  return <StyledSpan>{children}</StyledSpan>;
};
