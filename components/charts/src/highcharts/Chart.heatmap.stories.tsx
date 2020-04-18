import React from 'react';

import { Box } from 'zbase';
import { getColor } from 'z-frontend-theme';

import { storiesOf } from '../../.storybook/storyHelpers';
import Chart from './Chart';

const xCategories = {
  eng: 'Engineering',
  finance: 'Finance',
  hr: 'HR',
  sales: 'Sales',
  marketing: 'Marketing',
};

const yCategories = {
  satisfaction: 0,
  recommend: 1,
  workContent: 2,
};

const series1 = [
  [xCategories.eng, yCategories.satisfaction, 0.4],
  [xCategories.eng, yCategories.recommend, 0.5],
  [xCategories.eng, yCategories.workContent, 0.3],

  [xCategories.finance, yCategories.satisfaction, 0.1],
  [xCategories.finance, yCategories.recommend, 0.8],
  [xCategories.finance, yCategories.workContent, 0.9],

  [xCategories.hr, yCategories.satisfaction, 0.23],
  [xCategories.hr, yCategories.recommend, 0.04],
  [xCategories.hr, yCategories.workContent, 0.97],

  [xCategories.marketing, yCategories.satisfaction, 0.33],
  [xCategories.marketing, yCategories.recommend, 0.58],
  [xCategories.marketing, yCategories.workContent, 0.66],

  [xCategories.sales, yCategories.satisfaction, 0.43],
  [xCategories.sales, yCategories.recommend, 0.14],
  [xCategories.sales, yCategories.workContent, 0.76],
];

const labelStyle = {
  style: {
    fontSize: '14px',
    color: getColor('text.default'),
  },
};

storiesOf('charts|Chart/Heatmap', module)
  .addDecorator((getStory: Function) => (
    <Box w={[1]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('engagement chart', () => (
    <Chart
      width={100 + Object.keys(xCategories).length * 100} // constrain width so cells are roughly square
      type="heatmap"
      customOptions={{
        colorAxis: {
          stops: [
            [0, getColor('primary.a')],
            [0.5, getColor('grayscale.white')],
            [1, getColor('affirmation.b')],
          ],
          min: 0,
          max: 1,
        },
        legend: {
          enabled: false, // not in designs, but could be useful to show
        },
        xAxis: {
          labels: {
            rotation: 270,
            y: -20,
            ...labelStyle,
          },
          opposite: true, // show x-axis at top
        },
        yAxis: {
          labels: {
            ...labelStyle,
          },
          reversed: true, // show categories in order
          categories: ['Satisfaction', 'Recommend', 'Work Content', 'Career Development'],
        },
        plotOptions: {
          series: {
            enableMouseTracking: false, // showing data labels, so no tooltip etc required
            borderWidth: 1,
            borderColor: getColor('grayscale.f'),
            dataLabels: {
              enabled: true,
              formatter() {
                // show percentage
                return `${Math.round(100 * this.point.value)}%`;
              },
            },
          },
        },
      }}
    >
      <Chart.Series data={series1} />
    </Chart>
  ));
