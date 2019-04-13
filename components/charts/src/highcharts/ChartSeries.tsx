import React, { Component, Fragment } from 'react';

import { ColorString } from 'z-frontend-theme';

import { ChartTypes } from './Chart';
type dataType = {
  x?: number | Date;
  y?: number | Date;
  name?: string;
};

export interface ChartSeriesProps {
  /** What is the name of the Series? If your chart has a legend, this name will appear in the legend */
  name?: string;
  /**
   * Data for the chart to use.
   * x position can be explicitly stated, otherwise it will be inferred from the position in the array. <br>
   * Each object in the data array follow this format: <br>{ x?: number | Date; y?: number | Date; name?: string;}
   */
  data?: dataType[];
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
   * optional custom color for the series
   */
  color?: ColorString;
}

class ChartSeries extends Component<ChartSeriesProps> {
  static defaultProps = {
    name: '',
  };
  render() {
    return <Fragment />;
  }
}

export default ChartSeries;
