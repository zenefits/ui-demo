import { allByRole, byLabelText, bySelector, byTestId, byText, visitable, Page } from 'z-frontend-cypress/page';

class EditObjectPage extends Page {
  visitExisting = visitable('#/objects/111/edit');
  visitNew = visitable('#/objects/new');

  getTitle = byTestId('PageHeading');
  getNameInput = byLabelText('Name');
  getSizeRadioGroup = byLabelText('Size');
  getCategorySelect = byLabelText('Category');
  getValidationErrors = allByRole('alert');
  getSubmitButton = bySelector('[type=submit]');
  getCancelButton = byText('Cancel');
}

export default EditObjectPage;
