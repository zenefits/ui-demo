import React from 'react';

import { NumberText } from 'zbase';

import DisplayMetric from './DisplayMetric';

export default () => (
  <DisplayMetric label="Total Sales">
    <NumberText value={2345} style="currency" currency="USD" minimumFractionDigits={0} />
  </DisplayMetric>
);
