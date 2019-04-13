import { ParsedZenefitsUrl } from '../client-nav-content/utils';

export type ProductTitleWithDropdownMode = 'demoCenter' | 'companyHub';

export type OmniSearchSource = 'employees' | 'help' | 'actions';

export type OmniSearchSources = OmniSearchSource[];

export type EmployeeItem = {
  id?: string;
  preferred_name?: string;
  name?: string;
};

export type TitleAndLink = {
  title?: string;
  link?: string;
};

export type ActionItem = {
  id?: string;
  zAppId?: string;
  title?: string;
  link?: ParsedZenefitsUrl;
};

export type HelpItem = TitleAndLink;

export type OmniSearchQueryResult = {
  dashboard: {
    employee: {
      allStatus: string;
    };
  };
  omniSearchSuggestion: {
    employees: { items: EmployeeItem[] };
    actions: { items: ActionItem[] };
    help: { items: HelpItem[] };
  };
};

export type OmniSearchSelectOptionType = 'employee' | 'action' | 'help' | 'helpCenter';

export type OmniSearchSelectOption = {
  type: OmniSearchSelectOptionType;
  displayName?: string;
  link?: string;
  searchString?: string;
};

export type OmniSearchSelectOptions = OmniSearchSelectOption[];

// TODO: could probably import type in EmberRouteLink.tsx
export type QueryParams = {
  /**
   * the name of the ember route or a url that starts with a '/'
   */
  to: string;
  routeParams?: (string | number)[];
  /**
   * use JSON.stringify to convert object to string
   */
  queryParams?: string;
};

export type ExitType = 'startRealAccount' | 'logout';
