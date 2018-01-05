import React from 'react';
import { storiesOf } from '@storybook/react';
import { withTheme } from './ThemeProvider';
import Icon from './Icon';
import Heading from './Heading';
import Text from './Text';
import { Flex } from 'rebass';

const All = props => {
  const icons = props.theme.icons;
  return (
    <div>
      <Heading is="h3">Icons</Heading>
      <Flex mb={5} wrap>
        {Object.keys(icons).map(iconName => (
          <Flex key={iconName} w={[1, 1 / 2, 1 / 4]} mb={3} align="center" direction="column">
            <Icon iconName={iconName} size={60} />
            <Text mb={2}>{iconName}</Text>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};
const AllWithTheme = withTheme(All);

const Spin = props => (
  <Flex w={[1, 1 / 2, 1 / 4]} mb={3} align="center" direction="column">
    <Icon iconName="block" spin size={60} />
    <Text mb={2}>Block</Text>
    <Icon iconName="compass" spin size={60} />
    <Text mb={2}>Compass</Text>
    <Icon iconName="chart-donut" spin size={60} />
    <Text mb={2}>Chart Donut</Text>
    <Icon iconName="triangle-up" spin size={60} />
    <Text mb={2}>Triangle Up</Text>
    <Icon iconName="spinner" spin size={60} />
    <Text mb={2}>Spinner</Text>
  </Flex>
);

storiesOf('Icons', module)
  .add('All', () => <AllWithTheme />)
  .add('Spin', () => <Spin />);
