A window with toggleable drawers and optional header bar

#### Usage

- Can be used when a drawer or top toolbar needs to be associated to a specific subview
- Should NOT be used to manage global drawers or nav bars

#### Examples

```jsx noeditor
<StorybookExample selectedKind="layout|DrawerWindow" selectedStory="default" />
```

#### Implementation Notes

The JSX wrapped by this component should be a render prop function.
The argument to the function will be an object with control functions for both of the two possible contained drawers. The control functions are the following:

- open: opens drawer
- close: closes drawer
- toggle: toggles open state of drawer.

The render prop function should return a React fragment that wraps any of the following elements:

- `DrawerWindow.Header`
- `DrawerWindow.LeftDrawer`
- `DrawerWindow.RightDrawer`
- `DrawerWindow.MainContent`

At most one of these components should be used, and only in the order they are
listed here. Any of the components may be omitted except for the
DrawerWindow.MainContent component.

The display state for these components will be managed internally. There is no need to pass any props
or do any conditional JSX rendering.  
When using the DrawerWindow.LeftDrawer and DrawerWindow.RightDrawer components, a label prop must be passed to describe the component for assistive technology software. Optionally, the `includeHeader` prop may be
passed to include a header for the drawer using the label prop.

#### Related

- [TopNavBar](#!/TopNavBar) The top fixed menu
