To promote consistency and maintainability, our theme includes a list of predefined depths.

```jsx noeditor
<DepthGuide />
```

During development, we refer to these depths using a utility function, `depth`. Our depths use a combination of border and box-shadow.

Common Usage:

- Depth 0: Mostly used for cards and other elements on a background
- Depth 1: Mostly used for popovers, menus, and other elements that might appear above depth 0 elements
- Depth 2: Mostly used for modals and highest elements on screen
- Header: Only used for the header (TopNavBar) component

```js static
import { depth } from 'z-frontend-theme/utils';

const MyComponent = styled.div`
  ${depth(0)};
`;
```
