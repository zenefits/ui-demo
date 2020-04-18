import { Permissions, RolePermissionGrant, RolePermissionGrantValue, RolePermissionSpanType } from './permissionTypes';

// Quick permissions guide:
// `permission_xyz: null` - user has permission (grant does not require span)
// `permission_xyz: [["AE", 0], ["SE", 0]]` - user has permission to access ids in spans AE.0 and SE.0

// logic modified from zenefits/yourPeople3/component-library/addon/services/permissions.js
export function checkPermission(
  currentUserPermissions: Permissions,
  requestedPermission: RolePermissionGrant,
  id?: number,
): boolean {
  validateParameters(currentUserPermissions, requestedPermission, Boolean(id));

  if (id) {
    return computeAccessibleIds(currentUserPermissions, requestedPermission).has(id);
  }
  return (currentUserPermissions.grants || {}).hasOwnProperty(requestedPermission);
}

function validateParameters(
  currentUserPermissions: Permissions,
  requestedPermission: RolePermissionGrant,
  isParamProvided: boolean,
) {
  if (!currentUserPermissions.grants || !currentUserPermissions.grants.hasOwnProperty(requestedPermission)) {
    return false;
  }
  const requestedTakesParam = Boolean(currentUserPermissions.grants[requestedPermission]);
  if (requestedTakesParam !== isParamProvided) {
    const message = isParamProvided ? 'does not take a parameter' : 'requires a parameter';
    throw new Error(`PermissionParameterMismatch: ${requestedPermission} ${message}`);
  }
}

function computeAccessibleIds(
  currentUserPermissions: Permissions,
  requestedPermission: RolePermissionGrant,
): Set<number> {
  // Quick check on the current user permissions.
  if (!currentUserPermissions.grants || !currentUserPermissions.grants.hasOwnProperty(requestedPermission)) {
    return new Set();
  }

  const grants = currentUserPermissions.grants[requestedPermission] || new Set<RolePermissionGrantValue>();
  return new Set(
    [...grants].reduce((idSet, grantValue) => {
      const spanKey: RolePermissionSpanType = grantValue[0] as RolePermissionSpanType;
      const spanIndex = grantValue[1];
      return idSet.concat(((currentUserPermissions.spans || {})[spanKey] || {})[spanIndex]);
    }, [] as number[]),
  );
}
