import { ExitType, OmniSearchSources } from './types';

export const exitTypes: { [type: string]: ExitType } = {
  startRealAccount: 'startRealAccount',
  logout: 'logout',
};

export const demoCenterSwitch = 'fork_trial_users_on_employee_count';

export const buyLink = '/public/#/billing/choose-plan';

export const tabletBreakpoints = [false, false, true, true, true];

export const defaultSources: OmniSearchSources = ['employees', 'actions', 'help'];

export const helpCenterType = 'helpCenter';
