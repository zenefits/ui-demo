import React from 'react';
import { cleanup, render, within } from '@testing-library/react';

import { ThemeProvider } from 'z-frontend-theme';

import Highcharts from './Highcharts';
import Chart, { getConfigOptions } from './Chart';

const categoryData = [
  { y: 12, name: 'Entry/Junior' },
  { y: 38, name: 'Intermediate' },
  { y: 45, name: 'Senior' },
  { y: 8, name: 'Department Head' },
  { y: 2, name: 'Executive' },
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

const commonData = [
  { y: 2, name: 'Within Your Range' },
  { y: 3, name: 'Above Your Range' },
  { y: 6, name: 'Below Your Range' },
];

describe('Chart', () => {
  afterEach(cleanup);

  describe('getConfigOptions', () => {
    it('should set config options for type=pie', () => {
      const configOptions = getConfigOptions({ type: 'pie' });
      expect(configOptions).toHaveProperty('chart.type', 'pie');
      expect(configOptions).toHaveProperty('tooltip.pointFormat', '<div>{point.y} ({point.percentage:.0f}%)</div>');
    });
    it('should set config options for type=donut', () => {
      const configOptions = getConfigOptions({ type: 'donut' });
      expect(configOptions).toHaveProperty('chart.type', 'pie');
      expect(configOptions).toHaveProperty('plotOptions.pie.innerSize', '60%');
      expect(configOptions).toHaveProperty('tooltip.pointFormat', '<div>{point.y} ({point.percentage:.0f}%)</div>');
    });
    it('should set config options for type=column', () => {
      const configOptions = getConfigOptions({ type: 'column' });
      expect(configOptions).toHaveProperty('chart.type', 'column');
    });
    it('should set config options for type=bar', () => {
      const configOptions = getConfigOptions({ type: 'bar' });
      expect(configOptions).toHaveProperty('chart.type', 'bar');
    });
    it('should set config options for type=line', () => {
      const configOptions = getConfigOptions({ type: 'line' });
      expect(configOptions).toHaveProperty('chart.type', 'line');
    });
    it('should set correct config if hasTooltip and hasLegend = false', () => {
      const configOptions = getConfigOptions({ hasLegend: false, hasTooltip: false });
      expect(configOptions).toHaveProperty('legend.enabled', false);
      expect(configOptions).toHaveProperty('tooltip.enabled', false);
      expect(configOptions).toHaveProperty('plotOptions.series.states.hover.enabled', false);
    });
    it('should set correct config for series', () => {
      const seriesName = 'My test series';
      const Series = <Chart.Series data={categoryData} name={seriesName} />;
      const children = [Series];
      const configOptions = getConfigOptions({ children });
      expect(configOptions).toHaveProperty('series');
      expect(configOptions.series).toHaveLength(1);
      expect(configOptions.series[0]).toHaveProperty('data', categoryData);
      expect(configOptions.series[0]).toHaveProperty('name', seriesName);
    });
    it('should set correct config for width and height', () => {
      const size = 400;
      const configOptions = getConfigOptions({ width: size, height: size });
      expect(configOptions).toHaveProperty('chart.width', 400);
      expect(configOptions).toHaveProperty('chart.height', 400);
    });
    it('should set correct config for xAxisTickInterval', () => {
      const millisPerDay = 60 * 60 * 24 * 1000;
      const configOptions = getConfigOptions({ xAxisTickInterval: 'monthly', xAxisType: 'datetime' });
      expect(configOptions).toHaveProperty('xAxis.tickInterval', millisPerDay * 30);
      const configOptions2 = getConfigOptions({ xAxisTickInterval: 100, xAxisType: 'datetime' });
      expect(configOptions2).toHaveProperty('xAxis.tickInterval', 100);
    });

    it('should set the correct color for each series', () => {
      const colorArray = Highcharts.getOptions().colors;
      const seriesName = 'My test series';
      const Series = <Chart.Series data={categoryData} name={seriesName} />;
      const children = [Series, Series, Series, Series];
      let configOptions = getConfigOptions({ children });

      expect(configOptions).toHaveProperty('series');
      expect(configOptions.series).toHaveLength(4);
      expect(configOptions.series[0]).toHaveProperty('color', colorArray[0]);
      expect(configOptions.series[1]).toHaveProperty('color', colorArray[1]);
      expect(configOptions.series[2]).toHaveProperty('color', colorArray[2]);
      expect(configOptions.series[3]).toHaveProperty('color', colorArray[3]);

      const Series2 = <Chart.Series data={commonData} name={seriesName} />;
      const differentChildren = [Series2, Series2, Series2, Series2, Series2];
      configOptions = getConfigOptions({ children: differentChildren });

      expect(configOptions).toHaveProperty('series');
      expect(configOptions.series).toHaveLength(5);
      expect(configOptions.series[0]).toHaveProperty('color', colorArray[0]);
      expect(configOptions.series[1]).toHaveProperty('color', colorArray[1]);
      expect(configOptions.series[2]).toHaveProperty('color', colorArray[2]);
      expect(configOptions.series[3]).toHaveProperty('color', colorArray[3]);
      expect(configOptions.series[4]).toHaveProperty('color', colorArray[4]);
    });
  });

  describe('line chart', () => {
    it('should render the axis titles', () => {
      const { getByText } = render(
        <ThemeProvider>
          <Chart
            xAxisType="datetime"
            type="line"
            xAxisTickInterval="monthly"
            xAxisTitle="Months"
            yAxisTitle="Headcount"
          >
            <Chart.Series data={dateTimeData1} />
          </Chart>
        </ThemeProvider>,
      );
      getByText('Months');
      getByText('Headcount');
    });

    it('should render axis labels', () => {
      const { container } = render(
        <ThemeProvider>
          <Chart
            xAxisType="datetime"
            type="line"
            xAxisTickInterval="monthly"
            xAxisTitle="Months"
            yAxisTitle="Headcount"
          >
            <Chart.Series data={dateTimeData1} />
          </Chart>
        </ThemeProvider>,
      );
      const xAxis = container.querySelector('.highcharts-axis-labels.highcharts-xaxis-labels') as HTMLElement;
      const yAxis = container.querySelector('.highcharts-axis-labels.highcharts-yaxis-labels ') as HTMLElement;

      within(xAxis).getByText(`Aug '18`);
      within(xAxis).getByText(`Sep '18`);
      within(xAxis).getByText(`Oct '18`);
      within(xAxis).getByText(`Nov '18`);
      within(xAxis).getByText(`Dec '18`);
      within(xAxis).getByText(`Jan '19`);
      within(xAxis).getByText(`Feb '19`);
      within(xAxis).getByText(`Mar '19`);
      within(xAxis).getByText(`Apr '19`);
      within(xAxis).getByText(`May '19`);
      within(xAxis).getByText(`Jun '19`);
      within(xAxis).getByText(`Jul '19`);
      within(yAxis).getByText('20');
      within(yAxis).getByText('40');
      within(yAxis).getByText('60');
      within(yAxis).getByText('80');
    });

    it('should render the correct categories in the legend', () => {
      const { getByText } = render(
        <ThemeProvider>
          <Chart
            xAxisType="datetime"
            type="line"
            xAxisTickInterval="monthly"
            xAxisTitle="Months"
            yAxisTitle="Headcount"
          >
            <Chart.Series data={dateTimeData1} name="Product" />
            <Chart.Series data={dateTimeData1} name="Engineering" />
          </Chart>
        </ThemeProvider>,
      );
      getByText('Product');
      getByText('Engineering');
    });

    it('should render the no data message if no data', () => {
      const { getByText } = render(
        <ThemeProvider>
          <Chart
            xAxisType="datetime"
            type="line"
            xAxisTickInterval="monthly"
            xAxisTitle="Months"
            yAxisTitle="Headcount"
          >
            <Chart.Series data={[]} />
          </Chart>
        </ThemeProvider>,
      );
      getByText('No data to show right now');
    });
  });

  describe('column and bar chart', () => {
    it('should render the axis titles', () => {
      const { getByText } = render(
        <ThemeProvider>
          <Chart type="line" xAxisTitle="Positions" yAxisTitle="Number of Employees">
            <Chart.Series data={dateTimeData1} />
          </Chart>
        </ThemeProvider>,
      );
      getByText('Positions');
      getByText('Number of Employees');
    });

    it('should render axis labels', () => {
      const { container } = render(
        <ThemeProvider>
          <Chart type="column" xAxisTitle="Positions" yAxisTitle="Number of Employees">
            <Chart.Series data={categoryData} />
          </Chart>
        </ThemeProvider>,
      );
      const xAxis = container.querySelector('.highcharts-axis-labels.highcharts-xaxis-labels') as HTMLElement;
      const yAxis = container.querySelector('.highcharts-axis-labels.highcharts-yaxis-labels ') as HTMLElement;

      within(xAxis).getByText('Entry/Junior');
      within(xAxis).getByText('Intermediate');
      within(xAxis).getByText('Senior');
      within(xAxis).getByText('Department Head');
      within(xAxis).getByText('Executive');
      within(yAxis).getByText('10');
      within(yAxis).getByText('20');
      within(yAxis).getByText('30');
      within(yAxis).getByText('40');
      within(yAxis).getByText('50');
    });

    it('should render the correct categories in the legend', () => {
      const { getByText } = render(
        <ThemeProvider>
          <Chart type="column" xAxisTitle="Positions" yAxisTitle="Number of Employees">
            <Chart.Series data={categoryData} name="My Company" />
            <Chart.Series data={categoryData} name="Your Company" />
          </Chart>
        </ThemeProvider>,
      );
      getByText('My Company');
      getByText('Your Company');
    });

    it('should render the no data message if no data', () => {
      const { getByText } = render(
        <ThemeProvider>
          <Chart type="column" xAxisTitle="Positions" yAxisTitle="Number of Employees">
            <Chart.Series data={[]} name="My Company" />
          </Chart>
        </ThemeProvider>,
      );
      getByText('No data to show right now');
    });
  });

  describe('donut and pie chart', () => {
    it('should render the correct categories in the legend and labels', () => {
      const { queryAllByText } = render(
        <ThemeProvider>
          <Chart type="donut">
            <Chart.Series data={commonData} name="My Company" />
          </Chart>
        </ThemeProvider>,
      );
      expect(queryAllByText('Within Your Range')).toHaveLength(2);
      expect(queryAllByText('Above Your Range')).toHaveLength(2);
      expect(queryAllByText('Below Your Range')).toHaveLength(2);
    });

    it('should render the no data message if no data', () => {
      const { getByText } = render(
        <ThemeProvider>
          <Chart type="donut">
            <Chart.Series data={[]} />
          </Chart>
        </ThemeProvider>,
      );

      getByText('No data to show right now');
    });
  });
});
