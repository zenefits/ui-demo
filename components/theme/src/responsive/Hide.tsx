import React from 'react';
// @ts-ignore
import canUseDom from 'can-use-dom';

import { getBreakpointMatches } from './responsive-utils';
import { matchesBreakpoints, matchesContext } from './render-helpers';

type Props = {
  /** Hide children when in embedded native view.
   * @default false */
  inEmbeddedNativeView?: boolean;

  /** Which breakpoints should children be hidden in?
   * @default []
   * Example: [true] means hide only at smallest breakpoint. */
  forBreakpoints?: boolean[];
};
type State = { breakpointMatches: boolean[] };

export default class Hide extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    if (!canUseDom) {
      // TODO: generate CSS instead
      return;
    }

    this.state = {
      breakpointMatches: getBreakpointMatches(),
    };
  }

  resizeEventHandler = () => {
    this.setState({ breakpointMatches: getBreakpointMatches() });
  };

  componentDidMount() {
    // TODO: change it to usee a media listener or more efficient resize handler with throttle
    window.addEventListener('resize', this.resizeEventHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEventHandler);
  }

  render() {
    const { children, forBreakpoints, ...contexts } = this.props;

    const contextArray: string[] = Object.entries(contexts)
      .filter(entry => !!entry[1])
      .map(entry => entry[0]);

    if (
      (forBreakpoints && matchesBreakpoints(forBreakpoints, this.state.breakpointMatches)) ||
      contextArray.some(matchesContext)
    ) {
      return null;
    }
    return children || null;
  }
}
