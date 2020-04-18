import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';
import { Flex } from 'zbase';

import ButtonDropdown from '../../src/action/button-dropdown/ButtonDropdown';

describe('ButtonDropdown', () => {
  it('dropdown hides after click', () => {
    mount(
      <Flex height={500} align="center" w={[1, 2 / 3]} bg="grayscale.white">
        <ButtonDropdown data-testid="TargetButton">
          <ButtonDropdown.ItemButton>Run Review</ButtonDropdown.ItemButton>
          <ButtonDropdown.ItemButton>Delete Results</ButtonDropdown.ItemButton>
          <ButtonDropdown.ItemButton>Duplicate Review</ButtonDropdown.ItemButton>
        </ButtonDropdown>
      </Flex>,
    );
    cy.findByTestId('TargetButton').click();
    cy.findByText('Run Review').click();
    cy.findByText('Run Review').should('not.exist');
  });

  it('can keep dropdown open after click', () => {
    mount(
      <Flex height={500} align="center" w={[1, 2 / 3]} bg="grayscale.white">
        <ButtonDropdown data-testid="TargetButton" closeOnPopperClick={false}>
          <ButtonDropdown.ItemButton>Run Review</ButtonDropdown.ItemButton>
          <ButtonDropdown.ItemButton>Delete Results</ButtonDropdown.ItemButton>
          <ButtonDropdown.ItemButton>Duplicate Review</ButtonDropdown.ItemButton>
        </ButtonDropdown>
      </Flex>,
    );
    cy.findByTestId('TargetButton').click();
    cy.findByText('Run Review').click();
    cy.findByText('Run Review');
  });
});
