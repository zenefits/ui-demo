import { bySelector, byText, visitable, Page } from 'z-frontend-cypress/page';
import { CheckboxInteractor, TextInputInteractor } from 'z-frontend-forms/cypress';

class EditArticlePage extends Page {
  visit = visitable('#/articles/1/edit');
  getTitle = bySelector('h5');
  getTitleInput = () => new TextInputInteractor('Title');
  getRememberMe = () => new CheckboxInteractor('Remember Me');
  getSubmitButton = bySelector('[type=submit]');
  getCancelButton = byText('Cancel');
}

export default EditArticlePage;
