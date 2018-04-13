import React from 'react';
import { storiesOf } from '@storybook/react';

import { withTheme, IconNameString, ThemeInterface } from 'z-frontend-theme';

import { Box, Flex, Heading, Icon, P } from '../index';
import { iconFontSizeMap, IconSize } from './Icon';

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
          {iconNames.map((iconName: IconNameString) => (
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

const spin = (
  <Flex w={[1, 1 / 2, 1 / 4]} p={3} align="center" direction="column">
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

const fontSizes = (
  <Box p={3}>
    {[2, 3, 4, 5].map(size => (
      <Box mb={3} key={size}>
        <Icon iconName="plus-circle" fontSize__deprecated__doNotUse={size} /> (size {size})
      </Box>
    ))}
  </Box>
);

const sizes = (
  <Box p={3}>
    <Heading level="2">Explicit sizes</Heading>

    {Object.keys(iconFontSizeMap).map((size: IconSize) => (
      <Box mb={3} key={size}>
        <Icon iconName="plus-circle" s={size} /> (s={size})
      </Box>
    ))}

    <Heading level="2">
      Inherited sizes (no <code>s</code> prop)
    </Heading>

    <Box mb={3} fontStyle="headings.xs">
      <Icon iconName="plus-circle" /> headings.xs
    </Box>
    <Box mb={3} fontStyle="headings.s">
      <Icon iconName="plus-circle" /> headings.s
    </Box>
    <Box mb={3} fontStyle="headings.m">
      <Icon iconName="plus-circle" /> headings.m
    </Box>
    <Box mb={3} fontStyle="headings.l">
      <Icon iconName="plus-circle" /> headings.l
    </Box>
    <Box mb={3} fontStyle="headings.xl">
      <Icon iconName="plus-circle" /> headings.xl
    </Box>
    <Box mb={3} fontStyle="headings.xxl">
      <Icon iconName="plus-circle" /> headings.xxl
    </Box>
  </Box>
);

storiesOf('Icons', module)
  .add('list', () => <IconListWithTheme />)
  .add('spin', () => spin)
  .add('fontSizes', () => fontSizes)
  .add('sizes', () => sizes);
