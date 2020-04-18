import React from 'react';

import { fetchWrapper } from 'z-frontend-app-bootstrap';

import { ConnectionInterface, NavigatorInterface } from './windowTypes';

type ConnectionManagerProps = {
  navigator?: NavigatorInterface;
  fetchTimeout?: number;
};

type ConnectionManagerState = {
  isNetworkConnected: boolean;
};

export const ConnectionManagerContext = React.createContext<boolean>(true);

const getNetworkStateFromConnectionInterface = (connection: ConnectionInterface) => {
  if (connection.rtt === 0 || connection.type === 'none') {
    return false;
  }

  return true;
};

const getConnection = (navigator: NavigatorInterface): ConnectionInterface => {
  if (typeof navigator === 'object' && navigator !== null) {
    return navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
  } else {
    return {};
  }
};

export default class ConnectionManager extends React.Component<ConnectionManagerProps, ConnectionManagerState> {
  static defaultProps = {
    fetchTimeout: 10 * 1000,
    navigator: window.navigator,
  };

  state = {
    isNetworkConnected: getNetworkStateFromConnectionInterface(getConnection(this.props.navigator)),
  };

  sessionTestInterval: number;

  respondToConnectionChange = () => {
    const connection = getConnection(this.props.navigator);
    this.setState({
      isNetworkConnected: getNetworkStateFromConnectionInterface(connection),
    });
  };

  componentDidMount() {
    const connection = getConnection(this.props.navigator);
    if (connection.addEventListener) {
      connection.addEventListener('change', this.respondToConnectionChange);
    }

    this.sessionTestInterval = setInterval(async () => {
      try {
        const response = await fetchWrapper('/session_test');
        this.setState({
          isNetworkConnected: !!response.ok,
        });
      } catch {
        this.setState({
          isNetworkConnected: false,
        });
      }
    }, this.props.fetchTimeout);
  }

  componentWillUnmount() {
    window.clearInterval(this.sessionTestInterval);

    const connection = getConnection(this.props.navigator);
    if (connection.removeEventListener) {
      connection.removeEventListener('change', this.respondToConnectionChange);
    }
  }

  render() {
    return (
      <ConnectionManagerContext.Provider value={this.state.isNetworkConnected}>
        {this.props.children}
      </ConnectionManagerContext.Provider>
    );
  }
}
