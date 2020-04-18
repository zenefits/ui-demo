Component that renders or hides children depending on a switch.

#### Examples

```jsx static
<SwitchChecker switch="talent_international">
  <Box>Only display me if talent_international switch is on</Box>
</SwitchChecker>
```

Use `isNegated` to reverse the logic:

```jsx static
<SwitchChecker switch="talent_international" isNegated>
  <Box>Only display me if talent_international switch is off</Box>
</SwitchChecker>
```

#### Implementation Notes

Switches are fetched once in `renderApp` in index.tsx and available as React context (see `SwitchProvider`).

#### Related

- [PermissionChecker](#!/PermissionChecker)
