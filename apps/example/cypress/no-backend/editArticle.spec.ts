import { mockGraphQL } from 'z-frontend-cypress/utils';

import mocks from './form-mock';
import EditArticlePage from './EditArticlePage';

describe('Edit Article Page', () => {
  beforeEach(() => {
    mockGraphQL(mocks);
  });

  it('includes form validation', () => {
    const editPage = new EditArticlePage();
    editPage.visit();
    editPage.getTitle().contains('Edit article');
    editPage
      .getTitleInput()
      .hasError()
      .should('equal', false);
    editPage.getSubmitButton().click();
    editPage
      .getTitleInput()
      .hasError()
      .should('equal', true);
  });

  // NOTE: this is not a very useful test
  it('submits', () => {
    const editPage = new EditArticlePage();
    editPage.visit();
    editPage.getTitle().contains('Edit article');

    editPage.getTitleInput().type('Doctor');

    editPage.getRememberMe().isUnchecked();
    editPage.getRememberMe().check();
    editPage.getRememberMe().isChecked();

    editPage.getSubmitButton().click();
  });
});
