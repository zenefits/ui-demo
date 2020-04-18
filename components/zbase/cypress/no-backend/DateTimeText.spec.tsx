import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import DateTimeText from '../../src/web/date-time-text/DateTimeText';

describe('DateTimeText', () => {
  const date = new Date(2019, 1, 23, 11, 30, 30);

  it('renders date times', () => {
    mount(
      <>
        <DateTimeText value={date} />
        <br />
        <DateTimeText
          value={date}
          month="short"
          day="numeric"
          year="numeric"
          weekday="long"
          hour="2-digit"
          minute="2-digit"
          second="2-digit"
          color="tertiary.a"
        />
      </>,
    );

    cy.findByText('2/23/2019');
    cy.findByText('Saturday, Feb 23, 2019, 11:30:30 AM');
  });
});
