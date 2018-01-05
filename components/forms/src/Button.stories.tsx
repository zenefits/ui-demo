import React, { Component } from 'react';
import { Flex, Box } from 'rebass';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './Button';
import IconButton from './IconButton';

class WrapperComponent extends Component<{}, { inProgress: boolean }> {
  constructor(props) {
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
      <Button onClick={this.doSomethingThatTakes3Seconds} inProgress={this.state.inProgress}>
        Click me
      </Button>
    );
  }
}

storiesOf('Button', module).add('Button modes and states', () => (
  <Flex wrap align="center">
    <Box w={0.8} mb={1}>
      <p>Standard Button Mode (Default)</p>
      <Button s="large" onClick={action('button clicked')} m={2}>
        Button Large
      </Button>
      <Button s="large" onClick={action('disabled button clicked')} disabled children="Can't touch this" m={2} />
    </Box>

    <Box w={0.8} mb={1}>
      <p>Primary Button Mode</p>
      <Button s="large" mode="primary" onClick={action('primary button clicked')} m={2}>
        Button Large
      </Button>
      <Button
        s="large"
        mode="primary"
        onClick={action('disabled button clicked')}
        disabled
        children="Can't touch this"
        m={2}
      />
    </Box>

    <Box w={0.8} mb={1}>
      <p>Transparent Button Mode</p>
      <Button s="large" mode="transparent" onClick={action('transparent button clicked')} m={2}>
        Button Large
      </Button>
      <Button
        s="large"
        mode="transparent"
        onClick={action('disabled button clicked')}
        disabled
        children="Can't touch this"
        m={2}
      />
    </Box>
    <Box w={0.8} mb={1}>
      <p>IconButton</p>
      <IconButton s="large" iconName="edit" onClick={action('transparent iconbutton clicked')} m={2}>
        Edit
      </IconButton>
      <IconButton
        s="large"
        iconName="edit"
        disabled
        onClick={action('disabled transparent iconbutton clicked')}
        m={2}
      />
    </Box>
  </Flex>
));

storiesOf('Button', module).add('Button Sizes', () => (
  <Flex wrap align="center">
    <Box w={0.8} mb="5px">
      <Box>Large</Box>
      <Button s="large" onClick={action('button clicked')} m={2}>
        Standard Large
      </Button>
      <Button s="large" mode="primary" onClick={action('primary button clicked')} m={2}>
        Primary Large
      </Button>
      <Button s="large" mode="transparent" onClick={action('transparent button clicked')} m={2}>
        Transparent Large
      </Button>
      <IconButton s="large" iconName="edit" onClick={action('transparent iconbutton clicked')} m={2} />
    </Box>

    <Box w={0.8} mb="5px">
      <Box>Medium (Default Size)</Box>
      <Button onClick={action('button clicked')} m={2}>
        Standard Medium
      </Button>
      <Button mode="primary" onClick={action('primary button clicked')} m={2}>
        Primary Medium
      </Button>
      <Button mode="transparent" onClick={action('transparent button clicked')} m={2}>
        Transparent Medium
      </Button>
      <IconButton iconName="edit" onClick={action('transparent iconbutton clicked')} m={2} />
    </Box>

    <Box w={0.8} mb="5px">
      <Box>Small</Box>
      <Button s="small" onClick={action('button clicked')} m={2}>
        Standard Small
      </Button>
      <Button s="small" mode="primary" onClick={action('primary button clicked')} m={2}>
        Primary Small
      </Button>
      <Button s="small" mode="transparent" onClick={action('transparent button clicked')} m={2}>
        Transparent Small
      </Button>
      <IconButton s="small" iconName="edit" onClick={action('transparent iconbutton clicked')} m={2} />
    </Box>

    <Box w={0.8} mb="5px">
      <Box>XSmall</Box>
      <Button s="xsmall" onClick={action('button clicked')} m={2}>
        Standard XSmall
      </Button>
      <Button s="xsmall" mode="primary" onClick={action('primary button clicked')} m={2}>
        Primary XSmall
      </Button>
      <Button s="xsmall" mode="transparent" onClick={action('transparent button clicked')} m={2}>
        Transparent XSmall
      </Button>
      <IconButton s="xsmall" iconName="edit" onClick={action('transparent iconbutton clicked')} m={2} />
    </Box>
  </Flex>
));

storiesOf('Button', module).add('Show progress indicator', () => (
  <div>
    <h1>Progress Indicator</h1>
    <WrapperComponent />
  </div>
));

storiesOf('Button', module).add('IconButton', () => (
  <Flex wrap align="center">
    <Box w={0.8} mb={1}>
      <p>With label</p>
      <IconButton s="medium" iconName="edit" onClick={action('iconbutton-click')} m={2}>
        Edit
      </IconButton>

      <p>Without label</p>
      <IconButton s="medium" iconName="edit" onClick={action('iconbutton-click')} m={2} />
    </Box>
  </Flex>
));

storiesOf('Button', module).add('Button.Link', () => (
  <div>
    <h1>Button.Link</h1>
    <p>Button.Link is a regular HTML link (&lt;a href="..."&gt;text here&lt;/a&gt;) that looks like a button</p>
    <h3>Link to URL</h3>
    <Button.Link href="/some/url" mode="primary" target="_blank" mr={4}>
      Go to some URL
    </Button.Link>
    <Button.Link href="/some/url" mode="normal" mb={5}>
      Go to some URL
    </Button.Link>
    <pre>{'<Button.Link href="/some/url" mode="primary" target="_blank" mr={3}>Go to some URL</Button.Link>'}</pre>
  </div>
));

storiesOf('Button', module).add('Button.RouteLink', () => (
  <div>
    <h1>Button.RouteLink</h1>
    <p>
      Button.RouteLink is a{' '}
      <a href="https://reacttraining.com/react-router/web/api/Link" target="_blank" rel="noreferrer noopener">
        react-router-dom's Link component
      </a>{' '}
      that looks like a button
    </p>
    <h3>Link to a react-router route</h3>
    <pre>{'<Button.RouteLink to={`/some/${id}`} mode="primary" mx={2}>Go to some route</Button.RouteLink>'}</pre>
  </div>
));
