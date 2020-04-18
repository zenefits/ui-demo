import React, { Component } from 'react';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';

import { styled } from 'z-frontend-theme';
import { color, radius, space } from 'z-frontend-theme/utils';
import { Flex } from 'zbase';

import { IconButton } from '../../../index';
import { CloseReason } from './NotificationManager';

type NotificationProps = Omit<SnackbarProps, keyof { onClose: any; open: any }> & {
  /** If true, the Notification is open. */
  open: boolean;
  /**
   * Callback fired when the component requests to be closed. Typically `onClose` is used to set state in the parent component,
   * which is used to control the `open` prop. The reason parameter can optionally be used to control the response to
   * onClose, for example ignoring "clickaway".
   * */
  onClose?: (event: any, reason?: CloseReason) => void;
};

const NotificationContent = styled(Flex)`
  background-color: ${color('secondary.a')};
  color: ${color('grayscale.white')};
  margin-bottom: ${space(2)};
  padding: 12px ${space(4)};
  border-radius: ${radius()};
  min-width: 300px;
  justify-content: space-between;
  align-items: center;
  line-height: 1.33;
`;

/** Component that shows a configurable message to the user. */
class Notification extends Component<NotificationProps> {
  constructor(props: NotificationProps) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      open: false,
    };
  }

  render() {
    const { children, onClose, open, ...rest } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        onClose={(e, reason) => onClose && onClose(e, reason as CloseReason)}
        {...rest}
      >
        <NotificationContent fontStyle="paragraphs.m">
          {children}
          <IconButton
            color="grayscale.e"
            key="close"
            s="xsmall"
            ml={3}
            mr={-2}
            iconName="close"
            aria-label="Close"
            onClick={onClose}
          />
        </NotificationContent>
      </Snackbar>
    );
  }
}

export default Notification;
