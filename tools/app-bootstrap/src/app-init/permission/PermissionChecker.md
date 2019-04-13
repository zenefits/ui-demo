Component that only renders children if user has specified permission/access.

#### Examples

```jsx static
<PermissionChecker permission="download_benefits_reports">
  <Button>Download report</Button>
</PermissionChecker>
```

Use the `id` prop to check if the user has permission to access to that object (usually employee):

```jsx static
const employeeId = 123;
<PermissionChecker permission="view_employee_profile" id={employeeId}>
  <Button>View profile</Button>
</PermissionChecker>;
```

#### Implementation Notes

Permissions are stored in redux during `AppInit`, so the store must be available.

Should you need to refresh permissions after app load, you can do so with the `withPermissions` higher-order component, which exposes the function `refetchPermissions` as a prop.

#### Related

- `SwitchChecker` does the same but for switches
- `FeatureChecker` does the same but for features
