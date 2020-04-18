import React, { useContext, FunctionComponent } from 'react';
import gql from 'graphql-tag';

import { throwInDevelopment } from 'z-frontend-app-bootstrap';

import { Query } from '../../index';
import { SwitchQuery } from '../gqlTypes';
import { PermissionsContext } from '../permission-checker/PermissionManager';

export const switchQuery = gql`
  query SwitchQuery {
    dashboard {
      id
      switches
    }
  }
`;

export type SwitchContextProps = {
  switches: { [switchName: string]: boolean };
  switchesLoaded: boolean;
  refetchSwitches: () => any;
};

const nullSwitchContext = {
  switches: {},
  switchesLoaded: true,
  refetchSwitches: () => {
    throwInDevelopment('You tried to fetch switches outside the context of a switch manager');
  },
};

export const SwitchContext = React.createContext<SwitchContextProps>(nullSwitchContext);

const SwitchProvider: FunctionComponent = props => {
  const { isNonLoggedInContext } = useContext(PermissionsContext);
  return (
    <Query<SwitchQuery.Query, SwitchQuery.Variables>
      query={switchQuery}
      isBackgroundQuery
      handleLoading={false}
      skip={isNonLoggedInContext}
    >
      {({ data, refetch, loading }) => {
        return (
          <SwitchContext.Provider
            value={{
              switches: data?.dashboard?.switches || {},
              switchesLoaded: !loading,
              refetchSwitches: refetch,
            }}
          >
            {props.children}
          </SwitchContext.Provider>
        );
      }}
    </Query>
  );
};

export default SwitchProvider;
