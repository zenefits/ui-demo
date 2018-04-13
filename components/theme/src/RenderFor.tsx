import React from 'react';
import canUseDom from 'can-use-dom';

import { getMatches } from './responsive-utils';

export default class RenderFor extends React.Component<{ breakpoints: boolean[] }, { matches: boolean[] }> {
  constructor(props) {
    super(props);
    if (!canUseDom) {
      // TODO: generate CSS instead
      return;
    }
    this.state = {
      matches: getMatches(),
    };
    // TODO: change it to usee a media listener or more efficient resize handler with throttle
    window.addEventListener('resize', () => this.setState({ matches: getMatches() }));
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
