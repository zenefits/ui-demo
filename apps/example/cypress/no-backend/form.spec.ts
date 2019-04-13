import { mockGraphQL, testHelpers } from 'z-frontend-cypress/utils';

import mocks from './form-mock';

describe('Edit Article Page', () => {
  beforeEach(() => {
    mockGraphQL(mocks);
  });

  // NOTE: This test demonstrates deprecated form helpers which are being replaced by interactors
  it('shows lots of form inputs', () => {
    cy.visit('#/articles/1/edit');

    /**
     * text input components
     */

    // textarea
    testHelpers.typeText('Description', 'hi there');

    // maskedInput
    testHelpers.typeText('EIN', '4444');

    // moneyInput
    testHelpers.typeText('Annual Salary', 111111);

    // numberInput
    testHelpers.typeText('Time off days (Default number input)', 111111);

    // percentageInput
    testHelpers.typeText('Percentage owned', 42);

    // AddressUS field
    testHelpers.typeText('Address Line 1', '2nd Street');
    testHelpers.typeText('Address Line 2', 'Apt 303');
    testHelpers.typeText('City', 'San Francisco');
    testHelpers.selectOptionsInList('State', 'California');
    testHelpers.typeText('ZIP', '92000');

    // timeInput
    testHelpers.typeText('Time', '1:00 AM');

    // datePicker
    testHelpers.typeText('Date', '02/22/2018');

    // timeRange
    testHelpers.typeText('Time Range', '5:30 PM', '7:00 PM');

    // workaround for time out "this element is not visible"
    //  https://github.com/cypress-io/cypress/issues/695
    // this form has so many fields that it has become quite slow
    cy.wait(200);

    /**
     * options list components
     */

    // checkboxGroup
    testHelpers.selectOptionsInList('Proteins', 'Chicken', 'Tofu');
    testHelpers.uncheckOptionsInList('Proteins', 'Tofu');

    // TODO: testHelpers.customTileInput('Monthly');

    // TODO: testHelpers.searchSelect('Fruit', 'Orange');

    // groupSelect
    testHelpers.selectOptionsInList('Player', 'Jayson');

    // openListSelect
    testHelpers.selectOptionsInList('Fruit', 'Banana');

    // radioGroup
    testHelpers.selectOptionsInList('Pay Frequency', 'Semi-monthly');

    /**
     * component specific helpers
     */

    testHelpers.mentionTextarea(
      'Comment',
      'this is a test for @thequeen@zenefits.com or for @marklesparkle@zenefits.com !!!',
    );

    // TODO: testHelpers.signature('Sign here');

    // TODO: testHelpers.weekPicker('Week', '2017-05-21');
  });
});
