To keep our codebase consistent, we have strict guidelines on how to write
components. Most of these come from the React community, but some are more
opinionated.

We enforce these practices with linting (where possible) and during PR review.

### Accessibility

It is important that our components work for all users. This includes being easily navigable by keyboard (eg `Modal`)
and supporting screen readers (eg `alt` on `Avatar`).

We have more work to do here, but it's important to keep this in mind when building components.

### Documentation <a name="component-docs"></a>

A platform component is not considered complete until it is documented within our design system at
[ui.zenefits.com](http://ui.zenefits.com). Having solid docs with live examples improves discoverability and
reuse and ultimately accelerates both designers and engineers.

Documenting a new component is straightforward:

1.  Make sure your component's prop types are documented `/** like this */`
1.  Add a `<ComponentName>.md` file in the same directory as your component using [this docs template](https://github.com/zenefits/z-frontend/blob/master/docs/component-docs-template.md)
1.  Fill in the template
1.  Double check that the component is exported from the package (usually from a file called `index.ts`) and that [`styleguide.config.js`](https://github.com/zenefits/z-frontend/blob/master/apps/styleguide/styleguide.config.js) has a corresponding section.
1.  `cd apps/styleguide` and `yarn start`

See [`Avatar.tsx`](https://github.com/zenefits/z-frontend/blob/master/components/elements/src/image/avatar/Avatar.tsx) and [`Avatar.md`](https://github.com/zenefits/z-frontend/blob/master/components/elements/src/image/avatar/Avatar.md) for a complete example. Note how it is exported from [`index.ts`](https://github.com/zenefits/z-frontend/blob/master/components/elements/index.ts).

The design system site is built with [React Styleguidist](https://github.com/styleguidist/react-styleguidist/). Documentation tends to fall out of date, which is why we use live examples and auto-generated props.

### Component structure

#### Function vs class

There are two ways to write components in React: [a function or a class](https://reactjs.org/docs/components-and-props.html#functional-and-class-components).

We always use class components because:

- consistency reduces friction (eg, is it `props` or `this.props`?)
- they support state and lifecycle methods
- it's a pain to convert functional components to a class later
- it forces us to use better types
- there's no performance difference

Further reading: [7 Reasons to Outlaw React’s Functional Components](https://medium.freecodecamp.org/7-reasons-to-outlaw-reacts-functional-components-ff5b5ae09b7c)

The only exception are styled components and small, internal subcomponents that are not exported.

#### HOCs vs render props

In some cases, component logic should be shared among multiple components. There are multiple ways to accomplish
this with React, including [HOCs](https://reactjs.org/docs/higher-order-components.html)
and [render props](https://reactjs.org/docs/render-props.html).

We favor using render props (see, for example, [OverviewLayout](https://github.com/zenefits/z-frontend/blob/master/components/layout/src/overview/OverviewLayout.tsx)). For cases
where we need to wrap the whole component, we build an HOC on top of the render props implementation.
The default way to write render props is using FaCC (Function as Child Component).

#### JSX chunks

In cases where you have chunks of JSX, it's preferable to make them components.

For example, instead of:

```jsx static
const employeeButton = (
  <Button.RouteLink mode="primary" to={'/reviews'}>
    See All Reviews
  </Button.RouteLink>
);

// ...

return <Box>{employeeButton}</Box>;
```

use:

```jsx static
const EmployeeButton = () => (
  <Button.RouteLink mode="primary" to={'/reviews'}>
    See All Reviews
  </Button.RouteLink>
);

// ...

return (
  <Box>
    <EmployeeButton />
  </Box>
);
```

### Size

One of the strengths of React is composition, so we embrace it. Having small, cohesive components that follow the Single
Responsibility Principle helps with readability, maintainability and testability.

If your component file has grown to hundreds of lines of code, it's a strong signal to start extracting pieces to
separate components and use composition. It's totally fine to have a component that is used in a single place:
just extract it and put it into a `components` folder next to your page module as shown [here](https://github.com/zenefits/z-frontend#example).

This is different from how we've been doing it in Ember, where we usually componentize only when we need to actually
reuse something, and where files grow ~3x slower because page logic is separated to 3 files (route, controller, template).

See this [componentizing tutorial](https://reactjs.org/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy)
for a nice walk-through of the process.

#### Subcomponents

For components that naturally consist of multiple parts, it can be useful to export those parts under a single
common component. For example, the `Card` component consists of `Card.Header`, `Card.Row` and `Card.Footer`.

See [Card.tsx](https://github.com/zenefits/z-frontend/blob/master/components/layout/src/card/Card.tsx) for how this is accomplished using `static`.

### Exports

Stick to one component per source file for readability, maintainability and ease of testing. It should be exported as the default export.

The main exception is small, internal styled components. These are fine to leave in the same file.

If the component's types are useful elsewhere, provide them as a named export in the format `<ComponentName>Props`.

### Form components

Form components are typically structured as two individual components.

The first is just the underlying input, and knows nothing about which form library we're using (just communicates via props like `value` and `onChange`). For example: [Checkbox](https://github.com/zenefits/z-frontend/blob/master/components/forms/src/checkbox/Checkbox.tsx). Stories for this component focus on its various states. _This should generally not be exposed to apps._

Wrapping this component is an adapter that connects it to our form library of choice. For example: [Form.Checkbox](https://github.com/zenefits/z-frontend/blob/master/components/forms/src/formik/checkbox/FormCheckbox.tsx). It needs to be present on both `Form.tsx` and `forms/index.ts`. Stories focus on form concerns, like initial values and validation. This component _is_ exposed.

See [Forms](http://ui.zenefits.com/#!/Form) for more context.

### Naming

Use PascalCase for component names, eg `DateTimeText`. This is [a React convention](https://reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized),
and also reflects that components are classes. The filename should exactly match the name of the contained component, eg `DateTimeText.tsx`.

For package and folder names, use kebab-case instead, eg `date-time-text/DateTimeText.tsx`. This helps to avoid issues
with case sensitivity in directory structures.

### Props

Props should always have a type. See [Types](#component-types) for more details.

Use the following guidelines when choosing a name for a prop:

- avoid short, abbreviated names (be explicit)
- for arrays, use plural nouns (`buttons`)
- for booleans, prefix with `is`, `has`, `can` or `should` (`isVisible`, `hasError`, `canToggle`, `shouldSpin`)
- name from the perspective of the component and _what_ it does, not why (eg `isCompactLayout` not `isMobileScreen`)

Use `defaultProps`, not default function parameters, to set intelligent prop defaults. This improves readability
and can also be parsed by our documentation tools. For example:

```jsx static
class Button extends Component<ButtonBasicProps> {
  static defaultProps: ButtonBasicProps = {
    mode: 'normal',
    s: 'medium'
  };
  ...
}
```

Components should also support standard HTML events and attributes where it makes sense. For example, `autofocus` and `onClick` on `Input`. This usually just means passing through the appropriate props.

It is sometimes tempting to include props for features that may be needed in the future, but in general this is a bad
idea because:

- predicting the future is hard
- [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) principle
- extra props adds complexity

### Styles

Zenefits [platform components](http://ui.zenefits.com) are designed to cover the majority of uses cases, and often
include props that make custom CSS unnecessary (eg `<TextBlock bold>` and `<Box p={3}>`).

When those are not sufficient, we use [styled components](https://www.styled-components.com) (not inline styles or
class names) to apply CSS. Wherever possible, we use values from [our theme](https://github.com/zenefits/z-frontend/blob/master/components/theme/src/web/theme.tsx)
to enforce consistency. The helpers at `z-frontend-theme/utils` make this easy for colors, heights, space, depth, etc.

[More details](http://ui.zenefits.com/#!/Attributes)

### Tests

A platform component is not considered complete until it has tests.
Similarly, it's important to include stories (eg [Card.stories.tsx](https://github.com/zenefits/z-frontend/blob/master/components/layout/src/card/Card.stories.tsx))
to serve as visual test cases.

See the [testing guide](http://ui.zenefits.com/#!/Testing) for more details on testing.

### Types <a name="component-types"></a>

If you're new to Typescript, [this lighting talk](https://www.youtube.com/watch?v=rJTzA6ohHQA) provides a succinct overview.

In React documentation or guides, you may see `PropTypes`. We use Typescript instead, which gives us even more control.

Components **must** define types for props and state. The convention is to name the types `<ComponentName>Props` and
`<ComponentName>State`.

```typescript static
type ObscureToggleProps = {
  /** What does the value represent? eg 'ssn' for Social Security Number. */
  valueType: string;
};

type ObscureToggleState = {
  isObscured: boolean;
};

/**
 * A component that obscures sensitive data and includes a reveal toggle.
 */
class ObscureToggle extends Component<ObscureToggleProps, ObscureToggleState> {
  ...
}
```

Type names should always be PascalCase, whether using interface/type/enum (even GraphQL types).
We prefer using `type` instead of `interface` for Props and State.

We rarely use the `declare` keyword, which is merely a hint for the Typescript compiler that a Javascript variable
or class has been defined elsewhere. It is not useful for separate Typescript types or interfaces.

Useful component types:

- include helpful [jsdoc descriptions](https://react-styleguidist.js.org/docs/documenting.html#using-jsdoc-tags), as in the above example
- are as strict as possible (avoid `any`)
- allow common zbase util props (eg, `BoxProps &`)

For GraphQL types, note that some are generated automatically:
https://github.com/zenefits/z-frontend/blob/master/tools/yp-schema/README.md
