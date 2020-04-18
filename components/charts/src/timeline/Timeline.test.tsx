import React from 'react';

import { mountEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import Timeline from './Timeline';

const startDate = new Date('1/1/2018');
const endDate = new Date('12/31/2018');
const valueDate = new Date('7/2/2018');

describe('Timeline', () => {
  it('should mount without throwing an error', () => {
    expect(
      mountEnzymeWithTheme(<Timeline startDate={startDate} endDate={endDate} valueDate={valueDate} />),
    ).toHaveLength(1);
  });
});
