We use [Cypress](http://cypress.io/) to write and run our Acceptance Tests. Cypress drives Chrome or Chrome like
browsers. You can find examples of cypress spec under `cypress/no-backend` inside all apps.

The [Cypress docs](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) are well written and
highly recommended. This guide focuses on how we use Cypress at Zenefits.

### Testing workflow

To run the tests locally start your app (`yarn start`) and run `yarn cy:open`.

While writing tests, you can add `.only` (eg `it.only`) to only run a single test. Changes to Cypress files
will do a hot-reload and rerun the tests, but code changes may not. In that case, just refresh the page.

For debugging, you may find [`.pause()`](https://docs.cypress.io/api/commands/pause.html) and
[`.debug()`](https://docs.cypress.io/api/commands/debug.html) useful. The standard browser dev tools are also available,
of course.

### Follow the page object pattern

We use [page objects](https://martinfowler.com/bliki/PageObject.html) to encourage maintainable tests. When pages
(or parts of pages) inevitably change, we then only need to change selectors etc in a single place.

See [MeetingSpacePage.ts](https://github.com/zenefits/z-frontend/blob/master/apps/talent/cypress/no-backend/MeetingSpacePage.ts)
for a sample page object.

To make page objects succinct, we have several helpers like `visitable` and `byTestId` which are small wrappers
around Cypress that also include scoping so that we can test a single part of the page. For example,
`cy.contains('Delete')` will search anywhere on the page, whereas a method like `getDeleteButton = byText('Delete')`
will be scoped by the page object (if a scope is specified).

Cypress typically waits until it finds an item you select or else fails. When it's ok for something not to exist,
you can use the `allByTestId` helper.

### Selectors

Cypress provides so many options that it can be overwhelming. In our acceptance tests, we prefer to select from the
user's perspective so we have more confidence in our tests. From most preferred to least:

- `getByLabelText` (for form elements)
- `getByText` (or `contains`)
- `getByTestId`
- `get`

We have added [cypress-testing-library](https://testing-library.com/docs/cypress-testing-library/intro) to accomplish
this. You won't find these in the main Cypress documentation but our autocomplete includes them.

### Assertions

Cypress has a lot of default assertions, so even when you're not explicitly asserting something exists,
Cypres does that under the hood.

Here are some common assertions:

```ts
page.getFoo().should('contain', 'text'); // accepts substrings
page.getFoo().should('have.text', 'text'); // accepts only exact string
page.getFoos().should('have.length', 1);
page.getBar().should('not.exist'); // retried until does not exist
```

In some cases, the `.should` will be done in a page object. So your test may simply be `followup.isDone()` with
something like `isDone() { return this.getDoneCheckbox().should('be.checked'); }`.

### What to acceptance test?

You don't need to test everything: there are diminishing returns as test coverage increases.
Tests need to be maintained, after all.

Here are some general guidelines:

- Focus on primary use cases from users.
- Prefer interactions that a user could actually do as opposed to backdoors. (But you only need to test these once, eg
  there's no need to actually login every time.)
- Do not test what individual components do. They have their own tests. For example, there's no need to test that
  clicking a checkbox makes the checkbox become checked.
- Do not test specific CSS, especially at the component level. We have visual regression tests for what components
  should look like.
