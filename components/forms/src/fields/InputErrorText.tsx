import React, { StatelessComponent } from 'react';
import { Box } from 'zbase';
import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

const StyledContainer = styled(Box)`
  background-color: ${color('negation.d')};
  color: ${color('negation.a')};
  border: solid 1px ${color('negation.c')};
`;

const InputErrorText: StatelessComponent = props => {
  return (
    <StyledContainer px={3} py={2} role="alert">
      {props.children}
    </StyledContainer>
  );
};

export default InputErrorText;
