Component that only renders children if user has specified permission/access.

#### Examples

```jsx static
<SwitchChecker switch="talent_international">
  <Box>Only display me if talent_international switch is active</Box>
</SwitchChecker>
```

#### Implementation Notes

Switches are stored in redux during `renderApp` in index.tsx, so the store must be available. All the switches the app needs must be specified in the `renderApp` options.

```js static
renderApp({
  ...,
  switchesToLoad: ['talent_international'],
})
```

The name of the switch that your app is using must be added to the `Switches` type in
`z-frontend/tools/app-bootstrap/src/app-init/switches/switchesRedux.ts`.
If a particular switch name in not listed on that type, you must update the type before using
passing it to the `renderApp` and before using the `SwitchChecker` component.

In order for the SwitchChecker component to work, your app's reducer must
be wrapped in a `addSwitchesReducer` call.

```jsx static
import { reducer } from 'redux-form';
import { addSwitchesReducer } from 'z-frontend-app-bootstrap';

const reducers = {
  // other app reducers
};

export default addSwitchesReducer(reducers);
```

#### Related

- `PermissionChecker` does the same but for Permissions
- `FeatureChecker` does the same but for features
