import React, { Component } from 'react';

import { Box } from 'zbase';
import { Button } from 'z-frontend-elements';

import { storiesOf } from '../../.storybook/storyHelpers';
import Chart from './Chart';

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
  { y: 11, name: 'Entry/Junior' },
  { y: 39, name: 'Intermediate' },
  { y: 33, name: 'Senior' },
  { y: 2, name: 'Department Head' },
  { y: 3, name: 'Executive' },
];

const dateTimeData1 = [
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

class ChartUpdateExample extends Component<{}, { random: any }> {
  state = {
    random: 1,
  };

  render() {
    return (
      <Box>
        <Chart type="column" key={this.state.random}>
          <Chart.Series data={categoryData1} />
        </Chart>
        <Button mt={2} onClick={() => this.setState({ random: Math.random() })}>
          Re-render
        </Button>
      </Box>
    );
  }
}

storiesOf('charts|Chart/Column & Bar', module)
  .addDecorator((getStory: Function) => (
    <Box w={[1]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default (column)', () => (
    <Chart type="column" xAxisTitle="Positions" yAxisTitle="Number of Employees">
      <Chart.Series data={categoryData1} />
    </Chart>
  ))
  .add('bar', () => (
    <Chart type="bar" xAxisTitle="Positions" yAxisTitle="Number of Employees">
      <Chart.Series data={categoryData1} />
    </Chart>
  ))
  .add('grouped', () => (
    <Chart type="column" xAxisTitle="Positions" yAxisTitle="Number of Employees">
      <Chart.Series data={categoryData1} name="Your Company" />
      <Chart.Series data={categoryData3} name="Competitor" />
      <Chart.Series data={categoryData2} name="Market Companies" />
    </Chart>
  ))
  .add('shared tooltip', () => (
    <Chart
      type="column"
      xAxisTitle="Positions"
      yAxisTitle="Number of Employees"
      customOptions={{
        tooltip: {
          shared: true,
          crosshairs: true,
        },
      }}
    >
      <Chart.Series data={categoryData1} name="Your Company" />
      <Chart.Series data={categoryData3} name="Competitor" />
      <Chart.Series data={categoryData2} name="Market Companies" />
    </Chart>
  ))
  .add('Column graph and line', () => (
    <Chart>
      <Chart.Series data={categoryData1} type="column" />
      <Chart.Series data={categoryData2} type="line" />
    </Chart>
  ))
  .add('dateTime xAxis', () => (
    <Chart xAxisType="datetime" type="column" xAxisTickInterval="monthly">
      <Chart.Series data={dateTimeData1} />
    </Chart>
  ))
  .add('hasLegend = false', () => (
    <Chart type="column" hasLegend={false}>
      <Chart.Series data={categoryData1} type="column" name="My Company" />
    </Chart>
  ))
  .add('dynamic rerender', () => <ChartUpdateExample />);
