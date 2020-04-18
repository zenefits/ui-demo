import React, { Component } from 'react';
import gql from 'graphql-tag';
import qs from 'qs';

import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';
import { Box } from 'zbase';
import { getEventLogger, ErrorBoundary } from 'z-frontend-app-bootstrap';
import { PermissionChecker, Query } from 'z-frontend-network';
import { Button } from 'z-frontend-elements';

import Drawer from '../drawer/Drawer';
import { getDashboardApps } from './dashboardApps';
import { ADMIN, EMPLOYEE, ZAppStatusEnum, ZAPP_ORDER } from './constants';
import { parseZenefitsUrl, ParsedZenefitsUrl } from './utils';
import { Subscription } from './types';
import { ClientDrawerContentQuery } from '../gqlTypes';

const ERROR_BOUNDARY_MESSAGE = 'Navigation menu was unable to load.';
const NAV_DRAWER_LOAD_FAILURE_EVENT = 'client_nav_drawer_load_failure';
const eventLogger = getEventLogger();
const trialGuideSwitch = 'enable_trial_guide';
const trialGuideButtonText = 'Getting Started Guide';
const trialGuideLink = '/dashboard/#/redirect-to-route?to=guide';

const drawerQuery = gql`
  query ClientDrawerContentQuery {
    dashboard {
      id
      isSpoofing
      isTrialCompany
      switches
      permission
      employee {
        id
        type
      }
      zAppInstallSubscriptions {
        id
        status
        inheritedStatus
        preferences
        appInstall {
          id
          status
          preferences
          app {
            id
            uniqueId
            appUrl
            role
            appIconSqUrl
            shortTitle
            status
            preferences
          }
        }
      }
    }
  }
`;

const LineSeparator = styled(Box)`
  border-top: solid ${color('grayscale.f')} 1px;
`;
LineSeparator.defaultProps = {
  mx: 4,
  mt: 1,
  mb: 3,
};

export default class ClientDrawerContent extends Component {
  getApps(data: any) {
    const appMap: { [appId: string]: any } = {};
    const { zAppInstallSubscriptions, permission, switches, isSpoofing, employee } = data.dashboard;
    const subscriptions: Subscription[] = zAppInstallSubscriptions;
    const hideEmployeeCards = employee.type === 'AD';
    const hideAdminCards = !(permission && permission.isAdmin);

    type AppInSection = {
      destination: string;
      role: string;
      name: string;
      isReactApp: boolean;
    };
    const appSections: {
      [key: string]: AppInSection[];
    } = {
      [ADMIN]: [],
      [EMPLOYEE]: [],
    };
    const addApp = (role: string, app: AppInSection) => {
      if (role === ADMIN && !hideAdminCards) {
        appSections[ADMIN].push(app);
      } else if (role === EMPLOYEE && !hideEmployeeCards) {
        appSections[EMPLOYEE].push(app);
      }
    };

    getDashboardApps(subscriptions, switches, isSpoofing)
      .filter(dashboardApp => {
        if (dashboardApp.showIfSwitchEnabled) {
          const switchName = dashboardApp.showIfSwitchEnabled;
          if (
            (switchName.startsWith('!') && switches[switchName.substring(1)]) ||
            (!switchName.startsWith('!') && !switches[switchName])
          ) {
            return false;
          }
        }
        return true;
      })
      .filter(dashboardApp => dashboardApp.subscription.inheritedStatus > ZAppStatusEnum.ENROLLING)
      .forEach(dashboardApp => {
        const subscriptionApp: any = dashboardApp.subscription.appInstall.app;
        const { uniqueId, appUrl } = subscriptionApp;

        let parsedUrl: ParsedZenefitsUrl;
        if (dashboardApp.buttons().length) {
          parsedUrl = dashboardApp.buttons()[0].linkTo;
        } else {
          parsedUrl = parseZenefitsUrl(appUrl);
        }

        let destination = '';

        if (typeof parsedUrl === 'string') {
          destination = parsedUrl;
        } else {
          destination = parsedUrl.route;
        }

        const isExternal = /(^http(s?):\/\/|^\/app\/)/.test(destination);
        const isEmberRoute = !isExternal && !destination.startsWith('/');
        if (isEmberRoute) {
          const destinationQueryString = qs.stringify({ to: destination });
          destination = `/dashboard/#/redirect-to-route?${destinationQueryString}`;
        }
        appMap[uniqueId] = {
          destination,
          role: subscriptionApp.role,
          name: subscriptionApp.shortTitle,
          isReactApp: appUrl && appUrl.includes('/app/'),
        };
      });

    ZAPP_ORDER.forEach(uniqueId => {
      if (appMap.hasOwnProperty(uniqueId)) {
        const app = appMap[uniqueId];
        if (app.role === 'ALL') {
          addApp(ADMIN, app);
          addApp(EMPLOYEE, app);
        } else {
          addApp(app.role, app);
        }
      }
    });

    return appSections;
  }

  render() {
    return (
      <ErrorBoundary
        text={ERROR_BOUNDARY_MESSAGE}
        onError={() => {
          eventLogger.logError(NAV_DRAWER_LOAD_FAILURE_EVENT);
        }}
      >
        <Query<ClientDrawerContentQuery.Query>
          isBackgroundQuery
          query={drawerQuery}
          handleLoading={false}
          handleError={false}
        >
          {({ loading, error, data }) => {
            if (loading || error) {
              return null;
            }

            if (!data.dashboard) return null;

            const apps = this.getApps(data);

            const {
              dashboard: { isTrialCompany, switches },
            } = data;

            const showTrialGuideButton: boolean = isTrialCompany && switches[trialGuideSwitch];

            return (
              <>
                {showTrialGuideButton && (
                  <Box px={3} pt={2} mt={1}>
                    <Button.Link href={trialGuideLink} mode="primary">
                      {trialGuideButtonText}
                    </Button.Link>
                  </Box>
                )}

                <PermissionChecker permission="is_partner_account">
                  <Drawer.Link href="/app/benconnect/#/" mt={1}>
                    Partner Dashboard
                  </Drawer.Link>
                  <Drawer.Link href="/dashboard/#/" mt={1}>
                    Company Home
                  </Drawer.Link>
                </PermissionChecker>

                <PermissionChecker permission="is_partner_account" isNegated>
                  <Drawer.Link href="/dashboard/#/" mt={1}>
                    Dashboard
                  </Drawer.Link>
                </PermissionChecker>

                <LineSeparator />

                {apps[ADMIN].length > 0 && (
                  <Drawer.Section title="Admin Apps">
                    {apps[ADMIN].map(app => (
                      <Drawer.Link href={app.destination} key={app.name}>
                        {app.name}
                      </Drawer.Link>
                    ))}
                  </Drawer.Section>
                )}

                {apps[ADMIN].length > 0 && apps[EMPLOYEE].length > 0 && <LineSeparator mt={2} />}

                {apps[EMPLOYEE].length > 0 && (
                  <Drawer.Section title="Employee Apps">
                    {apps[EMPLOYEE].map(app => (
                      <Drawer.Link href={app.destination} key={app.name}>
                        {app.name}
                      </Drawer.Link>
                    ))}
                  </Drawer.Section>
                )}
              </>
            );
          }}
        </Query>
      </ErrorBoundary>
    );
  }
}
