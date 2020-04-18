import { mockGraphqlFromSchema } from 'z-frontend-cypress/utils';

import schema from '../../schema/schema.generated.graphql';
import OverviewPage from './OverviewPage';

describe('Overview Page', () => {
  beforeEach(() => {
    mockGraphqlFromSchema(schema);
  });

  it('shows title and working object links', () => {
    const overviewPage = new OverviewPage();
    overviewPage.visit();
    overviewPage.getTitle().contains('Example App');
    overviewPage
      .getCreateButton()
      .should('have.attr', 'href')
      .and('equal', '#/objects/new');
    overviewPage.getFaqs().contains('What is a qualifying life event?');

    overviewPage.getMain().contains('Featured Objects');
    overviewPage
      .getMain()
      .findByText('Fireworks')
      .click();
    cy.hash().should('contain', 'objects');
    cy.contains('Edit Object');
  });
});
