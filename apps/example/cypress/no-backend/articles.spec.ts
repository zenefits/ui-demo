import { mockGraphQL } from 'z-frontend-cypress/utils';

describe('Articles Page', () => {
  it('shows articles and a direct link to an article', () => {
    const employeeId: string = '1';
    mockGraphQL({
      OverviewPageQuery: {
        dashboard: {
          id: 'me',
          __typename: 'Dashboard',
          employee: {
            id: employeeId,
            __typename: 'all_employee',
          },
        },
      },
    });
    cy.visit('/#/overview');
    cy.contains('Article 2').click();

    cy.hash().should('eq', '#/articles/333');
    cy.contains('current article id: ');
  });
});
