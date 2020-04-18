import qs from 'qs';
import { get } from 'lodash';

import { ParsedZenefitsUrl } from '../client-nav-content/utils';
import { ActionItem, EmployeeItem, OmniSearchSelectOptions, OmniSearchSelectOptionType, QueryParams } from './types';
import { OmniSearchDashboardQuery } from '../gqlTypes';
import { getDashboardApps, DashboardApp } from '../client-nav-content/dashboardApps';
import { ZAppStatusEnum } from '../client-nav-content/constants';

const appDisabledStatus = ZAppStatusEnum.DISABLED;
const terminatedStatus = 'Ter';

export function formatActionLink(link: ParsedZenefitsUrl): string {
  if (typeof link === 'string') {
    if (link.startsWith('http://') || link.startsWith('https://')) {
      return link;
    } else if (link.startsWith('/')) {
      return `/dashboard/#${link}`;
    } else {
      /**
       * link is a route name
       */
      return `/dashboard/#/redirect-to-route?${qs.stringify({ to: link })}`;
    }
  } else {
    /**
     * handle the non-string type in ParsedZenefitsUrl
     * link example:
     * {
     *   route: string,
     *   params: { queryParams: ... }
     * }
     */
    const queryParams: QueryParams = { to: link.route };
    if (link.params && link.params.queryParams) {
      queryParams.queryParams = JSON.stringify(link.params.queryParams);
    }
    return `/dashboard/#/redirect-to-route?${qs.stringify(queryParams)}`;
  }
}

/**
 * Based on subscription data from dashboard query, get an array of active apps
 */
export function getActiveApps(dashboardData: OmniSearchDashboardQuery.Dashboard): DashboardApp[] {
  const { zAppInstallSubscriptions, switches, isSpoofing } = dashboardData;

  const subscriptions: OmniSearchDashboardQuery.ZAppInstallSubscriptions[] = zAppInstallSubscriptions;

  const apps = getDashboardApps(subscriptions, switches, isSpoofing);

  const activeApps = apps.filter(dashboardApp => {
    const switchName = dashboardApp.showIfSwitchEnabled;

    if (
      switchName &&
      ((switchName.startsWith('!') && switches[switchName.substring(1)]) ||
        (!switchName.startsWith('!') && !switches[switchName]))
    ) {
      return false;
    }

    if (!dashboardApp.uniqueId().startsWith('1.')) {
      return dashboardApp.status() > appDisabledStatus;
    }

    return dashboardApp.inheritedStatus() > appDisabledStatus;
  });

  return activeApps;
}

export function getSelectOptions(
  employeeItems: EmployeeItem[],
  actionItems: ActionItem[],
  options: { showEmployees: boolean } = { showEmployees: true },
): OmniSearchSelectOptions {
  // Don't need to generate employeeOptions if they are not showed
  const employeeOptions = options.showEmployees
    ? employeeItems.map((employeeItem: EmployeeItem) => {
        return {
          type: 'employee' as OmniSearchSelectOptionType,
          displayName: employeeItem.preferred_name || employeeItem.name || '',
          link: `/dashboard/#/redirect-to-route?to=redirect.tearsheet&routeParams=${employeeItem.id}`,
        };
      })
    : [];

  const actionOptions = actionItems.map((actionItem: ActionItem) => {
    return {
      type: 'action' as OmniSearchSelectOptionType,
      displayName: actionItem.title,
      link: formatActionLink(actionItem.link),
    };
  });

  return options.showEmployees ? [...employeeOptions, ...actionOptions] : [...actionOptions];
}

export function getActiveActions(actionItems: ActionItem[], activeApps: DashboardApp[]): ActionItem[] {
  const activeActions: ActionItem[] = actionItems.filter(action => {
    const app = activeApps.find(app => app.uniqueId() === action.zAppId);

    if (!app) {
      return false;
    }

    if (action.id) {
      const path = `preferences.links.${action.id}`;
      const installVisibilityInfo = get(app.subscription.appInstall, path);

      if (installVisibilityInfo && !installVisibilityInfo.isActive) {
        return false;
      }

      const subVisibilityInfo = get(app.subscription, path);

      if (subVisibilityInfo && !subVisibilityInfo.isActive) {
        return false;
      }
    }

    // If the action item does not have a cta defined, fallback to cta of the app.
    const appButtons = app.buttons();
    if (!action.link && appButtons.length) {
      action.link = appButtons[0].linkTo;
    }

    return true;
  });

  return activeActions;
}

export function getSelectOptionsFromData(
  dashboardData: OmniSearchDashboardQuery.Dashboard,
  omniSearchSuggestionData: any,
) {
  const isCurrentUserTerminated: boolean = get(dashboardData, 'employee.allStatus') === terminatedStatus;
  const activeApps = getActiveApps(dashboardData);
  const activeAppIds: string[] = activeApps.map(app => app.uniqueId());
  const showEmployees: boolean =
    !isCurrentUserTerminated &&
    (activeAppIds.includes('1.com.zenefits.Employees') || activeAppIds.includes('1.com.zenefits.EmployeeDirectory'));

  const {
    employees: { items: employeeItems },
    actions: { items: actionItems },
  } = omniSearchSuggestionData;

  /**
   * Because actions returned are not filtered by active apps,
   * we need to do the filtering in the front-end
   */
  const activeActions = getActiveActions(actionItems, activeApps);
  // limit the number of actions to 5
  const slicedActions = activeActions.slice(0, 5);

  return getSelectOptions(employeeItems, slicedActions, { showEmployees });
}

export const getLeadInfo = () => {
  const contextData = {
    referrer: document.referrer || '',
    location: {
      hash: document.location.hash || '',
      host: document.location.host || '',
      hostname: document.location.hostname || '',
      href: document.location.href || '',
      origin: document.location.origin || '',
      path: document.location.pathname || '',
      port: document.location.port || '',
      search: document.location.search || '',
      protocol: document.location.protocol || '',
    },
  };

  const formMetaData = {
    formId: 'contact-sales',
    formType: 'Contact_Sales',
    formStep: 1,
    formIsFinalStep: true,
  };

  const syncData = {
    instantSubmit: true,
    handlerName: 'mkt',
    syncTo: {
      marketoListId: 17390,
    },
  };

  const formData = {
    email: '',
  };

  return {
    formData,
    contextData,
    formMetaData,
    syncData,
  };
};
