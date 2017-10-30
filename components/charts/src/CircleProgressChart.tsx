import React, { Component } from 'react';
import { Box, Flex, Text } from 'rebass';
import { RebassProps } from 'z-rebass-types';
import { VictoryPie } from 'victory';
import colors from 'z-frontend-theme/src/colors';

interface Props {
  /**
   * Progress value in percents
   */
  percentage: number;
}

const dividerSize = 0.4;

class CircleProgressChart extends Component<RebassProps<Props> & Props> {
  render() {
    const { percentage } = this.props;
    return (
      <Flex w={'200px'} {...this.props}>
        <VictoryPie
          colorScale={[colors.primary['2a'], 'transparent', colors.primary[3], 'transparent']}
          innerRadius={130}
          padding={0}
          labels={() => ''}
          startAngle={360 / 100 * dividerSize / 2}
          data={[
            { x: 1, y: percentage - dividerSize },
            { x: 2, y: dividerSize },
            { x: 3, y: 100 - percentage - dividerSize },
            { x: 4, y: dividerSize / 2 },
          ]}
        />
        <Flex column justify="center" ml={4}>
          <Text f={5} mt={-2}>
            <strong>{percentage.toFixed(0)}%</strong>
          </Text>
          <Text f={2}>Completed</Text>
        </Flex>
      </Flex>
    );
  }
}

export default CircleProgressChart;
