import { Component } from 'react';
import gql from 'graphql-tag';
import { connect, ReactNode } from 'react-redux';
import { compose } from 'react-apollo';

import { createEventLogger, getApollo } from '../../index';
import bootDrift from '../boot-drift';
import bootIntercom from '../boot-intercom';
import { withWalkmeContext, WalkmeConsumerProps } from '../Walkme';

import { setSwitchesAction, Switches } from './switches/switchesRedux';
import { setPermissionsAction } from './permission/permissionsRedux';

declare global {
  interface Window {
    fireflyKillswitch: boolean;
  }
}

const appQuery = gql`
  query AppQuery($switchesToLoad: [String!]) {
    dashboard {
      id
      isConsoleUser
      user_id
      userIntercomHash
      sessionId
      employee {
        id
      }
      company {
        id
      }
      switches(switches: $switchesToLoad)
    }
    rolesPermissionsData {
      grants
      spans
    }
  }
`;

interface QueryResult {
  dashboard: {
    id: string;
    isConsoleUser: boolean;
    user_id: string;
    userIntercomHash: string;
    sessionId: string;
    employee: {
      id: string;
    };
    company: {
      id: string;
    };
    switches: { [key: string]: any };
  };
  rolesPermissionsData: {
    grants: { [key: string]: any };
    spans: { [key: string]: any };
  };
}

interface OwnProps {
  switchesToLoad?: (keyof Switches)[];
  /** redirect to '/dashboard' if current employee is terminated */
  redirectIfTerminated?: boolean;
  disableIntercom?: boolean;
  disableWalkme?: boolean;
}
interface ReduxAddedStateProps {}
interface ReduxAddedDispatchProps {
  setSwitches: (switches: any) => void;
  setPermissions: (permissions: any) => void;
}

const DEFAULT_SWITCHES: (keyof Switches)[] = [
  'firefly_killswitch',
  'walkme_killswitch',
  'intercom',
  'drift_killswitch',
  'fork_trial_users_on_employee_count',
];

class AppInit extends Component<OwnProps & ReduxAddedDispatchProps & WalkmeConsumerProps> {
  static defaultProps = {
    disableWalkme: false,
  };

  componentDidMount() {
    getApollo()
      .query<QueryResult>({
        query: appQuery,
        variables: {
          switchesToLoad:
            this.props.switchesToLoad && this.props.switchesToLoad.length
              ? this.props.switchesToLoad.concat(DEFAULT_SWITCHES)
              : DEFAULT_SWITCHES,
        },
      })
      .then(result => {
        if (!result.errors || result.errors.length === 0) {
          const dashboard = result.data.dashboard;

          // TODO (vberteanu)
          // Add back this check once we have a reliable way of retrieving the employee status via GQL.
          // Currently employees of type AD have empty status and that breaks the EmployeeStatus type in schema.
          // We should not rely on the Ter status for the redirect, we should rely on the Zapp status.

          // if (this.props.redirectIfTerminated && dashboard.employee && dashboard.employee.allStatus === 'Ter') {
          //   setTimeout(() => {
          //     window.location.href = '/dashboard';
          //   });
          //   return;
          // }

          this.props.setSwitches(dashboard.switches || {});
          this.props.setPermissions(result.data.rolesPermissionsData || {});

          createEventLogger({
            sessionId: dashboard.sessionId,
          }).setCurrentUserData({
            employeeId: dashboard.employee && dashboard.employee.id,
            companyId: dashboard.company && dashboard.company.id,
            userId: dashboard.user_id,
          });

          if (dashboard.switches.fork_trial_users_on_employee_count && !dashboard.switches.drift_killswitch) {
            bootDrift();
          }

          if (
            dashboard.switches.intercom &&
            !this.props.disableIntercom &&
            !dashboard.isConsoleUser &&
            dashboard.employee &&
            dashboard.userIntercomHash
          ) {
            bootIntercom({ employeeId: dashboard.employee.id, userIntercomHash: dashboard.userIntercomHash });
          }

          this.props.initializeWalkme(
            {
              userId: dashboard.user_id,
            },
            dashboard.switches.walkme_killswitch,
            !this.props.disableWalkme,
          );

          window.fireflyKillswitch = dashboard.switches.firefly_killswitch;
        }
      });
  }

  render(): ReactNode {
    return null;
  }
}

export default compose(
  withWalkmeContext,
  connect<ReduxAddedStateProps, ReduxAddedDispatchProps, OwnProps, any>(
    null,
    dispatch => ({
      setSwitches(switches) {
        dispatch(setSwitchesAction(switches));
      },
      setPermissions(permissions) {
        dispatch(setPermissionsAction(permissions));
      },
    }),
  ),
)(AppInit);
