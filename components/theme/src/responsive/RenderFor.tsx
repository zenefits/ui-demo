import React from 'react';
// @ts-ignore
import canUseDom from 'can-use-dom';

import { getMatches } from './responsive-utils';

type Props = {
  /** Which breakpoints should children be rendered at? Example: [true] means render only at smallest breakpoint. */

  breakpoints: boolean[];
};
type State = { matches: boolean[] };

export default class RenderFor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    if (!canUseDom) {
      // TODO: generate CSS instead
      return;
    }
    this.state = {
      matches: getMatches(),
    };
  }

  resizeEventHandler = () => {
    this.setState({ matches: getMatches() });
  };

  componentDidMount() {
    // TODO: change it to usee a media listener or more efficient resize handler with throttle
    window.addEventListener('resize', this.resizeEventHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEventHandler);
  }

  render() {
    for (let i = 0; i < this.props.breakpoints.length; i += 1) {
      if (this.props.breakpoints[i] && this.state.matches[i]) {
        return this.props.children;
      }
    }
    return null;
  }
}
