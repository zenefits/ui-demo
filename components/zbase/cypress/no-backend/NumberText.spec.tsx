import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import NumberText from '../../src/web/number-text/NumberText';

describe('NumberText', () => {
  it('decimal format', () => {
    mount(
      <>
        <NumberText value={2345} style="decimal" />
        <br />
        <NumberText value={0.1678} style="percent" />
        <br />
        <NumberText value={0.1678} style="percent" minimumFractionDigits={2} />
        <br />
        <ul>
          <li>
            <NumberText value={1234} style="currency" currency="USD" />
          </li>
          <li>
            {/* force to always show cents */}
            <NumberText value={2345} style="currency" currency="USD" minimumFractionDigits={2} />
          </li>
          <li>
            <NumberText value={3456.7} style="currency" currency="USD" />
          </li>
          <li>
            <NumberText value={4567} style="currency" currency="USD" currencyDisplay="name" />
          </li>
          <li>
            <NumberText value={5678} style="currency" currency="EUR" />
          </li>
        </ul>
      </>,
    );
    cy.findByText('2,345');
    cy.findByText('17%');
    cy.findByText('16.78%');

    cy.findByText('$1,234');
    cy.findByText('$2,345.00');
    cy.findByText('$3,456.70');
    cy.findByText('4,567 US dollars');
    cy.findByText('€5,678');
  });
});
