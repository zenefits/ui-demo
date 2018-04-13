import React from 'react';
import { storiesOf } from '@storybook/react';

import { styled } from './web/ThemeProvider';
import { color } from './utils';
import RenderFor from './RenderFor';
import HideFor from './HideFor';

const PaddedBox = styled.div`
  padding: 10px;
  background-color: ${color('grayscale.white')};
`;

storiesOf('Responsive Utils', module)
  .addDecorator(getStory => (
    // TODO: make this decorator the default
    <PaddedBox>{getStory()}</PaddedBox>
  ))
  .add('default', () => (
    <div>
      <RenderFor breakpoints={[false, true, true, true, true]}>
        <div>Rendered at breakpoint 1 and above</div>
      </RenderFor>
      <HideFor breakpoints={[true]}>
        <div>Hidden at breakpoint 0</div>
      </HideFor>
    </div>
  ));
