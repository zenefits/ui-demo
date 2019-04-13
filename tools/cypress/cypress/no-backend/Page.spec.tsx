import React from 'react';

import { mount } from 'cypress-react-unit-test';

import { allByTestId, bySelector, byTestId, byText, collection, Page } from '../../page';

Cypress.config({ defaultCommandTimeout: 500 }); // shorten from 4000

// NOTE: not using z-frontend components here to avoid circular dependencies
const testPage = (
  <div>
    <h2>Top Heading</h2>
    <div data-testid="foo">testId text</div>
    <div>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" />
      <button>Button Text</button>
    </div>
    <ul>
      <li>
        one <strong>1</strong>
      </li>
      <li>
        two <strong>2</strong>
      </li>
      <li>
        three <strong>3</strong>
      </li>
    </ul>
    <div data-testid="scoped">
      <h2>Scoped Heading</h2>
      <div data-testid="foo">scoped testId text</div>
    </div>
    <div data-testid="different-scoped">
      <div data-testid="foo">different-scoped testId text</div>
    </div>
  </div>
);

describe('Page', () => {
  beforeEach(() => {
    mount(testPage);
  });

  it('supports should directly', () => {
    class TestPage extends Page {}

    const page = new TestPage();
    page.should('contain', 'Top Heading').and('contain', 'Scoped Heading');
  });

  describe('scopes', () => {
    it('are respected', () => {
      class ScopeTestPage extends Page {
        bar = byTestId('foo');
      }

      const page = new ScopeTestPage();
      page.bar().should('have.text', 'testId text');

      const scopedPage = new ScopeTestPage('[data-testid="scoped"]');
      scopedPage.bar().should('have.text', 'scoped testId text');
    });

    it('support default', () => {
      class DefaultScopeTestPage extends Page {
        static defaultScope = '[data-testid="scoped"]';
        bar = byTestId('foo');
      }

      const page = new DefaultScopeTestPage();
      page.bar().should('have.text', 'scoped testId text');
    });

    it('favor explicit over default', () => {
      class DefaultScopeTestPage extends Page {
        static defaultScope = '[data-testid="scoped"]';
        bar = byTestId('foo');
      }

      const page = new DefaultScopeTestPage('[data-testid="different-scoped"]');
      page.bar().should('have.text', 'different-scoped testId text');
    });
  });

  describe('bySelector', () => {
    it('throws if no match', done => {
      const missingSelector = 'blink';
      class HelperTestPage extends Page {
        bar = bySelector(missingSelector);
      }

      cy.on('fail', err => {
        expect(err.message).to.contain(`Timed out retrying: Expected to find element: 'html ${missingSelector}'`);
        done();
      });
      new HelperTestPage().bar();
    });

    it('supports chainable commands', () => {
      class HelperTestPage extends Page {
        bar = bySelector('h2');
      }
      const page = new HelperTestPage();
      page.bar().should('exist');
      page.bar().click();
    });

    it('respects scope', () => {
      class HelperTestPage extends Page {
        static defaultScope = '[data-testid="scoped"]';
        bar = bySelector('h2');
      }
      new HelperTestPage().bar().should('have.text', 'Scoped Heading');
    });
  });

  describe('byTestId', () => {
    it('throws if no match', done => {
      const missingTestId = 'DoesNotExist';
      class HelperTestPage extends Page {
        bar = byTestId(missingTestId);
      }

      cy.on('fail', err => {
        expect(err.message).to.contain(`Unable to find an element by: [data-testid="${missingTestId}"]`);
        done();
      });
      new HelperTestPage().bar();
    });

    it('supports chainable commands', () => {
      class HelperTestPage extends Page {
        bar = byTestId('foo');
      }
      const page = new HelperTestPage();
      page.bar().should('exist');
      page.bar().click();
    });

    it('respects scope', () => {
      class HelperTestPage extends Page {
        static defaultScope = '[data-testid="scoped"]';
        bar = byTestId('foo');
      }
      new HelperTestPage().bar().should('have.text', 'scoped testId text');
    });
  });

  describe('allByTestId', () => {
    it('does not throw if no match', () => {
      const missingTestId = 'DoesNotExist';
      class HelperTestPage extends Page {
        bar = allByTestId(missingTestId);
      }

      cy.on('fail', err => {
        throw new Error('should not fail');
      });
      new HelperTestPage().bar().should('have.length', 0);
    });

    it('returns all matches', () => {
      class HelperTestPage extends Page {
        bar = allByTestId('foo');
      }
      const page = new HelperTestPage();
      page.bar().should('have.length', 3);
      page
        .bar()
        .first()
        .click();
    });

    it('respects scope', () => {
      class HelperTestPage extends Page {
        static defaultScope = '[data-testid="scoped"]';
        bar = allByTestId('foo');
      }
      new HelperTestPage().bar().should('have.text', 'scoped testId text');
    });
  });

  describe('byText', () => {
    it('throws if no match', done => {
      const missingText = 'Does not exist';
      class HelperTestPage extends Page {
        bar = byText(missingText);
      }

      cy.on('fail', err => {
        expect(err.message).to.contain(`Timed out retrying: Expected to find content: '${missingText}'`);
        done();
      });
      new HelperTestPage().bar();
    });

    it('supports chainable commands', () => {
      class HelperTestPage extends Page {
        bar = byText('Top Heading');
      }
      const page = new HelperTestPage();
      page.bar().should('exist');
      page.bar().click();
    });

    it('supports partial text match', () => {
      class HelperTestPage extends Page {
        bar = byText('on Tex');
      }
      new HelperTestPage().bar();
    });

    it('supports regex for exact matches', () => {
      class HelperTestPage extends Page {
        bar = byText(/^Button Text$/);
      }
      new HelperTestPage().bar();
    });

    it('respects scope', () => {
      class HelperTestPage extends Page {
        static defaultScope = '[data-testid="scoped"]';
        bar = byText('Heading');
      }
      new HelperTestPage().bar().should('have.text', 'Scoped Heading');
    });
  });

  describe('collection', () => {
    it('throws if no match', done => {
      const missingTestId = 'DoesNotExist';
      class HelperTestPage extends Page {
        getItem = collection(`[data-testid="${missingTestId}"]`, Nested);
      }
      class Nested extends Page {}

      cy.on('fail', err => {
        expect(err.message).to.match(/^Timed out retrying: Expected to find element: .* but never found it.$/);
        done();
      });
      new HelperTestPage().getItem(10).should('exist');
    });

    it('supports indexing', () => {
      class HelperTestPage extends Page {
        getItem = collection('li', Nested);
      }
      class Nested extends Page {}
      new HelperTestPage().getItem(1).should('contain', 'two');
    });

    it('supports nested property', () => {
      class HelperTestPage extends Page {
        getItem = collection('li', Nested);
      }
      class Nested extends Page {
        number = bySelector('strong');
      }
      new HelperTestPage()
        .getItem(1)
        .number()
        .should('have.text', '2');
    });
  });
});
