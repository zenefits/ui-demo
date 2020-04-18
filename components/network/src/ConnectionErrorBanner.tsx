import React from 'react';

import { Banner, BannerFlexContainerProps } from 'z-frontend-composites';

import { ConnectionManagerContext } from './ConnectionManager';

type ConnectionErrorBannerProps = {
  /**
   * Message to display upon network connection failure
   */
  message?: string;
} & BannerFlexContainerProps;

export const DEFAULT_LOST_CONNECTION_MESSAGE = 'Lost network connection. Trying to connect...';

export default class ConnectionErrorBanner extends React.Component<ConnectionErrorBannerProps> {
  static defaultProps = {
    message: DEFAULT_LOST_CONNECTION_MESSAGE,
  };

  render() {
    const { message, ...containerProps } = this.props;
    return (
      <ConnectionManagerContext.Consumer>
        {isNetworkConnected =>
          isNetworkConnected ? null : (
            <Banner type="error" showIcon={false} isClosable={false} {...containerProps}>
              {message}
            </Banner>
          )
        }
      </ConnectionManagerContext.Consumer>
    );
  }
}
