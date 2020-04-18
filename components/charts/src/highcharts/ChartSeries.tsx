import React, { Component } from 'react';

import { ColorString } from 'z-frontend-theme';

import { ChartTypes } from './Chart';
import Highcharts from './Highcharts';

type SeriesDataType = {
  x?: number | string | Date;
  y?: number | Date;
  name?: string;
  /** for heatmaps */
  value?: number;
};

type SeriesDataArray = (number | string)[];

export interface ChartSeriesProps {
  /** What is the name of the Series? If your chart has a legend, this name will appear in the legend */
  name?: string;
  /**
   * Data for the chart to use.
   * x position can be explicitly stated, otherwise it will be inferred from the position in the array. <br>
   * Each object in the data array follow this format: <br>{ x?: number | Date; y?: number | Date; name?: string;}
   */
  data?: SeriesDataType[] | SeriesDataArray[];
  /**
   * What type of series is it? This will overwrite the type prop in chart.
   * <br>The options are 'bar' | 'column' | 'line' | 'pie' | 'donut'
   */
  type?: ChartTypes;
  /**
   * include a description for accessibility
   */
  description?: string;
  /**
   * Whether to stack the values of each series on top of each other.
   * Possible values are `undefined` to disable, `"normal"` to stack by value or `"percent"`.
   */
  stacking?: Highcharts.OptionsStackingValue;

  /**
   * optional custom color for the series
   */
  color?: ColorString;
}

class ChartSeries extends Component<ChartSeriesProps> {
  render() {
    return <></>;
  }
}

export default ChartSeries;
