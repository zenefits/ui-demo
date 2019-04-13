import { ComponentType } from 'react';
import { connect } from 'react-redux';

import { ReduxStateWithSwitches, Switches } from '../../../index';

export interface WithSwitchesProps {
  switches: Switches;
  switchesLoaded: boolean;
}

export default function withSwitches<OwnProps = {}>() {
  return (WrappedComponent: ComponentType<OwnProps & WithSwitchesProps>) => {
    return connect<WithSwitchesProps, {}, OwnProps, ReduxStateWithSwitches>(state => ({
      switches: state.switches.values,
      switchesLoaded: state.switches.loaded,
    }))(WrappedComponent);
  };
}
