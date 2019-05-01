import React from 'react';

import Chart from './Chart';

const dataSet1 = [
  { x: new Date(2018, 7), y: 34 },
  { x: new Date(2018, 8), y: 5 },
  { x: new Date(2018, 9), y: 10 },
  { x: new Date(2018, 10), y: 40 },
  { x: new Date(2018, 11), y: 6 },
  { x: new Date(2019, 0), y: 33 },
  { x: new Date(2019, 1), y: 33 },
  { x: new Date(2019, 2), y: 33 },
  { x: new Date(2019, 3), y: 8 },
  { x: new Date(2019, 4), y: 20 },
  { x: new Date(2019, 5), y: 6 },
  { x: new Date(2019, 6), y: 70 },
];

export default () => (
  <Chart xAxisType="datetime" type="line" xAxisTickInterval="monthly" xAxisTitle="Months" yAxisTitle="Headcount">
    <Chart.Series data={dataSet1} name="My Startup" />
  </Chart>
);
