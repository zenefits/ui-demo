import React, { AllHTMLAttributes } from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react';

import { styled } from './web/ThemeProvider';
import depths from './depths';
import { color, depth } from './utils';

// NOTE: avoiding zbase dependency
type depthFlexProps = AllHTMLAttributes<HTMLDivElement> & { depthKey: number };

const DepthFlex = styled((props: depthFlexProps) => {
  const { depthKey, ...rest } = props;
  return <div {...rest} />;
})<depthFlexProps>`
  display: inline-block;
  width: 120px;
  height: 60px;
  line-height: 60px;
  margin: 15px 10px;
  border-radius: 2px;
  background-color: ${color('grayscale.white')};
  text-align: center;
  ${props => depth(props.depthKey)};
`;

const StyledContainer = styled.div`
  background-color: ${color('grayscale.white')};
`;

const Page = () => {
  return (
    <StyledContainer>
      {depths.map((depthKey, i) => (
        <DepthFlex key={depthKey} depthKey={i}>
          {i < depths.length - 1 ? `DEPTH ${i}` : 'HEADER'}
        </DepthFlex>
      ))}
    </StyledContainer>
  );
};

storiesOf('theme|Depths', module).add('All', () => <Page />);
