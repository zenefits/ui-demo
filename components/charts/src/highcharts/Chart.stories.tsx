import React, { Component } from 'react';
import { isEqual } from 'lodash';

import { Button } from 'z-frontend-elements';
import { Box, TextBlock } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import Chart from './Chart';

const yAxisTitle = 'Number of Legs';
const xAxisTitle = 'Animals';
const name = 'My Animals';

const jobLevel = {
  company: [
    { y: 10, name: 'Entry' },
    { y: 45, name: 'Senior' },
    { y: 0, name: 'Lead' },
    { y: 2, name: 'Department Head' },
  ],
  market: [
    { y: 30, name: 'Entry' },
    { y: 40, name: 'Lead' },
    { y: 20, name: 'Senior' },
    { y: 22, name: 'Department Head' },
  ],
  name: 'Chicago',
};
const jobFamily = {
  company: [
    { name: 'Quality', y: 22 },
    { name: 'Sales', y: 15 },
  ],
  market: [
    { y: 2, name: 'Quality' },
    { y: 70, name: 'Sales' },
  ],
  name: 'San Diego',
};

storiesOf('charts|Chart', module)
  .addDecorator((getStory: Function) => (
    <Box w={[1]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('loading', () => <LoadingExample />)
  .add('no data/error', () => <NoDataExample />)
  .add('dynamically switch data', () => <DynamicChartExample />)
  .add('statically switch charts', () => <StaticChartExample />);

class LoadingExample extends Component {
  render() {
    return (
      <Box p={3}>
        <Chart isLoading>
          <Chart.Series
            name={name}
            data={[
              { name: 'Dog', y: 4 },
              { name: 'Cat', y: 4 },
              { name: 'Bird', y: 2 },
              { name: 'Pig', y: 4 },
              { name: 'Iguana', y: 4 },
              { name: 'Otter', y: 4 },
            ]}
          />
        </Chart>
      </Box>
    );
  }
}

class NoDataExample extends Component {
  render() {
    return (
      <Box p={3}>
        <TextBlock bold> No data prop given to Chart.Series </TextBlock>
        <Chart type="column" xAxisTitle={xAxisTitle} yAxisTitle={yAxisTitle}>
          <Chart.Series name={name} />
        </Chart>
        <TextBlock mt={3} bold>
          Empty Array given to data prop:
        </TextBlock>
        <TextBlock>data={`{[]}`} </TextBlock>
        <Chart type="column" xAxisTitle={xAxisTitle} yAxisTitle={yAxisTitle}>
          <Chart.Series data={[]} name={name} />
        </Chart>
        <TextBlock bold mt={3}>
          Array with empty objects given to data prop:
        </TextBlock>
        <TextBlock> data={`{[{}, {}, {}, {}, {}, {}]}`} </TextBlock>
        <Chart type="column" xAxisTitle={xAxisTitle} yAxisTitle={yAxisTitle}>
          <Chart.Series data={[{}, {}, {}, {}, {}, {}]} name={name} />
        </Chart>
        <TextBlock bold mt={3}>
          Array of objects with only name given to data:
        </TextBlock>
        <TextBlock>
          data=
          {`{[{ name: 'Dog' },
            { name: 'Cat' },
            { name: 'Bird' },
            { name: 'Pig' },
            { name: 'Iguana' },
            { name: 'Otter' }]}`}
        </TextBlock>
        <Chart type="column" xAxisTitle={xAxisTitle} yAxisTitle={yAxisTitle}>
          <Chart.Series
            name={name}
            data={[
              { name: 'Dog' },
              { name: 'Cat' },
              { name: 'Bird' },
              { name: 'Pig' },
              { name: 'Iguana' },
              { name: 'Otter' },
            ]}
          />
          <Chart.Series
            name="Your Animals"
            data={[
              { name: 'Dog' },
              { name: 'Cat' },
              { name: 'Bird' },
              { name: 'Pig' },
              { name: 'Iguana' },
              { name: 'Otter' },
            ]}
          />
        </Chart>
      </Box>
    );
  }
}

class DynamicChartExample extends Component<{}, { activeType: any }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeType: jobLevel,
    };
  }

  updateChartData = () => {
    const currentType = this.state.activeType;
    this.setState({ activeType: isEqual(currentType, jobFamily) ? jobLevel : jobFamily });
  };

  render() {
    return (
      <Box>
        <Button onClick={this.updateChartData}> Toggle Series Data </Button>
        <Chart type="column">
          <Chart.Series data={this.state.activeType['company']} />
          <Chart.Series data={this.state.activeType['market']} />
        </Chart>
      </Box>
    );
  }
}

class StaticChartExample extends Component<{}, { activeChart: any }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeChart: jobLevel,
    };
  }

  updateChartData = () => {
    const currentChart = this.state.activeChart;
    this.setState({ activeChart: isEqual(currentChart, jobFamily) ? jobLevel : jobFamily });
  };

  render() {
    return (
      <Box>
        <Button onClick={this.updateChartData}> Toggle Series Data </Button>
        {this.state.activeChart === jobLevel && (
          <Chart type="column">
            <Chart.Series data={jobLevel['company']} />
            <Chart.Series data={jobLevel['market']} />
          </Chart>
        )}
        {this.state.activeChart === jobFamily && (
          <Chart type="column">
            <Chart.Series data={jobFamily['company']} />
            <Chart.Series data={jobFamily['market']} />
          </Chart>
        )}
      </Box>
    );
  }
}
