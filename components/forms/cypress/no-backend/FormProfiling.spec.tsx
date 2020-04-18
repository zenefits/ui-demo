import { collectPerfStats } from 'z-frontend-cypress/utils';

import { AllTheThingsForm } from '../page-objects/AllTheThingsForm';

describe('Form profiling', () => {
  let flushStats;
  beforeEach(() => {
    flushStats = collectPerfStats('allTheThingsForm');
  });

  afterEach(() => {
    flushStats();
  });

  it('All the things form', () => {
    const form = new AllTheThingsForm();
    // Visit story
    form.visit();

    form.getSSNInput().type('123456789');
    form.getSubscribeCheckbox().click();
    form.getEINInput().type('123456789');
    form.getDateInput().type('02/01/2020');
    form.getDateRangeStartInput().type('02/01/2019');
    form.getDateRangeEndInput().type('02/01/2020');
    form.getPhoneNumberInput().type('5555555555');
    form
      .getEntreInput()
      .click()
      .type('Chi{enter}');
    form
      .getRating()
      .get(':radio')
      .first()
      .click();
    form.getComment().type('Hello world!');

    cy.findByLabelText('Wednesday').click();
    cy.findByLabelText('My Team').click();

    form
      .getWeekCalendar()
      .findAllByRole('row')
      .first()
      .click();
    form.getAddress1Input().type('742 Evergreen Terrace');
    form
      .getStateSelect()
      .focus()
      .type('Oregon{enter}');
    form.getZipCodeInput().type('97035', { force: true });
    form.getSubmitButton().click();
  });
});
