Zenefits uses a predefined color palette which we refer to by key (eg "Primary A" or, in code, `primary.a`).

```jsx noeditor
<ColorGuide />
```

During development, we refer to these colors using a utility function:

```js static
import { color } from 'z-frontend-theme/utils';

const MyComponent = styled.div`
  color: ${color('primary.a')};
`;
```

To promote consistency and maintainability, _only_ these colors are available. This is enforced by [types](https://github.com/zenefits/z-frontend/components/theme/src/colors.ts) and [linting](https://github.com/zenefits/z-frontend/blob/master/.stylelintrc.js).

We strive to meet [WCAG 2 contrast requirements](https://www.w3.org/TR/WCAG20/#visual-audio-contrast) so that all users can use Zenefits comfortably.
