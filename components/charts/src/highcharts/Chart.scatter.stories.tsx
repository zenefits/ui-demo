import React from 'react';
import { AlignValue, YAxisPlotLinesOptions } from 'highcharts';

import { Box } from 'zbase';
import { getColor } from 'z-frontend-theme';

import { storiesOf } from '../../.storybook/storyHelpers';
import Chart from './Chart';

const series1 = [
  [-43, 1.1],
  [-40, 2.3],
  [-37, 2.3],
  [-38, 3],
  [-24, 2.4],
  [-10, 2.1],
  [-2, 3.9],
  [30, 3.8],
  [38, 4.1],
  [40, 1.2],
  [45, 4.7],
];

const series2 = [
  [-48, 2.1],
  [-33, 1.3],
  [42, 2.2],
  [41, 3.7],
];

const quadrantChartWidth = 500;
const quadrantChartHeight = 300;
const quadrantMargin = 30;

const quadrantAxisConfig = {
  lineWidth: 1,
  lineColor: getColor('grayscale.black'),
  gridLineWidth: 1,
  showFirstLabel: false, // interferes with axis label
  tickLength: 3,
  tickWidth: 1,
  tickColor: 'black',
};

function createQuadrantLabelUsingPlotLine(
  text: string,
  align: AlignValue,
  verticalAlign: 'top' | 'bottom',
  minY: number,
  maxY: number,
): YAxisPlotLinesOptions {
  return {
    value: verticalAlign === 'top' ? maxY : minY, // y value to draw line (and label)
    width: 0, // hide the line - we just want the label
    zIndex: 10, // show above series etc
    label: {
      text,
      align,
      textAlign: align,
      x: align === 'left' ? 8 : -8,
      y: verticalAlign === 'top' ? 15 : -10,
      style: {
        color: getColor('text.light'),
      },
    },
  };
}

storiesOf('charts|Chart/Scatter', module)
  .addDecorator((getStory: Function) => (
    <Box w={[1]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => (
    <Chart
      type="scatter"
      customOptions={{
        yAxis: {
          min: undefined, // override default of 0
        },
      }}
    >
      <Chart.Series data={series1} />
      <Chart.Series data={series2} />
    </Chart>
  ))
  .add('quadrants', () => (
    <Chart
      type="scatter"
      customOptions={{
        chart: {
          width: quadrantChartWidth + 2 * quadrantMargin,
          height: quadrantChartHeight + 2 * quadrantMargin,
          margin: [quadrantMargin, quadrantMargin, quadrantMargin, quadrantMargin],
        },
        xAxis: {
          type: 'linear', // override category default so minorTicks work
          title: {
            text: 'Importance →',
            offset: quadrantChartHeight / 2,
            y: 5,
          },

          // put axis in the center
          offset: -(quadrantChartHeight / 2),

          // easier to read axis labels not right on tick marks
          labels: {
            align: 'right',
            x: -5,
          },

          // data ranges from -100 to 100
          min: -100,
          max: 100,
          tickInterval: 20,
          minorTickInterval: 10,

          ...quadrantAxisConfig,
        },
        yAxis: {
          title: {
            text: 'Score →',
            rotation: -90,
            offset: quadrantChartWidth / 2,
            x: -10,
          },

          // put axis in the center
          offset: -(quadrantChartWidth / 2),

          // easier to read axis labels not right on tick marks
          labels: {
            y: 10,
          },

          // data range from 1 - 5
          min: 1,
          max: 5,
          tickInterval: 1,
          minorTickInterval: 0.5,

          // show quadrant labels on the chart itself
          plotLines: [
            createQuadrantLabelUsingPlotLine('Strength', 'right', 'top', 1, 5),
            createQuadrantLabelUsingPlotLine('Secondary Focus', 'left', 'bottom', 1, 5),
            createQuadrantLabelUsingPlotLine('Primary Focus', 'right', 'bottom', 1, 5),
          ],

          ...quadrantAxisConfig,
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            tooltip: {
              headerFormat: '<b>{series.name}</b><br>',
              pointFormat: 'Importance: {point.x}<br>Score: {point.y}',
            },
          },
        },
      }}
    >
      <Chart.Series data={series1} name="Question 1" />
      <Chart.Series data={series2} name="Question 2" />
    </Chart>
  ));
