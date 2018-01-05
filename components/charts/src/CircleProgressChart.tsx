import React, { Component } from 'react';
import { Flex } from 'rebass';
import { withTheme } from 'z-frontend-theme';
import { RebassProps } from 'z-rebass-types';
import { VictoryPie } from 'victory';
import { color } from 'z-frontend-theme/src/utils';
import Text from 'z-frontend-theme/src/Text';

interface Props {
  /**
   * Progress value in percent (0 - 100)
   */
  percentage: number;
}

class CircleProgressChart extends Component<RebassProps<Props> & Props> {
  render() {
    const { percentage } = this.props;
    return (
      <Flex w={'200px'} {...this.props}>
        <VictoryPie
          colorScale={[color('tertiary.b')(this.props), color('secondary.a')(this.props)]}
          innerRadius={130}
          padAngle={1}
          padding={0}
          labels={() => ''}
          data={[{ y: percentage }, { y: 100 - percentage }]}
        />
        <Flex column justify="center" ml={4}>
          <Text fontStyle="headings.xl" mt={-2}>
            <strong>{percentage.toFixed(0)}%</strong>
          </Text>
          <Text fontStyle="headings.s">Completed</Text>
        </Flex>
      </Flex>
    );
  }
}

export default withTheme(CircleProgressChart);
