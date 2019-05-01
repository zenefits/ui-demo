import { mockGraphQL } from 'z-frontend-cypress/utils';

import OverviewPage from './OverviewPage';

describe('Overview Page', () => {
  it('shows title and article list', () => {
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

    const overviewPage = new OverviewPage();
    overviewPage.visit();
    overviewPage.getTitle().contains('Example App');
    overviewPage
      .getCreateButton()
      .should('have.attr', 'href')
      .and('equal', '#/widgets/new');
    overviewPage.getMain().contains('Articles');
    overviewPage
      .getMain()
      .getByText('Article 1')
      .should('have.attr', 'href')
      .and('equal', '#/articles/222');
    overviewPage.getFaqs().contains('What is a qualifying life event?');
  });
});
