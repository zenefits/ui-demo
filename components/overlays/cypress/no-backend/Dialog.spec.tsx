import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';
import { Box, Heading } from 'zbase';
import { Button } from 'z-frontend-elements';

import Dialog from '../../src/dialog/Dialog';
import DialogManager from '../../src/dialog/DialogManager';

const DialogManagerExample = () => (
  <DialogManager
    render={dialog => {
      return (
        <Box>
          <Dialog isVisible={dialog.isVisible}>
            {labelId => (
              <Box>
                <Heading id={labelId} level={1}>
                  Example Dialog
                </Heading>
                <Button onClick={dialog.close}>Close Dialog</Button>
              </Box>
            )}
          </Dialog>
          <Button onClick={dialog.open}>Open Dialog</Button>
        </Box>
      );
    }}
  />
);

describe('DialogManager', () => {
  it('can open and close dialogs', () => {
    mount(<DialogManagerExample />);
    cy.findByText('Close Dialog').should('not.be.visible');
    cy.findByText('Open Dialog').click();
    cy.focused().findByText('Close Dialog');
    cy.findByText('Close Dialog').click();
    cy.findByText('Close Dialog').should('not.be.visible');
  });
});
