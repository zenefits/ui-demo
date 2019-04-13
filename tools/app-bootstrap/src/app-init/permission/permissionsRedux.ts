import { Permissions } from './permissionTypes';

const SET_PERMISSIONS = 'SET_PERMISSIONS';
const MARK_AS_LOADING = 'MARK_AS_LOADING';

interface PermissionsState {
  loaded: boolean;
  values: Permissions;
}

export interface ReduxStateWithPermissions {
  permissions: PermissionsState;
}

interface ActionResult {
  type: string;
  payload?: Permissions;
}

export const setPermissionsAction = (permissions: Permissions): ActionResult => ({
  type: SET_PERMISSIONS,
  payload: permissions,
});

export const markPermissionsAsLoadingAction = (): ActionResult => ({ type: MARK_AS_LOADING });

const defaultState = { loaded: false, values: {} };

function permissionsReducer(state: PermissionsState = defaultState, action: ActionResult): PermissionsState {
  if (action.type === SET_PERMISSIONS) {
    return {
      ...state,
      loaded: true,
      values: {
        ...(action.payload || {}),
      },
    };
  }
  if (action.type === MARK_AS_LOADING) {
    return defaultState;
  }
  return state;
}

export default function addPermissionsReducer(reducersMap: any): (typeof reducersMap) & { permissions: any } {
  if (reducersMap.permissions) {
    throw new Error('permissions key is already defined');
  }
  const newMap = {
    ...reducersMap,
    permissions: permissionsReducer,
  };
  return newMap;
}
