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

Permissions are fetched once on load and available as React context (see `PermissionManager`). They relate to roles and permissions, NOT
dashboard permissions.

Should you need to refresh permissions after app load, you can do so with `refetchPermissions`.

#### Related

- [SwitchChecker](#!/SwitchChecker)
