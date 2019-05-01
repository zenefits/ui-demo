import React, { Component } from 'react';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';

import { withDialog, ActionModal, WithDialogProps } from 'z-frontend-layout';

import { FireflyContextPropTypes } from './createFireflyProvider';

interface FireflyConsumerState {
  loading: boolean;
}

type ModifierKey = 'Control' | 'Shift' | 'Alt';

interface Keybinding {
  keyCode: number;
  modifierKeys: ModifierKey[];
}

const enterKeyCode = 13;
const defaultKeybinding: Keybinding = {
  keyCode: enterKeyCode,
  modifierKeys: ['Control'],
};

const consoleUserQuery = gql`
  query ConsoleUserQuery {
    dashboard {
      id
      isConsoleUser
    }
  }
`;

type ConsoleUserQuery = {
  dashboard: {
    id: string;
    isConsoleUser: boolean;
  };
};

export default (getApollo: () => ApolloClient<any>, keybinding: Keybinding = defaultKeybinding) => {
  class FireflyKeybindingConsumer extends Component<WithDialogProps, FireflyConsumerState> {
    static contextTypes = FireflyContextPropTypes;
    shouldChildrenUpdate: boolean = true;
    isConsoleUser: boolean;

    constructor(props: WithDialogProps) {
      super(props);
      this.state = { loading: false };
    }

    onKeyUp = (e: any) => {
      if (window.fireflyKillswitch || window.__WITHIN_EMBER_APP__) {
        return;
      }
      const correctKeycode = keybinding.keyCode === e.keyCode;
      const allModifiersPressed = keybinding.modifierKeys.every(keyName => {
        return e.getModifierState && e.getModifierState(keyName);
      });

      if (correctKeycode && allModifiersPressed) {
        const showModalIfNotConsoleUser = () => {
          if (this.isConsoleUser !== undefined && !this.isConsoleUser) {
            this.props.dialog.open();
          }
        };

        if (this.isConsoleUser === undefined) {
          getApollo()
            .query<ConsoleUserQuery>({
              query: consoleUserQuery,
              fetchPolicy: 'cache-first',
            })
            .then(result => {
              this.isConsoleUser = result.data.dashboard.isConsoleUser;
              showModalIfNotConsoleUser();
            });
        } else {
          showModalIfNotConsoleUser();
        }
      }
    };

    setLoadingState = async (loadingState: boolean) => {
      return new Promise(resolve => {
        this.setState({ loading: loadingState }, resolve);
      });
    };

    onConfirm = async () => {
      await this.setLoadingState(true);
      await this.context.loadFirefly();
      await this.props.dialog.close();
      await this.setLoadingState(false);
      this.context.startFirefly();
    };

    componentWillUpdate(nextProps: WithDialogProps, nextState: FireflyConsumerState) {
      // We don't want the entire app to re-render when the firefly dialog state changes
      this.shouldChildrenUpdate =
        this.state.loading === nextState.loading && this.props.dialog.isVisible === nextProps.dialog.isVisible;
    }

    componentDidMount() {
      document.addEventListener('keyup', this.onKeyUp);
    }

    componentWillUnmount() {
      document.removeEventListener('keyup', this.onKeyUp);
    }

    render() {
      const { dialog } = this.props;
      const dialogTitle = 'Begin Co-Browsing Session';
      return (
        <div>
          <ActionModal
            isVisible={dialog.isVisible}
            title={dialogTitle}
            onCancel={dialog.close}
            buttons={this.state.loading ? [] : [{ text: 'Confirm', onClick: this.onConfirm }]}
          >
            {this.state.loading
              ? 'Loading...'
              : 'You pressed a button combination to start a co-browsing session with our support team. ' +
                'To continue, press "Confirm" below.'}
          </ActionModal>
          <UpdateGate shouldUpdate={this.shouldChildrenUpdate}>{this.props.children}</UpdateGate>
        </div>
      );
    }
  }

  return withDialog<{}>()(FireflyKeybindingConsumer);
};

type UpdateGateProps = {
  shouldUpdate: boolean;
};

class UpdateGate extends Component<UpdateGateProps> {
  shouldComponentUpdate(nextProps: UpdateGateProps) {
    return nextProps.shouldUpdate;
  }
  render() {
    return this.props.children;
  }
}
