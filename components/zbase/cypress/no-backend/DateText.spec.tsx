import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import DateText from '../../src/web/date-text/DateText';

describe('DateText', () => {
  const date = new Date(2019, 1, 23);

  it('renders dates', () => {
    mount(
      <>
        <DateText value={date} />
        <br />
        <DateText value={date} long />
      </>,
    );

    cy.findByText('2/23/2019');
    cy.findByText('Feb 23, 2019');
  });
});
