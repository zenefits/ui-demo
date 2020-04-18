import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import TimeText from '../../src/web/time-text/TimeText';

describe('TimeText', () => {
  const date = new Date(2019, 1, 23, 11, 30, 30);

  it('renders time', () => {
    mount(<TimeText value={date} />);

    cy.findByText('11:30 AM');
  });
});
