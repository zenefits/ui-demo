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

- `findByLabelText` (for form elements)
- `findByText` (or `contains`)
- `findByTestId`
- `get`

We have added [@testing-library/cypress](https://testing-library.com/docs/cypress-testing-library/intro) to accomplish
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

### Known limitations

- Render and Hide do not work as expected because of [an issue with window.watchMedia](https://github.com/cypress-io/cypress/issues/970#issuecomment-509417413). For example, our `max-width` media queries always return true so the mobile display takes effect.

### Mocking Graphql

For no-backend tests we need to mock our graphql server for pages to operate correctly.

#### Getting started

To get started just add this to a `beforeEach` block:

```js static
setupMockGraphql({});
```

That's it! By default all of your graphql queries will now succeed with randomly generated data. Under the covers we use [apollo mocking tools](https://www.apollographql.com/docs/apollo-server/features/mocking) to do the heavy lifting.

#### Customizing mocks

For most tests you'll usually need to customize the data returned from graphql. You can do this by overriding resolvers at 2 levels (with decreasing precedence):

1. At the field level

```js static
setupMockGraphql({
  Query: () => {
    getThing: () => {
      thing: {
        foo: 'bar';
      }
    };
  },
});
```

2. At the type level (see `schemaTypes.ts`). Unless overloaded by a field resolver all `Thing` types will now use this resolver:

```js static
setupMockGraphql({
   Thing: () => ({
    thing: {foo: 'bar'}
 }));
```

Your resolver has access to all the arguments that a resolver would have. [Read more](https://www.apollographql.com/docs/apollo-server/features/mocking#customizing-mocks)

When a union type is involved (eg `type PlanProperties = MedicalPlanDetails | DentalPlanDetails`), you will need to specify the type of the result for the mocking to work correctly. [Example](https://github.com/zenefits/z-frontend/pull/7735/files#diff-891b37a8bfe8105be5cb0b403a2957d7R172)

#### Mocking mutations

Mutations are a bit of a special case due to challenges presented by caching. If you fetch an entity and mutate it (after some user action) we would expect the data to update on screen, right? This will only work if the ids of the data returned by our mutation match the ids in the initially returned data.

To make this easier we've implemented a [mockMutation](https://github.com/zenefits/z-frontend/blob/master/tools/yp-schema/mockUtils.ts) utility which will fetch the existing data out of the cache and allow us to update just the fields that are necessary for the test.

```js static
import { Mutation } from './schema/schemaTypes';

// This returns a resolver that can be added to your mocks
mockMutation <
  Mutation['mutation'] >
  // We use this function to get an id to use to fetch the entity out of the cache. It should be an id for the type returned by the mutation
  (args => args.id,
  // This function operates on data fetched from the cache and allows for updates to be made
  // Note that the update function should treat the data as mutable (no return necessary).
  dataFromCache => {
    dataFromCache.foo = 'bar';
    dataFromCache.bazList.push('');
  });
```

**There are scenarios where this approach won't work. For example:**

If my schema looks like:

```graphql
type Foo {
  id: ID
  bars: Bar[]
}
type Bar {
  id: ID
}

Mutation {
  deleteBar(id: ID!): Foo
}
```

This won't work since the mutation returns `Foo` but I don't have an id to fetch an object of type Foo out of the cache.

In this case we need to use a mock resolver for our mutation but just hardcode an id to be the same as the mock returned from the initial query.

#### Verifying mock calls

When we fire a mutation due to some user action it's often useful to verify that the mutation was fired with the correct arguments. By default all mutation resolvers are wrapped with a `spy()` so we can verify the arguments that they were called with.

```jsx static
it(function() {
  ...
  // queryMock is available on this as long as setupMock was called in beforeEach
  this.queryMock.verifyMutationCalledWithVariables('createThing', { thing: '' });

  // We can also provide a custom mather function
  this.queryMock.verifyMutationCalledWithVariablesMatcher('createOrUpdateMeeting', variables => variables.thing === 'foo');
})
```

**To access `queryMock` in this way you must use a normal function and not an arrow function as the `it` callback**
Otherwise you can use `cy.get` see [https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Sharing-Context](Cypress docs)

#### Generating data

It's often helpful to have some factories to generate consistent test data for specific types. We have a super simple MockFactory class which can be used as so:

```js static
import {Foo} from "./schema/schemaTypes"

// Provide some base
const fooFactory = new MockFactory<Foo>({
  thing: 'bar',
  other: 'baz',
});

// Extend the factory to add new fields or override
const fooFactory2 = fooFactory.extend({thing: 'foo', list: ['hello']});

// Fields can be computed!
const computedFactory = new MockFactory<Foo>({
  thing: 'bar',
  other: 'baz',
  computed: (props) => `${props.thing}:${props.other}`
});

// Use our factories to generate mocks
 setupMockGraphql({
     Foo: () => fooFactory.build({other: 'override'})
     // OR
     Foo: fooFactory.buildResolver({other: 'override'})
 });
```

**Remember that you only need to specify fields that you care about in your factory. Apollo will auto generate anything that you're missing**

### Overriding Default Configuration

By Default, Cypress uses configuration values as described in this [doc](https://docs.cypress.io/guides/references/configuration.html#Options)

Zenefits categorizes its UI tests into **`e2e`** and **`no-backend`**. The default configuration values can be overridden based on test environment using plugin file `cypress.json` at different levels :

1. **At Global Level:** The change(s) in configuration will be global with respect to test environment.

   - **`e2e:`** In order to override the configuration for all the `e2e` tests, use `cypress.json` under `tools/cypress/cypress/e2e`.

   - **`no-backend:`** In order to override the configuration for all the `no-backend` tests, use `cypress.json` under `tools/cypress/cypress/no-backend`.

2. **At App Level:** The change(s) in configuration will be specific to the app.

   - **`e2e:`** In order to override the configuration for all the `e2e` tests of an `app`, use `cypress.json` under `apps/<app-name>/cypress/e2e`.

   - **`no-backend:`** In order to override the configuration for all the `no-backend` tests of an `app`, use `cypress.json` under `apps/<app-name>/cypress/no-backend`.

**NOTE:**

1. `App` configuration will always supercede the `Global` configuration.
2. Overriding configuration in test file should be used in exceptional case only.
