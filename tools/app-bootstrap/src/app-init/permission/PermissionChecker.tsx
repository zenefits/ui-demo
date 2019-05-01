import { Component } from 'react';

import { Permissions, RolePermissionGrant, RolePermissionSpanType } from './permissionTypes';
import withPermissions, { WithPermissionsProps } from './withPermissions';

interface OwnProps {
  /** Name of permission to check for current user. */
  permission: RolePermissionGrant;
  /** The id to check if current user has access to. Usually an employee id. */
  id?: number;
  /** If true, render content if user does not have permission */
  isNegated?: boolean;
}

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

  const grants = currentUserPermissions.grants[requestedPermission] || new Set();
  return new Set(
    [...grants].reduce((idSet, grantValue) => {
      const spanKey: RolePermissionSpanType = grantValue[0];
      const spanIndex = grantValue[1];
      return idSet.concat(((currentUserPermissions.spans || {})[spanKey] || {})[spanIndex]);
    }, []),
  );
}

class PermissionChecker extends Component<OwnProps & WithPermissionsProps> {
  render() {
    const { permissionsLoaded, permissions, permission, id, isNegated } = this.props;
    if (!permissionsLoaded) {
      return null;
    }

    const hasPermission = checkPermission(permissions, permission, id);
    const shouldRender = isNegated ? !hasPermission : hasPermission;

    if (shouldRender) {
      return this.props.children;
    }
    return null;
  }
}

export default withPermissions<OwnProps>()(PermissionChecker);
