// eslint-disable-next-line import/no-unresolved
import componentStatus from '../../docs/componentStatusObject.json';

const components = Object.keys(componentStatus); // .slice(109, 160);
console.log(`found ${components.length} to test`);

const skipList = [
  // do not exist
  'SearchSelectDeprecated',
  'SearchInputDeprecated',

  // just testing if these are causing some weird issue
  // could be related to <FigmaFile>?
  // maybe we need to allow cross-origin iframe https://docs.cypress.io/guides/guides/web-security.html#Disabling-Web-Security
  'FormCheckboxGroup',
  'Modal',
  'Form',

  // Not really a component
  'useQueryWithProgress',
];

const oneSecond = 1000;

// const appUrl = 'http://ui.zenefits.com';
const appUrl = 'http://localhost:6060';

Cypress.config({
  baseUrl: appUrl,
  numTestsKeptInMemory: 0, // help avoid "We detected that the Chromium Renderer process just crashed"
  pageLoadTimeout: 100 * oneSecond,
  execTimeout: 110 * oneSecond,
  responseTimeout: 70 * oneSecond,
});

const filteredComponents = components.filter(component => {
  return !skipList.includes(component);
});

describe('ui.zenefits.com', () => {
  before(() => {
    cy.visit(appUrl);
  });

  it('all components are present in table of contents', () => {
    cy.findAllByTestId('TableOfContentsSection').within(() => {
      filteredComponents.forEach(component => {
        cy.contains(new RegExp(`^${component}$`));
      });
    });
  });

  filteredComponents.forEach(component => {
    describe(`component page - ${component}`, () => {
      before(() => {
        cy.visit(`#!/${component}`);
      });

      it(`no broken storybook examples - ${component}`, () => {
        cy.get('[data-testid="StorybookExample"]').should($iframes => {
          // if there are embedded storybook examples...
          if ($iframes.length) {
            $iframes.each((i, $iframe) => {
              cy.wrap($iframe, { timeout: 10 * 1000 }) // loading can take time if many examples
                .should('not.have.class', 'StorybookExample-loading')
                .and('not.have.class', 'StorybookExample-error');
            });
          }
        });
      });

      it(`no broken inline examples - ${component}`, () => {
        // SyntaxError, TypeError, etc in "View Code" examples
        cy.queryAllByTestId('PlaygroundRenderer').should($playgrounds => {
          if ($playgrounds.length) {
            console.log(`${component} - found ${$playgrounds.length} playgrounds`);
            $playgrounds.each((i, $playground) => {
              expect($playgrounds.text()).to.not.contain('Error');
            });
          }
        });
      });
    });
  });
});
