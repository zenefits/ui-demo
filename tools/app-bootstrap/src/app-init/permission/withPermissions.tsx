import { ComponentType } from 'react';
import { connect, Dispatch } from 'react-redux';
import gql from 'graphql-tag';

import { Permissions } from './permissionTypes';
import {
  getApollo,
  markPermissionsAsLoadingAction,
  setPermissionsAction,
  ReduxStateWithPermissions,
} from '../../../index';

export interface WithPermissionsProps extends ReduxAddedStateProps, ReduxAddedDispatchProps {}

interface ReduxAddedStateProps {
  permissions: Permissions;
  permissionsLoaded: boolean;
}

interface ReduxAddedDispatchProps {
  refetchPermissions: () => any;
}

const permissionsRefreshQuery = gql`
  query PermissionsRefreshQuery {
    rolesPermissionsData {
      grants
      spans
    }
  }
`;

interface QueryResult {
  rolesPermissionsData: {
    grants: { [key: string]: any };
    spans: { [key: string]: any };
  };
}

function refetchPermissions(dispatch: Dispatch<any>) {
  return () => {
    dispatch(markPermissionsAsLoadingAction());
    return getApollo()
      .query<QueryResult>({
        query: permissionsRefreshQuery,
        fetchPolicy: 'network-only',
      })
      .then(result => {
        if (!result.data) {
          throw new Error('permissions refetch failed'); // promise rejected
        }
        const permissions = result.data.rolesPermissionsData || {};
        dispatch(setPermissionsAction(permissions));
        return true;
      });
    // let error pass through to caller to handle as appropriate
  };
}

function mapStateToProps(state: ReduxStateWithPermissions): ReduxAddedStateProps {
  return {
    permissions: state.permissions.values,
    permissionsLoaded: state.permissions.loaded,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): ReduxAddedDispatchProps {
  return {
    refetchPermissions: refetchPermissions(dispatch),
  };
}

export default function withPermissions<OwnProps = {}>() {
  return (WrappedComponent: ComponentType<OwnProps & WithPermissionsProps>) => {
    return connect<ReduxAddedStateProps, ReduxAddedDispatchProps, OwnProps, ReduxStateWithPermissions>(
      mapStateToProps,
      mapDispatchToProps,
    )(WrappedComponent);
  };
}
