import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import Skeleton from '../../src/skeleton/Skeleton';

describe('Skeleton', () => {
  it('has a label', () => {
    mount(<Skeleton isCircle width={100} height={100} />);
    cy.findByLabelText('Loading...');
  });
});
