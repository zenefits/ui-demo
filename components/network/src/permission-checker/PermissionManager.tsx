import React from 'react';
import gql from 'graphql-tag';

import { throwInDevelopment } from 'z-frontend-app-bootstrap';

import { Query } from '../../index';
import { Permissions } from './permissionTypes';
import { PermissionsRefreshQuery } from '../gqlTypes';

const permissionsRefreshQuery = gql`
  query PermissionsRefreshQuery {
    rolesPermissionsData {
      grants
      spans
    }
  }
`;

export type PermissionsContextProps = {
  permissions: Permissions;
  permissionsLoaded: boolean;
  refetchPermissions: () => any;
  isNonLoggedInContext: boolean;
};

const nullPermissionsContext = {
  permissions: {},
  permissionsLoaded: true,
  refetchPermissions: () => {
    throwInDevelopment('You tried to fetch permissions outside the context of a permissions manager');
  },
  isNonLoggedInContext: false,
};

export const PermissionsContext = React.createContext<PermissionsContextProps>(nullPermissionsContext);

export default class PermissionManager extends React.Component<{ isNonLoggedInContext?: boolean }> {
  render() {
    const { isNonLoggedInContext } = this.props;
    return (
      <Query<PermissionsRefreshQuery.Query, PermissionsRefreshQuery.Variables>
        query={permissionsRefreshQuery}
        // TODO: maybe default of cache-first is fine
        // fetchPolicy="network-only"
        isBackgroundQuery
        handleLoading={false}
        skip={isNonLoggedInContext}
      >
        {({ data, refetch, loading }) => {
          return (
            <PermissionsContext.Provider
              value={{
                isNonLoggedInContext,
                permissions: (data && data.rolesPermissionsData) || {},
                permissionsLoaded: !loading,
                refetchPermissions: refetch,
              }}
            >
              {this.props.children}
            </PermissionsContext.Provider>
          );
        }}
      </Query>
    );
  }
}
