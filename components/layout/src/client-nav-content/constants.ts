export const PREF_SPOOFABLE = 'appInstall.app.preferences._spoofable';
export const MAINTENANCE = 15;

export const ADMIN = 'ADM';
export const EMPLOYEE = 'EMP';

export const ZAppStatusEnum = {
  DELETED: 0,
  DISABLED: 10,
  INITIALIZING: 25,
  NOT_ENROLLED: 50,
  ENROLLING: 100,
  OK: 200,
};

// from client-app/boot/mixins/product-cards-and-navigation-controller.js in yourPeople3
export const ZAPP_ORDER = [
  /* Admin Apps: */
  '1.com.zenefits.CompanyAdmin',
  '1.com.zenefits.Employees',
  '1.com.zenefits.DocumentsAdmin',
  '1.com.zenefits.PayrollAdmin',
  '1.com.zenefits.PayrollIntegrations',
  '1.com.zenefits.TimeAttendanceAdmin',
  '1.com.zenefits.SchedulingAdmin',
  '1.com.zenefits.PtoAdmin',
  '1.com.zenefits.Hiring',
  '1.com.zenefits.MedicalInsuranceAdmin',
  '1.com.zenefits.LifeAndDisabilityAdmin',
  // '1.com.zenefits.CobraAdmin',
  '1.com.zenefits.AcaAdmin',
  '1.com.zenefits.BusinessInsuranceAdmin',
  '1.com.zenefits.HrAdvisor',
  '1.com.zenefits.BusinessIntelligenceAdmin',
  '1.com.zenefits.UnicardCommuterAdmin',
  '1.com.zenefits.FsaAdmin',
  '1.com.zenefits.HsaAdmin',
  '1.com.zenefits.HraAdmin',
  '1.com.zenefits.F01kAdmin',
  '1.com.zenefits.ContractorsAdmin',
  '1.com.zenefits.DeductionsAdmin',
  '1.com.zenefits.TalentAdmin',
  '1.com.zenefits.WellbeingAdmin',
  '1.com.zenefits.Influitive',
  '1.com.zenefits.PeopleAnalyticsAdmin',
  '1.com.zenefits.HRAnalyticsAdmin',
  '1.com.zenefits.TotalRewardStatementAdmin',
  // 'Celebrations',

  /* Employee Apps: */
  '1.com.zenefits.PersonalInfo',
  // '1.com.zenefits.BankAndTax',
  '1.com.zenefits.Paystubs',
  '1.com.zenefits.PtoEmployee',
  '1.com.zenefits.HiringForManagers',
  '1.com.zenefits.TimeAttendanceEmployee',
  '1.com.zenefits.SchedulingEmployee',
  '1.com.zenefits.EmployeeDirectory',
  '1.com.zenefits.ZenefitsForManagers',
  '1.com.zenefits.MedicalInsuranceEmployee',
  '1.com.zenefits.DentalInsuranceEmployee',
  '1.com.zenefits.VisionInsuranceEmployee',
  // '1.com.zenefits.LifeAndDisabilityEmployee',	//Deprecated?
  '1.com.zenefits.LifeAdndEmployee',
  '1.com.zenefits.DisabilityEmployee',
  '1.com.zenefits.SupplementalInsuranceEmployee',
  // '1.com.zenefits.CobraEmployee',
  // '1.com.zenefits.CobraEmployeeMedical',
  // '1.com.zenefits.CobraEmployeeDental',
  // '1.com.zenefits.CobraEmployeeVision',
  '1.com.zenefits.UnicardCommuterEmployee',
  '1.com.zenefits.FsaEmployee',
  '1.com.zenefits.HsaEmployee',
  '1.com.zenefits.HraEmployee',
  '1.com.zenefits.F01kEmployee',
  '1.com.zenefits.BusinessIntelligenceManager',
  '1.com.zenefits.ZReferralProgram',
  '1.com.zenefits.ComplianceAdmin',
  '1.com.zenefits.Community',
  '1.com.zenefits.HelpCenter',
  '1.com.zenefits.TalentEmployee',
  '1.com.zenefits.WellbeingEmployee',
  '1.com.zenefits.ResourceCenter',
];
