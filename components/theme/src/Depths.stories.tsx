import React from 'react';
import { storiesOf } from '@storybook/react';

import { styled, withTheme } from './web/ThemeProvider';
import depths from './depths';
import { color } from './utils';

// NOTE: avoiding zbase dependency
const DepthFlex = styled.div`
  display: inline-block;
  width: 120px;
  height: 60px;
  line-height: 60px;
  margin: 15px 10px;
  border-radius: 2px;
  background-color: ${color('grayscale.white')};
  text-align: center;
`;

const Page = props => {
  return (
    <div>
      {Object.keys(depths).map((depthKey, i) => (
        <DepthFlex key={i} style={{ boxShadow: depths[i] }}>
          Depth {i + 1}
        </DepthFlex>
      ))}
    </div>
  );
};

const PageWithTheme = withTheme(Page);

storiesOf('Depths', module).add('All', () => <PageWithTheme />);
