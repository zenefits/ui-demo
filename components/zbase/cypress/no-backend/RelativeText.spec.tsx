import React from 'react';
import moment from 'moment';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import RelativeText from '../../src/web/relative-text/RelativeText';

describe('RelativeTimeText', () => {
  const pastDate = moment()
    .subtract(3, 'days')
    .toDate();
  const futureDate = moment()
    .add(3, 'days')
    .toDate();

  it('renders date times', () => {
    mount(
      <>
        <RelativeText value={pastDate} />
        <br />
        <RelativeText value={futureDate} />
        <br />
        <RelativeText value={pastDate} units="hour" />
      </>,
    );

    cy.findByText('3 days ago');
    cy.findByText('in 3 days');
    cy.findByText('72 hours ago');
  });
});
