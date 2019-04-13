We use Storybook extensively for development, visual testing, and documentation (see [Examples](#!/Examples)).

If you're not familiar with Storybook, [learnstorybook.com](https://www.learnstorybook.com) makes a great introduction.

### Name consistently

Name stories consistently with their associated component: `MyComponent.tsx` and `MyComponent.stories.tsx`

Use the exact component name to group the stories together:

<!-- prettier-ignore-start -->
```jsx static
import { storiesOf } from '../../.storybook/storyHelpers';

stories('package|MyComponent', module)
```
<!-- prettier-ignore-end -->

The `package` above must match the package name. It groups all stories together into a section in the sidenav.

### Stay organized

Keep `*.stories.tsx` files in the same directory as the component.

Within each `*.stories.tsx` file, try to keep the "table of contents" tidy and near the top. Extract complex
examples into their own component and place them below.

```jsx static
storiesOf('MyComponent', module)
  .add('loading', () => <LoadingExample />)
  .add('empty', () => <EmptyExample />);

class LoadingExample extends Component {
  // ...
}
```

Be careful extracting examples to external files: the [Storysource addon](https://github.com/storybooks/storybook/tree/next/addons/storysource) will not be able to show their source.

### Focus on what matters

Think of stories as visual test cases:

- cover key use cases (like loading, empty, active)
- cover edge cases (such as long user input)
- try to keep the story code small and focused

Typically, you'll want one instance of a component per story. This makes it easy to flip through them
(protip: there are keyboard shortcuts). But see the next point about visual testing.

### Keep visual testing in mind

During CI, a screenshot is captured for each story by Chromatic. See ([this Article snapshot](https://www.chromaticqa.com/snapshot?appId=5b3b13656e879e0024542ef7&id=5c5ba8ba67f6b800243e14b5)), for example. To make the most of this:

- sometimes it's valuable to have multiple components rendered in 1 story (eg to show `size` prop)
- consider including revealed content (eg tooltips) even without user interaction
- capture mobile screenshots with `setViewports()`
- use factories to create (consistent!) dummy data where necessary - avoid `Math.random()` and `new Date()`

### Use decorators

If your component is normally inside a [Card](#!/Card) or something similar, you can use the `paddedBox` decorator:

```jsx static
import { paddedBox } from 'z-frontend-storybook-config';

storiesOf('MyComponent', module).addDecorator(paddedBox);
```

Many decorators are configured behind-the-scenes to provide context that components expect (eg `react-router`, `intl`,
`redux`, `apollo`). See `setupStorybook()` for details.
