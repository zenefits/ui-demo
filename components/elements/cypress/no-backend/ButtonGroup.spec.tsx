import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import ButtonGroup from '../../src/action/button-group/ButtonGroup';
import Button from '../../src/action/button/Button';

describe('ButtonGroup', () => {
  it('contains buttons', () => {
    mount(
      <ButtonGroup>
        <Button>Bold</Button>
        <Button>Italic</Button>
        <Button>Underline</Button>
      </ButtonGroup>,
    );
    cy.findByText('Bold');
    cy.findByText('Italic');
    cy.findByText('Underline');
    cy.get('button').should('have.length', 3);
  });
});
