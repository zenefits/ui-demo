import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './Button';

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

storiesOf('Button', module).add('Primary disabled and normal states', () => (
  <div>
    <h1>Basic Buttons </h1>

    <h3>Primary Button</h3>
    <Button onClick={action('button clicked')} m={2} p={1}>
      <i>Click Me !</i>
    </Button>

    <h3>Disabled Button</h3>
    <Button onClick={action('disabled button clicked')} disabled children="Can't touch this" />
  </div>
));

storiesOf('Button', module).add('Show progress indicator', () => (
  <div>
    <h1>Progress Indicator</h1>
    <WrapperComponent />
  </div>
));
