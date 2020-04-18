import React from 'react';

import { mountEnzymeWithTheme, renderEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import RobotAvatar from './RobotAvatar';

describe('RobotAvatar', () => {
  it('should mount without throwing an error', () => {
    const mounted = mountEnzymeWithTheme(<RobotAvatar name="R2-D2" />);
    expect(mounted).toHaveLength(1);
  });

  it.skip('should include an alt tag', () => {
    const name = 'R2-D2';
    const rendered = renderEnzymeWithTheme(<RobotAvatar name={name} />);
    const altTag = rendered.attr('alt');
    expect(altTag).toBeDefined();
    expect(altTag).toMatch(name);
  });
});
