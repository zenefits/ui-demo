import React from 'react';

import { Box, TextBlock } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import Chart from './Chart';
import ExampleLine from './exampleLine';
import { revealSharedTooltipForVisualRegressionTesting } from './chartTestUtils';

const categoryData1 = [
  { y: 12, name: 'Entry/Junior' },
  { y: 38, name: 'Intermediate' },
  { y: 45, name: 'Senior' },
  { y: 8, name: 'Department Head' },
  { y: 2, name: 'Executive' },
];
const categoryData2 = [
  { y: 23, name: 'Entry/Junior' },
  { y: 78, name: 'Intermediate' },
  { y: 45, name: 'Senior' },
  { y: 10, name: 'Department Head' },
  { y: 8, name: 'Executive' },
];
const categoryData3 = [
  { y: 1, name: 'Entry/Junior' },
  { y: 2, name: 'Intermediate' },
  { y: 0, name: 'Senior' },
  { y: 9, name: 'Department Head' },
  { y: 1, name: 'Executive' },
];

const dateTimeData1 = [
  { x: new Date(1972, 11, 15), y: 9, name: 'Department Head' },
  { x: new Date(1980, 4, 6), y: 1, name: 'Entry/Junior' },
  { x: new Date(1985, 8, 1), y: 1, name: 'Executive' },
  { x: new Date(1990, 5, 12), y: 2, name: 'Intermediate' },
  { x: new Date(1995, 2, 28), y: 0, name: 'Senior' },
];
const dateTimeData2 = [
  { x: new Date(2018, 1, 6), y: 1, name: 'Entry/Junior' },
  { x: new Date(2018, 2, 12), y: 2, name: 'Intermediate' },
  { x: new Date(2018, 3, 28), y: 0, name: 'Senior' },
  { x: new Date(2018, 4, 15), y: 9, name: 'Department Head' },
  { x: new Date(2018, 5, 1), y: 1, name: 'Executive' },
];
const dateTimeData3 = [
  { x: new Date(2018, 0, 1), y: 1 },
  { x: new Date(2018, 0, 6), y: 1 },
  { x: new Date(2018, 0, 12), y: 2 },
  { x: new Date(2018, 0, 15), y: 9 },
  { x: new Date(2018, 0, 28), y: 0 },
];
const dateTimeData4 = [
  { x: new Date(2001, 0, 1), y: 1 },
  { x: new Date(2002, 0, 1), y: 2 },
  { x: new Date(2003, 0, 1), y: 0 },
  { x: new Date(2004, 0, 1), y: 9 },
  { x: new Date(2005, 0, 1), y: 1 },
];

const dateTimeData5 = [
  { x: new Date(2018, 7), y: 0 },
  { x: new Date(2018, 8), y: 8 },
  { x: new Date(2018, 9), y: 19 },
  { x: new Date(2018, 10), y: 19 },
  { x: new Date(2018, 11), y: 1 },
  { x: new Date(2019, 0), y: 1 },
  { x: new Date(2019, 1), y: 2 },
  { x: new Date(2019, 2), y: 10 },
  { x: new Date(2019, 3), y: 9 },
  { x: new Date(2019, 4), y: 15 },
  { x: new Date(2019, 5), y: 20 },
  { x: new Date(2019, 6), y: 21 },
];
const dateTimeData6 = [
  { x: new Date(2018, 7), y: 34 },
  { x: new Date(2018, 8), y: 3 },
  { x: new Date(2018, 9), y: 1 },
  { x: new Date(2018, 10), y: 43 },
  { x: new Date(2018, 11), y: 7 },
  { x: new Date(2019, 0), y: 5 },
  { x: new Date(2019, 1), y: 35 },
  { x: new Date(2019, 2), y: 80 },
  { x: new Date(2019, 3), y: 1 },
  { x: new Date(2019, 4), y: 0 },
  { x: new Date(2019, 5), y: 56 },
  { x: new Date(2019, 6), y: 21 },
];
const dateTimeData7 = [
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

storiesOf('charts|Chart/Line', module)
  .addDecorator((getStory: Function) => (
    <Box w={[1]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('Default', ExampleLine)
  .add('Grouped', () => (
    <Chart xAxisType="datetime" type="line" xAxisTickInterval="monthly">
      <Chart.Series data={dateTimeData5} />
      <Chart.Series data={dateTimeData6} />
      <Chart.Series data={dateTimeData7} />
    </Chart>
  ))
  .add('Different Datetime data', () => (
    <Box>
      <TextBlock> Different days, months, years </TextBlock>
      <Chart xAxisType="datetime" type="line">
        <Chart.Series data={dateTimeData1} />
      </Chart>
      <TextBlock mt={3}> Same year, different days and months </TextBlock>
      <Chart xAxisType="datetime" type="line">
        <Chart.Series data={dateTimeData2} />
      </Chart>
      <TextBlock mt={3}>Same year and month, different days </TextBlock>
      <Chart xAxisType="datetime" type="line">
        <Chart.Series data={dateTimeData3} />
      </Chart>
      <TextBlock mt={3}> Same month and day, different years </TextBlock>
      <Chart xAxisType="datetime" type="line">
        <Chart.Series data={dateTimeData4} />
      </Chart>
      <TextBlock mt={3}> Same year, different months, no days </TextBlock>
      <Chart xAxisType="datetime" type="line" xAxisTickInterval="monthly">
        <Chart.Series data={dateTimeData5} />
      </Chart>
    </Box>
  ))
  .add('category xAxis', () => (
    <Chart type="line">
      <Chart.Series data={categoryData1} />
      <Chart.Series data={categoryData2} />
      <Chart.Series data={categoryData3} />
    </Chart>
  ))
  .add('category xAxis with shared tooltip', () => (
    <Chart
      description="a cool chart"
      type="line"
      customOptions={{
        tooltip: {
          shared: true,
        },
        xAxis: {
          crosshair: {
            width: 4, // override default, which is too wide
          },
        },
        ...revealSharedTooltipForVisualRegressionTesting,
      }}
    >
      <Chart.Series data={categoryData1} />
      <Chart.Series data={categoryData2} />
      <Chart.Series data={categoryData3} />
    </Chart>
  ))
  .add('hasLegend=false', () => (
    <Chart type="line" xAxisType="datetime" xAxisTickInterval="monthly" hasLegend={false}>
      <Chart.Series data={dateTimeData5} name="My Company" />
    </Chart>
  ));
