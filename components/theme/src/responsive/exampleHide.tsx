import React from 'react';

import HideFor from './HideFor';
import { styled } from '../web/ThemeProvider';
import { color } from '../utils';

const PaddedBox = styled.div`
  background-color: ${color('primary.a')};
  color: ${color('grayscale.white')};
`;

export default () => (
  <div>
    <HideFor breakpoints={[true]}>
      <PaddedBox>Hidden at breakpoint 0</PaddedBox>
    </HideFor>
  </div>
);
