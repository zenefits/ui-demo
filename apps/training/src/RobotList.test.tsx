import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { mountEnzymeWithThemeIntl } from 'z-frontend-theme/test-utils/intl';

import RobotList from './RobotList';
import RobotAvatar from './RobotAvatar';

const mockedData = [
  { id: '1', name: 'BB-8' },
  { id: '2', name: 'R2-D2' },
];

describe('RobotList', () => {
  it('should mount without throwing an error', () => {
    const mounted = mountEnzymeWithThemeIntl(
      <BrowserRouter>
        <RobotList robots={mockedData} />
      </BrowserRouter>,
    );
    expect(mounted).toHaveLength(1);
  });

  it.skip('should render an avatar for each robotic employee', () => {
    const mounted = mountEnzymeWithThemeIntl(
      <BrowserRouter>
        <RobotList robots={mockedData} />
      </BrowserRouter>,
    );
    expect(mounted.find(RobotAvatar).length).toBeGreaterThan(1);
  });
});
