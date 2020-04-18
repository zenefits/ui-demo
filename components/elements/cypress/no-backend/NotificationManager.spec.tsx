import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';
import { Box } from 'zbase';

import NotificationManager from '../../src/overlay/notification/NotificationManager';
import NotificationProvider from '../../src/overlay/notification/NotificationProvider';
import Button from '../../src/action/button/Button';

const buttonText = 'Assign task';
const notificationText = 'Task assigned to Mike.';

describe('NotificationManager', () => {
  it('shows and closes', () => {
    mount(
      <NotificationProvider>
        <NotificationManager>
          {notificationProps => (
            <Box p={3}>
              <Button onClick={() => notificationProps.openNotification(notificationText)}>{buttonText}</Button>
            </Box>
          )}
        </NotificationManager>
      </NotificationProvider>,
    );

    cy.findByText(buttonText).click();
    cy.findByText(notificationText);
    cy.findByLabelText('Close').click();
    cy.findByText(notificationText).should('not.exist');
  });
});
