import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';
import { Box } from 'zbase';
import { Card } from 'z-frontend-composites';

import OverviewLayout from './OverviewLayout';

const mainText = 'main content';
const sideText = 'side';
const mainRender = () => <Card p={5}>{mainText}</Card>;
const sideRender = () => <Card p={5}>{sideText}</Card>;

describe('OverviewLayout', () => {
  it('should mount without throwing an error', () => {
    expect(mountEnzymeWithTheme(<OverviewLayout heroTitle="title" />)).toHaveLength(1);
  });

  it('should render main if provided', () => {
    const mounted = mountEnzymeWithTheme(<OverviewLayout heroTitle="title" mainRender={mainRender} />);
    expect(mounted.text()).toMatch(mainText);
  });

  it('should render side if provided', () => {
    const mounted = mountEnzymeWithTheme(<OverviewLayout heroTitle="title" sideRender={sideRender} />);
    expect(mounted.text()).toMatch(sideText);
  });

  it('should be responsive', () => {
    const mounted = mountEnzymeWithTheme(
      <OverviewLayout heroTitle="title" mainRender={mainRender} sideRender={sideRender} />,
    );
    expect(mounted.find(Box).first()).toHaveStyleRule('width', '70%', {
      media: 'screen and (min-width:48em)',
    });
  });
});
