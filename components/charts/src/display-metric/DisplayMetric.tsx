import React, { Component, ReactChild } from 'react';

import { ColorString } from 'z-frontend-theme';
import { Box, TextBlock } from 'zbase';

type DisplayMetricProps = {
  /**
   * The formatted content for the display metric.
   */
  children: ReactChild;
  /**
   * Label to describe the value.
   */
  label: string;
  /**
   * Color for the value.
   * @default primary.a
   */
  color?: ColorString;
};

class DisplayMetric extends Component<DisplayMetricProps> {
  static defaultProps = {
    color: 'primary.a',
  };

  render() {
    const { children, label, color } = this.props;
    return (
      <Box>
        <TextBlock color={color} fontStyle="headings.xl">
          {children}
        </TextBlock>
        <TextBlock fontStyle="headings.s">{label}</TextBlock>
      </Box>
    );
  }
}

export default DisplayMetric;
