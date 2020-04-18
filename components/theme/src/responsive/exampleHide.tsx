import React from 'react';

import Hide from './Hide';
import { styled } from '../web/ThemeProvider';
import { color } from '../utils';

const PaddedBox = styled.div`
  background-color: ${color('primary.a')};
  color: ${color('grayscale.white')};
`;

export default () => (
  <div>
    Should not see the below on mobile
    <Hide forBreakpoints={[true]}>
      <PaddedBox>Hidden at breakpoint 0</PaddedBox>
    </Hide>
  </div>
);
