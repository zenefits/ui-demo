import React from 'react';

import RenderFor from './RenderFor';
import { styled } from '../web/ThemeProvider';
import { color } from '../utils';

const PaddedBox = styled.div`
  background-color: ${color('primary.a')};
  color: ${color('grayscale.white')};
`;

export default () => (
  <div>
    <RenderFor breakpoints={[false, true, true, true, true]}>
      <PaddedBox>Rendered at breakpoint 1 and above</PaddedBox>
    </RenderFor>
  </div>
);
