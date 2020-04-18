import {
  allByRole,
  allBySelector,
  allByTestId,
  byLabelText,
  byLastSelector,
  byRole,
  bySelector,
  byTestId,
  byText,
  collection,
  visitable,
  Page,
} from 'z-frontend-cypress/page';

export class AllTheThingsForm extends Page {
  visit = visitable('/iframe.html?selectedKind=forms%7CForm&selectedStory=all%20the%20things&full=1');

  getSSNInput = byLabelText('SSN');
  getEINInput = byLabelText('EIN');
  getDateInput = byLabelText('Date');
  getDateRangeStartInput = byTestId('FormDateRangeStartDate');
  getDateRangeEndInput = byTestId('FormDateRangeEndDate');
  getPhoneNumberInput = byLabelText('Phone number');
  getSubscribeCheckbox = byLabelText('Subscribe');
  getEntreInput = byText('Select Option');
  getWeekCalendar = byTestId('week-picker');
  getRating = byLabelText('Rating');
  getComment = byLabelText('Comment');
  getSubmitButton = byText('Save');

  // Address inputs
  getAddress1Input = byLabelText('Address Line 1');
  getCityInput = byLabelText('City');
  getStateSelect = byLabelText('State');
  getZipCodeInput = byLabelText('ZIP Code');
}
