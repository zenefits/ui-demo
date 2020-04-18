export type RedirectWhitelistEntryType = { destination: string; allowedRoutes: string[] };

// copied from yourPeople3/client-app/boot/utils/prerequisite-redirect-whitelist.js
export const PREREQUISITE_REDIRECT_WHITELIST: { [key: string]: RedirectWhitelistEntryType } = {
  // Test routes for Glue
  'glue-redirect-test-employee': {
    destination: 'accountsettings.settings',
    allowedRoutes: ['accountsettings.settings'],
  },
  'glue-redirect-test-company': {
    destination: 'accountsettings.settings',
    allowedRoutes: ['accountsettings.settings'],
  },
  // Rebranding Message
  'rebranding-message-page': {
    destination: 'rebrandingMessage',
    allowedRoutes: ['rebrandingMessage'],
  },
  // BenAdmin Welcome Message
  'ba-welcome-page': {
    destination: 'baWelcome',
    allowedRoutes: ['baWelcome'],
  },
  // New Hire onboarding flow
  'employee-onboarding-newHireFlow': {
    destination: 'employee.onboarding-v2.start',
    allowedRoutes: ['employee.onboarding-v2.*', 'employeeProfile.*', 'support.*'],
  },
  primary_admin_redirect_group: {
    destination: 'primaryAdmin',
    allowedRoutes: ['primaryAdmin', 'support.*'],
  },
  // Ben admin BAA agreement for fullfil contact
  ben_admin_agreement_group: {
    destination: 'benAdminAgreement',
    allowedRoutes: ['benAdminAgreement', 'support.*'],
  },
  // Quality Gate hub data wizard flow
  'quality-gate.v1': {
    destination: 'hubDataWizard',
    allowedRoutes: ['hubDataWizard.*', 'support.*'],
  },
  // Primary Admin onboarding hub data wizard flow
  'primary-admin-onboarding.v1': {
    destination: 'hubDataWizard',
    allowedRoutes: ['hubDataWizard.*', 'support.*'],
  },
  // Ben Admin setup hub data wizard flow
  'ben-admin-setup.v1': {
    destination: 'hubDataWizard',
    allowedRoutes: ['hubDataWizard.*', 'support.*'],
  },
  'trial-expiration': {
    destination: 'billing.choosePlan',
    allowedRoutes: ['billing.*', 'plaidVerification.*', 'support.*'],
  },
  'pre-implementation-company-onboarding': {
    destination: 'companyOnboarding.start',
    allowedRoutes: ['companyOnboarding.*', 'support.*'],
  },
  'billing-renewal-new-saas-contract': {
    destination: 'saasContract',
    allowedRoutes: ['saasContract'],
  },
  'peo-authorization': {
    destination: 'peoAuth',
    allowedRoutes: ['peoAuth'],
  },
  'tou-agreement': {
    destination: 'touAgreement',
    allowedRoutes: ['touAgreement'],
  },
  // Doc Archive
  'bundle-expired': {
    destination: 'billing.choosePlan',
    allowedRoutes: ['companyProfile.planInfomation', 'billing.*', 'plaidVerification.*', '/app/support-flow/'],
  },
  'delinquent-customer-billing-admins': {
    destination: '/dashboard/#',
    allowedRoutes: ['companyProfile.billingInformation', '/app/support-flow/'],
  },
  'delinquent-customer-non-billing-admins': {
    destination: '/dashboard/#',
    allowedRoutes: ['/app/support-flow/'],
  },
  /* ---------------------------------------------------
   * Pre-requisite redirects for company setup
   * --------------------------------------------------- */
  // Hub data wizard for 1-10 company onboarding
  'company-setup.v1': {
    destination: 'hubDataWizard',
    allowedRoutes: ['hubDataWizard.*', 'support.*'],
  },
  // Show onboarding tasks until company setup is complete
  'company-setup-tasks': {
    destination: '/app/company-setup/#/tasks_overview',
    allowedRoutes: ['payroll.settings.onboardingTaxes'],
  },
  // Lock EE dashboard until company setup is complete
  'company-setup-lock-dashboard': {
    destination: 'registration-complete',
    allowedRoutes: ['registration-complete'],
  },
  /* --------------------------------------------------- */
  'test-group': {
    destination: 'registration-complete',
    allowedRoutes: ['registration-complete', '/app/support-flow/'],
  },
};
