import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import ProductPageContainer from '../../src/product-page-container/ProductPageContainer';

describe('ProductPageContainer', () => {
  it('content is visible', () => {
    mount(<ProductPageContainer data-testid="foo">Page content</ProductPageContainer>);

    cy.findByText('Page content');
    cy.findByTestId('foo');
  });
});
