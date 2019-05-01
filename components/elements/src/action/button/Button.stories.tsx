import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box, Flex, Heading } from 'zbase';

import { storiesOf } from '../../../.storybook/storyHelpers';
import { IconButton, Link } from '../../../index';
import Button from './Button';

class InProgressExample extends Component<{}, { inProgress: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      inProgress: false,
    };
    this.doSomethingThatTakes3Seconds = this.doSomethingThatTakes3Seconds.bind(this);
  }

  doSomethingThatTakes3Seconds() {
    action('Progress indicator button clicked')(...arguments);
    this.setState({ inProgress: true });
    window.setTimeout(() => this.setState({ inProgress: false }), 3000);
  }

  render() {
    return (
      <Flex direction="column" align="flex-start">
        <Button onClick={this.doSomethingThatTakes3Seconds} inProgress={this.state.inProgress} s="large" mb={3}>
          Click me
        </Button>
        <Button onClick={this.doSomethingThatTakes3Seconds} inProgress={this.state.inProgress} s="medium" mb={3}>
          Click me
        </Button>
        <Button onClick={this.doSomethingThatTakes3Seconds} inProgress={this.state.inProgress} s="small" mb={3}>
          Click me
        </Button>
        <Button onClick={this.doSomethingThatTakes3Seconds} inProgress={this.state.inProgress} s="xsmall" mb={3}>
          Click me
        </Button>
      </Flex>
    );
  }
}

storiesOf('elements|Button', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 2 / 3]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('Button modes and states', () => (
    <Box>
      <Box mb={3}>
        <Heading level={4} mb={2}>
          Standard Button Mode (Default)
        </Heading>
        <Button s="large" onClick={action('button clicked')} mr={2}>
          Button Large
        </Button>
        <Button s="large" onClick={action('disabled button clicked')} disabled children="Can't touch this" />
      </Box>

      <Box mb={3}>
        <Heading level={4} mb={2}>
          Primary Button Mode
        </Heading>
        <Button s="large" mode="primary" onClick={action('primary button clicked')} mr={2}>
          Button Large
        </Button>
        <Button
          s="large"
          mode="primary"
          onClick={action('disabled button clicked')}
          disabled
          children="Can't touch this"
        />
      </Box>

      <Box mb={3}>
        <Heading level={4} mb={2}>
          Transparent Button Mode
        </Heading>
        <Button s="large" mode="transparent" onClick={action('transparent button clicked')} mr={2}>
          Button Large
        </Button>
        <Button
          s="large"
          mode="transparent"
          onClick={action('disabled button clicked')}
          disabled
          children="Can't touch this"
        />
      </Box>
      <Box mb={1}>
        <Heading level={4} mb={2}>
          IconButton
        </Heading>
        <IconButton s="large" iconName="edit" onClick={action('transparent iconbutton clicked')} mr={2}>
          Edit
        </IconButton>
        <IconButton s="large" iconName="edit" disabled onClick={action('disabled transparent iconbutton clicked')} />
      </Box>
    </Box>
  ))
  .add('Button sizes', () => (
    <Box>
      <Box mb={3}>
        <Heading level={4} mb={2}>
          Large
        </Heading>
        <Button s="large" onClick={action('button clicked')} mr={2}>
          Standard
        </Button>
        <Button s="large" mode="primary" onClick={action('primary button clicked')} mr={2}>
          Primary
        </Button>
        <Button s="large" mode="transparent" onClick={action('transparent button clicked')} mr={2}>
          Transparent
        </Button>
        <IconButton s="large" iconName="edit" onClick={action('transparent iconbutton clicked')} mr={2} />
      </Box>

      <Box mb={3}>
        <Heading level={4} mb={2}>
          Medium (Default Size)
        </Heading>
        <Button onClick={action('button clicked')} mr={2}>
          Standard
        </Button>
        <Button mode="primary" onClick={action('primary button clicked')} mr={2}>
          Primary
        </Button>
        <Button mode="transparent" onClick={action('transparent button clicked')} mr={2}>
          Transparent
        </Button>
        <IconButton iconName="edit" onClick={action('transparent iconbutton clicked')} mr={2} />
      </Box>

      <Box mb={3}>
        <Heading level={4} mb={2}>
          Small
        </Heading>
        <Button s="small" onClick={action('button clicked')} mr={2}>
          Standard
        </Button>
        <Button s="small" mode="primary" onClick={action('primary button clicked')} mr={2}>
          Primary
        </Button>
        <Button s="small" mode="transparent" onClick={action('transparent button clicked')} mr={2}>
          Transparent
        </Button>
        <IconButton s="small" iconName="edit" onClick={action('transparent iconbutton clicked')} mr={2} />
      </Box>

      <Box>
        <Heading level={4} mb={2}>
          XSmall
        </Heading>
        <Button s="xsmall" onClick={action('button clicked')} mr={2}>
          Standard
        </Button>
        <Button s="xsmall" mode="primary" onClick={action('primary button clicked')} mr={2}>
          Primary
        </Button>
        <Button s="xsmall" mode="transparent" onClick={action('transparent button clicked')} mr={2}>
          Transparent
        </Button>
        <IconButton s="xsmall" iconName="edit" onClick={action('transparent iconbutton clicked')} mr={2} />
      </Box>
    </Box>
  ))
  .add('Show progress indicator', () => <InProgressExample />)
  .add('label wraps', () => (
    <Box w={150}>
      <Button>Really long label that wraps</Button>
    </Box>
  ))
  .add('IconButton', () => (
    <Flex wrap align="center">
      <Box mb={1}>
        <p>With label</p>
        <IconButton s="medium" iconName="edit" onClick={action('iconbutton-click')} m={2}>
          Edit
        </IconButton>

        <p>Without label</p>
        <IconButton s="medium" iconName="edit" onClick={action('iconbutton-click')} m={2} />
      </Box>
    </Flex>
  ))
  .add('Button.Link', () => (
    <div>
      <p>Button.Link is a regular HTML link (&lt;a href="..."&gt;text here&lt;/a&gt;) that looks like a button</p>
      <h3>Link to URL</h3>
      <Button.Link href="/some/url" mode="normal" mr={3} s="large">
        Go to some URL (large normal)
      </Button.Link>
      <Button.Link href="/some/url" mode="primary" s="small">
        Go to some URL (small primary)
      </Button.Link>
    </div>
  ))
  .add('Button.RouteLink', () => (
    <Router>
      <Box>
        <p>
          Button.RouteLink uses{' '}
          <Link href="https://reacttraining.com/react-router/web/api/Link" target="_blank">
            react-router-dom's Link component
          </Link>{' '}
          but looks like a button
        </p>
        <h3>Link to a react-router route</h3>
        <Button.RouteLink to="/reviews/foo" mode="normal" mr={3}>
          Go to some route (normal)
        </Button.RouteLink>
        <Button.RouteLink to="/reviews/bar" mode="primary">
          Go to some route (primary)
        </Button.RouteLink>
      </Box>
    </Router>
  ));
