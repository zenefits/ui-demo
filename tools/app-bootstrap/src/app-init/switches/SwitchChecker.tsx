import { Component } from 'react';

import { Switches } from './switchesRedux';
import withSwitches, { WithSwitchesProps } from './withSwitches';

interface OwnProps {
  /** Name of switch to check for current user. */
  switch: keyof Switches;
}

class SwitchChecker extends Component<OwnProps & WithSwitchesProps> {
  render() {
    if (this.props.switchesLoaded && this.props.switches[this.props.switch]) {
      return this.props.children;
    }
    return null;
  }
}

export default withSwitches<OwnProps>()(SwitchChecker);
