import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import ProductNavContainer from '../../src/product-nav-container/ProductNavContainer';

describe('ProductNavContainer', () => {
  it('content is always visible', () => {
    mount(
      <>
        <ProductNavContainer data-testid="foo">Nav content</ProductNavContainer>
        <div data-testid="page" style={{ marginTop: 2000 }}>
          forcing a scroll
        </div>
      </>,
    );

    cy.findByTestId('page').scrollIntoView();
    cy.findByText('Nav content').should('be.visible');
    cy.findByTestId('foo');
  });
});
