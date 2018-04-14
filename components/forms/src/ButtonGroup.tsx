import React, { StatelessComponent } from 'react';

import { styled } from 'z-frontend-theme';
import { Box, BoxProps, Flex } from 'zbase';
import { color } from 'z-frontend-theme/utils';

export const childItemClassName = 'button-group-child-item';

const ButtonGroupInnerContainer = styled(Flex)`
  > *:first-child:not(:last-child) {
    &,
    .${childItemClassName} {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  > *:not(:first-child) {
    border-left: 1px solid ${color('grayscale.g')};
  }

  > *:not(:first-child):not(:last-child) {
    &,
    .${childItemClassName} {
      border-radius: 0;
    }
  }

  > *:last-child:not(:first-child) {
    &,
    .${childItemClassName} {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

const ButtonGroupOuterContainer = styled(Box)`
  display: inline-block;
`;

const ButtonGroup: StatelessComponent<BoxProps> = ({ children, ...rest }) => (
  <ButtonGroupOuterContainer {...rest}>
    <ButtonGroupInnerContainer align="flex-start">{children}</ButtonGroupInnerContainer>
  </ButtonGroupOuterContainer>
);

export default ButtonGroup;
