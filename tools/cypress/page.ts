type CypressMethod = 'get' | 'getByLabelText';

export class Page {
  selector: string;
  method: string;

  constructor(selector?: string, method: CypressMethod = 'get') {
    // provide `defaultScope` fallback to avoid needing a constructor in subclasses
    this.selector = selector || (this.constructor as any).defaultScope;
    this.method = method;
  }

  getHtml(): Cypress.Chainable<any> {
    if (this.selector) {
      return cy[this.method](this.selector);
    }
    return cy.root();
  }

  scoped(cb) {
    return this.getHtml().within(() => {
      cb();
    });
  }

  should(chainers: string, value?: any, match?: any): Cypress.Chainable<any> {
    return cy.should.apply(this.getHtml(), arguments);
  }
}

export function visitable(url: string): () => Cypress.Chainable<Window> {
  return function() {
    return cy.visit(url);
  };
}

export function collection<P>(selector: string, ItemPage: new (selector: string) => P): (i: number) => P {
  return function(i) {
    return new ItemPage(`${this.selector || ''} ${selector}:eq(${i})`);
  };
}

export function bySelector(selector: string): () => Cypress.Chainable<any> {
  return function() {
    return this.scoped(() => {
      cy.get(selector).first(); // return only the first for consistency with other by* selectors
    });
  };
}

export function byTestId(testId: string): () => Cypress.Chainable<HTMLElement> {
  return function() {
    return this.scoped(() => {
      cy.getByTestId(testId);
    });
  };
}

// use in cases where 0 is ok
export function allByTestId(testId: string): () => Cypress.Chainable<HTMLElement[]> {
  return function() {
    return this.scoped(() => {
      cy.queryAllByTestId(testId);
    });
  };
}

// allows partial matches https://docs.cypress.io/api/commands/contains.html
export function byText(text: string | RegExp): () => Cypress.Chainable<HTMLElement> {
  return function() {
    return this.getHtml().contains(text);
  };
}
