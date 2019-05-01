// @ts-ignore
import Highcharts from 'highcharts';
// @ts-ignore
import noDataModule from 'highcharts/modules/no-data-to-display';
// @ts-ignore
import accessibilityModule from 'highcharts/modules/accessibility';

import { getColor, theme } from 'z-frontend-theme';

const defaultFontSize = `${theme.fontSizes[1]}px`;
const titleFontSize = `${theme.fontSizes[4]}px`;

noDataModule(Highcharts);
accessibilityModule(Highcharts);

// global options for all charts
Highcharts.setOptions({
  chart: {
    animation: false,
    style: {
      fontFamily: 'inherit',
      fontSize: defaultFontSize,
      color: getColor('text.default'),
    },
  },
  colors: [
    // from https://github.com/zenefits/yourPeople3/blob/master/client-app/app/pods/bi/components/highcharts-chart/component.js
    '#FF5745',
    '#4E2E5E',
    '#2FCDD0',
    '#84C341',
    '#009BC0',
    '#E63EBC',
    '#F2C641',
    '#299945',
    '#4573FF',
    '#C4D93B',
    '#7130B3',
    '#CC7037',
    '#A830B3',
    '#4ED93B',
    '#185941',
  ],
  credits: {
    enabled: false,
  },
  plotOptions: {
    series: {
      animation: false, // it's pretty, but annoying during development... maybe turn it back on later
      dataLabels: {
        style: {
          color: getColor('text.default'),
          fontSize: defaultFontSize,
        },
      },
    },
    line: {
      marker: {
        symbol: 'circle',
      },
    },
    pie: {
      showInLegend: true,
      dataLabels: {
        distance: 15, // reduce from default of 30
        y: -6, // override default of 0
        style: {
          width: '80px', // force long labels to wrap if they're really long, to avoid drastically shrinking chart
        },
      },
    },
  },
  xAxis: {
    tickmarkPlacement: 'on',
    tickLength: 0,
    tickWidth: 0,
    lineColor: getColor('grayscale.f'),
    dateTimeLabelFormats: {
      day: '%b %e',
      week: '%b %e',
    },
    title: {
      text: '',
    },
  },
  yAxis: {
    min: 0,
    gridLineColor: getColor('grayscale.f'),
    title: {
      text: '',
    },
  },
  noData: {
    style: {
      color: getColor('text.default'),
      fontSize: defaultFontSize,
    },
  },
  title: {
    align: 'left',
    style: {
      color: getColor('text.dark'),
      fontSize: titleFontSize,
    },
    text: undefined,
  },
  tooltip: {
    // roughly matching the Popover styling
    // see highcharts-tooltip class in Chart.tsx
    useHTML: true,
    style: {
      color: 'text.default',
      fontSize: defaultFontSize,
    },
    borderWidth: 0,
    shadow: false,
    padding: 0,
    backgroundColor: null,
    headerFormat: '{point.key}<br/>', // omit smaller font-size
    pointFormat: '<span style="color: {series.color}">\u25CF </span>{series.name}: {point.y}<br>', // omit bold around point.y
  },
  legend: {
    enabled: true,
  },
});

export default Highcharts;
