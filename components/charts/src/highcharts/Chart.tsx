import React, { Component, ReactElement } from 'react';
import { set } from 'lodash';
// @ts-ignore
import HighchartsReact from 'highcharts-react-official';

import { Box } from 'zbase';
import { LoadingSpinner } from 'z-frontend-elements';
import { getColor, styled } from 'z-frontend-theme';
import { color, depth, radius, space } from 'z-frontend-theme/utils';

import Highcharts from './Highcharts';
import ChartSeries, { ChartSeriesProps } from './ChartSeries';

export type ChartTypes = 'bar' | 'column' | 'line' | 'pie' | 'donut';

interface ChartProps {
  /**
   * An explicit width for the chart. By default (when null) the width is calculated from the offset width of
   * the containing element.
   */
  width?: number | string;
  /**
   * An explicit height for the chart. If a number, the height is given in pixels.
   * If given a percentage string (for example '56%'), the height is given as the percentage of the actual chart width.
   * This allows for preserving the aspect ratio across responsive sizes.
   * By default (when null) the height is calculated from the offset height of the containing element,
   * or 400 pixels if the containing element's height is 0.
   */
  height?: number | string;
  /**
   * Undocumented backdoor into options (to be used only when absolutely necessary)
   * @ignore
   */
  customOptions?: Object;
  /**
   * Does the chart have a tooltip?
   * @default true
   */
  hasTooltip?: boolean;
  /**
   * Does the chart have a legend?
   * @default true
   */
  hasLegend?: boolean;
  /**
   * include a description for accessibility
   * @default ''
   */
  description?: string;
  /**
   * What type is the chart? This Property can be overridden also in the Series component
   * <br>The options are 'bar' | 'column' | 'line' | 'pie' | 'donut'
   */
  type?: ChartTypes;
  /**
   * Use if you want to customize the x axis ticks. See https://api.highcharts.com/highcharts/xAxis.tickInterval
   * If xAxisType is 'datetime', you can use 'monthly' as a customization.
   * Does not apply to pie/donut charts, which have no axes.
   */
  xAxisTickInterval?: number | 'monthly';
  /**
   * The type of x axis. See https://api.highcharts.com/highcharts/xAxis.type
   * Does not apply to pie/donut charts, which have no axes.
   * @default category
   */
  xAxisType?: 'linear' | 'datetime' | 'category';
  /**
   * The title name for the x axis, which is normally horizontal.
   * Does not apply to pie/donut charts, which have no axes.
   * @default ''
   */
  xAxisTitle?: string;
  /**
   * The title name for the y axis, which is normally vertical.
   * Does not apply to pie/donut charts, which have no axes.
   * @default ''
   */
  yAxisTitle?: string;
  /**
   * Use to indicate the chart in its loading state.
   * @default false
   */
  isLoading?: boolean;
}

const StyledContainer = styled(Box)`
  position: relative;

  /* style with html to get custom box-shadow */
  .highcharts-tooltip > span {
    background: ${color('grayscale.white')};
    padding: ${space(2)};
    border-radius: ${radius()};
    ${depth(2)}
  }
`;

const StyledLoadingContainer = styled(Box)`
  position: absolute;
  top: 40%;
  left: 45%;
`;

const chartOptionOverrides: { [T in ChartTypes]?: Object } = {};
chartOptionOverrides.pie = {
  tooltip: {
    // override default options to include percentage
    pointFormat: '<div>{point.y} ({point.percentage:.0f}%)</div>',
  },
};
chartOptionOverrides.donut = Highcharts.merge(chartOptionOverrides.pie, {
  plotOptions: {
    pie: {
      innerSize: '60%',
    },
  },
});

const millisPerDay = 60 * 60 * 24 * 1000;
const NO_DATA_STRING = 'No data to show right now';

export const getConfigOptions = (props: any) => {
  const {
    children,
    description,
    type,
    hasTooltip,
    xAxisTitle,
    yAxisTitle,
    hasLegend,
    xAxisType,
    xAxisTickInterval,
    customOptions,
    isLoading,
    width,
    height,
  } = props;
  const options = {};

  if (isLoading) {
    set(options, 'visible', false);
    set(options, 'lang.noData', '');
    return options;
  } else {
    set(options, 'visible', true);
    set(options, 'lang.noData', NO_DATA_STRING);
  }
  // Chart options
  if (type) {
    if (type === 'donut') {
      set(options, 'chart.type', 'pie'); // highcharts doesn't recognize 'donut'
    } else {
      set(options, 'chart.type', type);
    }
  }
  if (description) {
    set(options, 'chart.description', description);
  }

  if (width) {
    set(options, 'chart.width', width);
  }
  if (height) {
    set(options, 'chart.height', height);
  }

  // Axis Options
  if (xAxisTitle) {
    set(options, 'xAxis.title.text', xAxisTitle);
  }
  if (yAxisTitle) {
    set(options, 'yAxis.title.text', yAxisTitle);
  }
  set(options, 'xAxis.type', xAxisType);
  if (xAxisType === 'datetime') {
    if (xAxisTickInterval) {
      const monthlyTickInterval = xAxisTickInterval === 'monthly' ? millisPerDay * 30 : xAxisTickInterval;
      set(options, 'xAxis.tickInterval', monthlyTickInterval);
    }
  }

  // Series Option
  const array = React.Children.toArray(children) as ReactElement<ChartSeriesProps>[];

  const series = array.map((child, i) => {
    // Spreading the children seem to renew the reference, perhaps a shallow equality is happening
    const seriesCustomColor = child.props.color;
    return {
      ...child.props,
      color: seriesCustomColor ? getColor(seriesCustomColor) : Highcharts.getOptions().colors[i],
    };
  });
  set(options, 'series', series);

  // Other options
  if (!hasLegend) {
    set(options, 'legend.enabled', false);
  }
  if (!hasTooltip) {
    set(options, 'tooltip.enabled', false);
    set(options, 'plotOptions.series.states.hover.enabled', false);
  }

  const typeOverrides = (chartOptionOverrides as any)[type] || {};
  return Highcharts.merge(options, typeOverrides, customOptions);
};

class Chart extends Component<ChartProps> {
  static defaultProps = {
    hasTooltip: true,
    hasLegend: true,
    xAxisType: 'category',
    isLoading: false,
  };

  static Series = ChartSeries;

  render() {
    const options = getConfigOptions(this.props);
    // A workaround to force rerendering the chart whenever an option changes, because it doesn't work properly in some cases.
    const chartKey = JSON.stringify(options);
    return (
      <StyledContainer width={this.props.width} height={this.props.height}>
        <HighchartsReact key={chartKey} highcharts={Highcharts} options={options} />
        {this.props.isLoading && (
          <StyledLoadingContainer>
            <LoadingSpinner s="xlarge" />
          </StyledLoadingContainer>
        )}
      </StyledContainer>
    );
  }
}

export default Chart;
