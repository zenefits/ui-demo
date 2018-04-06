import React from 'react';
import { storiesOf } from '@storybook/react';
import { withTheme, ThemeInterface } from 'z-frontend-theme';
import { Box, Flex, P, Icon } from './index';

class IconList extends React.Component<{ theme: ThemeInterface }, { showAll: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
    };
  }

  render() {
    const showAll = this.state.showAll;
    const icons = this.props.theme.icons;

    let iconNames = Object.keys(icons);
    if (!this.state.showAll) {
      iconNames = iconNames.slice(0, 5);
    }

    return (
      <Box p={2}>
        <Box py={3}>
          We're using{' '}
          <a
            href="http://zavoloklom.github.io/material-design-iconic-font/icons.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Material Design Iconic Font
          </a>
        </Box>
        <Flex mb={5} wrap>
          {iconNames.map(iconName => (
            <Flex key={iconName} w={[1, 1 / 4, 1 / 6]} p={3} align="center" direction="column">
              <Icon iconName={iconName} />
              <P mb={2}>{iconName}</P>
            </Flex>
          ))}
        </Flex>
        <button onClick={() => this.setState({ showAll: !showAll })}>{showAll ? 'Hide' : 'Show all icons'}</button>
      </Box>
    );
  }
}

const IconListWithTheme = withTheme(IconList);

const Spin = props => (
  <Flex w={[1, 1 / 2, 1 / 4]} mb={3} align="center" direction="column">
    <Icon iconName="block" spin />
    <P mb={2}>Block</P>
    <Icon iconName="compass" spin />
    <P mb={2}>Compass</P>
    <Icon iconName="chart-donut" spin />
    <P mb={2}>Chart Donut</P>
    <Icon iconName="triangle-up" spin />
    <P mb={2}>Triangle Up</P>
  </Flex>
);

storiesOf('Icons', module)
  .add('list', () => <IconListWithTheme />)
  .add('spin', () => <Spin />);
