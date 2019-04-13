import React from 'react';

import Chart from './Chart';

const dataSet1 = [
  { y: 2, name: 'Within Your Range' },
  { y: 3, name: 'Above Your Range' },
  { y: 6, name: 'Below Your Range' },
];

export default () => (
  <Chart type="donut">
    <Chart.Series data={dataSet1} />
  </Chart>
);
