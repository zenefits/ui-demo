import moment from 'moment';
import { cloneDeep, get, set } from 'lodash';

import { MAINTENANCE, PREF_SPOOFABLE, ZAppStatusEnum } from './constants';
import { parseZenefitsUrl, ParsedZenefitsUrl } from './utils';
import { Subscription } from './types';

interface Button {
  title?: string;
  isHighlighted?: boolean;
  linkTo?: ParsedZenefitsUrl;
  args?: Object;
}

export class DashboardApp {
  subscription: Subscription;

  switches: any;

  showIfSwitchEnabled: string;

  constructor(subscription: Subscription, switches: any) {
    // Cloning because subscriptions are marked as read-only upstream;
    const mutableSubscription = cloneDeep(subscription) as Subscription;

    // Unclear if these properties are guaranteed on subscription objects
    // Setting them to make lookups safe
    ['preferences', 'appInstall.preferences', 'appInstall.app.preferences'].forEach(objPath =>
      set(mutableSubscription, objPath, get(mutableSubscription, objPath) || {}),
    );
    this.subscription = mutableSubscription;
    this.switches = switches;
  }

  buttons(): Button[] {
    const zUrl = parseZenefitsUrl(this.subscription.appInstall.app.appUrl);

    return [
      {
        title: 'View',
        isHighlighted: false,
        linkTo: zUrl, // this is different than ember...
        args: typeof zUrl === 'string' ? {} : zUrl.params,
      },
    ];
  }

  uniqueId() {
    return this.subscription.appInstall.app.uniqueId;
  }

  title() {
    return this.subscription.appInstall.app.shortTitle;
  }

  appIconSqUrl() {
    return this.subscription.appInstall.app.appIconSqUrl;
  }

  status() {
    return this.subscription.appInstall.app.status;
  }

  inheritedStatus() {
    return this.subscription.inheritedStatus;
  }

  isUnderMaintenance() {
    return this.subscription.appInstall.app.status === MAINTENANCE;
  }

  secondaryLinks(): any[] {
    return [];
  }

  isChosen() {
    this.subscription.inheritedStatus === ZAppStatusEnum.OK;
  }

  cleanNote(note: any) {
    if (!note || !note.comp || !note.ctx) {
      return null;
    }
    return note;
  }

  notification() {
    // DO NOT OVERRIDE. Use ZAppNotificationService::create().
    return this.subscription.preferences && this.cleanNote(this.subscription.preferences._notif);
  }

  chad() {
    // DO NOT OVERRIDE. Use ZAppActionService::create().
    return this.subscription.preferences && this.cleanNote(this.subscription.preferences._action);
  }

  maintenanceMessage() {
    return (
      this.subscription.appInstall.app.preferences._maintenanceMessage ||
      'This app is temporarily under maintenance. Please try again later.'
    );
  }
}

// const BusinessIntelligenceAdminCard = ZAppCard.extend();
// const CoreCard = ZAppCard.extend();

class BusinessInsuranceAdminApp extends DashboardApp {
  showIfSwitchEnabled = 'show_business_insurance_app';

  buttons() {
    const subscriptionStatus = this.subscription.inheritedStatus;
    let buttons: Button[] = [];

    if (this.switches.show_business_insurance_app) {
      buttons = [
        {
          title: 'View',
          isHighlighted: false,
          linkTo: 'bizInsurance.overview',
        },
      ];
    } else if (subscriptionStatus === ZAppStatusEnum.OK) {
      buttons = [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'businessinsurance.overview',
        },
      ];
    } else {
      buttons = [
        {
          title: 'Add Existing',
          isHighlighted: false,
          linkTo: 'businessinsurance.addexisting.questions',
        },
      ];
    }
    return buttons;
  }
}

class CompanyAdminApp extends DashboardApp {
  buttons() {
    return [
      {
        title: 'Manage',
        isHighlighted: false,
        linkTo: 'companyProfile',
      },
    ];
  }
}

class ComplianceAdminApp extends DashboardApp {
  showIfSwitchEnabled = 'compliance_companion';

  buttons() {
    // this doesn't matter anymore, but if it's not here the default route breaks the page :( ...
    return [
      {
        title: 'View',
        isHighlighted: false,
        linkTo: 'compliance-companion',
      },
    ];
  }
}

class LifeAndDisabilityAdminApp extends DashboardApp {
  constructor(subscription: Subscription, switches: any) {
    super(subscription, switches);
    if (this.subscription.appInstall.preferences.unifyBenefitsApps) {
      //
      // Disable LnD ZAPP in front-end for ben-admin companies.
      // MDV is always enabled for ben-admin companies and will render status which is
      // inclusive of the LnD lines.
      //
      this.subscription.inheritedStatus = ZAppStatusEnum.DISABLED;
    }
  }

  isChosen() {
    const appStatus = this.subscription.appInstall.status;
    const subscriptionStatus = this.subscription.status;
    if (subscriptionStatus === ZAppStatusEnum.NOT_ENROLLED || appStatus === ZAppStatusEnum.OK) {
      return true;
    }
    return false;
  }

  showPermissions() {
    return this.subscription.appInstall.status === ZAppStatusEnum.OK;
  }

  buttons() {
    const appStatus = this.subscription.appInstall.status;
    const { cardBlockType } = this.subscription.appInstall.preferences;
    const { isBenAdmin } = this.subscription.appInstall.preferences;
    let buttons: Button[] = [];
    // Todo(jason-zenefits): Remove this after built the overview page
    if (cardBlockType) {
      if (cardBlockType === 'bor-block') {
        buttons = [
          {
            title: 'Learn More',
            isHighlighted: false,
            linkTo: 'lifedisability.borBlock',
          },
        ];
      } else if (cardBlockType === 'quotes-block') {
        buttons = [
          {
            title: 'Learn More',
            isHighlighted: false,
            linkTo: 'lifedisability.quotesBlock',
          },
        ];
      } else if (cardBlockType === 'apr-block') {
        buttons = [
          {
            title: 'Learn More',
            isHighlighted: false,
            linkTo: 'lifedisability.overview',
          },
        ];
      }
    } else if (appStatus === ZAppStatusEnum.OK || appStatus === ZAppStatusEnum.ENROLLING) {
      // End of Todo
      buttons = [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: isBenAdmin ? 'ben-admin' : 'lifedisability.overview',
        },
      ];
    } else if (appStatus === ZAppStatusEnum.NOT_ENROLLED) {
      buttons = [
        {
          title: 'Get Started',
          isHighlighted: false,
          linkTo: isBenAdmin ? 'ben-admin' : 'lifedisability.newOrExisting',
        },
      ];
    }
    return buttons;
  }
}

class MedicalInsuranceAdminApp extends DashboardApp {
  constructor(subscription: Subscription, switches: any) {
    super(subscription, switches);

    // Customize the subscription for the front-end.
    if (this.subscription.preferences.unifyBenefitsApps) {
      //
      // For ben-admin, we use MDV as the unified app and so override the app title of the app install
      //
      this.subscription.appInstall.app.shortTitle = 'Benefits Administration';
      this.subscription.appInstall.app.title = 'Benefits Administration';
      //
      //
      // Handle the LnD only groups:
      //
      // If the group has LnD coverage lines and the MDV app status isn't OK, then this implies that the group is offering
      // only LnD lines. Override the status of the zapp with OK so that it's shown as ENROLLED and complete.
      //
      if (this.subscription.preferences.hasLnDCoverage && this.subscription.inheritedStatus !== ZAppStatusEnum.OK) {
        this.subscription.inheritedStatus = ZAppStatusEnum.OK;
      }
    }
  }

  buttons() {
    const toRet: Button[] = [];
    // Read only card
    if (!this.subscription.preferences.buttons) {
      return toRet;
    }
    this.subscription.preferences.buttons.forEach((button: any) => {
      toRet.push({
        title: button.buttonText,
        isHighlighted: false,
        linkTo: button.routeName,
      });
    });
    return toRet;
  }

  title() {
    return this.subscription.preferences.title;
  }

  secondaryLinks() {
    return this.subscription.preferences.secondaryLinks;
  }

  showPermissions() {
    this.subscription.preferences.isBenAdmin;
  }
}

class StockOptionAdminApp extends DashboardApp {
  buttons() {
    const { unapprovedGrants } = this.subscription.appInstall.preferences;
    const subscriptionStatus = this.subscription.inheritedStatus;
    let buttons;
    if (subscriptionStatus === ZAppStatusEnum.NOT_ENROLLED) {
      if (unapprovedGrants && unapprovedGrants > 0) {
        buttons = [
          {
            title: 'Manage',
            isHighlighted: false,
            linkTo: 'stockoptionpreview',
          },
        ];
      } else {
        buttons = [
          {
            title: 'Setup',
            isHighlighted: false,
            linkTo: 'stockoptionpricing',
          },
        ];
      }
    }

    if (subscriptionStatus === ZAppStatusEnum.ENROLLING) {
      buttons = [
        {
          title: 'Resume',
          isHighlighted: false,
          linkTo: 'stockoptionsetup.landing',
        },
      ];
    }
    if (subscriptionStatus === ZAppStatusEnum.OK) {
      buttons = [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'stockoption.overview',
        },
      ];
    }
    return buttons;
  }
}

class StockOptionEmployeeApp extends DashboardApp {
  buttons() {
    const subscriptionStatus = this.subscription.inheritedStatus;
    let buttons;
    if (subscriptionStatus === ZAppStatusEnum.OK) {
      buttons = [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'employee.stockoption.overview',
        },
      ];
    }
    if (subscriptionStatus === ZAppStatusEnum.ENROLLING) {
      buttons = [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'employee.stockoption.overview',
        },
        {
          title: 'Accept',
          isHighlighted: false,
          linkTo: 'employee.stockoption.landing',
        },
      ];
    }
    return buttons;
  }
}

class CobraEmployeeApp extends DashboardApp {
  showIfSwitchEnabled = '!z2_cobra_overview';

  buttons() {
    if (this.subscription.preferences.hideButtons) {
      return [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'employee.cobraOverview.manage',
        },
      ];
    }
    let buttons: Button[] = [];
    const { cobraStatus } = this.subscription.preferences;
    let remainingDays = -1;
    const { cobraElectionDeadline } = this.subscription.preferences;
    const { isBorEmployeeAlreadyCovered } = this.subscription.preferences;
    const { hasCoverageEnded } = this.subscription.preferences;
    // const cancelationType = subscription.preferences.cancelationType;
    const today = moment().startOf('day');
    // make sure switch inbox_task_integration_cobra_employee is on, otherwise we need to redirect EE for renewal
    if (!this.switches.inbox_task_integration_cobra_employee) {
      const { isRenewalParticipant } = this.subscription.preferences;
      const { renewalDeadline } = this.subscription.preferences;
      let isPastEnrollmentDeadline = false;
      if (renewalDeadline) {
        const deadline = moment(renewalDeadline);
        if (today > deadline) {
          isPastEnrollmentDeadline = true;
        }
      }
      if (isRenewalParticipant && !isPastEnrollmentDeadline) {
        const { renewalStatus } = this.subscription.preferences;
        if (renewalStatus === 'initial' || renewalStatus === 'enrolling') {
          return [
            {
              title: 'Enroll',
              isHighlighted: false,
              linkTo: 'employee.cobraOverview.manage',
            },
          ];
        }
        return [
          {
            title: 'Manage',
            isHighlighted: false,
            linkTo: 'employee.cobraOverview.overview',
          },
        ];
      }
    }
    // end for renewal
    if (cobraElectionDeadline != null) {
      const lastDay = moment(cobraElectionDeadline);
      remainingDays = lastDay.diff(today, 'days');
    }

    // COBRA employee One Button
    if (cobraStatus) {
      if ((cobraStatus === 'declined' || cobraStatus === 'filling-out') && remainingDays >= 0) {
        buttons = [
          {
            title: 'Enroll',
            isHighlighted: false,
            linkTo: 'employee.cobraOverview.manage',
          },
        ];
      } else if (
        cobraStatus === 'submitted' ||
        (cobraStatus === 'enrolled' && !hasCoverageEnded) ||
        cobraStatus === 'canceled' ||
        cobraStatus === 'tpa-admin'
      ) {
        buttons = [
          {
            title: 'Manage',
            isHighlighted: false,
            linkTo: 'employee.cobraOverview.overview',
          },
        ];
      }
    } else if (isBorEmployeeAlreadyCovered || remainingDays >= 0) {
      buttons = [
        {
          title: 'Enroll',
          isHighlighted: false,
          linkTo: 'employee.cobraOverview.manage',
        },
      ];
    }

    return buttons;
  }
}

class CobraEmployeeHealthApp extends DashboardApp {
  lineOfCoverage: string;

  showIfSwitchEnabled = 'z2_cobra_overview';

  overviewPageLink() {
    if (this.switches.isActive('z2_cobra_overview') && this.lineOfCoverage) {
      return `employee.overview.cobra.${this.lineOfCoverage}`;
    } else {
      return 'employee.cobraOverview.overview';
    }
  }
}

class CobraEmployeeMedicalApp extends CobraEmployeeHealthApp {
  lineOfCoverage: 'medical';

  buttons() {
    if (this.subscription.preferences.hideButtons) {
      return [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: this.overviewPageLink(),
        },
      ];
    }
    let buttons: Button[] = [];
    const { cobraStatus } = this.subscription.preferences;
    let remainingDays = -1;
    const { cobraElectionDeadline } = this.subscription.preferences;
    const { isBorEmployeeAlreadyCovered } = this.subscription.preferences;
    const { hasCoverageEnded } = this.subscription.preferences;
    // const cancelationType = subscription.preferences.cancelationType;
    const today = moment().startOf('day');
    // make sure switch inbox_task_integration_cobra_employee is on, otherwise we need to redirect EE for renewal
    if (!this.switches.inbox_task_integration_cobra_employee) {
      const { isRenewalParticipant } = this.subscription.preferences;
      const { renewalDeadline } = this.subscription.preferences;
      let isPastEnrollmentDeadline = false;
      if (renewalDeadline) {
        const deadline = moment(renewalDeadline);
        if (today > deadline) {
          isPastEnrollmentDeadline = true;
        }
      }
      if (isRenewalParticipant && !isPastEnrollmentDeadline) {
        const { renewalStatus } = this.subscription.preferences;
        if (renewalStatus === 'initial' || renewalStatus === 'enrolling') {
          return [
            {
              title: 'Enroll',
              isHighlighted: false,
              linkTo: 'employee.cobraOverview.manage',
            },
          ];
        }
        return [
          {
            title: 'Manage',
            isHighlighted: false,
            linkTo: this.overviewPageLink(),
          },
        ];
      }
    }
    // end for renewal
    if (cobraElectionDeadline != null) {
      const lastDay = moment(cobraElectionDeadline);
      remainingDays = lastDay.diff(today, 'days');
    }

    // COBRA employee One Button
    if (cobraStatus) {
      if ((cobraStatus === 'declined' || cobraStatus === 'filling-out') && remainingDays >= 0) {
        buttons = [
          {
            title: 'Enroll',
            isHighlighted: false,
            linkTo: 'employee.cobraOverview.manage',
          },
        ];
      } else if (
        cobraStatus === 'submitted' ||
        (cobraStatus === 'enrolled' && !hasCoverageEnded) ||
        cobraStatus === 'canceled' ||
        cobraStatus === 'tpa-admin'
      ) {
        buttons = [
          {
            title: 'Manage',
            isHighlighted: false,
            linkTo: this.overviewPageLink(),
          },
        ];
      }
    } else if (isBorEmployeeAlreadyCovered || remainingDays >= 0) {
      buttons = [
        {
          title: 'Enroll',
          isHighlighted: false,
          linkTo: 'employee.cobraOverview.manage',
        },
      ];
    }

    return buttons;
  }
}

class CobraEmployeeDentalApp extends CobraEmployeeHealthApp {
  lineOfCoverage = 'dental';

  buttons() {
    if (this.subscription.preferences.hideButtons) {
      return [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: this.overviewPageLink(),
        },
      ];
    }
    let buttons: Button[] = [];
    const { cobraStatus } = this.subscription.preferences;
    let remainingDays = -1;
    const { cobraElectionDeadline } = this.subscription.preferences;
    const { isBorEmployeeAlreadyCovered } = this.subscription.preferences;
    const { hasCoverageEnded } = this.subscription.preferences;
    // const cancelationType = subscription.preferences.cancelationType;
    const today = moment().startOf('day');
    // make sure switch inbox_task_integration_cobra_employee is on, otherwise we need to redirect EE for renewal
    if (!this.switches.inbox_task_integration_cobra_employee) {
      const { isRenewalParticipant } = this.subscription.preferences;
      const { renewalDeadline } = this.subscription.preferences;
      let isPastEnrollmentDeadline = false;
      if (renewalDeadline) {
        const deadline = moment(renewalDeadline);
        if (today > deadline) {
          isPastEnrollmentDeadline = true;
        }
      }
      if (isRenewalParticipant && !isPastEnrollmentDeadline) {
        const { renewalStatus } = this.subscription.preferences;
        if (renewalStatus === 'initial' || renewalStatus === 'enrolling') {
          return [
            {
              title: 'Enroll',
              isHighlighted: false,
              linkTo: 'employee.cobraOverview.manage',
            },
          ];
        }
        return [
          {
            title: 'Manage',
            isHighlighted: false,
            linkTo: this.overviewPageLink(),
          },
        ];
      }
    }
    // end for renewal
    if (cobraElectionDeadline != null) {
      const lastDay = moment(cobraElectionDeadline);
      remainingDays = lastDay.diff(today, 'days');
    }

    // COBRA employee One Button
    if (cobraStatus) {
      if ((cobraStatus === 'declined' || cobraStatus === 'filling-out') && remainingDays >= 0) {
        buttons = [
          {
            title: 'Enroll',
            isHighlighted: false,
            linkTo: 'employee.cobraOverview.manage',
          },
        ];
      } else if (
        cobraStatus === 'submitted' ||
        (cobraStatus === 'enrolled' && !hasCoverageEnded) ||
        cobraStatus === 'canceled' ||
        cobraStatus === 'tpa-admin'
      ) {
        buttons = [
          {
            title: 'Manage',
            isHighlighted: false,
            linkTo: this.overviewPageLink(),
          },
        ];
      }
    } else if (isBorEmployeeAlreadyCovered || remainingDays >= 0) {
      buttons = [
        {
          title: 'Enroll',
          isHighlighted: false,
          linkTo: 'employee.cobraOverview.manage',
        },
      ];
    }

    return buttons;
  }
}

class CobraEmployeeVisionApp extends CobraEmployeeHealthApp {
  lineOfCoverage = 'vision';

  buttons() {
    if (this.subscription.preferences.hideButtons) {
      return [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: this.overviewPageLink(),
        },
      ];
    }
    let buttons: Button[] = [];
    const { cobraStatus } = this.subscription.preferences;
    let remainingDays = -1;
    const { cobraElectionDeadline } = this.subscription.preferences;
    const { isBorEmployeeAlreadyCovered } = this.subscription.preferences;
    const { hasCoverageEnded } = this.subscription.preferences;
    // const cancelationType = subscription.preferences.cancelationType;
    const today = moment().startOf('day');
    // make sure switch inbox_task_integration_cobra_employee is on, otherwise we need to redirect EE for renewal
    if (!this.switches.inbox_task_integration_cobra_employee) {
      const { isRenewalParticipant } = this.subscription.preferences;
      const { renewalDeadline } = this.subscription.preferences;
      let isPastEnrollmentDeadline = false;
      if (renewalDeadline) {
        const deadline = moment(renewalDeadline);
        if (today > deadline) {
          isPastEnrollmentDeadline = true;
        }
      }
      if (isRenewalParticipant && !isPastEnrollmentDeadline) {
        const { renewalStatus } = this.subscription.preferences;
        if (renewalStatus === 'initial' || renewalStatus === 'enrolling') {
          return [
            {
              title: 'Enroll',
              isHighlighted: false,
              linkTo: 'employee.cobraOverview.manage',
            },
          ];
        }
        return [
          {
            title: 'Manage',
            isHighlighted: false,
            linkTo: this.overviewPageLink(),
          },
        ];
      }
    }
    // end for renewal
    if (cobraElectionDeadline != null) {
      const lastDay = moment(cobraElectionDeadline);
      remainingDays = lastDay.diff(today, 'days');
    }

    // COBRA employee One Button
    if (cobraStatus) {
      if ((cobraStatus === 'declined' || cobraStatus === 'filling-out') && remainingDays >= 0) {
        buttons = [
          {
            title: 'Enroll',
            isHighlighted: false,
            linkTo: 'employee.cobraOverview.manage',
          },
        ];
      } else if (
        cobraStatus === 'submitted' ||
        (cobraStatus === 'enrolled' && !hasCoverageEnded) ||
        cobraStatus === 'canceled' ||
        cobraStatus === 'tpa-admin'
      ) {
        buttons = [
          {
            title: 'Manage',
            isHighlighted: false,
            linkTo: this.overviewPageLink(),
          },
        ];
      }
    } else if (isBorEmployeeAlreadyCovered || remainingDays >= 0) {
      buttons = [
        {
          title: 'Enroll',
          isHighlighted: false,
          linkTo: 'employee.cobraOverview.manage',
        },
      ];
    }

    return buttons;
  }
}

class LifeAndDisabilityEmployeeApp extends DashboardApp {
  linkToOverview: string;

  isChosen() {
    return true;
  }

  buttons() {
    return [
      {
        title: 'Manage',
        isHighlighted: false,
        linkTo: this.linkToOverview,
      },
    ];
  }
}

class LifeAdndEmployeeApp extends LifeAndDisabilityEmployeeApp {
  linkToOverview = 'employee.overview.lnd.newlife';
}

class DisabilityEmployeeApp extends LifeAndDisabilityEmployeeApp {
  linkToOverview = 'employee.overview.lnd.newdisability';
}

class TimeAttendanceAdminApp extends DashboardApp {
  buttons() {
    const overviewPageStatuses = [ZAppStatusEnum.OK, ZAppStatusEnum.ENROLLING];
    const { inheritedStatus } = this.subscription;
    if (overviewPageStatuses.indexOf(inheritedStatus) >= 0) {
      return [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'timeattendance.approver-overview',
        },
      ];
    } else if (inheritedStatus === ZAppStatusEnum.NOT_ENROLLED) {
      return [
        {
          title: 'Get Started',
          isHighlighted: false,
          linkTo: 'timeattendance.intro',
        },
      ];
    }
    return [];
  }
}

class TimeAttendanceEmployeeApp extends DashboardApp {
  buttons() {
    const { isApprover } = this.subscription.preferences;
    const { reportingMethod } = this.subscription.preferences;
    let link = 'timeattendanceemployee.employee-overview';

    if (isApprover && reportingMethod === 'NR') {
      link = 'timeattendance.approver-overview';
    }
    return [
      {
        title: 'Overview',
        isHighlighted: false,
        linkTo: link,
      },
    ];
  }
}

class PayrollAdminApp extends DashboardApp {
  buttons() {
    // const isSMP = subscription.appInstall.preferences.isSMP;
    const { state } = this.subscription.appInstall.preferences;
    const { inheritedStatus } = this.subscription;
    let buttons;

    if (state === 'zpayrollOnboardingSetup') {
      buttons = [
        {
          linkTo: 'payroll.setup',
        },
      ];
    } else if (state === 'zpayrollOnboardingPending') {
      buttons = [
        {
          linkTo: 'payroll.pendingTasks.overview',
        },
      ];
    } else if (inheritedStatus === ZAppStatusEnum.OK) {
      buttons = [
        {
          linkTo: 'payroll.overview',
        },
      ];
    } else {
      buttons = [
        {
          linkTo: 'payroll.intro',
        },
      ];
    }

    return buttons;
  }
}

class PayrollIntegrationsApp extends DashboardApp {
  buttons() {
    const { isSMP } = this.subscription.appInstall.preferences;
    const { state } = this.subscription.appInstall.preferences;
    const { inheritedStatus } = this.subscription;
    let buttons;

    if (isSMP) {
      buttons = [
        {
          linkTo: 'payrollIntegrations.dashboard',
        },
      ];
    } else if (state === 'isSyncStatusSuccess') {
      buttons = [
        {
          linkTo: 'payrollIntegrations.manage',
        },
      ];
    } else if (state === 'syncError') {
      buttons = [
        {
          linkTo: 'payrollIntegrations.sync.connect',
        },
      ];
    } else if (state === 'thirdPartyPayrollOnboardingSetup') {
      buttons = [
        {
          linkTo: 'payrollIntegrations.sync.setup.index',
        },
      ];
    } else if (state === 'thirdPartyPayrollOnboardingComplete') {
      buttons = [
        {
          linkTo: 'payrollIntegrations.sync.setup.paySchedules.complete',
        },
      ];
    } else if (inheritedStatus === ZAppStatusEnum.OK) {
      buttons = [
        {
          linkTo: 'payroll.overview',
        },
      ];
    } else {
      buttons = [
        {
          linkTo: 'payrollIntegrations.sync.selectProvider.intro',
        },
      ];
    }

    return buttons;
  }
}

class ZReferralProgramApp extends DashboardApp {
  buttons(): Button[] {
    return [
      {
        title: 'Refer',
        isHighlighted: false,
        linkTo: parseZenefitsUrl(this.subscription.appInstall.app.appUrl),
      },
    ];
  }
}

class PtoEmployeeApp extends DashboardApp {
  title() {
    return 'Vacation & Time Off';
  }

  buttons() {
    return [
      {
        title: 'Manage',
        isHighlighted: false,
        linkTo: 'employeePto.landing',
      },
    ];
  }
}

class PtoAdminApp extends DashboardApp {
  title() {
    return 'PTO Tracking';
  }

  buttons() {
    let title;
    let linkTo = 'pto.landing';
    if (this.subscription.inheritedStatus === ZAppStatusEnum.OK) {
      title = 'Manage';
    } else if (
      this.subscription.appInstall.status === ZAppStatusEnum.NOT_ENROLLED &&
      this.subscription.appInstall.preferences.wasPtoSetupComplete
    ) {
      title = 'Get Started';
      linkTo = 'pto.overview';
    } else {
      title = 'Resume';
    }
    return [
      {
        linkTo,
        title,
        isHighlighted: false,
      },
    ];
  }
}

class SchedulingAdminApp extends DashboardApp {
  showIfSwitchEnabled = 'time_scheduling';

  buttons() {
    return [
      {
        title: 'Manage',
        isHighlighted: false,
        linkTo: '/app/scheduling/#/scheduling/people/?mode=1',
      },
    ];
  }
}

class SchedulingEmployeeApp extends DashboardApp {
  showIfSwitchEnabled = 'time_scheduling';

  buttons() {
    return [
      {
        title: 'Overview',
        isHighlighted: false,
        linkTo: '/app/scheduling/#/people',
      },
    ];
  }
}

class CobraAdminApp extends DashboardApp {
  isChosen() {
    return this.subscription.appInstall.preferences.chosen;
  }

  buttons() {
    let buttons: Button[] = [];
    const { cobraStatus } = this.subscription.appInstall.preferences;
    const corbraEmployeeCount = this.subscription.appInstall.preferences.cobraEmps || 0;

    if (cobraStatus === 'confirmed') {
      buttons = [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'cobra.participants',
        },
      ];
    } else if (!cobraStatus || cobraStatus === '' || cobraStatus === 'third-party') {
      if (corbraEmployeeCount) {
        buttons = [
          {
            title: 'Manage',
            isHighlighted: false,
            linkTo: 'cobra.participants',
          },
        ];
      } else {
        buttons = [
          {
            title: 'Manage',
            isHighlighted: false,
            linkTo: 'cobraIntro',
          },
        ];
      }
    } else if (cobraStatus === 'requested' || cobraStatus === 'setup' || cobraStatus === 'filling-out') {
      if (corbraEmployeeCount) {
        buttons = [
          {
            title: 'Manage',
            isHighlighted: false,
            linkTo: 'cobra.participants',
          },
        ];
      } else {
        buttons = [
          {
            title: 'Manage',
            isHighlighted: false,
            linkTo: 'cobra.manage',
          },
        ];
      }
    }
    return buttons;
  }
}

class EmployeesApp extends DashboardApp {
  buttons() {
    let buttons: Button[] = [];
    buttons = [
      {
        title: 'View',
        isHighlighted: false,
        linkTo: 'employeedirectory',
      },
    ];
    return buttons;
  }
}

class DocumentsAdminApp extends DashboardApp {
  showIfSwitchEnabled = 'documents_main_app_card';

  buttons() {
    return [
      {
        title: 'Documents',
        isHighlighted: false,
        linkTo: 'documents',
      },
    ];
  }
}

class DeductionsAdminApp extends DashboardApp {
  buttons() {
    return [
      {
        linkTo: 'deductions',
      },
    ];
  }
}

class CommunityApp extends DashboardApp {
  showIfSwitchEnabled = 'show_community_app';

  buttons() {
    return [
      {
        title: 'Community',
        isHighlighted: false,
        linkTo: 'https://community.zenefits.com/',
      },
    ];
  }
}

class HelpCenterApp extends DashboardApp {
  showIfSwitchEnabled = 'show_help_center_app';

  buttons() {
    return [
      {
        title: 'Help Center',
        isHighlighted: false,
        linkTo: '/app/support-flow/#/home',
      },
    ];
  }
}

class InfluitiveSsoApp extends DashboardApp {
  showIfSwitchEnabled = 'show_influitive_sso_app';

  buttons() {
    return [
      {
        title: 'Influitive',
        isHighlighted: false,
        linkTo: this.subscription.appInstall.app.appUrl,
      },
    ];
  }
}

class TalentAdminApp extends DashboardApp {
  buttons() {
    return [
      {
        title: 'Performance Management',
        isHighlighted: false,
        linkTo: 'talent-intro',
      },
    ];
  }
}

class TalentEmployeeApp extends DashboardApp {
  buttons() {
    return [
      {
        title: 'Performance Management',
        isHighlighted: false,
        linkTo: '/app/talent/#/overview',
      },
    ];
  }
}

class WellbeingAdminApp extends DashboardApp {
  buttons() {
    return [
      {
        title: 'Well-being',
        isHighlighted: false,
        linkTo: '/app/well-being/#/overview',
      },
    ];
  }
}

class WellbeingEmployeeApp extends DashboardApp {
  buttons() {
    return [
      {
        title: 'Well-being',
        isHighlighted: false,
        linkTo: '/app/well-being/#/overview',
      },
    ];
  }
}

class ResourceCenterApp extends DashboardApp {
  showIfSwitchEnabled = 'resource_center';
}

class PeopleAnalyticsAdminApp extends DashboardApp {
  buttons() {
    return [
      {
        title: 'Compensation Management',
        isHighlighted: false,
        linkTo: '/app/people-analytics/#/',
      },
    ];
  }
}

class HRAnalyticsAdminApp extends DashboardApp {
  showIfSwitchEnabled = 'show_hr_analytics';

  buttons() {
    return [
      {
        title: 'HR Analytics',
        isHighlighted: false,
        linkTo: '/app/hr-analytics/#/',
      },
    ];
  }
}

class TotalRewardStatementAdminCard extends DashboardApp {
  buttons() {
    return [
      {
        title: 'Total Reward Statement',
        isHighlighted: false,
        linkTo: '/app/trs/#/',
      },
    ];
  }
}

class HiringApp extends DashboardApp {
  buttons() {
    return [
      {
        title: 'Hire',
        isHighlighted: false,
        linkTo: 'onboarding.overview',
      },
    ];
  }
}

class UnicardCommuterAdminApp extends DashboardApp {
  buttons() {
    let buttons;
    if (this.subscription.inheritedStatus === ZAppStatusEnum.OK) {
      buttons = [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'ucommutersettings.overview',
        },
      ];
    } else if (this.subscription.inheritedStatus === ZAppStatusEnum.ENROLLING) {
      const { status } = this.subscription.appInstall.preferences;
      let redirectRoute = 'ucommuter.company';
      if (status === 'emails') {
        redirectRoute = 'ucommuteremails';
      } else if (this.switches.commuter_admin_setup_v2) {
        redirectRoute = 'ucommuterSetup.planDetails';
      }
      buttons = [
        {
          title: 'Resume',
          isHighlighted: false,
          linkTo: redirectRoute,
        },
      ];
    } else {
      buttons = [
        {
          title: 'Get Started',
          isHighlighted: false,
          linkTo: 'commuter.intro',
        },
      ];
    }
    return buttons;
  }
}

class UnicardCommuterEmployeeApp extends DashboardApp {
  buttons() {
    let buttons;
    if (this.subscription.inheritedStatus === ZAppStatusEnum.OK) {
      buttons = [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'employee.ucommutersettings.overview',
        },
      ];
    } else if (this.subscription.inheritedStatus === ZAppStatusEnum.ENROLLING) {
      buttons = [
        {
          title: 'Resume',
          isHighlighted: false,
          linkTo: 'employee.ucommuter.basicinfo',
        },
      ];
    } else {
      buttons = [
        {
          title: 'Get Started',
          isHighlighted: false,
          linkTo: 'employee.ucommuterIntro',
        },
      ];
    }
    return buttons;
  }
}

class FsaAdminApp extends DashboardApp {
  notification(): any {
    return null;
  }

  buttons() {
    let buttons;
    let redirectLink;
    if (this.subscription.inheritedStatus === ZAppStatusEnum.OK) {
      buttons = [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'fsasettings.overview',
        },
      ];
    } else if (this.subscription.inheritedStatus === ZAppStatusEnum.ENROLLING) {
      const { currentPlanStatus } = this.subscription.appInstall.preferences;
      redirectLink = 'fsasetup.company';
      // emails or filling-out
      if (currentPlanStatus === 'emails') {
        redirectLink = 'fsasetupemails';
      }
      buttons = [
        {
          title: 'Resume',
          isHighlighted: false,
          linkTo: redirectLink,
        },
      ];
    } else {
      redirectLink = 'fsaIntro';
      if (this.subscription.appInstall.preferences.redirectRoute) {
        redirectLink = this.subscription.appInstall.preferences.redirectRoute;
      }
      buttons = [
        {
          title: 'Get Started',
          isHighlighted: false,
          linkTo: redirectLink,
        },
      ];
    }
    return buttons;
  }
}

class FsaEmployeeApp extends DashboardApp {
  notification(): any {
    return null;
  }

  buttons() {
    const { hideButtonPrimary } = this.subscription.preferences;
    const { redirectRoutePrimary } = this.subscription.preferences;
    const { buttonMessagePrimary } = this.subscription.preferences;
    const { isHighlightedPrimary } = this.subscription.preferences;

    const buttons: Button[] = [];
    if (!hideButtonPrimary && redirectRoutePrimary && buttonMessagePrimary) {
      buttons.push({
        title: buttonMessagePrimary,
        isHighlighted: isHighlightedPrimary,
        linkTo: redirectRoutePrimary,
      });
    }

    return buttons;
  }
}

class HsaAdminApp extends DashboardApp {
  buttons() {
    let buttons;
    if (this.subscription.inheritedStatus === ZAppStatusEnum.OK) {
      buttons = [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'hsaSettings.overview',
        },
      ];
    } else if (this.subscription.inheritedStatus === ZAppStatusEnum.ENROLLING) {
      const { status } = this.subscription.appInstall.preferences;
      let redirectRoute = 'hsa.company';
      if (status === 'emails') {
        redirectRoute = 'hsaemailspreview';
      }
      buttons = [
        {
          title: 'Resume',
          isHighlighted: false,
          linkTo: redirectRoute,
        },
      ];
    } else {
      buttons = [
        {
          title: 'Get Started',
          isHighlighted: false,
          linkTo: 'hsaIntro',
        },
      ];
    }
    return buttons;
  }
}

class HsaEmployeeApp extends DashboardApp {
  buttons() {
    const { hideButton } = this.subscription.preferences;
    const { redirectRoute } = this.subscription.preferences;
    const { buttonMessage } = this.subscription.preferences;
    const { isHighlighted } = this.subscription.preferences;
    let buttons: Button[] = [];

    if (!hideButton && redirectRoute && buttonMessage) {
      buttons = [
        {
          isHighlighted,
          title: buttonMessage,
          linkTo: redirectRoute,
        },
      ];
    }

    return buttons;
  }
}

class HraAdminApp extends DashboardApp {
  notification(): any {
    return null;
  }

  buttons() {
    let buttons;
    if (this.subscription.inheritedStatus === ZAppStatusEnum.OK) {
      buttons = [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'hrasettings.overview',
        },
      ];
    } else if (this.subscription.inheritedStatus === ZAppStatusEnum.ENROLLING) {
      const { currentPlanStatus } = this.subscription.appInstall.preferences;
      let redirectLink = 'hrasetup.company';
      // emails or filling-out
      if (currentPlanStatus === 'emails') {
        redirectLink = 'hrasetupemails';
      }
      buttons = [
        {
          title: 'Resume',
          isHighlighted: false,
          linkTo: redirectLink,
        },
      ];
    } else {
      buttons = [
        {
          title: 'Get Started',
          isHighlighted: false,
          linkTo: 'hraIntro',
        },
      ];
    }
    return buttons;
  }
}

class HraEmployeeApp extends DashboardApp {
  notification(): any {
    return null;
  }

  buttons() {
    const { hideButtonPrimary } = this.subscription.preferences;
    const { redirectRoutePrimary } = this.subscription.preferences;
    const { buttonMessagePrimary } = this.subscription.preferences;
    const { isHighlightedPrimary } = this.subscription.preferences;

    // const hideButtonSecondary = subscription.preferences.hideButtonSecondary;
    // const redirectRouteSecondary = subscription.preferences.redirectRouteSecondary;
    // const buttonMessageSecondary = subscription.preferences.buttonMessageSecondary;
    // const isHighlightedSecondary = subscription.preferences.isHighlightedSecondary;

    const buttons: Button[] = [];
    if (!hideButtonPrimary && redirectRoutePrimary && buttonMessagePrimary) {
      buttons.push({
        title: buttonMessagePrimary,
        isHighlighted: isHighlightedPrimary,
        linkTo: redirectRoutePrimary,
      });
    }

    return buttons;
  }
}

class ContractorAdminApp extends DashboardApp {
  buttons() {
    let buttons;
    if (this.subscription.appInstall.preferences.canAccessContractorAdminCardDirectly) {
      buttons = [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'contractors.new',
        },
      ];
    } else {
      buttons = [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'contractors_intro',
        },
      ];
    }
    return buttons;
  }
}

class HrAdvisorApp extends DashboardApp {
  buttons() {
    let buttons;
    if (this.subscription.appInstall.preferences.isEnrolled) {
      buttons = [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'hrAdvisor.product.overview',
        },
      ];
    } else {
      buttons = [
        {
          title: 'Sign Up',
          isHighlighted: false,
          linkTo: 'hrAdvisor.intro',
        },
      ];
    }
    return buttons;
  }
}

class F01kAdminApp extends DashboardApp {
  buttons() {
    // This is a workaround to resolve the conflicts between changing routes and installed Zapps preferences
    const routesTranslationMapping: { [key: string]: string } = {
      'company401kManage.overview': 'company401k.manage.overview',
      'company401k.company': 'company401k.newEnrollment.company',
      company401kEmployeeEmails: 'company401k.newEnrollment.employeeEmails',
      company401kAddExistingIntro: 'company401k.addExisting.intro',
      company401kIntro: 'company401k.newEnrollment.intro',
      connectpayrollfor401k: 'company401k.newEnrollment.connectPayroll',
    };

    let { buttonText } = this.subscription.preferences;
    let { buttonRoute } = this.subscription.preferences;
    let { secondButtonText } = this.subscription.preferences;
    let { secondButtonRoute } = this.subscription.preferences;
    //  TODO @wdu Because we currently suspend the signup process, when the isSupeneded computed
    //  property is true, we simply
    // display one button that says 'Learn More'. When we turn on the signup process again,
    // delete the code below
    const isSuspended =
      buttonText === 'Add Existing' ||
      (buttonText === 'Resume' &&
        (buttonRoute === 'company401k.newEnrollment.company' || buttonRoute === 'company401k.company'));

    if (isSuspended) {
      buttonText = 'Learn More';
      buttonRoute = 'company401k.manage.learnMore';
      secondButtonText = '';
    }

    let buttons: Button[] = [];
    if (buttonText) {
      if (buttonRoute in routesTranslationMapping) {
        buttonRoute = routesTranslationMapping[buttonRoute];
      }
      buttons = [
        {
          title: buttonText,
          isHighlighted: false,
          linkTo: buttonRoute,
        },
      ];
      if (secondButtonText) {
        if (secondButtonRoute in routesTranslationMapping) {
          secondButtonRoute = routesTranslationMapping[secondButtonRoute];
        }
        buttons.push({
          title: secondButtonText,
          isHighlighted: false,
          linkTo: secondButtonRoute,
        });
      }
    }
    return buttons;
  }
}

class F01kEmployeeApp extends DashboardApp {
  buttons() {
    const { buttonText } = this.subscription.preferences;
    let { buttonRoute } = this.subscription.preferences;
    let buttons: Button[] = [];
    if (buttonText) {
      // This is a workaround to resolve the conflicts between changing routes and installed Zapps preferences
      // TODO: change to urls
      const routesTranslationMapping: { [key: string]: string } = {
        'employee.employee401kManage.overview': 'employee.401k.manage.overview',
        'employee.employee401kIntro': 'employee.401k.intro',
        'employee.employee401k.basicinfo': 'employee.401k.setup.basicinfo',
      };
      if (buttonRoute in routesTranslationMapping) {
        buttonRoute = routesTranslationMapping[buttonRoute];
      }
      buttons = [
        {
          title: buttonText,
          isHighlighted: false,
          linkTo: buttonRoute,
        },
      ];
    }
    return buttons;
  }
}

class AcaAdminApp extends DashboardApp {
  buttons() {
    let buttons;
    const { inheritedStatus } = this.subscription;
    if (inheritedStatus === ZAppStatusEnum.OK) {
      buttons = [
        {
          title: 'Manage',
          isHighlighted: false,
          linkTo: 'acacompliance.overview',
        },
      ];
    } else if (inheritedStatus === ZAppStatusEnum.ENROLLING) {
      buttons = [
        {
          title: 'Resume',
          isHighlighted: false,
          linkTo: 'acacompliancesetup.index',
        },
      ];
    } else {
      buttons = [
        {
          title: 'Get Started',
          isHighlighted: false,
          linkTo: 'acacompliancesetup.index',
        },
      ];
    }
    return buttons;
  }
}

class ZenefitsForManagersApp extends DashboardApp {
  buttons() {
    return [
      {
        title: 'View',
        isHighlighted: false,
        linkTo: 'employeedirectory',
      },
    ];
  }
}

class HiringForManagersApp extends DashboardApp {
  buttons() {
    return [
      {
        title: 'Hire',
        isHighlighted: false,
        linkTo: 'onboarding.overview',
      },
    ];
  }
}

class HealthInsuranceEmployeeApp extends DashboardApp {
  title() {
    return this.subscription.preferences.title;
  }

  buttons() {
    return this.subscription.preferences.buttons;
  }

  cardBlockReasonKey() {
    return this.subscription.preferences.cardBlockReasonKey;
  }
}

class SupplementalInsuranceEmployeeApp extends DashboardApp {
  buttons() {
    return [
      {
        title: 'Supplemental',
        isHighlighted: false,
        linkTo: 'employee-supplemental',
      },
    ];
  }
}

export function getApp(subscription: Subscription, switches: any) {
  const appMap: { [appPath: string]: typeof DashboardApp } = {
    '1.com.zenefits.AcaAdmin': AcaAdminApp,
    '1.com.zenefits.BusinessIntelligenceAdmin': DashboardApp,
    '1.com.zenefits.BusinessInsuranceAdmin': BusinessInsuranceAdminApp,
    '1.com.zenefits.CobraAdmin': CobraAdminApp,
    '1.com.zenefits.CobraEmployee': CobraEmployeeApp,
    '1.com.zenefits.CobraEmployeeMedical': CobraEmployeeMedicalApp,
    '1.com.zenefits.CobraEmployeeDental': CobraEmployeeDentalApp,
    '1.com.zenefits.CobraEmployeeVision': CobraEmployeeVisionApp,
    '1.com.zenefits.ContractorsAdmin': ContractorAdminApp,
    '1.com.zenefits.DocumentsAdmin': DocumentsAdminApp,
    '1.com.zenefits.DeductionsAdmin': DeductionsAdminApp,
    '1.com.zenefits.Employees': EmployeesApp,
    '1.com.zenefits.FsaAdmin': FsaAdminApp,
    '1.com.zenefits.FsaEmployee': FsaEmployeeApp,
    '1.com.zenefits.Hiring': HiringApp,
    '1.com.zenefits.HraAdmin': HraAdminApp,
    '1.com.zenefits.HrAdvisor': HrAdvisorApp,
    '1.com.zenefits.HraEmployee': HraEmployeeApp,
    '1.com.zenefits.HsaAdmin': HsaAdminApp,
    '1.com.zenefits.HsaEmployee': HsaEmployeeApp,
    '1.com.zenefits.LifeAndDisabilityAdmin': LifeAndDisabilityAdminApp,
    '1.com.zenefits.PayrollAdmin': PayrollAdminApp,
    '1.com.zenefits.PayrollIntegrations': PayrollIntegrationsApp,
    '1.com.zenefits.F01kAdmin': F01kAdminApp,
    '1.com.zenefits.F01kEmployee': F01kEmployeeApp,
    '1.com.zenefits.LifeAdndEmployee': LifeAdndEmployeeApp,
    '1.com.zenefits.DisabilityEmployee': DisabilityEmployeeApp,
    '1.com.zenefits.PtoAdmin': PtoAdminApp,
    '1.com.zenefits.PtoEmployee': PtoEmployeeApp,
    '1.com.zenefits.StockOptionAdmin': StockOptionAdminApp,
    '1.com.zenefits.StockOptionEmployee': StockOptionEmployeeApp,
    '1.com.zenefits.TimeAttendanceAdmin': TimeAttendanceAdminApp,
    '1.com.zenefits.TimeAttendanceEmployee': TimeAttendanceEmployeeApp,
    '1.com.zenefits.SchedulingAdmin': SchedulingAdminApp,
    '1.com.zenefits.SchedulingEmployee': SchedulingEmployeeApp,
    '1.com.zenefits.UnicardCommuterAdmin': UnicardCommuterAdminApp,
    '1.com.zenefits.UnicardCommuterEmployee': UnicardCommuterEmployeeApp,
    '1.com.zenefits.ZenefitsForManagers': ZenefitsForManagersApp,
    '1.com.zenefits.HiringForManagers': HiringForManagersApp,
    '1.com.zenefits.MedicalInsuranceEmployee': HealthInsuranceEmployeeApp,
    '1.com.zenefits.SupplementalInsuranceEmployee': SupplementalInsuranceEmployeeApp,
    '1.com.zenefits.DentalInsuranceEmployee': HealthInsuranceEmployeeApp,
    '1.com.zenefits.VisionInsuranceEmployee': HealthInsuranceEmployeeApp,
    '1.com.zenefits.ZReferralProgram': ZReferralProgramApp,
    '1.com.zenefits.MedicalInsuranceAdmin': MedicalInsuranceAdminApp,
    '1.com.zenefits.CompanyAdmin': CompanyAdminApp,
    '1.com.zenefits.ComplianceAdmin': ComplianceAdminApp,
    '1.com.zenefits.Core': DashboardApp,
    '1.com.zenefits.Community': CommunityApp,
    '1.com.zenefits.HelpCenter': HelpCenterApp,
    '1.com.zenefits.TalentAdmin': TalentAdminApp,
    '1.com.zenefits.TalentEmployee': TalentEmployeeApp,
    '1.com.zenefits.WellbeingAdmin': WellbeingAdminApp,
    '1.com.zenefits.WellbeingEmployee': WellbeingEmployeeApp,
    '1.com.zenefits.Influitive': InfluitiveSsoApp,
    '1.com.zenefits.PeopleAnalyticsAdmin': PeopleAnalyticsAdminApp,
    '1.com.zenefits.HRAnalyticsAdmin': HRAnalyticsAdminApp,
    '1.com.zenefits.TotalRewardStatementAdmin': TotalRewardStatementAdminCard,
    '1.com.zenefits.ResourceCenter': ResourceCenterApp,
  };

  const AppConstructor = appMap[subscription.appInstall.app.uniqueId] || DashboardApp;
  return new AppConstructor(subscription, switches);
}

export function getDashboardApps(subscriptions: any, switches: any, isSpoofing: boolean): DashboardApp[] {
  return subscriptions
    .filter((sub: any) => {
      const isFirstParty = sub.appInstall.app.uniqueId.startsWith('1.');
      const isFirstPartyDisabled =
        isFirstParty &&
        (sub.inheritedStatus === ZAppStatusEnum.DISABLED || sub.inheritedStatus === ZAppStatusEnum.DELETED);
      return !isFirstPartyDisabled;
    })
    .filter((sub: any) => !isSpoofing || get(sub, PREF_SPOOFABLE))
    .map((sub: any) => getApp(sub, switches));
}
