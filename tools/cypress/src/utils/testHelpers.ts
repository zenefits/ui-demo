type ComponentMatcher = (fieldRowEl: JQuery<HTMLElement>) => boolean;
type ComponentHelper = (chain: Cypress.Chainable<any>, optionsToSelect: string[]) => Cypress.Chainable<any>;

const checkboxGroupMatcher = (fieldRowEl: JQuery<HTMLElement>) =>
  Cypress.$(fieldRowEl).find('[role=group] input[type=checkbox]').length > 0;

const checkboxGroupHelper = (chain: Cypress.Chainable<any>, optionsToSelect: string[], uncheck?: boolean) => {
  let currentChain: Cypress.Chainable<any> = chain.log('selectOptionsInList > CheckboxGroup');

  optionsToSelect.forEach(opt => {
    currentChain = currentChain
      .get('label span')
      .contains(opt)
      .parent()
      .find('input[type=checkbox]')
      [uncheck ? 'uncheck' : 'check']();
  });

  return currentChain;
};

const listComponentHandlers: { [key: string]: { matcher: ComponentMatcher; helper: ComponentHelper } } = {
  CheckboxGroup: {
    matcher: checkboxGroupMatcher,

    helper(chain: Cypress.Chainable<any>, optionsToSelect: string[]) {
      return checkboxGroupHelper(chain, optionsToSelect);
    },
  },

  GroupSelect: {
    matcher: (fieldRowEl: JQuery<HTMLElement>) =>
      Cypress.$(fieldRowEl).find('[role=combobox] i + input[type=text][autocomplete]').length > 0,

    helper(chain: Cypress.Chainable<any>, optionsToSelect: string[]) {
      return chain
        .log('selectOptionsInList > GroupSelect')
        .get('input')
        .focus()
        .closest('[role=combobox]')
        .find('[role=option]')
        .contains(optionsToSelect[0])
        .first()
        .click();
    },
  },

  OpenListSelect: {
    matcher: (fieldRowEl: JQuery<HTMLElement>) =>
      Cypress.$(fieldRowEl).find('[role=combobox] > [role=listbox] > [role=option]').length > 0,

    helper(chain: Cypress.Chainable<any>, optionsToSelect: string[]) {
      return chain
        .log('selectOptionsInList > OpenListSelect')
        .get('[role=option]')
        .contains(optionsToSelect[0])
        .first()
        .click();
    },
  },

  RadioGroup: {
    matcher: (fieldRowEl: JQuery<HTMLElement>) =>
      Cypress.$(fieldRowEl).find('[role=radiogroup] input[type=radio]').length > 0,

    helper(chain: Cypress.Chainable<any>, optionsToSelect: string[]) {
      return chain
        .log('selectOptionsInList > RadioGroup')
        .get('[role=radiogroup] label > span')
        .contains(optionsToSelect[0])
        .closest('label')
        .click();
    },
  },

  SelectDeprecated: {
    matcher: (fieldRowEl: JQuery<HTMLElement>) => Cypress.$(fieldRowEl).find('.Select-control').length > 0,

    helper(chain: Cypress.Chainable<any>, optionsToSelect: string[]) {
      return chain
        .log('selectOptionsInList > SelectDeprecated')
        .get('input')
        .focus()
        .closest('.Select--single')
        .find('.Select-option')
        .contains(optionsToSelect[0])
        .first()
        .click();
    },
  },
};

const formHelpers = {
  // customTileInput(optionToSelect: string) {
  //   return cy
  //     .log('Select an option in Form.CustomTileInput')
  //     .get('label > input[type=radio] + div > div')
  //     .contains(optionToSelect)
  //     .click();
  // },

  mentionTextarea(label: string, textToTypeIn: string) {
    const emails = textToTypeIn.match(/@\S+?@\S+/g) || [];
    let email: string;

    let result = cy.log(`Fill in Form.MentionTextarea`).getByLabelText(label);

    let rest: string = textToTypeIn;
    while (emails.length) {
      email = emails.shift();
      result = result.type(rest.substring(0, rest.indexOf(email)));
      result = result
        .type(email)
        .parent()
        .parent()
        .parent()
        .parent()
        .find('div:last')
        .contains(email.substr(1))
        .click()
        .getByLabelText(label);
      rest = rest.substr(rest.indexOf(email) + email.length);
    }

    if (rest.length) {
      result = result.type(rest);
    }

    return result;
  },

  // TODO
  // searchSelect(label: string, optionToSelect) {
  //   return (
  //     cy
  //       .log('Fill and select option in Form.SearchSelect')
  //       // .get('label')
  //       // .contains(label)
  //       // .parent()
  //       // .parent()
  //       // .find('[role=combobox] button')
  //       .get('[role=combobox] button')
  //       .click()
  //       .get('[role=combobox] i:first + input[aria-autocomplete=list]')
  //       .type(optionToSelect)
  //       .get('[role=listbox] [role=option]')
  //       .filter((i, el) => el.innerText === optionToSelect)
  //       .click()
  //   );
  // },

  // TODO
  // signature(label: string) {
  //   return cy
  //     .log('Add a signture in Form.Signature')
  //     .get('label')
  //     .contains(label)
  //     .parent()
  //     .parent()
  //     .find('canvas')
  //     .first()
  //     .trigger('mousedown', { which: 1, clientX: 450, clientY: 120 })
  //     .trigger('mousemove', { which: 1, clientX: 500, clientY: 130 })
  //     .trigger('mouseup');
  // },

  typeText(fieldLabel: string, ...textToTypeIn: (string | number)[]) {
    return cy
      .log(`typeText${textToTypeIn.length ? ` (inputs count: ${textToTypeIn.length})` : ''}`)
      .get('[data-fieldrow-test-marker] label')
      .contains(fieldLabel)
      .closest('[data-fieldrow-test-marker]')
      .within(fieldRowEl => {
        let lastChain: Cypress.Chainable<any> = cy;

        const needToBlurAfter =
          fieldRowEl.find('.DayPickerInput').length > 0 || fieldRowEl.find('[role=combobox]').length === 2;

        textToTypeIn.forEach((text, index: number) => {
          const stringToTypeIn = text.toString();
          let result = cy.get('input, textarea').eq(index);
          if (stringToTypeIn) {
            result = result.type(stringToTypeIn);
          } else {
            result = result.clear();
          }
          lastChain = result;
        });

        if (needToBlurAfter) {
          lastChain.blur();
        }
      });
  },

  selectOptionsInList(fieldLabel: string, ...optionsToSelect: string[]) {
    return cy
      .log('selectOptionsInList')
      .get('[data-fieldrow-test-marker] label')
      .contains(fieldLabel)
      .closest('[data-fieldrow-test-marker]')
      .within(fieldRowEl => {
        const componentName = Object.keys(listComponentHandlers).find(componentName =>
          listComponentHandlers[componentName].matcher(fieldRowEl),
        );
        const helper = componentName ? listComponentHandlers[componentName].helper : null;

        if (helper) {
          helper(cy, optionsToSelect);
        } else {
          throw new Error('selectOptionsInList did not find matching component');
        }
      });
  },

  uncheckOptionsInList(fieldLabel: string, ...optionsToSelect: string[]) {
    return cy
      .log('uncheckOptionsInList (CheckboxGroup)')
      .get('[data-fieldrow-test-marker] label')
      .contains(fieldLabel)
      .closest('[data-fieldrow-test-marker]')
      .within(fieldRowEl => {
        const currentChain: Cypress.Chainable<any> = cy;

        if (checkboxGroupMatcher(fieldRowEl)) {
          checkboxGroupHelper(currentChain, optionsToSelect, true);
        } else {
          throw new Error('uncheckOptionsInList did not find matching component');
        }
      });
  },
};

export default formHelpers;
