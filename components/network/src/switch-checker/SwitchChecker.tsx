import React, { useContext, FunctionComponent } from 'react';

import { SwitchContext, SwitchContextProps } from './SwitchProvider';

type SwitchCheckerProps = {
  /** Name of switch to check for current user. */
  switch: string;
  /** If true, render content if switch is active */
  isNegated?: boolean;
  /** If true content will show before switches load */
  showBeforeSwitchesLoad?: boolean;
};

const SwitchChecker: FunctionComponent<SwitchCheckerProps> = props => {
  const { switches, switchesLoaded } = useContext<SwitchContextProps>(SwitchContext);

  const { isNegated, showBeforeSwitchesLoad, switch: switchName } = props;

  if (!switchesLoaded) {
    return showBeforeSwitchesLoad ? <>{props.children}</> : null;
  }

  const isSwitchActive = switches[switchName];
  const shouldRender = isNegated ? !isSwitchActive : isSwitchActive;
  return shouldRender ? <>{props.children}</> : null;
};

export default SwitchChecker;
