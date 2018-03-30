import React, { Component } from 'react';
import { Flex, FlexProps, P } from 'zbase';
import { withTheme } from 'z-frontend-theme';
import { VictoryPie } from 'victory';
import { color } from 'z-frontend-theme/utils';

interface ChartProps {
  /**
   * Progress value in percent (0 - 100)
   */
  percentage: number;
}

class CircleProgressChart extends Component<FlexProps & ChartProps> {
  render() {
    const { percentage, ...rest } = this.props;
    return (
      <Flex w="200px" {...rest}>
        <VictoryPie
          colorScale={[color('tertiary.b')(this.props), color('secondary.a')(this.props)]}
          innerRadius={130}
          padAngle={1}
          padding={0}
          labels={() => ''}
          data={[{ y: percentage }, { y: 100 - percentage }]}
        />
        <Flex column justify="center" ml={4}>
          <P fontStyle="headings.xl" mt={-2}>
            <strong>{percentage.toFixed(0)}%</strong>
          </P>
          <P fontStyle="headings.s">Completed</P>
        </Flex>
      </Flex>
    );
  }
}

export default withTheme(CircleProgressChart);
