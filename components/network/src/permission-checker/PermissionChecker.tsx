import React, { useContext, FunctionComponent } from 'react';

import { checkPermission } from './permissionUtil';
import { RolePermissionGrant } from './permissionTypes';

import { PermissionsContext, PermissionsContextProps } from './PermissionManager';

type PermissionCheckerProps = {
  /** Name of permission to check for current user. */
  permission: RolePermissionGrant;
  /** The id to check if current user has access to. Usually an employee id. */
  id?: number;
  /** If true, render content if user does not have permission */
  isNegated?: boolean;
};

const PermissionChecker: FunctionComponent<PermissionCheckerProps> = props => {
  const permissionsContext = useContext<PermissionsContextProps>(PermissionsContext);
  const { permissionsLoaded, permissions } = permissionsContext;
  if (!permissionsLoaded) {
    return null;
  }

  const { permission, id, isNegated } = props;

  const hasPermission = checkPermission(permissions, permission, id);
  const shouldRender = isNegated ? !hasPermission : hasPermission;

  if (shouldRender) {
    return <>{props.children}</>;
  }

  return null;
};

export default PermissionChecker;
