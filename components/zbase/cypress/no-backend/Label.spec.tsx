import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import Label from '../../src/web/label/Label';

describe('Label', () => {
  it('renders label', () => {
    mount(<Label>Logo</Label>);

    cy.findByText('Logo');
  });
});
