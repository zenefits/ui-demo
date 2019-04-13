import React, { createContext, Component, ComponentClass } from 'react';
import { ObjectOmit } from 'typelevel-ts';

import bootWalkme from './boot-walkme';

declare global {
  interface Window {
    WalkMeAPI: any;
    walkmeBooted: boolean;
    walkme_event: any;
  }
}

type WalkmeState = {
  hasBooted: boolean;
  bootRequested: boolean;
  walkmeKillswitch: boolean;
  walkmeBootArgs?: WalkmeBootArgs | null;
};

type WalkmeBootArgs = {
  userId: string;
};

export type WalkmeConsumerProps = {
  bootWalkme: () => void;
  initializeWalkme: (bootArgs: WalkmeBootArgs, walkmeKillswitch: boolean, enabled: boolean) => void;
};

type WalkmeContextTypes = WalkmeState & WalkmeConsumerProps;

export const WalkmeContext = createContext<WalkmeContextTypes>(null as any);

export default class Walkme extends Component<{}, WalkmeState> {
  state: WalkmeState = {
    hasBooted: false,
    walkmeKillswitch: true, // Default to true and set once switches load
    walkmeBootArgs: null,
    bootRequested: false,
  };

  boot = async () => {
    const { walkmeKillswitch, hasBooted, walkmeBootArgs } = this.state;

    // Walkme hasn't been inititialized yet
    if (!walkmeBootArgs) {
      this.setState({
        bootRequested: true,
      });
    } else if (!walkmeKillswitch && !hasBooted) {
      this.setState({
        hasBooted: true,
      });
      await bootWalkme(walkmeBootArgs);
    }
  };

  initialize = (bootArgs: WalkmeBootArgs, walkmeKillswitch: boolean, boot: boolean) => {
    this.setState(
      {
        walkmeKillswitch,
        walkmeBootArgs: bootArgs,
      },
      boot || this.state.bootRequested ? this.boot : undefined,
    );
  };

  render() {
    return (
      <WalkmeContext.Provider
        value={{
          ...this.state,
          bootWalkme: this.boot,
          initializeWalkme: this.initialize,
        }}
      >
        {this.props.children}
      </WalkmeContext.Provider>
    );
  }
}

export function withWalkmeContext<WrappedComponentProps extends WalkmeConsumerProps>(WrappedComponent: ComponentClass) {
  class WithWalkmeContext extends Component<ObjectOmit<WrappedComponentProps, keyof WalkmeConsumerProps>> {
    render() {
      return (
        <WalkmeContext.Consumer>
          {({ ...consumerProps }) => <WrappedComponent {...consumerProps} {...this.props} />}
        </WalkmeContext.Consumer>
      );
    }
  }

  return WithWalkmeContext;
}

type BooterProps = { shouldBoot: boolean } & WalkmeConsumerProps;

class Booter extends Component<BooterProps> {
  componentDidMount() {
    const { shouldBoot, bootWalkme } = this.props;
    if (shouldBoot) {
      bootWalkme();
    }
  }

  render() {
    return <></>;
  }
}

/*
  This should only be used in the unusual circumstance where we can't load Walkme globally and have set `disableWalkme` in renderApp
*/
export const WalkmeBooter = withWalkmeContext<BooterProps>(Booter);
