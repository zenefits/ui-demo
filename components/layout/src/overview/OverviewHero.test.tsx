import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { TextBlock } from 'zbase';
import { mountEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import OverviewHero from './OverviewHero';

describe('OverviewHero', () => {
  it('should mount without throwing an error', () => {
    expect(
      mountEnzymeWithTheme(
        <OverviewHero title="title">
          <button>Submit</button>
        </OverviewHero>,
      ),
    ).toHaveLength(1);
  });

  it('should render children if provided', () => {
    const mounted = mountEnzymeWithTheme(
      <OverviewHero title="title">
        <button>Submit</button>
      </OverviewHero>,
    );
    expect(mounted.find('button')).toHaveLength(1);
  });

  it('should only render subtitle if provided', () => {
    const noSubtitle = mountEnzymeWithTheme(<OverviewHero title="title" />);
    expect(noSubtitle.find(TextBlock)).toHaveLength(0);
    const withSubtitle = mountEnzymeWithTheme(<OverviewHero title="title" subtitle="subtitle" />);
    expect(withSubtitle.find(TextBlock)).toHaveLength(1);
    expect(withSubtitle.find(TextBlock).text()).toBe('subtitle');
  });

  it('should respect util props', () => {
    const mounted = mountEnzymeWithTheme(<OverviewHero title="title" p={123} mt={456} />);
    expect(mounted).toHaveStyleRule('padding', '123px');
    expect(mounted).toHaveStyleRule('margin-top', '456px');
  });
});
