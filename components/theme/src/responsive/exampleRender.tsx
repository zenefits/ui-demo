import React from 'react';

import Render from './Render';
import { styled } from '../web/ThemeProvider';
import { color } from '../utils';

const PaddedBox = styled.div`
  background-color: ${color('primary.a')};
  color: ${color('grayscale.white')};
`;

export default () => (
  <div>
    Should not see the below on mobile
    <Render forBreakpoints={[false, true, true, true, true]}>
      <PaddedBox>Rendered at breakpoint 1 and above</PaddedBox>
    </Render>
  </div>
);
