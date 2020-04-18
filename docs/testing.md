### Frontend Testing Levels

For the purposes of frontend testing we have defined 4 different levels. These might not be the same as what you have used in the past, but we will use the following terminology at Zenefits.

- Unit Tests: test a single unit, normally a function, class or module in isolation
- Integration Tests: test more than one unit at a time
  - Component Test: this is a special type of integration test
- Acceptance Tests: they test from the point of view of the end user, but without hitting the backend.
- E2E Acceptance Tests: this covers all layers, starting with the UI from the perspective of the end user just like acceptance tests, but they hit backend services and the database. _NOTE:_ currently we don't have good support for this type of test, but we plan to use Functionize soon. If you need it now, please reach out.

**Coming from Ember**

- Unit, Integration and Component Integration Tests aren't widely used, but we support them and we should be using them more.
- Acceptance Tests aren't widely supported in our Ember setup except for level-funding and style-guide.
  Mocking the backend makes it specially challenging.
- E2E Acceptance Tests are what we write from Glue as well as Functionize.

Everyone that worked with Ember Acceptance Tests (Glue tests included) likely experience the pain of promise chaining.
While this was fixed in newer versions of Ember (not yp3), this won't be an issue in Cypress. See
[Commands and Promises](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Commands-Are-Not-Promises)
for more information.

#### Simple Component Test - Just do it!

A quick "smoke test" that mounts your component provides enormous value for a small time investment. At the very
least, this tests that nothing throws during rendering.

```js static
it('should render without throwing an error', () => {
  const { getByText } = renderWithContext(<MyComponent>hi</MyComponent>);
  getByText('hi');
});
```

#### Component Tests

We use [@testing-library/react](https://github.com/testing-library/react-testing-library) for rendering React components during tests. [Introducing React Testing Library](https://blog.kentcdodds.com/introducing-the-react-testing-library-e3a274307e65) is a good starting point. Here's an example from [their docs](https://github.com/testing-library/react-testing-library#example):

```js static
import React from 'react';
import { render, Simulate, wait } from '@testing-library/react';

test('Displays the greeting when load-greeting is clicked', async () => {
  // Arrange
  const { getByText, getByTestId } = render(<MyComponent />);

  // Act
  Simulate.click(getByText('Load Greeting'));

  // let's wait for our mocked `get` request promise to resolve
  // wait will wait until the callback doesn't throw an error
  await wait(() => getByTestId('greeting-text'));

  // Assert
  getByText('hello there');
  expect(getByTestId('ok-button')).toHaveAttribute('disabled');
});
```

1.  We import the necessary dependencies
1.  Call `render` and extract getByText and getByTestId
1.  Simulates a click and waits for some "async" behavior
1.  Verify the updated text. Calling `getByText` fails if we can't find the text. `getByTestId` finds a button with a `data-testid` attribute of `ok-button`, then we check that it's disabled.

We have some helpers to make writing tests with `@testing-library/react` even easier:

- `renderWithContext` to include our theme and intl contexts (required by many or our components)
- [user-event](https://github.com/testing-library/user-event) for more convenient and realistic user interactions (eg typing)
- [jest-dom](https://github.com/testing-library/jest-dom) for easier DOM assertions like `toBeDisabled`

#### Acceptance Tests

We use Cypress to write and run our Acceptance Tests. See our [Cypress guide](#!/Cypress) for more information.

#### What to test?

You don't need to test everything: there are diminishing returns as test coverage increases. Tests need to be
maintained, after all. Keep in mind the following guidelines when deciding what to test:

1.  Always test the public interface

    - What is rendered?
    - What do you do with received props?
    - What events do you care about?

1.  Only test concerns of your specific component

    - Hence the _unit_ in _unit testing_. Leave other matters up to sub-components and/or the libraries in use.
    - You may want to verify you're passing the right props to sub-components.

1.  Avoid duplicating the code under test

    - Leads to brittle tests that need a lot of maintenance and may fall out of sync
    - For example, testing styles often requires duplicating them (but dynamic styles are probably still worth it)

#### Testing CSS

Most of the time, testing CSS is overkill. But when styles vary based on props, it's worth testing.
Styled-components make this somewhat difficult (the styles are not inlined) but you can use
[`toHaveStyleRule()`](https://www.styled-components.com/docs/tooling#tohavestylerule) as follows:

```js static
import 'jest-styled-components';

it('should respect util props', () => {
  const mounted = mount(<Avatar mt={123} />);
  expect(mounted).toHaveStyleRule('margin-top', '123px');
});
```

### Additional Frontend Testing Tools

We have lots of tools at our disposal. Each has its place.

#### Typescript

Static typing helps prevent errors at compile time. You might not think of this as testing, but [Typescript](https://www.typescriptlang.org/)
is estimated to catch [about 15% of bugs](http://ttendency.cs.ucl.ac.uk/projects/type_study/documents/type_study.pdf).

#### Linters

Linting also helps by preventing common typos etc. We use a variety of linters:

- [tslint](https://palantir.github.io/tslint)
- [eslint](https://eslint.org)
- [stylelint](https://github.com/stylelint/stylelint)

#### Storybook

[Storybook](https://storybook.js.org) helps to document your component and also produces visual test cases.
If you have a storybook per component, and a story for each state, you can quickly scan through all the various states.
It's also helpful to include some stories that cover multiple states, eg various sizes or colors together.

Our complete storybook is hosted at [http://ui.zenefits.com/app/stories]. Whenever a PR affects a package, the relevant stories are run through visual regression testing using a tool called [Chromatic](https://www.chromaticqa.com).

#### Snapshots

Snapshots provide a serialized, diffable dump of your component ([example](https://github.com/zenefits/z-frontend/pull/389/files#diff-4f3bf4b73fe3b5251fa343024b939b49)).
They're useful to make sure unexpected changes don't happen. Unfortunately, they render everything, even sub-components, tend to change frequently and be relatively brittle, so we **mostly don't use snapshots**.

#### Reading

- [Testing workshop](https://github.com/kentcdodds/testing-workshop/blob/master/INSTRUCTIONS.md#setup)
- [Write tests. Not too many. Mostly integration.](https://blog.kentcdodds.com/write-tests-not-too-many-mostly-integration-5e8c7fff591c)
