import React from 'react';
import { range } from 'lodash';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import Chart from './Chart';
import ExampleDonut from './exampleDonut';
import { revealTooltipForVisualRegressionTesting } from './chartTestUtils';

const commonData = [
  { y: 2, name: 'Within Your Range' },
  { y: 3, name: 'Above Your Range' },
  { y: 6, name: 'Below Your Range' },
];

const manyData = [
  { y: 2, name: 'Cat' },
  { y: 3, name: 'Dog' },
  { y: 5, name: 'Hamster' },
  { y: 5, name: 'Pheasant' },
  { y: 1, name: 'Aardvark' },
  { y: 5, name: 'Salmon' },
  { y: 8, name: 'Grizzly' },
  { y: 5, name: 'Turkey' },
  { y: 15, name: 'Chicken' },
];

storiesOf('charts|Chart/Donut & Pie', module)
  .addDecorator((getStory: Function) => (
    <Box w={[1]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default (donut)', ExampleDonut)
  .add('pie', () => (
    <Chart type="pie">
      <Chart.Series data={commonData} />
    </Chart>
  ))
  .add('lots of data', () => (
    <Chart type="donut">
      <Chart.Series data={manyData} />
    </Chart>
  ))
  .add('size props', () => (
    <Box>
      {range(2, 6).map(integer => (
        <Chart type="donut" width={integer * 100} height={integer * 100} key={integer.toString()}>
          <Chart.Series data={commonData} />
        </Chart>
      ))}
    </Box>
  ))
  .add('labels should never overlap', () => (
    <Box>
      {range(1, 16).map(y => (
        <Chart type="donut" hasTooltip={false} key={y}>
          <Chart.Series
            data={[
              { y, name: 'Label 1' },
              { y: 30 - y, name: 'Label 2' },
            ]}
          />
        </Chart>
      ))}
    </Box>
  ))
  .add('hasTooltip false', () => (
    <Chart type="donut" hasTooltip={false}>
      <Chart.Series data={commonData} />
    </Chart>
  ))
  .add('tooltip visible', () => (
    <Chart type="donut" customOptions={revealTooltipForVisualRegressionTesting}>
      <Chart.Series data={commonData} />
    </Chart>
  ))
  .add('hasLegend=false', () => (
    <Chart type="donut" hasLegend={false}>
      <Chart.Series data={commonData} />
    </Chart>
  ));
