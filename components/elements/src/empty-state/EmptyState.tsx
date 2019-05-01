import React, { Component, ReactElement } from 'react';

import { Flex, FlexProps, Icon, TextBlock } from 'zbase';
import { IconNameString } from 'z-frontend-theme';

import { Link } from '../../index';

export type EmptyStateProps = {
  /**
   * Message explaining the empty state.
   * @default "We're unable to load content at the moment."
   */
  message?: string | ReactElement<any>;
  /**
   * Name of the icon to display.
   * @default 'alert-circle'
   */
  iconName: IconNameString;
  /**
   * Boolean to control whether to add "Try reloading" link to the message.
   * @default false
   */
  askToReload?: boolean;
} & FlexProps;

class EmptyState extends Component<EmptyStateProps> {
  static defaultProps = {
    message: "We're unable to load content at the moment.",
    iconName: 'alert-circle',
    askToReload: false,
  };

  refreshPage = () => {
    window.location.reload();
  };

  render() {
    const { iconName, message, askToReload, ...containerProps } = this.props;
    return (
      <Flex
        wrap
        align="center"
        justify="center"
        direction="column"
        py={6}
        w={1}
        color="grayscale.d"
        {...containerProps}
      >
        <Icon iconName={iconName} s="xlarge" />
        <TextBlock color="inherit" mt={2}>
          {message}
        </TextBlock>
        {askToReload && (
          <TextBlock color="inherit">
            <Link onClick={this.refreshPage}>Try reloading</Link> the page or check back later.
          </TextBlock>
        )}
      </Flex>
    );
  }
}

export default EmptyState;
