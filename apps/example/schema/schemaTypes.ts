/* tslint:disable */

/** Dummy DateTime, represented as a string */
export type DateTime = any;

/** Dummy Date, represented as a string */
export type Date = any;

/** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
export type JSON = any;

export type Decimal = any;

/** Dummy Time, represented as a string */
export type Time = any;

export interface Plan_Rate {
  id?: string | null;
  flatPremium?: string | null;
  gender?: string | null;
  enrolleeType?: string | null;
  effectiveStartDate?: string | null;
  effectiveEndDate?: string | null;
  ageMin?: number | null;
  ageMax?: number | null;
  resource_uri?: string | null;
}

export interface PlanRate {
  id?: string | null;
  flatPremium?: string | null;
  gender?: string | null;
  enrolleeType?: string | null;
  effectiveStartDate?: string | null;
  effectiveEndDate?: string | null;
  ageMin?: number | null;
  ageMax?: number | null;
  resource_uri?: string | null;
}

export interface IQFQuestionResponse {
  id: string;
  questionId?: string | null;
  sectionId?: string | null;
  contextId?: string | null;
  response: JSON;
  createdAt: DateTime;
  createdBy: AllEmployee;
}

export interface IQFSession {
  status?: QFSessionStatus | null;
  responses: QFQuestionResponse[];
  comments: QFComment[];
  completedAt?: DateTime | null;
}

export interface Query {
  dashboard?: Dashboard | null;
  currentZenefitsEmployee?: ZenefitsEmployee | null;
  prerequisiteRedirect?: JSON | null;
  company?: Company | null /** employeeImpersonations: [EmployeeImpersonation]inboxActionPartials: [InboxActionPartial]zAppInstallSubscriptions: [ZAppInstallSubscription]pageHelpArticles: [PageHelpArticle]zAppActionUrls: [ZAppActionUrl]spoof_machines(machineCategory: SpoofMachineCategory): [SpoofMachine]inbox_action(id: ID): InboxAction */;
  employee?: AllEmployee | null;
  filterEmployee?: FilterEmployee | null;
  signature?: Signature | null;
  rolesPermissionsData?: RolesPermissionsData | null;
  flow?: Flow | null /** Flow & Wizard framework */;
  searchClients?: (SearchClientsResult | null)[] | null;
  inboxTask?: InboxTask | null;
  inboxActionComments?: InboxActionComment[] | null;
  qualifyingEvents?: (QualifyingEvent | null)[] | null;
  filteredCompanies?: (Company | null)[] | null /** Query for inbox task items for partner dashboard */;
  inboxTaskSearch?: InboxTaskSearchResult | null;
  getPDFInfo?: PdfInfo | null;
  fulfillmentTaskEmployees: FulfillmentTaskEmployee[] /** employees to be used for filtering partner dashboard fulfillment tasks */;
  autocompletedCompanies: SuggestedCompany[];
  benefitsEnrollments?: (BenefitsEnrollment | null)[] | null;
  benefitsTransaction?: BenefitsTransaction | null;
  benefitsTransactions?: (BenefitsTransaction | null)[] | null;
  restrictionDataForEmployeeAndDependents?: RestrictionData | null;
  employeeBenefitsHsaInfo?: EmployeeHsaInfo | null;
  benefitsAuditErrors: AuditError[];
  etaTasks: EtaTasks[];
  partner: Partner;
  partnerUser: PartnerUser;
  fetchPartnerInfo: PartnerInfo;
  employeeStatus: EmployeeStatusInfo;
  employeeHealthEnrollments?: (EmployeeHealthEnrollment | null)[] | null /** Query for benconnect */;
  employeeBenefitsEnrollments?: (EmployeeBenefitsEnrollment | null)[] | null;
  companyBenefitsCost?: (CompanyBenefitsCost | null)[] | null;
  cobraThirdPartyAdministrators?: (CobraThirdPartyAdministrator | null)[] | null;
  cobraClassificationType?: CobraClassification | null;
  companyTags?: (CompanyTag | null)[] | null;
  employeeTags?: (EmployeeTag | null)[] | null;
  talent: Talent /** Talent */;
  talentPermission: TalentPermission;
  review?: Review | null;
  reviewTemplates: ReviewTemplate[];
  reviews: Review[];
  goals: Goal[];
  questionFlows: QuestionFlow[];
  meetingSpaces: MeetingSpace[];
  meetingSpace: MeetingSpace;
  wellbeingAssessments: WellbeingAssessment[];
  wellbeingLifeEvents: WellbeingLifeEvent[];
  wellbeingLifeEvent: WellbeingLifeEvent;
  wellbeingAssessment: WellbeingAssessment;
  wellbeingArticle?: WellbeingArticle | null;
  wellbeingFeaturedArticles: WellbeingArticle[];
  fulfillmentTaskAssignees?: (FilterEmployee | null)[] | null /** Fulfillment Log */;
  fulfillmentTaskViewers?: (FilterEmployee | null)[] | null;
  fulfillmentTaskCarriers?: FulfillmetTaskCarrier[] | null;
  benefitsFulfillmentDetails?: (BenefitsFulfillmentInfo | null)[] | null;
  companyRateVersion?: CompanyRateVersion | null /** Rates Table in Benconnect */;
  companyHealthPlan?: CompanyHealthPlan | null;
  benefitsFormMapperGetDataFields?: DataFields | null;
  benefitsFormMapperStpFormTemplateQuery?: StpFormTemplate | null;
  benefitsFormMapperStpInputFieldsAndOperators?: StpInputFieldsAndOperators | null;
  benefitsFormMapperGetFieldOnPdfForm?: (StpFieldMapping | null)[] | null;
  zPayrollCompanySearch?: ZPayrollCompanySearchResult | null /** Query for ZpayrollCompanies */;
  zpCompany?: ZPayrollCompany | null;
  companyImplementationOverviewSearch?: CompanyImplementationOverviewSearchResult | null /** Queries for Implementation Dashboard */;
  companyImplementationOverview?: CompanyImplementationOverview | null;
  allZScoreCompanies?: (ZScoreCompany | null)[] | null /** Queries for ZScore App */;
  allZScoreCategories?: (ZScoreCategory | null)[] | null;
  zScoreCompany?: ZScoreCompany | null;
  allZScoresForCompany?: (ZScoreReduced | null)[] | null;
  paGetIndustries?: IndustryData | null /** People Analytics Appclient app */;
  paGetLocations?: LocationData | null;
  paGetJobFamily?: JobFamilyData | null;
  paGetJobLevel?: JobLevelData | null;
  paGetCompanyConfig?: CompanyConfig | null;
  paGetCompanyTitleLevelMapping?: CompanyJobTitleMapping | null;
  paGetEmployeeTitleLevelMapping?: EmployeeJobTitle | null;
  paGetJobTitleSuggestions?: (JobTitleSuggestion | null)[] | null;
  paSalaryBenchmarking?: EmployeeJobTitleMapping | null;
  paJobLevelSalaryBenchmark?: (JobLevelSalaryMapping | null)[] | null;
  paGetCompanyDataMetrics?: (CompanyDataMetrics | null)[] | null;
  paGetSalaryBenchmarkingBlacklist?: SalaryBenchmarkingBlacklistData | null;
  paGetSalaryBenchmark?: SalaryBenchmarkAggr | null;
  paConsoleGetCompanyConfig?: CompanyConfig | null /** console app */;
  paConsoleGetCompanyTitleLevelMapping?: CompanyJobTitleMapping | null;
  paConsoleAppInstall?: PaAppInstall | null;
  dealsForCompany?: (ProductDeal | null)[] | null /** Queries for zenmarket */;
  dealsForEmployee?: (ProductDeal | null)[] | null;
  getDeals?: (ProductDeal | null)[] | null;
  productCategories?: (ProductCategory | null)[] | null;
  filterParams?: (Filter | null)[] | null;
  currentUserCompany?: (CurrentUserCompany | null)[] | null;
  currentUserEmployeeDetails?: EmployeeDetails | null;
  productCategoryOptions?: JSON | null;
  metaKeysForProduct?: (string | null)[] | null;
  matchingCriteriaChoices?: JSON | null;
  matchingCriteriaForm?: JSON | null;
  getMyDeals?: (MyDeal | null)[] | null;
  isCompanyAdmin?: boolean | null;
  allProductDetailsAndOptions?: JSON | null;
  metaKeysForCategory?: (string | null)[] | null;
  productDetails?: JSON | null;
  companySetupTasks: FlowSection[] /** Queries for company_setup */;
  companySetupPTOPlan?: CompanySetupPTOPlan | null;
  companySetupEmployeeStats?: CompanySetupEmployeeStats | null;
  companySetupInviteEmailRecipients?: (CompanySetupInviteEmailRecipients | null)[] | null;
  companySetupReminderEmailRecipients?: (CompanySetupReminderEmailRecipients | null)[] | null;
  isEnrolledInTimeAndPYP?: boolean | null;
  getPayrollBankSetupStatus: PayrollBankSetUpStatus;
  documentsInfo?: DocumentInfo[] | null /** Documents App */;
  companyAdmins: (CompanyAdmin | null)[];
  docActionHistory: (DocActionHistory | null)[];
  getChatStatus?: chatStatus | null;
  businessHours?: holidayInfo | null;
  groupTypes: GroupType[] /** Groups */;
  groups: Group[];
  membership?: Group[] | null;
  adherenceReportFormData?: AdherenceReportFormData | null /** Time Scheduling App Queries */;
  currentSchedulingCompany: SchedulingCompany;
  currentSchedulingEmployee: SchedulingEmployee;
  listSchedulingEmployees: SchedulingEmployee[];
  listSchedulingPositions: Group[];
  listSchedulingShifts: SchedulingShift[];
  getPlaidEnvironment: PlaidEnvironment /** Queries for Payroll */;
  getPayrollBankInfo: BankAccountInfo;
}

export interface Dashboard {
  id?: string | null;
  user_id?: string | null;
  user?: User | null;
  company?: Company | null;
  isSpoofing?: boolean | null;
  demoSourceType?: string | null;
  isDemoAccount?: boolean | null;
  isMTAUser?: boolean | null;
  isMTAPartnerUser?: boolean | null;
  partner?: Partner | null;
  partnerUser?: PartnerUser | null;
  isConsoleUser?: boolean | null;
  employee?: AllEmployee | null;
  switches?: JSON | null;
  emailVerified?: boolean | null;
  features?: JSON | null;
  permission?: JSON | null;
  profile?: JSON | null;
  userIntercomHash?: string | null;
  sessionId?: string | null /** hash of the actual sessionId */;
  employees?: (AllEmployee | null)[] | null;
  zAppInstallSubscriptions?: (ZAppInstallSubscription | null)[] | null;
}

export interface User {
  first_name?: string | null;
  last_name?: string | null;
  is_active?: boolean | null;
  id?: string | null;
  objId?: number | null;
  email?: string | null;
}

export interface Company {
  legalAddress2?: string | null;
  overridePayStartWeekDay?: number | null;
  phoneExtension?: string | null;
  stateTaxID?: string | null;
  nextPayPeriodDate?: DateTime | null;
  payFrequency?: string | null;
  payrollPin?: string | null;
  regEmployeeCount?: number | null;
  logoUrl?: string | null;
  payrollHomeDir?: string | null;
  accountantEmail?: string | null;
  county?: string | null;
  payrollProviderUrl?: string | null;
  stateTaxIDState?: string | null;
  syncStatus?: string | null;
  payrollProvider?: string | null;
  isOwnerOnlyCompany?: boolean | null;
  id?: string | null;
  city?: string | null;
  lastGoodSync?: DateTime | null;
  legalCity?: string | null;
  _enrollmentStatus?: string | null;
  stateOfIncorporation?: string | null;
  zip?: string | null;
  benefitsOnly?: boolean | null;
  dayBusinessEstablished?: string | null;
  obfuscatedId?: string | null;
  address2?: string | null;
  overridePayFirstCheckDay?: number | null;
  overrideAnchorPayCheckDate?: DateTime | null;
  payrollPhone?: string | null;
  lastBulkUnRegEmailResend?: DateTime | null;
  businessDescription?: string | null;
  shortCircuitEmployeeCount?: number | null;
  type?: string | null;
  payrollCredentialAccountType?: string | null;
  overridePaySecondCheckDay?: number | null;
  naicsCode?: string | null;
  fax?: string | null;
  payrollPassword?: string | null;
  selectedCarrier?: string | null;
  salesforceIndustry?: string | null;
  overridePayArrears?: number | null;
  legalName?: string | null;
  payrollEmail?: string | null;
  version_id?: number | null;
  deactivationDate?: DateTime | null;
  payrollUsername?: string | null;
  selectedStateCarrier?: Carrier | null;
  state?: string | null;
  monthBusinessEstablished?: string | null;
  address?: string | null;
  employeeCount?: number | null;
  legalAddress?: string | null;
  isReal?: boolean | null;
  syncedPayrollProvider?: string | null;
  groupId?: string | null;
  isActive?: boolean | null;
  payrollSyncType?: string | null;
  legalZip?: string | null;
  name?: string | null;
  phone?: string | null;
  legalState?: string | null;
  logoKey?: string | null;
  syncErrorMessage?: string | null;
  lastSyncRun?: DateTime | null;
  browserQueue?: string | null;
  payrollClientId?: string | null;
  payrollLoginIsOurs?: boolean | null;
  isLargeGroup?: boolean | null;
  sicCode?: string | null;
  overrideAnchorPayDate?: DateTime | null;
  yearBusinessEstablished?: string | null;
  payrollCookies?: string | null;
  ein?: string | null;
  hrProxy?: CompanyHrProxy | null;
  healthProxy?: CompanyHealthProxy | null;
  payrollProxy?: CompanyPayrollProxy | null /** auxProxy: CompanyAuxProxyinternationalProxy: CompanyInternationalProxy */;
  employees?:
    | (AllEmployee | null)[]
    | null /** ptoProxy: CompanyPtoProxytaProxy: CompanyTaProxystockoptionProxy: CompanyStockoptionProxy */;
  benefitsEnrollment?: CompanyBenefitsEnrollment | null;
  benefitsContacts?: (BenAdminContact | null)[] | null;
  parentCompany?: Company | null;
  linkedCompanies?: (Company | null)[] | null;
}

export interface Carrier {
  liveQuoteMedical?: boolean | null;
  agentName?: string | null;
  liveQuoteVision?: boolean | null;
  businessInsuranceAgentIdOverride?: string | null;
  liveQuoteEmbargoDays?: number | null;
  isMedicalCarrier?: boolean | null;
  agentId?: string | null;
  id?: string | null;
  agencyId?: string | null;
  appointmentNotes?: string | null;
  isDentalCarrier?: boolean | null;
  businessInsuranceAgentId?: number | null;
  onlineEoiUrl?: string | null;
  isTrust?: boolean | null;
  state?: string | null;
  rxGroup?: string | null;
  isEDISupported?: boolean | null;
  businessInsuranceAgencyId?: string | null;
  supportsAutopay?: boolean | null;
  logoUrl?: string | null;
  isDisabilityCarrier?: boolean | null;
  employerAccessMode?: string | null;
  liveQuoteDental?: boolean | null;
  newHireApprovalProcessingDays?: number | null;
  isVisionCarrier?: boolean | null;
  isLifeCarrier?: boolean | null;
  displayName?: string | null;
  name?: string | null;
  crawlDriver?: string | null;
  appointmentStatus?: string | null;
  rxPCN?: string | null;
  logoKey?: string | null;
  agentModelId?: number | null;
  rxBinNumber?: string | null;
  isBusinessInsuranceCarrier?: boolean | null;
  ein?: string | null;
  autopayInstruction?: string | null;
  carrierID?: number | null;
  copy?: CarrierCopy | null;
}

export interface CarrierCopy {
  lgEmployeeDeclineWaiver?: string | null;
  achAuthorization?: string | null;
  hmoMedicalDisplayText?: string | null;
  id?: string | null;
  hmoDentalDisplayText?: string | null;
  employeeAgreement?: string | null;
  dentalClaimsAddress?: string | null;
  ltdClaimsAddress?: string | null;
  hmoMedicalUrl?: string | null;
  hmoDentalUrl?: string | null;
  onlyPercentPolicy?: boolean | null;
  stdClaimsAddress?: string | null;
  employeeDeclineWaiver?: string | null;
  lgEmployeeAgreement?: string | null;
  website?: string | null;
  hmoClaimsPhone?: string | null;
  ppoClaimsPhone?: string | null;
  phone?: string | null;
  visionClaimsAddress?: string | null;
  employerLoginUrl?: string | null;
  companyAgreement?: string | null;
  claimsAddress?: string | null;
  disclaimerStatement?: string | null;
  officerStatement?: string | null;
  medicalClaimsAddress?: string | null;
}

export interface CompanyHrProxy {
  id?: string | null;
  hrContact?: EmployeeHrContact | null;
  departments?: (Department | null)[] | null;
  locations?: (CompanyLocation | null)[] | null;
  adminName?: string | null;
  adminPhone?: string | null;
  adminEmail?: string | null;
  permissionedAdmins?: (AllEmployee | null)[] | null;
}

export interface EmployeeHrContact {
  hrContactName?: string | null;
  hrContactPhone?: string | null;
  company?: Company | null;
  hrContactEmail?: string | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface Department {
  id?: string | null;
  resource_uri?: string | null;
  company?: Company | null;
  wfCoCode?: string | null;
  name?: string | null;
}

export interface CompanyLocation {
  wfCoCode?: string | null;
  officialName?: string | null;
  id?: string | null;
  city?: string | null;
  zip?: string | null;
  isOfficialComplete?: boolean | null;
  company?: Company | null;
  intlAddress?: Address | null;
  state?: string | null;
  officialPhone?: string | null;
  getTimeZone?: string | null;
  naicsCode?: string | null;
  isEeoReportComplete?: boolean | null;
  deleted?: boolean | null;
  street1?: string | null;
  street2?: string | null;
  phone?: string | null;
  officialEmail?: string | null;
  officialTitle?: string | null;
  payrollLocationId?: string | null;
  intlCompanyTax?: string | null;
  name?: string | null;
  country?: string | null;
  countryHumanReadable?: string | null;
  eeoId?: string | null;
  isHeadquarters?: boolean | null;
  eeoFiledLastYear?: boolean | null;
  resource_uri?: string | null;
}

export interface Address {
  city?: string | null;
  fax?: string | null;
  street1?: string | null;
  street2?: string | null;
  phone?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
  id?: string | null;
  isActive?: boolean | null;
  resource_uri?: string | null;
}

export interface AllEmployee {
  status?: EmployeeStatus | null;
  allStatus?: EmployeeStatus | null /** status value when you don't have access to the employee as admin/manager etc */;
  preferredName?: string | null;
  preferredOrFirstName?: string | null;
  last_name?: string | null;
  photoUrl?: string | null;
  creationMethod?: string | null;
  overridePayStartWeekDay?: number | null;
  reportToEmployee?: AllEmployee | null;
  tShirtSize?: string | null;
  sex?: string | null;
  obfuscatedId?: string | null;
  workPhoneExtension?: string | null;
  deductionsEffectiveStartDate?: DateTime | null /** paySchedule: CompanyPaySchedule */;
  isHighlyCompensated?: boolean | null;
  isSFBayArea?: boolean | null;
  isFicaExempt?: boolean | null;
  location?: CompanyLocation | null;
  id?: string | null;
  user_id?: string | null;
  userEmail?: string | null;
  city?: string | null;
  first_name?: string | null;
  middle_name?: string | null;
  underMedicare?: boolean | null;
  zip?: string | null;
  title?: string | null;
  isDisabled?: boolean | null;
  personalPronounsId?: number | null;
  company?: Company | null;
  socialSecurityCardUrl?: string | null;
  isKeyEmployee?: boolean | null;
  overridePayFirstCheckDay?: number | null;
  overrideAnchorPayCheckDate?: DateTime | null;
  socialSecurityProofUrl?: string | null;
  qeCreated?: boolean | null;
  type?: EmployeeType | null;
  address2?: string | null;
  selectedPlan?: number | null;
  department?: Department | null;
  selectedDentalPlan?: number | null;
  state?: string | null;
  overridePayArrears?: number | null;
  visionApprovalStatus?: string | null;
  version_id?: number | null;
  genderIdentity?: string | null;
  phone?: string | null;
  payrollId?: string | null;
  address?: string | null;
  selectedVisionPlan?: number | null;
  dietaryRestrictions?: string | null;
  socialSecurityExpectedDate?: DateTime | null;
  overrideAnchorPayDate?: DateTime | null;
  medicalApprovalStatus?: string | null;
  taReportingMethod?: string | null;
  overridePayFrequency?: string | null;
  paymentDistributionMethod?: string | null;
  dentalApprovalStatus?: string | null;
  dob?: string | null;
  paymentMethod?: string | null;
  photoThumbnailUrl?: string | null;
  marital_status?: string | null;
  email?: string | null;
  overridePaySecondCheckDay?: number | null;
  isWaitingForSSNInfo?: boolean | null;
  socialSecurity?: string | null;
  socialSecurityDecrypted?: string | null;
  ageRange?: string | null;
  w4Signature?: Signature | null;
  workPhone?: string | null;
  homeAddress?: Address | null;
  inDE9C?: boolean | null;
  hasCertOfNonResidenceForTaxState?: boolean | null;
  hrProxy?: AllEmployeeHrProxy | null /** syntheic propertiesproxy for HR and core relationships */;
  canAdminister?: boolean | null /** is the current user requesting the API an administrator of this employee */;
  canManage?: boolean | null /** is the current user requesting the API a manager of this employee */;
  isManager?: boolean | null;
  hireDate?: string | null /** hire date as a string in the from MM/DD/YYYY */;
  isTeamMember?: boolean | null /** Are they your manager, subordinates or siblings */;
  isRequester?: boolean | null /** the employee object for the user that made this API request */;
  employmentType?: EmploymentType | null;
  terminationType?: TerminationType | null;
  terminationCategory?: string | null;
  terminationDate?: string | null /** termination date as a string in the from MM/DD/YYYY */;
  currency?: string | null /** for international employees their pay currency */;
  compType?: CompType | null /** compensation type */;
  payRate?: number | null;
  salaryAnnual?: number | null;
  benefitsPlanOptions?: (CompanyHealthPlan | null)[] | null /** list of available plans for this employee */;
  benefitsEnrollments?: (BenefitsEnrollment | null)[] | null;
  benefitsTransactions?: (BenefitsTransaction | null)[] | null;
  effectiveBenefitsTransactions?: (BenefitsTransaction | null)[] | null;
  nextEffectiveBenefitsTransactions?: (BenefitsTransaction | null)[] | null;
  dependents?: (Dependent | null)[] | null;
  productEligibilityTag?: EmployeeProductEligibilityTag | null;
  benefits?: EmployeeBenefits | null /** Going forward all benefits related queries to EmployeeBenefits andresolve it in benefits_enrollment/benefits_transaction resolvers. */;
  employeeChangesHistory?: (EmployeeChangesHistory | null)[] | null;
  profile?: EmployeeProfile | null;
  personalInfo?: PersonalInfo | null;
  beneficiaries?: (Beneficiary | null)[] | null;
  zAppSubscription?: ZAppInstallSubscription | null;
}

export interface Signature {
  employee?: AllEmployee | null;
  signatureName?: string | null;
  signatureBlob_id?: number | null;
  signatureDataUrl?: string | null;
  signatureTitle?: string | null;
  id?: string | null;
}

export interface AllEmployeeHrProxy {
  employments?: (EmployeeEmployment | null)[] | null;
  employeeEeo?: EmployeeEeo | null /** contractor: ContractorchangeRequests: [ChangeRequest]employeeContact: EmployeeContacteligibilities: [EmployeeEligibility] */;
  emergencyContacts?: EmergencyContacts | null /** terminationAction: EmployeeTerminationActionstateTaxes: [EmployeeStateTax] */;
  id?: string | null /** federalTaxes: [EmployeeFederalTax]permission: EmployeePermission */;
}

export interface EmployeeEmployment {
  monthlySalaryInUSD?: string | null;
  currency?: string | null;
  overtimeEligibility?: boolean | null;
  hireDate?: string | null;
  compType?: string | null;
  employee?: AllEmployee | null;
  title?: string | null;
  fullTimeEndDate?: Date | null;
  workingDaysPerWeek?: string | null;
  id?: string | null;
  annualSalary?: string | null;
  fixedTermEmployment?: boolean | null;
  terminationDate?: string | null;
  qeCreated?: boolean | null;
  monthlySalary?: string | null;
  terminationType?: string | null;
  version_id?: number | null;
  firstSalaryDate?: string | null;
  fullTimeStartDate?: Date | null;
  annualSalaryInUSD?: string | null;
  isActive?: boolean | null;
  isFlsaExempt?: boolean | null;
  annualSalaryIncludesBonus?: boolean | null;
  country?: string | null;
  payRateInUSD?: string | null;
  payFrequency?: string | null;
  workingHoursPerWeek?: string | null;
  employmentType?: string | null;
  payRate?: string | null;
  terminationCategory?: string | null;
  resource_uri?: string | null;
  hasNonExemptJobDuties?: boolean | null;
}

export interface EmployeeEeo {
  employee?: AllEmployee | null;
  isFilledByAdmin?: boolean | null;
  eeoRace?: string | null;
  adminFillDate?: string | null;
  eeoJobCategory?: string | null;
  id?: string | null;
  adminFullName?: string | null;
  resource_uri?: string | null;
}

export interface EmergencyContacts {
  employee?: AllEmployee | null;
  secondaryContactPhone1?: string | null;
  secondaryContactPhone2?: string | null;
  secondaryContactName?: string | null;
  primaryContactName?: string | null;
  primaryContactPhone2?: string | null;
  primaryContactPhone1?: string | null;
  secondaryContactRelationship?: string | null;
  id?: string | null;
  primaryContactRelationship?: string | null;
  resource_uri?: string | null;
}

export interface CompanyHealthPlan {
  carrierSpecificData?: string | null;
  invoiceName?: string | null;
  companyHealthCarrier?: CompanyHealthCarrier | null;
  isHraEnabled?: boolean | null;
  id?: string | null;
  companySpecificHMOPPO?: string | null;
  planId?: number | null;
  dentalPediatricProductCode?: string | null;
  companySpecificProductCode?: string | null;
  lineOfCoverage?: string | null;
  plan?: string | null;
  isAvailableForNewHires?: boolean | null;
  summaryPlanDescriptionDocument?: Document | null;
  visionPediatricProductCode?: string | null;
  planNumber?: string | null;
  certificateOfCoverageDocument?: Document | null;
  isDefault?: boolean | null;
  resource_uri?: string | null;
  benefitsPlan?: BenefitsPlan | null;
  policyNumber?: string | null;
  companyHealthRiders?: (CompanyHealthRider | null)[] | null;
}

export interface CompanyHealthCarrier {
  raf?: string | null;
  openEnrollmentMonth?: string | null;
  isPrimaryCarrier?: boolean | null;
  ptWaitingPeriodChangeEffectiveDate?: string | null;
  skipPackageSizeValidation?: boolean | null;
  dependentMaxAge?: number | null;
  isOpenEnrollmentInProgress?: boolean | null;
  dentalBasePlan?: DentalPlan | null;
  carrier?: Carrier | null;
  openEnrollmentStart?: string | null;
  isOpenEnrollment?: boolean | null;
  onlineAccessUsername?: string | null;
  depCountFixedDeductions?: string | null;
  waitingPeriod?: string | null;
  depFixedContributions?: string | null;
  basePlan?: Plan | null;
  id?: string | null;
  basePlanName?: string | null;
  hasEmployerAccess?: boolean | null;
  waitingPeriodDisplayText?: string | null;
  renewalPacketUrl?: string | null;
  ptWaitingPeriodDisplayText?: string | null;
  employeeContributionSchemes?: string | null;
  ediStatus?: string | null;
  company?: Company | null;
  openEnrollmentEndDate?: string | null;
  shortCircuitOEManualOverrideOn?: boolean | null;
  fixedContributionOverallMax?: string | null;
  isSelfAdministered?: boolean | null;
  borStatus?: string | null;
  companyHealthEnrollment?: CompanyHealthEnrollment | null;
  rxGroup?: string | null;
  renewalDate?: string | null;
  status?: string | null;
  planContributionSchemes?: string | null;
  oktaNotes?: string | null;
  planDepTypeContributionSchemes?: string | null;
  ptWaitingPeriod?: string | null;
  onlineAccessPassword?: string | null;
  terminationPolicy?: string | null;
  terminationPolicyDisplayText?: string | null;
  terminationPolicyChangeReason?: string | null;
  contractLength?: number | null;
  autoPayAckSignature?: string | null;
  contributionEmployee?: string | null;
  waitingPeriodChangeEffectiveDate?: string | null;
  employeeFixedDeductions?: string | null;
  waitingPeriodChangeReason?: string | null;
  ptWaitingPeriodChangeReason?: string | null;
  contributionType?: string | null;
  isUnderImplementation?: boolean | null;
  autoPayAckName?: string | null;
  contributionTypeChangeReason?: string | null;
  approvedDate?: string | null;
  commissionID?: string | null;
  approvalLetterUrl?: string | null;
  submittedTimestamp?: DateTime | null;
  contributionDependents?: string | null;
  _openEnrollmentStart?: string | null;
  invoiceUrl?: string | null;
  oktaLink?: string | null;
  rxBinNumber?: string | null;
  rxPCN?: string | null;
  fixedContributionEmployeeMax?: string | null;
  disableDependentCoverageChanges?: boolean | null;
  lineOfCoverage?: string | null;
  doWeAutoPay?: boolean | null;
  hasCustomContributions?: boolean | null;
  eligibleForShortCircuitOpenEnrollment?: string | null;
  openEnrollmentPeriod?: number | null;
  depTypeContributionSchemes?: string | null;
  contributionTypeChangeEffectiveDate?: string | null;
  switchCancellationPolicy?: string | null;
  fixedContributionDependentMax?: string | null;
  groupID?: string | null;
  planFixedDeductions?: string | null;
  resource_uri?: string | null;
  companyHealthPlans?: (CompanyHealthPlan | null)[] | null;
  effectiveDate?: string | null;
  effectiveEndDate?: string | null;
}

export interface DentalPlan {
  planUrl?: string | null;
  availableOOS?: boolean | null;
  coInsuranceOrthoOutOfNetwork?: string | null;
  deductibleIndividual?: number | null;
  useSicRaf?: boolean | null;
  group?: string | null;
  scalingRootPlaningOutOfNetwork?: string | null;
  singleTierRate?: boolean | null;
  lastCommentDate?: string | null;
  planOrder?: number | null;
  freePlan?: boolean | null;
  coInsuranceOrtho?: string | null;
  liveQuoteForRenewal?: boolean | null;
  rateStyle?: string | null;
  needsPCP?: boolean | null;
  orthoCoverage?: boolean | null;
  orthoMaxBenefits?: number | null;
  name?: string | null;
  coInsuranceEndoOutOfNetwork?: string | null;
  coInsuranceOrthoOutOfNetworkChild?: string | null;
  network?: Network | null;
  filling?: string | null;
  sourcePlanId?: number | null;
  genderBandedStyle?: number | null;
  crown?: string | null;
  customPlanCompanyId?: number | null;
  coInsuranceEndo?: string | null;
  hasWaitingPeriods?: boolean | null;
  scalingRootPlaning?: string | null;
  shortCircuitPlanType?: string | null;
  fillingOutOfNetwork?: string | null;
  fundingType?: string | null;
  coInsuranceMajor?: string | null;
  oralExamOutOfNetwork?: string | null;
  stateCarrier?: Carrier | null;
  state?: string | null;
  isNewStyle?: string | null;
  isShortCircuitPlan?: boolean | null;
  orthoMaxAge?: number | null;
  benefitFeeStructure?: string | null;
  coInsuranceBasicOutOfNetwork?: string | null;
  customPlan?: boolean | null;
  rootCanalOutOfNetwork?: string | null;
  displayNote?: string | null;
  deductibleFamily?: number | null;
  carrier?: string | null;
  consoleUrl?: string | null;
  adjustableRates?: boolean | null;
  overrideCarrierDefaultRegion?: boolean | null;
  availableOOSStates?: string | null;
  isVisionBundled?: boolean | null;
  hasNetworkProviders?: boolean | null;
  recommendedRenewalPlan?: DentalPlan | null;
  expiryDate?: string | null;
  oralExam?: string | null;
  deductibleFamilyOutOfNetwork?: number | null;
  coInsurancePerio?: string | null;
  rootCanal?: string | null;
  maxBenefits?: number | null;
  coInsuranceMajorOutOfNetwork?: string | null;
  largeGroup?: boolean | null;
  newGroupExpiryDate?: string | null;
  postACA?: boolean | null;
  coInsuranceBasic?: string | null;
  showName?: string | null;
  coInsurancePeriodOutOfNetwork?: string | null;
  customPlanReason?: string | null;
  maxLives?: number | null;
  isVoluntary?: boolean | null;
  coInsuranceOrthoChild?: string | null;
  id?: string | null;
  productCode?: string | null;
  planRequestLink?: string | null;
  minLives?: number | null;
  liveQuote?: boolean | null;
  coInsurancePreventativeOutOfNetwork?: string | null;
  compositeRuleSet?: CompositeRuleSet | null;
  progressiveBenefitLevels?: boolean | null;
  benefitPeriod?: string | null;
  compositeFactorSet?: CompositeFactorSet | null;
  deductibleIndividualOutOfNetwork?: number | null;
  displayName?: string | null;
  orthoDeductible?: number | null;
  useGenderBandedPrefixForRegionMapping?: boolean | null;
  crownOutOfNetwork?: string | null;
  useDependentAge?: boolean | null;
  HMOPPO?: string | null;
  inProgress?: boolean | null;
  coInsurancePreventative?: string | null;
  resource_uri?: string | null;
  lineOfCoverage?: string | null;
  planType?: string | null;
}

export interface Network {
  isNationwide?: boolean | null;
  lineOfCoverage?: string | null;
  isNarrowOverride?: boolean | null;
  name?: string | null;
  id?: string | null;
}

export interface CompositeRuleSet {
  compositeRules?: (CompositeRule | null)[] | null;
  resource_uri?: string | null;
  id?: string | null;
  carrier?: Carrier | null;
  name?: string | null;
}

export interface CompositeRule {
  lowerBound?: number | null;
  effectiveDate?: string | null;
  compositeRuleSet?: CompositeRuleSet | null;
  ratingStyle?: string | null;
  upperBound?: number | null;
  censusStyle?: string | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface CompositeFactorSet {
  name?: string | null;
  carrier?: Carrier | null;
  id?: string | null;
  youAndSpouseFactor?: string | null;
  youFactor?: string | null;
  compositeFactors?: (CompositeFactor | null)[] | null;
  familyFactor?: string | null;
  youAndChildFactor?: string | null;
  resource_uri?: string | null;
}

export interface CompositeFactor {
  effectiveDate?: string | null;
  youAndSpouseFactor?: string | null;
  familyFactor?: string | null;
  youFactor?: string | null;
  compositeFactorSet?: CompositeFactorSet | null;
  id?: string | null;
  youAndChildFactor?: string | null;
  resource_uri?: string | null;
}

export interface Plan {
  hasNetworkProviders?: boolean | null;
  rxCoPayBrandRetailCondition?: number | null;
  availableOOS?: boolean | null;
  deductibleIndividual?: number | null;
  urgentCarePreferredNetwork?: string | null;
  oopMaxFamilyOutOfNetwork?: number | null;
  rxCoPayBrandRetailSecondary?: string | null;
  HSA?: boolean | null;
  group?: string | null;
  hospitalInpatientSecondaryPreferredNetwork?: string | null;
  lastCommentDate?: string | null;
  planOrder?: number | null;
  hospitalOutpatientSecondaryPreferredNetwork?: string | null;
  oopMaxIndividualOutOfNetwork?: number | null;
  carrierRxCode?: string | null;
  coPayPreferredNetwork?: string | null;
  dailyLimits?: string | null;
  coInsurance?: string | null;
  emergencyServiceCondition?: number | null;
  specialistCoPay?: string | null;
  liveQuoteForRenewal?: boolean | null;
  minHRAContribution?: number | null;
  rateStyle?: string | null;
  preventativeCareOutOfNetwork?: string | null;
  HRA?: boolean | null;
  estimatedSevereOOPCost?: number | null;
  urgentCareSecondary?: string | null;
  name?: string | null;
  network?: Network | null;
  notes?: string | null;
  urgentCareSecondaryPreferredNetwork?: string | null;
  hospitalInpatient?: string | null;
  urgentCareCondition?: number | null;
  emergencyService?: string | null;
  carrierCode?: string | null;
  sourcePlanId?: number | null;
  emergencyServicePrimaryPreferredNetwork?: string | null;
  genderBandedStyle?: number | null;
  specialtyPharmacySecondary?: string | null;
  customPlanCompanyId?: number | null;
  shortCircuitPlanType?: string | null;
  minLives?: number | null;
  isMinimumEffectiveCoverage?: boolean | null;
  fundingType?: string | null;
  hospitalOutpatient?: string | null;
  useGenderBandedPrefixForRegionMapping?: boolean | null;
  emergencyServiceConditionPreferredNetwork?: number | null;
  urgentCare?: string | null;
  state?: string | null;
  hospitalOutpatientSecondary?: string | null;
  useEEZipAvailability?: boolean | null;
  outOfNetworkCoInsurance?: string | null;
  rxCoPayNonFormularyRetailSecondary?: string | null;
  rxCoPayGenericRetail?: string | null;
  isShortCircuitPlan?: boolean | null;
  oopMaxIndividualPreferredNetwork?: number | null;
  specialtyPharmacyCondition?: number | null;
  rxCoPayNonFormularyRetailCondition?: number | null;
  preventativeCare?: string | null;
  emergencyServiceSecondaryPreferredNetwork?: string | null;
  emergencyCoPay?: number | null;
  displayNote?: string | null;
  networkSize?: string | null;
  maxDays?: number | null;
  dailyLimitsPreferredNetwork?: string | null;
  deductibleFamily?: number | null;
  carrier?: string | null;
  consoleUrl?: string | null;
  pharmacyCoverage?: boolean | null;
  hospitalInpatientPreferredNetwork?: string | null;
  overrideCarrierDefaultRegion?: boolean | null;
  emergencyServiceSecondary?: string | null;
  customPlan?: boolean | null;
  hospitalOutpatientPreferredNetwork?: string | null;
  availableOOSStates?: string | null;
  isVisionBundled?: boolean | null;
  pharmacyDeductibleOutOfNetwork?: number | null;
  specialistCoPayOutOfNetwork?: string | null;
  rxCoPayBrandRetail?: string | null;
  recommendedRenewalPlan?: Plan | null;
  expiryDate?: string | null;
  deductibleFamilyOutOfNetwork?: number | null;
  pharmacyDeductiblePreferredNetwork?: number | null;
  rxCoPayNonFormularyRetail?: string | null;
  oopMaxIncludeDeductible?: boolean | null;
  rxCoPayGenericRetailCondition?: number | null;
  isMinimumValueCoverage?: boolean | null;
  isDentalBundled?: boolean | null;
  deductibleIndividualPreferredNetwork?: number | null;
  minHSAContribution?: number | null;
  oopMaxFamilyPreferredNetwork?: number | null;
  largeGroup?: boolean | null;
  isVoluntary?: boolean | null;
  newGroupExpiryDate?: string | null;
  coPayOutOfNetwork?: string | null;
  postACA?: boolean | null;
  preventativeCarePreferredNetwork?: string | null;
  emergencyCoInsurance?: string | null;
  showName?: string | null;
  hospitalInpatientConditionPreferredNetwork?: number | null;
  customPlanReason?: string | null;
  hospitalInpatientCondition?: number | null;
  pharmacyDeductible?: number | null;
  maxLives?: number | null;
  hospitalOutpatientConditionPreferredNetwork?: number | null;
  deductibleFamilyPreferredNetwork?: number | null;
  id?: string | null;
  metalTier?: string | null;
  productCode?: string | null;
  planUrl?: string | null;
  bundledOldStyleDentalPlan?: DentalPlan | null;
  specialtyPharmacy?: string | null;
  liveQuote?: boolean | null;
  hospitalInpatientSecondary?: string | null;
  maxHRAContribution?: number | null;
  maxDaysPreferredNetwork?: number | null;
  rxCoPayGenericRetailSecondary?: string | null;
  isOldStyle?: string | null;
  preferredNetworkCoInsurance?: string | null;
  oopMaxIndividual?: number | null;
  afterDeductibles?: string | null;
  compositeRuleSet?: CompositeRuleSet | null;
  coPay?: string | null;
  applyRaf?: boolean | null;
  needsPCP?: boolean | null;
  rxSupplyDaysRetail?: number | null;
  compositeFactorSet?: CompositeFactorSet | null;
  deductibleIndividualOutOfNetwork?: number | null;
  planRequestLink?: string | null;
  carrierInternalCode?: string | null;
  maxHSAContribution?: number | null;
  urgentCareConditionPreferredNetwork?: number | null;
  displayName?: string | null;
  hospitalOutpatientCondition?: number | null;
  oopMaxFamily?: number | null;
  emergencyServicePrimary?: string | null;
  stateCarrier?: Carrier | null;
  useDependentAge?: boolean | null;
  HMOPPO?: string | null;
  inProgress?: boolean | null;
  specialistCoPayPreferredNetwork?: string | null;
  resource_uri?: string | null;
  lineOfCoverage?: string | null;
  rates?: JSON | null;
  restrictions?: JSON | null;
  planType?:
    | string
    | null /** TODO: remove planType, applicableEnrollees, evidenceOfInsurabilityForm if zgraphql can reslove union type correctly */;
  applicableEnrollees?: string | null;
  evidenceOfInsurabilityForm?: string | null;
}

export interface CompanyHealthEnrollment {
  startDate?: string | null;
  endDate?: string | null;
  authDate?: string | null;
  desiredEffectiveDate?: string | null;
  confirmedGuardianContract?: boolean | null;
  escalationTimestamp?: DateTime | null;
  inStateState?: InStateState | null;
  authWebsite?: string | null;
  renewalPackages?: string | null;
  confirmedPayrollHistory?: boolean | null;
  enrollmentCompleteEmailTimestamp?: DateTime | null;
  isCompositeRated?: boolean | null;
  cobraType?: string | null;
  company?: Company | null;
  id?: string | null;
  authTitle?: string | null;
  lineOfCoverage?: string | null;
  enrollmentType?: string | null;
  progress?: string | null;
  employeeLifeDisabilityEnrollments?: (EmployeeLifeDisabilityEnrollment | null)[] | null;
  participationState?: ParticipationState | null;
  companySicCode?: string | null;
  authSignature?: string | null;
  disableEmployeeWQItems?: boolean | null;
  implementationCompleteDate?: string | null;
  isEnrollmentComplete?: boolean | null;
  authPhone?: string | null;
  enrollmentStatus?: string | null;
  employeeCount?: number | null;
  planMappings?: (PlanMapping | null)[] | null;
  isActive?: boolean | null;
  companyZip?: string | null;
  enrollmentBegunTimestamp?: DateTime | null;
  confirmedWorkersComp?: boolean | null;
  confirmedVspContract?: boolean | null;
  isDocumentRequirementGenerated?: boolean | null;
  documentsReminderTimestamp?: DateTime | null;
  confirmedPreviousCoverage?: boolean | null;
  previousEnrollment?: CompanyHealthEnrollment | null;
  numOfOpenDocuments?: number | null;
  enrollmentDocumentsTimestamp?: DateTime | null;
  isReviewing?: boolean | null;
  censusUrl?: string | null;
  addExistingTimestamp?: DateTime | null;
  authName?: string | null;
  overrideRateEffectiveDate?: string | null;
  enrollmentCompleteTimestamp?: DateTime | null;
  resource_uri?: string | null;
  companyHealthCarrier?: CompanyHealthCarrier | null;
}

export interface InStateState {
  status?: string | null;
  inStateRuleName?: string | null;
  percentInState?: string | null;
  inStateRule?: InStateRule | null;
  qualifiedInState?: number | null;
  decliningInState?: number | null;
  inStateStates?: string | null;
  enrollingInState?: number | null;
  enrolling?: number | null;
  decliningOutOfState?: number | null;
  isFailing?: boolean | null;
  qualified?: number | null;
  enrollingOutOfState?: number | null;
  resource_uri?: string | null;
  companyHealthEnrollment?: CompanyHealthEnrollment | null;
  isByEnrolling?: boolean | null;
  qualifiedOutOfState?: number | null;
  id?: string | null;
  declining?: number | null;
  inStateRuleV2?: string | null;
}

export interface InStateRule {
  softDeleted?: boolean | null;
  maxGroupSize?: number | null;
  minStyle?: string | null;
  lineOfCoverage?: string | null;
  minEmployees?: number | null;
  additionalNotes?: string | null;
  id?: string | null;
  minGroupSize?: number | null;
  resource_uri?: string | null;
}

export interface EmployeeLifeDisabilityEnrollment {
  startDate?: Date | null;
  endDate?: Date | null;
  authDate?: string | null;
  id?: string | null;
  authSignature?: string | null;
  employee?: AllEmployee | null;
  employeeStdPlans?: (EmployeeStdPlanNew | null)[] | null;
  effectiveDate?: Date | null;
  dependentLifeDisabilityEnrollments?: (DependentLifeDisabilityEnrollment | null)[] | null;
  authTitle?: string | null;
  enrollmentType?: string | null;
  companyHealthEnrollment?: CompanyHealthEnrollment | null;
  progress?: string | null;
  prevEnrollment?: EmployeeLifeDisabilityEnrollment | null;
  status?: string | null;
  isEnrollmentPendingEOI?: boolean | null;
  employeeLifePlans?: (EmployeeLifePlanNew | null)[] | null;
  isEnrollmentComplete?: boolean | null;
  isActive?: boolean | null;
  employeeAddPlans?: (EmployeeAddPlan | null)[] | null;
  enrollmentBegunTimestamp?: DateTime | null;
  employeeLtdPlans?: (EmployeeLtdPlanNew | null)[] | null;
  lineOfCoverage?: string | null;
  authName?: string | null;
  enrollmentCompleteTimestamp?: DateTime | null;
  resource_uri?: string | null;
}

export interface EmployeeStdPlanNew {
  evidenceOfInsurabilityFormDocument?: Document | null;
  premium?: string | null;
  guaranteeIssue?: string | null;
  amount?: string | null;
  enrollment?: EmployeeLifeDisabilityEnrollment | null;
  selection?: EmployeeLifeDisabilitySelection | null;
  electedAmount?: string | null;
  plan?: StdPlanNew | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface Document {
  mimetype?: string | null;
  uploadTime?: DateTime | null;
  employee?: AllEmployee | null;
  reviewState?: string | null;
  embeddableDocId?: string | null;
  reviewComment?: string | null;
  resource_uri?: string | null;
  url?: string | null;
  description?: string | null;
  company?: Company | null;
  reviewTime?: DateTime | null;
  reviewedBy?: User | null;
  isAgreement?: boolean | null;
  date?: string | null;
  documentStatusNotificationTimestamp?: DateTime | null;
  uploadedBy?: User | null;
  id?: string | null;
  isActive?: boolean | null;
  name?: string | null;
}

export interface EmployeeLifeDisabilitySelection {
  employee?: AllEmployee | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface StdPlanNew {
  planAuditStage?: string | null;
  flatPremium?: boolean | null;
  guaranteeIssueIncrements?: boolean | null;
  eliminationPeriodAccident?: number | null;
  parentPlan?: StdPlanNew | null;
  dependentOnlyPlan?: boolean | null;
  customPlanCompanyId?: number | null;
  migrationStatus?: string | null;
  basicPlanIncrements?: boolean | null;
  stateDisabilityInsurance?: boolean | null;
  shortCircuitPlanType?: string | null;
  id?: string | null;
  productCode?: string | null;
  totalCompensationBasedEarnings?: boolean | null;
  benefitsDuration?: string | null;
  stateCarrier?: Carrier | null;
  ageRedetermination?: string | null;
  ownOccPeriod?: string | null;
  planUrl?: string | null;
  eliminationPeriodIllness?: number | null;
  comments?: string | null;
  zipCodeBasedRates?: boolean | null;
  benefitsAugmentation?: boolean | null;
  preExistingCondition?: string | null;
  isShortCircuitPlan?: boolean | null;
  eliminationPeriod?: string | null;
  rateUrl?: string | null;
  applicableEnrollees?: string | null;
  secondaryGuaranteeIssue?: boolean | null;
  salaryRedetermination?: string | null;
  customPlan?: boolean | null;
  benefitsDurationStructured?: number | null;
  familyTieredRates?: boolean | null;
  newGroupExpiryDate?: string | null;
  salaryBasedIncrements?: boolean | null;
  name?: string | null;
  planType?: string | null;
  contributionScheme?: boolean | null;
  dependentsOnBasicPlan?: boolean | null;
  multipleSamePlanTypedPlans?: boolean | null;
  renewalExpiryDate?: string | null;
  tobaccoRates?: boolean | null;
  previousStatusBasedMax?: boolean | null;
  resource_uri?: string | null;
  participationRequirement?: number | null;
  ageBasedOnRenewalDate?: boolean | null;
  evidenceOfInsurabilityForm?: string | null;
  lineOfCoverage?: string | null;
  rates?: (StdPlanRate | null)[] | null;
  restrictions?: (StdPlanRestriction | null)[] | null;
}

export interface StdPlanRate extends Plan_Rate, PlanRate {
  effectiveEndDate?: string | null;
  flatPremium?: string | null;
  plan?: StdPlanNew | null;
  gender?: string | null;
  ratePerTen?: string | null;
  ageMin?: number | null;
  enrolleeType?: string | null;
  effectiveStartDate?: string | null;
  ageMax?: number | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface StdPlanRestriction {
  enrolleeMaxAmountStyle?: string | null;
  flatAmounts?: string | null;
  plan?: StdPlanNew | null;
  guaranteeIssue?: string | null;
  maxMultiplier?: string | null;
  isFixed?: boolean | null;
  planMaxAmount?: string | null;
  planAmountStyle?: string | null;
  planMinAmount?: string | null;
  isSetValues?: boolean | null;
  enrolleeType?: string | null;
  rateType?: string | null;
  premiumScheme?: string | null;
  isIncrements?: boolean | null;
  resource_uri?: string | null;
  id?: string | null;
  incrementalUnits?: string | null;
}

export interface DependentLifeDisabilityEnrollment {
  status?: string | null;
  authSignature?: string | null;
  type?: string | null;
  enrollmentBegunTimestamp?: DateTime | null;
  authDate?: string | null;
  lineOfCoverage?: string | null;
  dependentStdPlans?: (DependentStdPlan | null)[] | null;
  authName?: string | null;
  effectiveDate?: Date | null;
  authTitle?: string | null;
  dependentAddPlans?: (DependentAddPlan | null)[] | null;
  isEnrollmentComplete?: boolean | null;
  resource_uri?: string | null;
  employeeLifeDisabilityEnrollment?: EmployeeLifeDisabilityEnrollment | null;
  dependentLtdPlans?: (DependentLtdPlan | null)[] | null;
  dependent?: Dependent | null;
  enrollmentCompleteTimestamp?: DateTime | null;
  id?: string | null;
  isActive?: boolean | null;
  dependentLifePlans?: (DependentLifePlan | null)[] | null;
}

export interface DependentStdPlan {
  evidenceOfInsurabilityFormDocument?: Document | null;
  premium?: string | null;
  guaranteeIssue?: string | null;
  amount?: string | null;
  enrollment?: DependentLifeDisabilityEnrollment | null;
  selection?: DependentLifeDisabilitySelection | null;
  electedAmount?: string | null;
  plan?: StdPlanNew | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface DependentLifeDisabilitySelection {
  resource_uri?: string | null;
  id?: string | null;
  dependent?: Dependent | null;
}

export interface Dependent {
  medicalCoverageEndDate?: string | null;
  dentalCoverageStartDate?: string | null;
  weight?: string | null;
  dentalEnrollment?: EmployeeHealthEnrollment | null;
  hmoDentalName?: string | null;
  isFullTimeStudent?: boolean | null;
  visionCoverageStartDate?: string | null;
  height?: string | null;
  visionCancelledDate?: string | null;
  proofDate?: string | null;
  dentalCoverageEndDate?: string | null;
  courtOrder?: CourtOrder | null;
  id?: string | null;
  cancelledDate?: string | null;
  city?: string | null;
  hmoDentalProviderNumber?: string | null;
  zip?: string | null;
  hasMedicalCoverage?: boolean | null;
  marriageDate?: string | null;
  enrolledInDental?: boolean | null;
  visionCoverageEndDate?: string | null;
  proofUrl?: string | null;
  dateOfBirth?: string | null;
  state?: string | null;
  medicalEnrollment?: EmployeeHealthEnrollment | null;
  medicalCoverageStartDate?: string | null;
  reason?: string | null;
  dentalCancelledDate?: string | null;
  type?: string | null;
  autoSelectDentalPCP?: boolean | null;
  enrolledInMedical?: boolean | null;
  hasVisionCoverage?: boolean | null;
  status?: string | null;
  enrollInDental?: boolean | null;
  sameEmail?: boolean | null;
  sameAddress?: boolean | null;
  address2?: string | null;
  courtOrderEndDate?: string | null;
  samePCP?: boolean | null;
  sameDentalPCP?: boolean | null;
  autoSelectPCP?: boolean | null;
  hmoDentalExistingPatient?: boolean | null;
  isCourtOrderedDependent?: boolean | null;
  employee?: AllEmployee | null;
  hmoPhysicianProviderPPGNumber?: string | null;
  objId?: number | null;
  address?: string | null;
  enrollInMedical?: boolean | null;
  isDependentDisabled?: boolean | null;
  age?: number | null;
  medicalApprovalStatus?: string | null;
  gender?: string | null;
  enrollInVision?: boolean | null;
  isCourtOrderActive?: boolean | null;
  effectiveDate?: string | null;
  firstName?: string | null;
  dentalApprovalStatus?: string | null;
  dob?: string | null;
  dentalEffectiveDate?: string | null;
  hmoPhysicianName?: string | null;
  hasDentalCoverage?: boolean | null;
  isMarried?: boolean | null;
  visionApprovalStatus?: string | null;
  email?: string | null;
  visionEffectiveDate?: string | null;
  isSmoker?: boolean | null;
  socialSecurity?: string | null;
  socialSecurityDecrypted?: string | null;
  hmoPhysicianProviderPAOrMGNumber?: string | null;
  visionEnrollment?: EmployeeHealthEnrollment | null;
  lastName?: string | null;
  hmoPhysicianExistingPatient?: boolean | null;
  hasStateException?: boolean | null;
  enrolledInVision?: boolean | null;
  hmoPhysicianProviderNumber?: string | null;
  hasMedicalCoverage_is_set?: boolean | null;
  resource_uri?: string | null;
}

export interface EmployeeHealthEnrollment {
  startDate?: string | null;
  isSwitchCarrierEnrollment?: boolean | null;
  endDate?: string | null;
  companyVisionEnrollmentCompleteDate?: string | null;
  isInitialEnrollment?: boolean | null;
  medicalCarrierStatus?: string | null;
  coverage_type?: string | null;
  isOpenEnrollment?: boolean | null;
  applicationStatus?: string | null;
  companyEnrollment?: CompanyHealthEnrollment | null;
  isSubmitted?: boolean | null;
  medicalPlan?: Plan | null;
  hasSignedWaiver?: boolean | null;
  companyEffectiveDate?: string | null;
  dentalPlan?: DentalPlan | null;
  isApplicationSubmitted?: boolean | null;
  id?: string | null;
  createdAt?: DateTime | null;
  employee?: AllEmployee | null;
  effectiveDate?: string | null;
  isOffCycleEnrollment?: boolean | null;
  isPastEnrollmentDeadline?: boolean | null;
  applicationStatusDate?: string | null;
  addedDependents?: string | null;
  daysUntilDeadline?: string | null;
  companyMedicalEnrollmentCompleteDate?: string | null;
  isCardBlocked?: boolean | null;
  qualifyingEvent?: QualifyingEvent | null;
  isNewHireOEOrSW?: boolean | null;
  enrollmentCompleteDate?: string | null;
  progress?: string | null;
  type?: string | null;
  status?: string | null;
  enrollmentType?: string | null;
  authSignatureId?: number | null;
  version_id?: number | null;
  dependentCoverageChanged?: boolean | null;
  premiumsMap?: string | null;
  submittedDate?: string | null;
  resource_uri?: string | null;
  date?: string | null;
  visionCarrierStatus?: string | null;
  dentalCarrierStatus?: string | null;
  authSignature_id?: number | null;
  removedDependents?: string | null;
  isActive?: boolean | null;
  isEnrolledPlanHraCompatible?: boolean | null;
  oldPlan?: number | null;
  name?: string | null;
  visionPlan?: VisionPlan | null;
  companyDentalEnrollmentCompleteDate?: string | null;
  isEnrollmentOngoing?: boolean | null;
  isRealizationSuccessful?: boolean | null;
  employeeException?: EmployeeException | null;
  title?: string | null;
  previousCoverageExpirationDate?: string | null;
  includedInGroupApp?: boolean | null;
  oldCost?: string | null;
  stateCarrier?: Carrier | null;
  isEnrollmentException?: boolean | null;
  signature?: string | null;
  oldCompanyHealthPlan?: CompanyHealthPlan | null;
  needDocument?: boolean | null;
  disableDependentCoverageChanges?: string | null;
  companyHealthPlan?: CompanyHealthPlan | null;
  defaultPlan?: number | null;
}

export interface QualifyingEvent {
  id?: string | null;
  employee?: AllEmployee | null;
  eventDate?: string | null;
  type?: string | null;
  subtype?: string | null;
  subtypeDisplay?: string | null;
  reason?: string | null;
  documentStatus?: string | null;
  proofURL?: string | null;
  proofType?: string | null;
  knowledgeTime?: DateTime | null;
  documents?: (QualifyingEventDocument | null)[] | null;
  enrollments?: (EmployeeBenefitsEnrollment | null)[] | null;
  proofDocumentTypes?: (string | null)[] | null;
  dependentEnrollments?:
    | (DependentHealthEnrollment | null)[]
    | null /** TODO(Sun): remove dependentEnrollments after fully migrated to EBEs. */;
}

export interface QualifyingEventDocument {
  id?: string | null;
  status?: string | null;
  type?: string | null;
  url?: string | null;
  createdAt?: DateTime | null;
  reviews?: (QualifyingEventDocumentReview | null)[] | null;
}

export interface QualifyingEventDocumentReview {
  id?: string | null;
  document_id?: string | null;
  decision?: string | null;
  comment?: string | null;
  reviewer?: AllEmployee | null;
  carrier?: Carrier | null;
  createdAt?: DateTime | null;
}

export interface EmployeeBenefitsEnrollment {
  id: string /** Identifier which uniquely represents an enrollment object. */;
  employeeId: string /** Employee id */;
  employee: AllEmployee;
  lineOfCoverage: string /** Line of coverage. */;
  effectiveDate: Date /** Effective date of the enrollment. */;
  enrollmentType?: string | null /** Type of the enrollment, one of the granulat EmployeeEnrollmentTypes. */;
  status?: string | null /** raw enrollment status -- complete, selected, decline, cancelled */;
  isCardBlocked?: boolean | null /** Is the enrollment currently blocked? */;
  startDate?: Date | null /** Start date of the enrollment */;
  endDate?: Date | null /** Enrollment end date */;
  qualifyingEventId?: string | null /** Id of the associated qualifying event, if applicable. */;
}

export interface DependentHealthEnrollment {
  id?: string | null;
  dependent?: Dependent | null;
  lineOfCoverage?: string | null;
  isEnrollmentComplete?: boolean | null;
  effectiveStartDate?: string | null;
  effectiveDate?: string | null;
  qualifyingEvent?: QualifyingEvent | null;
  enrollmentStatus?: string | null;
  endDate?: string | null;
  status?: string | null;
  type?: string | null;
}

export interface VisionPlan {
  genderBandedStyle?: number | null;
  hasNetworkProviders?: boolean | null;
  frameAllowable?: string | null;
  showName?: string | null;
  availableOOS?: boolean | null;
  customPlanReason?: string | null;
  isVoluntary?: boolean | null;
  customPlanCompanyId?: number | null;
  availableOOSStates?: string | null;
  lensFrequency?: number | null;
  maxLives?: number | null;
  id?: string | null;
  shortCircuitPlanType?: string | null;
  expiryDate?: string | null;
  minLives?: number | null;
  retailDiscountAvailable?: boolean | null;
  fundingType?: string | null;
  productCode?: string | null;
  contactsFrequency?: number | null;
  group?: string | null;
  resource_uri?: string | null;
  stateCarrier?: Carrier | null;
  recommendedRenewalPlan?: VisionPlan | null;
  planUrl?: string | null;
  lastCommentDate?: string | null;
  planOrder?: number | null;
  lasikCoverage?: boolean | null;
  state?: string | null;
  liveQuote?: boolean | null;
  examFrequency?: number | null;
  frameAllowableSecondary?: string | null;
  consoleUrl?: string | null;
  freePlan?: boolean | null;
  lensAllowable?: string | null;
  isNewStyle?: string | null;
  isShortCircuitPlan?: boolean | null;
  planRequestLink?: string | null;
  compositeRuleSet?: CompositeRuleSet | null;
  coPay?: string | null;
  singleTierRate?: boolean | null;
  liveQuoteForRenewal?: boolean | null;
  rateStyle?: string | null;
  customPlan?: boolean | null;
  HMOPPO?: string | null;
  largeGroup?: boolean | null;
  compositeFactorSet?: CompositeFactorSet | null;
  contactsAllowableSecondary?: string | null;
  frameFrequency?: number | null;
  displayNote?: string | null;
  newGroupExpiryDate?: string | null;
  displayName?: string | null;
  name?: string | null;
  network?: Network | null;
  useSicRaf?: boolean | null;
  postACA?: boolean | null;
  useGenderBandedPrefixForRegionMapping?: boolean | null;
  contactsAllowableCondition?: number | null;
  lensAllowableCondition?: number | null;
  lensAllowableSecondary?: string | null;
  carrier?: string | null;
  useDependentAge?: boolean | null;
  sourcePlanId?: number | null;
  inProgress?: boolean | null;
  contactsAllowable?: string | null;
  adjustableRates?: boolean | null;
  frameAllowableCondition?: number | null;
  overrideCarrierDefaultRegion?: boolean | null;
  lineOfCoverage?: string | null;
  planType?: string | null;
}

export interface EmployeeException {
  employee?: AllEmployee | null;
  endDate?: string | null;
  effectiveDate?: string | null;
  lineOfCoverage?: string | null;
  type?: string | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface CourtOrder {
  employee?: AllEmployee | null;
  visionPlan?: VisionPlan | null;
  id?: string | null;
  proofUrl?: string | null;
  isProcessed?: boolean | null;
  visionEffectiveDate?: string | null;
  noticeDate?: string | null;
  processingDate?: string | null;
  employeeMaxWithholdPercentage?: number | null;
  medicalPlan?: Plan | null;
  medicalEffectiveDate?: string | null;
  signature?: Signature | null;
  dentalEffectiveDate?: string | null;
  orderDate?: string | null;
  dentalPlan?: DentalPlan | null;
  resource_uri?: string | null;
}

export interface DependentAddPlan {
  evidenceOfInsurabilityFormDocument?: Document | null;
  premium?: string | null;
  guaranteeIssue?: string | null;
  amount?: string | null;
  enrollment?: DependentLifeDisabilityEnrollment | null;
  selection?: DependentLifeDisabilitySelection | null;
  electedAmount?: string | null;
  plan?: AddPlan | null;
  id?: string | null;
  resource_uri?: string | null;
}
/** schema generated using server commit 04c288eead8177ac03b959e3db660c2c137a608d */
export interface AddPlan {
  planAuditStage?: string | null;
  flatPremium?: boolean | null;
  guaranteeIssueIncrements?: boolean | null;
  parentPlan?: AddPlan | null;
  dependentOnlyPlan?: boolean | null;
  customPlanCompanyId?: number | null;
  hasGuaranteeIssue?: boolean | null;
  migrationStatus?: string | null;
  basicPlanIncrements?: boolean | null;
  shortCircuitPlanType?: string | null;
  id?: string | null;
  productCode?: string | null;
  totalCompensationBasedEarnings?: boolean | null;
  stateCarrier?: Carrier | null;
  ageRedetermination?: string | null;
  planUrl?: string | null;
  comments?: string | null;
  zipCodeBasedRates?: boolean | null;
  benefitsAugmentation?: boolean | null;
  isShortCircuitPlan?: boolean | null;
  rateUrl?: string | null;
  applicableEnrollees?: string | null;
  secondaryGuaranteeIssue?: boolean | null;
  salaryRedetermination?: string | null;
  oldRateType?: string | null;
  customPlan?: boolean | null;
  familyTieredRates?: boolean | null;
  newGroupExpiryDate?: string | null;
  salaryBasedIncrements?: boolean | null;
  name?: string | null;
  planType?: string | null;
  contributionScheme?: boolean | null;
  dependentsOnBasicPlan?: boolean | null;
  multipleSamePlanTypedPlans?: boolean | null;
  renewalExpiryDate?: string | null;
  tobaccoRates?: boolean | null;
  previousStatusBasedMax?: boolean | null;
  resource_uri?: string | null;
  participationRequirement?: number | null;
  ageBasedOnRenewalDate?: boolean | null;
  evidenceOfInsurabilityForm?: string | null;
  lineOfCoverage?: string | null;
  rates?: (AddPlanRate | null)[] | null;
  restrictions?: (AddPlanRestriction | null)[] | null;
}

export interface AddPlanRate extends Plan_Rate, PlanRate {
  effectiveEndDate?: string | null;
  flatPremium?: string | null;
  plan?: AddPlan | null;
  gender?: string | null;
  ratePerThousand?: string | null;
  ageMin?: number | null;
  enrolleeType?: string | null;
  effectiveStartDate?: string | null;
  ageMax?: number | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface AddPlanRestriction {
  enrolleeMaxAmountStyle?: string | null;
  flatAmounts?: string | null;
  plan?: AddPlan | null;
  guaranteeIssue?: string | null;
  maxMultiplier?: string | null;
  isFixed?: boolean | null;
  planMaxAmount?: string | null;
  rateType?: string | null;
  isSetValues?: boolean | null;
  enrolleeType?: string | null;
  incrementalUnits?: string | null;
  planAmountStyle?: string | null;
  planMinAmount?: string | null;
  isIncrements?: boolean | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface DependentLtdPlan {
  evidenceOfInsurabilityFormDocument?: Document | null;
  premium?: string | null;
  guaranteeIssue?: string | null;
  amount?: string | null;
  enrollment?: DependentLifeDisabilityEnrollment | null;
  selection?: DependentLifeDisabilitySelection | null;
  electedAmount?: string | null;
  plan?: LtdPlanNew | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface LtdPlanNew {
  planAuditStage?: string | null;
  flatPremium?: boolean | null;
  guaranteeIssueIncrements?: boolean | null;
  parentPlan?: LtdPlanNew | null;
  dependentOnlyPlan?: boolean | null;
  customPlanCompanyId?: number | null;
  migrationStatus?: string | null;
  basicPlanIncrements?: boolean | null;
  shortCircuitPlanType?: string | null;
  id?: string | null;
  productCode?: string | null;
  totalCompensationBasedEarnings?: boolean | null;
  benefitsDuration?: string | null;
  stateCarrier?: Carrier | null;
  ageRedetermination?: string | null;
  ownOccPeriod?: string | null;
  planUrl?: string | null;
  comments?: string | null;
  zipCodeBasedRates?: boolean | null;
  ownOccPeriodStructured?: string | null;
  benefitsAugmentation?: boolean | null;
  preExistingCondition?: string | null;
  isShortCircuitPlan?: boolean | null;
  eliminationPeriod?: string | null;
  rateUrl?: string | null;
  applicableEnrollees?: string | null;
  secondaryGuaranteeIssue?: boolean | null;
  salaryRedetermination?: string | null;
  customPlan?: boolean | null;
  benefitsDurationStructured?: number | null;
  benefitsDurationChar?: string | null;
  familyTieredRates?: boolean | null;
  newGroupExpiryDate?: string | null;
  salaryBasedIncrements?: boolean | null;
  name?: string | null;
  planType?: string | null;
  contributionScheme?: boolean | null;
  dependentsOnBasicPlan?: boolean | null;
  multipleSamePlanTypedPlans?: boolean | null;
  renewalExpiryDate?: string | null;
  tobaccoRates?: boolean | null;
  eliminationPeriodAccidentIllness?: number | null;
  previousStatusBasedMax?: boolean | null;
  resource_uri?: string | null;
  participationRequirement?: number | null;
  ageBasedOnRenewalDate?: boolean | null;
  evidenceOfInsurabilityForm?: string | null;
  lineOfCoverage?: string | null;
  rates?: (LtdPlanRate | null)[] | null;
  restrictions?: (LtdPlanRestriction | null)[] | null;
}

export interface LtdPlanRate extends Plan_Rate, PlanRate {
  effectiveEndDate?: string | null;
  flatPremium?: string | null;
  plan?: LtdPlanNew | null;
  gender?: string | null;
  ageMin?: number | null;
  enrolleeType?: string | null;
  effectiveStartDate?: string | null;
  ageMax?: number | null;
  ratePerHundred?: string | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface LtdPlanRestriction {
  enrolleeMaxAmountStyle?: string | null;
  flatAmounts?: string | null;
  plan?: LtdPlanNew | null;
  guaranteeIssue?: string | null;
  maxMultiplier?: string | null;
  isFixed?: boolean | null;
  planMaxAmount?: string | null;
  planAmountStyle?: string | null;
  planMinAmount?: string | null;
  isSetValues?: boolean | null;
  enrolleeType?: string | null;
  rateType?: string | null;
  premiumScheme?: string | null;
  isIncrements?: boolean | null;
  resource_uri?: string | null;
  id?: string | null;
  incrementalUnits?: string | null;
}

export interface DependentLifePlan {
  evidenceOfInsurabilityFormDocument?: Document | null;
  premium?: string | null;
  guaranteeIssue?: string | null;
  amount?: string | null;
  enrollment?: DependentLifeDisabilityEnrollment | null;
  selection?: DependentLifeDisabilitySelection | null;
  electedAmount?: string | null;
  plan?: LifePlanNew | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface LifePlanNew {
  planAuditStage?: string | null;
  flatPremium?: boolean | null;
  guaranteeIssueIncrements?: boolean | null;
  parentPlan?: LifePlanNew | null;
  dependentOnlyPlan?: boolean | null;
  customPlanCompanyId?: number | null;
  migrationStatus?: string | null;
  basicPlanIncrements?: boolean | null;
  shortCircuitPlanType?: string | null;
  id?: string | null;
  productCode?: string | null;
  totalCompensationBasedEarnings?: boolean | null;
  stateCarrier?: Carrier | null;
  ageRedetermination?: string | null;
  planUrl?: string | null;
  comments?: string | null;
  zipCodeBasedRates?: boolean | null;
  benefitsAugmentation?: boolean | null;
  isShortCircuitPlan?: boolean | null;
  rateUrl?: string | null;
  applicableEnrollees?: string | null;
  secondaryGuaranteeIssue?: boolean | null;
  salaryRedetermination?: string | null;
  customPlan?: boolean | null;
  familyTieredRates?: boolean | null;
  newGroupExpiryDate?: string | null;
  salaryBasedIncrements?: boolean | null;
  name?: string | null;
  planType?: string | null;
  contributionScheme?: boolean | null;
  dependentsOnBasicPlan?: boolean | null;
  multipleSamePlanTypedPlans?: boolean | null;
  renewalExpiryDate?: string | null;
  tobaccoRates?: boolean | null;
  previousStatusBasedMax?: boolean | null;
  resource_uri?: string | null;
  participationRequirement?: number | null;
  ageBasedOnRenewalDate?: boolean | null;
  evidenceOfInsurabilityForm?: string | null;
  lineOfCoverage?: string | null;
  rates?: (LifePlanRate | null)[] | null;
  restrictions?: (LifePlanRestriction | null)[] | null;
}

export interface LifePlanRate extends Plan_Rate, PlanRate {
  effectiveEndDate?: string | null;
  flatPremium?: string | null;
  plan?: LifePlanNew | null;
  gender?: string | null;
  ratePerThousand?: string | null;
  ageMin?: number | null;
  enrolleeType?: string | null;
  effectiveStartDate?: string | null;
  ageMax?: number | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface LifePlanRestriction {
  enrolleeMaxAmountStyle?: string | null;
  flatAmounts?: string | null;
  plan?: LifePlanNew | null;
  guaranteeIssue?: string | null;
  maxMultiplier?: string | null;
  isFixed?: boolean | null;
  planMaxAmount?: string | null;
  rateType?: string | null;
  isSetValues?: boolean | null;
  enrolleeType?: string | null;
  incrementalUnits?: string | null;
  planAmountStyle?: string | null;
  planMinAmount?: string | null;
  isIncrements?: boolean | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface EmployeeLifePlanNew {
  evidenceOfInsurabilityFormDocument?: Document | null;
  premium?: string | null;
  guaranteeIssue?: string | null;
  amount?: string | null;
  enrollment?: EmployeeLifeDisabilityEnrollment | null;
  selection?: EmployeeLifeDisabilitySelection | null;
  electedAmount?: string | null;
  plan?: LifePlanNew | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface EmployeeAddPlan {
  evidenceOfInsurabilityFormDocument?: Document | null;
  premium?: string | null;
  guaranteeIssue?: string | null;
  amount?: string | null;
  enrollment?: EmployeeLifeDisabilityEnrollment | null;
  selection?: EmployeeLifeDisabilitySelection | null;
  electedAmount?: string | null;
  plan?: AddPlan | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface EmployeeLtdPlanNew {
  evidenceOfInsurabilityFormDocument?: Document | null;
  premium?: string | null;
  guaranteeIssue?: string | null;
  amount?: string | null;
  enrollment?: EmployeeLifeDisabilityEnrollment | null;
  selection?: EmployeeLifeDisabilitySelection | null;
  electedAmount?: string | null;
  plan?: LtdPlanNew | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface ParticipationState {
  isFailing?: boolean | null;
  qualifiedNonNewHires?: number | null;
  qualifiedNewHires?: number | null;
  invalidDeclinedNonNewHires?: number | null;
  participationRuleV2?: string | null;
  id?: string | null;
  invalidDeclinedNewHires?: number | null;
  participationRule?: ParticipationRule | null;
  invalidDeclined?: number | null;
  participationRuleOverride?: ParticipationRuleOverride | null;
  companyHealthEnrollment?: CompanyHealthEnrollment | null;
  remaining?: number | null;
  validDeclinedNonNewHires?: number | null;
  percentEnrolled?: string | null;
  status?: string | null;
  participationRuleName?: string | null;
  remainingNewHires?: number | null;
  enrolledNonNewHires?: number | null;
  isUnsure?: boolean | null;
  qualified?: number | null;
  enrolledNewHires?: number | null;
  remainingNonNewHires?: number | null;
  validDeclined?: number | null;
  validDeclinedNewHires?: number | null;
  enrolled?: number | null;
  resource_uri?: string | null;
}

export interface ParticipationRule {
  isStrict?: boolean | null;
  contributoryType?: string | null;
  softDeleted?: boolean | null;
  lineOfCoverage?: string | null;
  minEmployees?: number | null;
  minEmployeesCount?: number | null;
  planGroup?: string | null;
  andOrOr?: string | null;
  additionalNotes?: string | null;
  percentage?: string | null;
  resource_uri?: string | null;
  id?: string | null;
  maxEmployees?: number | null;
}

export interface ParticipationRuleOverride {
  isStrict?: boolean | null;
  minPercentage?: string | null;
  softDeleted?: boolean | null;
  reason?: string | null;
  minEmployees?: number | null;
  companyHealthEnrollment?: CompanyHealthEnrollment | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface PlanMapping {
  oldPlanId?: string | null;
  oldPlanName?: string | null;
  newPlanId?: string | null;
  newPlanName?: string | null;
}

export interface SupplementalPlan {
  id?: string | null;
  lineOfCoverage?: string | null;
  stateCarrier?: Carrier | null;
  name?: string | null;
  planUrl?: string | null;
  displayName?: string | null;
}

export interface CompanyHealthRider {
  id?: string | null;
  planId?: string | null;
  companyHealthPlan_id?: string | null;
  riderType?: string | null;
}

export interface BenefitsEnrollment {
  id?: string | null;
  employee_id?: string | null;
  benefitsType?: string | null;
  enrollmentType?: string | null;
  effectiveDate?: DateTime | null;
  status?: string | null;
  benefitsEvent?: string | null;
  startDate?: DateTime | null;
  endDate?: DateTime | null;
  validity?: string | null;
  benefitsContext?: BenefitsContext | null;
  companyHealthEnrollment_id?: string | null;
  qualifyingEvent_id?: string | null;
}

export interface BenefitsContext {
  employee?: EmployeeContext | null;
  dependents?: (DependentContext | null)[] | null;
}

export interface EmployeeContext {
  personalInfo?: PersonalInfoContext | null;
  employment?: EmploymentContext | null;
  coverage?: CoverageContext | null;
}

export interface PersonalInfoContext {
  id?: string | null;
  email?: string | null;
  type?: string | null;
  status?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  midName?: string | null;
  dateOfBirth?: string | null;
  height?: string | null;
  weight?: string | null;
  gender?: string | null;
  ssn?: string | null;
  maritalStatus?: string | null;
  phoneNumber?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  isDisabled?: boolean | null;
  isSmoker?: boolean | null;
}

export interface EmploymentContext {
  employmentStatus?: string | null;
  jobTitle?: string | null;
  compensationType?: string | null;
  hourlyPay?: string | null;
  hoursWorked?: string | null;
  annualSalary?: string | null;
  employmentType?: string | null;
  hireDate?: string | null;
  fullTimeStartDate?: string | null;
  fullTimeEndDate?: string | null;
  terminationDate?: string | null;
}

export interface CoverageContext {
  lineOfCoverage?: string | null;
  effectiveDate?: string | null;
  enrollmentTier?: string | null;
  contributionTier?: string | null;
  enrollmentCompleteDate?: string | null;
  status?: string | null;
  rawEnrollmentStatus?: string | null;
  enrollmentType?: string | null;
  isInGroupApp?: boolean | null;
  signatureId?: string | null;
  signatureDate?: string | null;
  carrierMemberId?: string | null;
  applicationStatus?: string | null;
  isNewHire?: boolean | null;
  divisionCode?: string | null;
  isEligibleForBenefits?: boolean | null;
  eligibilityStartDate?: string | null;
  isEligibleForCobra?: boolean | null;
  isCobraEnrollee?: boolean | null;
  isCarrierMapped?: boolean | null;
  cobra?: EmployeeCobraContext | null;
  carrierId?: string | null;
  carrierName?: string | null;
  carrier?: Carrier | null;
  brokerSignatureId?: string | null;
  primaryBenefitsPlan?: PrimaryBenefitsPlanContext | null;
  lndBasicPlan?: DisabilityBenefitsPlanContext | null;
  lndVoluntaryPlan?: DisabilityBenefitsPlanContext | null;
  primaryHealthCarePhysician?: HmoPhysicianContext | null;
  plans?: (DisabilityBenefitsPlanContext | null)[] | null;
  oldPlans?: (PlanContext | null)[] | null;
  defaultPlan?: PlanContext | null;
  waiver?: WaiverContext | null;
  riders?: (RiderContext | null)[] | null;
  qualifyingEvent?: QualifyingEventContext | null;
  cancellationReason?: string | null;
  agreementDocumentId?: string | null;
  lndPlan?: DisabilityBenefitsPlanContext | null;
  isDeclined?: boolean | null;
}

export interface EmployeeCobraContext {
  reason?: string | null;
  type?: string | null;
  coverageStartDate?: string | null;
  coverageEndDate?: string | null;
}

export interface PrimaryBenefitsPlanContext {
  id?: string | null;
  name?: string | null;
  companyHealthPlanId?: string | null;
  policyNumber?: string | null;
  productCode?: string | null;
  effectiveDate?: string | null;
}

export interface DisabilityBenefitsPlanContext {
  id?: string | null;
  planId?: string | null;
  name?: string | null;
  planType?: string | null;
  companyHealthPlanId?: string | null;
  policyNumber?: string | null;
  productCode?: string | null;
  effectiveDate?: string | null;
  amount?: string | null;
  electedAmount?: string | null;
  guaranteeIssue?: string | null;
  evidenceOfInsurabilityForm?: string | null;
  evidenceOfInsurabilityStatus?: string | null;
  isOverGI?: boolean | null;
  isSalaryBased?: boolean | null;
  beneficiaries?: (BeneficiaryContext | null)[] | null;
}

export interface BeneficiaryContext {
  firstName?: string | null /** Person */;
  lastName?: string | null;
  percentage?: string | null;
  relationship?: string | null;
  dateOfBirth?: string | null;
  phoneNumber?: string | null;
  entityName?: string | null /** Entity */;
  entityType?: string | null;
  entityDateEstablished?: string | null;
}

export interface HmoPhysicianContext {
  hmoPhysicianExistingPatient?: boolean | null;
  hmoPhysicianProviderNumber?: string | null;
  hmoPhysicianName?: string | null;
}

export interface PlanContext {
  id?: string | null;
  name?: string | null;
  companyHealthPlanId?: string | null;
}

export interface WaiverContext {
  hasSignedWaiver?: boolean | null;
  otherCarrier?: string | null;
  reasonForDecliningCoverage?: string | null;
  waiveReasonName?: string | null;
  otherIdNumber?: string | null;
  signatureId?: string | null;
}

export interface RiderContext {
  id?: string | null;
  planId?: string | null;
  riderType?: string | null;
}

export interface QualifyingEventContext {
  type?: string | null;
  subtype?: string | null;
  eventDate?: DateTime | null;
  proofURL?: string | null;
  proofType?: string | null;
}

export interface DependentContext {
  personalInfo?: PersonalInfoContext | null;
  coverage?: DependentCoverageContext | null;
}

export interface DependentCoverageContext {
  lineOfCoverage?: string | null;
  effectiveDate?: string | null;
  enrollmentCompleteDate?: string | null;
  status?: string | null;
  type?: string | null;
  declineReason?: string | null;
  primaryHealthCarePhysician?: HmoPhysicianContext | null;
  isEnrolled?: boolean | null;
  waiver?: WaiverContext | null;
  lndBasicPlan?: DisabilityBenefitsPlanContext | null;
  lndVoluntaryPlan?: DisabilityBenefitsPlanContext | null;
  plans?: (DisabilityBenefitsPlanContext | null)[] | null;
}

export interface BenefitsTransaction {
  event?: string | null;
  eventCycle?: string | null;
  maxAnnualContribution?: string | null;
  employeeContribution?: number | null;
  proratingStrategy?: string | null;
  id?: string | null;
  employeePlanCost?: string | null;
  employee?: AllEmployee | null;
  effectiveDate?: string | null;
  dependentsPlanCost?: string | null;
  benefitsCost?: BenefitsCost | null;
  employeeRiderCost?: string | null;
  employeeDeduction?: number | null;
  benefitsContext?: BenefitsContext | null;
  payloadContext_id?: string | null;
  deactivationDate?: DateTime | null;
  dependentsContribution?: number | null;
  reason?: string | null;
  creationDate?: DateTime | null;
  dependentsRiderCost?: string | null;
  dependentsDeduction?: number | null;
  benefitsType?: string | null;
  maxAnnualDeduction?: string | null;
  contributionBreakdown?: ContributionBreakdown | null;
  isContributionAsPercentage?: boolean | null;
  isDeductionAsPercentage?: boolean | null;
  logs?: (BenefitsTransactionLog | null)[] | null;
  initiativeRelationships?: (BenefitsTransactionRelationship | null)[] | null;
  passiveRelationships?: (BenefitsTransactionRelationship | null)[] | null;
  fulfillmentInfo?: BenefitsFulfillmentInfo | null;
}

export interface BenefitsCost {
  employeePlanCost?: number | null;
  employeeRidersCost?: number | null;
  employeeVoluntaryPlanCost?: number | null;
  dependentsPlanCost?: number | null;
  dependentsRidersCost?: number | null;
  dependentsVoluntaryPlanCost?: number | null;
  spousePlanCost?: number | null;
  spouseRidersCost?: number | null;
  spouseVoluntaryPlanCost?: number | null;
  childrenPlanCost?: number | null;
  childrenRidersCost?: number | null;
  childrenVoluntaryPlanCost?: number | null;
}

export interface ContributionBreakdown {
  employeeDeduction?: number | null;
  employeeContribution?: number | null;
  dependentsDeduction?: number | null;
  dependentsContribution?: number | null;
  maxAnnualDeduction?: number | null;
  maxAnnualContribution?: number | null;
  isDeductionAsPercentage?: boolean | null;
  isContributionAsPercentage?: boolean | null;
}

export interface BenefitsTransactionLog {
  creationDate?: DateTime | null;
  employee_id?: number | null;
  requestEmployee?: AllEmployee | null;
  requesterCategory?: string | null;
  user_id?: number | null;
  success?: boolean | null;
  benefitsType?: string | null;
  errorMessage?: string | null;
  funcName?: string | null;
  requestData?: string | null;
  time?: DateTime | null;
  commitHash?: string | null;
  fileName?: string | null;
  id?: string | null;
}

export interface BenefitsTransactionRelationship {
  id?: string | null;
  name?: string | null;
  initiativeTransaction?: BenefitsTransaction | null;
  passiveTransaction?: BenefitsTransaction | null;
  contextChange?: string | null;
  contextChangeError?: boolean | null;
  costChange?: string | null;
  costChangeError?: boolean | null;
  contributionChange?: string | null;
  contributionChangeError?: boolean | null;
  effectiveDateChange?: string | null;
}

export interface BenefitsFulfillmentInfo {
  currentStatus: BenefitsFulfillmentCurrentStatus;
  details?: BenefitsFulfillmentInfoDetails | null;
  benConnectInfo?: BenefitsFulfillmentInfo | null;
  benefitsTransactionId: string;
}

export interface BenefitsFulfillmentCurrentStatus {
  statusSummary: string;
  settlementStatus: BenefitsSettlementStatus;
}

export interface BenefitsFulfillmentInfoDetails {
  changeLogTransactions?: BenefitsFulfillmentChangelogTransaction[] | null;
}

export interface BenefitsFulfillmentChangelogTransaction {
  timestamp: DateTime;
  message: string;
  sendChannelName?: string | null;
  status: BenefitsSettlementStatus;
  links?: BenefitsFulfillmentHelpLink[] | null;
}

export interface BenefitsFulfillmentHelpLink {
  identifier: string;
  name: string;
  href: string;
}

export interface EmployeeProductEligibilityTag {
  addEligibilityStartDate?: string | null;
  isEligibleForCommuterBenefits?: boolean | null;
  stdEligibilityStartDate?: string | null;
  lifeEligibilityStartDateOverridden?: boolean | null;
  isEligibleForHSA?: boolean | null;
  isEligibleForPTO?: boolean | null;
  isEligibleForLife?: boolean | null;
  visionEligibilityStartDateOverridden?: boolean | null;
  id?: string | null;
  isEligibleForDental?: boolean | null;
  employee?: AllEmployee | null;
  isEligibleForLTD?: boolean | null;
  isEligibleForVision?: boolean | null;
  dentalEligibilityStartDateOverridden?: boolean | null;
  isEligibleForHRA?: boolean | null;
  isEligibleForSTD?: boolean | null;
  medicalEligibilityStartDateOverridden?: boolean | null;
  isEligibleForMedical?: boolean | null;
  isACAFullTimeEligible?: boolean | null;
  addEligibilityStartDateOverridden?: boolean | null;
  isEligibleForHealth?: boolean | null;
  visionEligibilityStartDate?: string | null;
  isEligibleForTA?: boolean | null;
  lifeEligibilityStartDate?: string | null;
  isEligibleForAdd?: boolean | null;
  ltdEligibilityStartDateOverridden?: boolean | null;
  dentalEligibilityStartDate?: string | null;
  ltdEligibilityStartDate?: string | null;
  isEligibleForFSA?: boolean | null;
  stdEligibilityStartDateOverridden?: boolean | null;
  medicalEligibilityStartDate?: string | null;
  isEligibleForLifeOrAdd?: boolean | null;
  isEligibleForLifeOrDisability?: boolean | null;
  resource_uri?: string | null;
}

export interface EmployeeBenefits {
  employeeEnrollmentFlowId?: number | null;
  planCostContribution?: (PlanCostContribution | null)[] | null;
  planAvailability?: (PlanAvailability | null)[] | null;
  ongoingBenefitsEnrollment?: BenefitsEnrollment | null;
  employeeReinstateBenefits?: ReinstateBenefits | null;
}

export interface PlanCostContribution {
  companyHealthPlanId?: string | null;
  youPremium?: number | null;
  youAndChildPremium?: number | null;
  youAndSpousePremium?: number | null;
  familyPremium?: number | null;
  youContribution?: number | null;
  youOnlyContribution?: number | null;
  youAndChildContribution?: number | null;
  youAndSpouseContribution?: number | null;
  familyContribution?: number | null;
  oneFixedCostTotalAmount?: number | null;
}

export interface PlanAvailability {
  chpId?: string | null;
  available?: boolean | null;
  reason?: string | null;
}

export interface ReinstateBenefits {
  lineOfCoverage?: string | null;
  isReinstate?: boolean | null;
  coverageInfo?: CoverageInfo | null;
}

export interface CoverageInfo {
  chpId: string;
  employee?: EmployeeCoverageInfo | null;
  dependents?: (DependentCoverageInfo | null)[] | null;
}

export interface EmployeeCoverageInfo {
  electedAmount?: string | null;
  cost?: string | null;
}

export interface DependentCoverageInfo {
  enrolleeId: string;
  enrolleeType: string;
  electedAmount?: string | null;
  cost?: string | null;
}

export interface EmployeeChangesHistory {
  resource_uri?: string | null;
  isBackFilled?: boolean | null;
  isRequesterSameAsApprover?: boolean | null;
  isFlsaExemptSystemComputed?: boolean | null;
  reason?: string | null;
  requestedBy?: AllEmployee | null;
  approvedBy?: (AllEmployee | null)[] | null;
  changedBy?: AllEmployee | null;
  hireDate?: Date | null;
  changeDate?: Date | null;
  effectiveDate?: Date | null;
  title?: string | null;
  employmentType?: EmploymentType | null;
  compType?: CompType | null;
  annualSalary?: string | null;
  payRate?: string | null;
  isFlsaExempt?: boolean | null;
  hasNonExemptJobDuties?: boolean | null;
  location?: CompanyLocation | null;
  department?: Department | null;
  workerType?: WorkerType | null;
  manager?: AllEmployee | null;
}

export interface EmployeeProfile {
  sections?: (EmployeeProfileSection | null)[] | null;
  employmentInfo?: EmploymentInfoDisplay | null;
  equalEmploymentOpportunity?: EqualEmploymentOpportunityDisplay | null;
  employmentHistory?: (EmployeeChangesHistory | null)[] | null;
}

export interface EmployeeProfileSection {
  name?: string | null;
}

export interface EmploymentInfoDisplay {
  startDate?: Date | null;
  endDate?: Date | null;
  title?: string | null;
  department?: string | null;
  workLocation?: string | null;
  employmentType?: string | null;
  compensationType?: string | null;
  annualSalary?: string | null;
  annualSalaryInUSD?: string | null;
  hourlyRate?: string | null;
  hourlyRateInUSD?: string | null;
  currency?: string | null;
  extraFields?: (BasicField | null)[] | null;
}

export interface BasicField {
  name?: string | null;
  value?: string | null;
}

export interface EqualEmploymentOpportunityDisplay {
  jobCategory?: string | null;
  legalGender?: string | null;
  race?: string | null;
}

export interface PersonalInfo {
  maritalStatus?: string | null;
  homeCity?: string | null;
  updatedAt?: DateTime | null;
  hireDate?: string | null;
  homeAddress2?: string | null;
  marriageDate?: string | null;
  homeZip?: string | null;
  marriageState?: string | null;
  spouseDPEmployed?: string | null;
  numberOfDependents?: number | null;
  id?: string | null;
  spouseDPEmployerAddress?: string | null;
  numberChildren?: number | null;
  hoursPerWeek?: number | null;
  email?: string | null;
  spouseDPEmployer?: string | null;
  employmentStatus?: string | null;
  haveChildren?: string | null;
  jobTitle?: string | null;
  contactPreference?: string | null;
  homePhone?: string | null;
  salary?: string | null;
  homeState?: string | null;
  firstName?: string | null;
  dob?: string | null;
  gender?: string | null;
  marriageCountry?: string | null;
  socialSecurity?: string | null;
  lastName?: string | null;
  homeAddress?: string | null;
  resource_uri?: string | null;
}

export interface Beneficiary {
  status?: string | null;
  address?: Address | null;
  entityType?: string | null;
  maxBenefits?: string | null;
  relationship?: string | null;
  dateOfBirth?: string | null;
  lastName?: string | null;
  entityName?: string | null;
  isEnrolledInInsurance?: boolean | null;
  phone?: string | null;
  employee?: AllEmployee | null;
  firstName?: string | null;
  socialSecurity?: string | null;
  entityDateEstablished?: string | null;
  otherRelationship?: string | null;
  percentage?: string | null;
  type?: string | null;
  id?: string | null;
  hasSocialSecurity?: boolean | null;
  resource_uri?: string | null;
}

export interface ZAppInstallSubscription {
  id?: string | null;
  appInstall?: ZAppInstall | null;
  company?: Company | null;
  employee?: AllEmployee | null;
  preferences?: JSON | null;
  status?: number | null;
  access?: number | null;
  inheritedStatus?: number | null;
  subscribedAt?: DateTime | null;
  createdAt?: DateTime | null;
  updatedAt?: DateTime | null;
}

export interface ZAppInstall {
  id?: string | null;
  app?: ZApp | null;
  company?: Company | null;
  preferences?: JSON | null;
  status?: number | null;
  autoSubMode?: string | null;
  installedAt?: DateTime | null;
  createdAt?: DateTime | null;
  updatedAt?: DateTime | null;
}

export interface ZApp {
  id?: string | null;
  uniqueId?: string | null;
  packageId?: string | null;
  developerId?: number | null;
  title?: string | null;
  shortTitle?: string | null;
  delegate?: string | null;
  preferences?: JSON | null;
  appUrl?: string | null;
  appIconSqUrl?: string | null;
  role?: string | null;
  primaryCategory?: string | null;
  secondaryCategory?: string | null;
  status?: number | null;
  autoSubMode?: string | null;
  createdAt?: DateTime | null;
  updatedAt?: DateTime | null;
  isPublishedRollout?: boolean | null;
  scopes?: JSON | null;
}

export interface CompanyHealthProxy {
  companyInfo?: CompanyInfo | null /** deductionHeuristics: CompanyDeductionHeuristics */;
  companyCobra?: CompanyCobra | null;
  id?: string | null /** settings: CompanySettingsbenefitsPreview: BenefitsPreview */;
}

export interface CompanyInfo {
  entityTypeForTaxPurposes?: string | null;
  billingAddressState?: string | null;
  bankName?: string | null;
  entityType?: string | null;
  establishedYear?: number | null;
  physicalAddressZip?: string | null;
  entityChangedRecently?: boolean | null;
  dbaName?: string | null;
  bankRoutingNumber?: string | null;
  id?: string | null;
  industryType?: string | null;
  numberOfLocations?: number | null;
  fifteenAllowed?: boolean | null;
  fullTimeEmployeeCount?: number | null;
  company?: Company | null;
  isQuarterlyWageTaxAvailable?: boolean | null;
  outOfStateEmployeeCount?: number | null;
  physicalAddressCity?: string | null;
  entityChangedOnPayrollQWTR?: boolean | null;
  website?: string | null;
  checkUrl?: string | null;
  bankAccountNumber?: string | null;
  establishedMonth?: number | null;
  businessDescription?: string | null;
  medicareEmployeeCount?: number | null;
  billingAddressStreet2?: string | null;
  billingAddressStreet1?: string | null;
  billingAddressCity?: string | null;
  numUnionMember?: number | null;
  physicalAddressState?: string | null;
  partTimeEmployeeCount?: number | null;
  physicalAddressStreet2?: string | null;
  numPreviousAverageEmployees?: number | null;
  physicalAddressStreet1?: string | null;
  name?: string | null;
  physicalAddressCounty?: string | null;
  billingAddressZip?: string | null;
  isBillingSame?: boolean | null;
  resource_uri?: string | null;
  ein?: string | null;
}

export interface CompanyCobra {
  cobraBankAccountNumber?: string | null;
  previousAdminEmail?: string | null;
  cobraBankAuthDate?: string | null;
  id?: string | null;
  cobraPartTimeCountRawData?: string | null;
  takeoverAdminSignature?: string | null;
  cobraBankRoutingNumber?: string | null;
  company?: Company | null;
  takeoverAdminName?: string | null;
  cobraBankAccountType?: string | null;
  status?: string | null;
  countEmployees?: string | null;
  previousAdminName?: string | null;
  previousHaveParticipants?: boolean | null;
  cobraBankAuthSignature?: string | null;
  cobraFullTimeCount?: number | null;
  cobraClassification?: (CompanyCobra | null)[] | null;
  isBankInfoComplete?: boolean | null;
  cobraBankName?: string | null;
  takeoverDate?: string | null;
  offboardingDate?: string | null;
  coolingOffDays?: number | null;
  cobraPartTimeCount?: number | null;
  cobraBankAuthName?: string | null;
  takeoverAdminTitle?: string | null;
  previousAdministratorType?: string | null;
  takeoverSignDate?: string | null;
  hasActiveCobraEmployees?: boolean | null;
  resource_uri?: string | null /** previousAdministrator: CobraThirdPartyAdministrator */;
  thirdPartyAdministrators?: (CompanyCobraThirdPartyAdministrator | null)[] | null;
}

export interface CompanyCobraThirdPartyAdministrator {
  id?: string | null;
  status?: string | null;
  relationStartTimeStamp?: DateTime | null;
  relationEndTimeStamp?: DateTime | null;
  adminContactName?: string | null;
  adminContactEmail?: string | null;
  adminContactPhoneNumber?: string | null;
  administrator?: CobraThirdPartyAdministrator | null;
}

export interface CobraThirdPartyAdministrator {
  name?: string | null;
  defaultCoolingOffDays?: number | null;
  isCloseOutReportRequired?: boolean | null;
  id?: string | null;
  isTerminationFormRequired?: boolean | null;
  phoneNumber?: string | null;
  type?: string | null;
  email?: string | null;
  isVerified?: boolean | null;
  resource_uri?: string | null;
}

export interface CompanyPayrollProxy {
  zpCompany?: ZPayrollCompany | null /** smp: SmpcontractorSettings: ContractorSettingsnewPayroll: NewPayroll */;
  paySchedules?:
    | (CompanyPaySchedule | null)[]
    | null /** payroll: PayrollCompanySettingspayrollSwitch: PayrollSwitch */;
  id?: string | null;
}

export interface ZPayrollCompany {
  isCruiseControlOn?: boolean | null;
  signatory?: AllEmployee | null;
  joinWaitlist?: boolean | null;
  onboardingState?: string | null;
  hasPriorPayroll?: boolean | null;
  zpCompanyBenefitsSurvey?: ZPayrollCompanyBenefitsSurvey | null;
  id?: string | null;
  _cruiseControlPayPeriodSettings?: ZPayrollPayPeriodSettings | null;
  signatoryTitle?: string | null;
  suspensionReason?: string | null;
  company?: Company | null;
  blockPeriod?: number | null;
  _creditLimit?: string | null;
  cruiseControlPayPeriodSettings?: ZPayrollPayPeriodSettings | null;
  zpCompanyBankAccount?: ZPayrollCompanyBankAccount | null;
  status?: string | null;
  billingType?: string | null;
  priorPayrollProvider?: string | null;
  zpCompanyImplementation?: ZPayrollCompanyImplementation | null;
  version_id?: number | null;
  isCreditLimitExceeded?: boolean | null;
  zpCompanyJurisdictions?: (ZPayrollCompanyJurisdiction | null)[] | null;
  isActive?: boolean | null;
  cruiseControlPayPeriodSettings_is_set?: boolean | null;
  billingCycleType?: string | null;
  name?: string | null;
  bulkUploadUrl?: string | null;
  zpPayPeriodSettings?: ZPayrollPayPeriodSettings | null;
}

export interface ZPayrollCompanyBenefitsSurvey {
  hasSTD?: boolean | null;
  zpCompany?: ZPayrollCompany | null;
  hasVision?: boolean | null;
  hasStockOption?: boolean | null;
  isInterestedInBOR?: boolean | null;
  hasCommuter?: boolean | null;
  hasWorkersComp?: boolean | null;
  hasFSA?: boolean | null;
  hasDental?: boolean | null;
  hasMedical?: boolean | null;
  hasTA?: boolean | null;
  hasHRA?: boolean | null;
  hasLTD?: boolean | null;
  hasPTO?: boolean | null;
  hasLife?: boolean | null;
  has401k?: boolean | null;
  id?: string | null;
  hasHSA?: boolean | null;
  hasADD?: boolean | null;
}

export interface ZPayrollPayPeriodSettings {
  _payFrequency?: string | null;
  _arrearsDays?: string | null;
  _holidayShift?: string | null;
  _arrearsDaysType?: string | null;
  company?: Company | null;
  isCruiseControlOnChangedBySystem?: boolean | null;
  isCruiseControlOn?: boolean | null;
  companyPaySchedule?: CompanyPaySchedule | null;
  id?: string | null;
  name?: string | null;
}

export interface CompanyPaySchedule {
  company?: Company | null /** smpRuns: [SmpRun] */;
  root?: CompanyPaySchedule | null;
  descendants?: (CompanyPaySchedule | null)[] | null;
  id?: string | null;
  name?: string | null;
  status?: CompanyPayScheduleStatus | null;
  isActive?: boolean | null;
  isMutable?: boolean | null;
  effectiveStartDate?: string | null;
  effectiveEndDate?: string | null;
  creationMethod?: PayScheduleCreationMethod | null;
  payFrequency?: PayFrequencyChoices | null;
  displayFrequencyName?: string | null;
  payDayOfMonth?: number | null;
  secondPayDayOfMonth?: number | null;
  payDayOfWeek?: string | null;
  payPeriodEndDayOfMonth?: number | null;
  secondPayPeriodEndDayOfMonth?: number | null;
  payPeriodEndDayPayDayMonthDelta?: number | null;
  secondPayPeriodEndDayPayDayMonthDelta?: number | null;
  holidayShift?: PayScheduleShift | null;
  saturdayShift?: PayScheduleShift | null;
  sundayShift?: PayScheduleShift | null;
  secondSaturdayShift?: PayScheduleShift | null;
  secondSundayShift?: PayScheduleShift | null;
  secondHolidayShift?: PayScheduleShift | null;
  anchorStartDate?: string | null;
  shiftedAnchorCheckDate?: string | null;
  unshiftedAnchorCheckDate?: string | null;
  arrearsDays?: number | null;
  arrearsDayType?: ArrearDayType | null;
  secondArrearsDays?: number | null;
  secondArrearsDayType?: ArrearDayType | null;
  checkDayPolicy?: string | null;
  compType?: CompanyPayScheduleCompType | null;
}

export interface ZPayrollCompanyBankAccount {
  status?: string | null;
  verificationType?: string | null;
  bankAccountNumber?: string | null;
  hasFailed?: boolean | null;
  voidCheckVerified?: string | null;
  bankAccountVerification_id?: number | null;
  company?: Company | null;
  version_id?: number | null;
  voidCheckUrl?: string | null;
  zpCompany?: ZPayrollCompany | null;
  isWaiting?: boolean | null;
  isVerified?: boolean | null;
  id?: string | null;
  bankRoutingNumber?: string | null;
  overrideVerification?: boolean | null;
  voidCheckUploadedOn?: DateTime | null;
  accountHolderName?: string | null;
}

export interface ZPayrollCompanyImplementation {
  blockscoreVerification?: string | null;
  experianVerification?: string | null;
  poaStateVerification?: string | null;
  currentQTEarningTaxVerification?: string | null;
  appCompletedOn?: DateTime | null;
  assignedTo?: User | null;
  employeeSyncDiffsVerification?: string | null;
  closedQTsSubjectWagesVerification?: string | null;
  closedQTsTotalTaxAmountVerification?: string | null;
  companyAddressesVerification?: string | null;
  lastSetupStatusReminderSentOn?: string | null;
  id?: string | null;
  eftpsVerification?: string | null;
  poaFederalVerification?: string | null;
  experianActiveBusinessIndicatorVerification?: string | null;
  employeeDataCompletedOn?: DateTime | null;
  imFieldsUpdatedOn?: DateTime | null;
  experianOFACMatchVerification?: string | null;
  overrideNaicsVerification?: boolean | null;
  experianAddressVerification?: string | null;
  companyVerificationStatus?: string | null;
  status?: string | null;
  appCreatedOn?: DateTime | null;
  blockscoreOFACMatchVerification?: string | null;
  aoiPrincipalsNameVerification?: string | null;
  blockscoreRedFlags?: string | null;
  stateRegistrationVerification?: string | null;
  employeeAndTaxVerificationStatus?: string | null;
  principalPhotoIDVerification?: string | null;
  bankAccountStatementVerification?: string | null;
  bankingVerificationStatus?: string | null;
  employeeReviewDataVerification?: string | null;
  experianCreditRiskClass?: string | null;
  priorPayrollCompletedOn?: DateTime | null;
  aoiCompanyNameVerification?: string | null;
  experianFinancialStabilityRiskClass?: string | null;
  lastPendingStatusReminderSentOn?: Date | null;
  implementationCompletedOn?: DateTime | null;
  zpCompany?: ZPayrollCompany | null;
  pendingTaxLiabilitiesApprovedOn?: DateTime | null;
  priorPayrollVerificationStatus?: string | null;
  experianJudgements?: string | null;
  notes?: string | null;
}

export interface ZPayrollCompanyJurisdiction {
  businessStartDate?: string | null;
  zpCompanyJurisdictionTaxRates?: (ZPayrollCompanyJurisdictionTaxRate | null)[] | null;
  nameControl?: string | null;
  jurisdiction?: string | null;
  federalExemptFrom940?: boolean | null;
  employmentTaxDepositFrequency?: string | null;
  authorizeZenefitsPayTax?: boolean | null;
  unifiedBusinessId?: string | null;
  unemploymentTaxId?: string | null;
  id?: string | null;
  workersCompId?: string | null;
  employmentTaxId?: string | null;
  zpCompanyJurisdictionTaxCategories?: (ZPayrollCompanyJurisdictionTaxCategory | null)[] | null;
  tapPassphrase?: string | null;
  eft?: string | null;
  businessEndDate?: string | null;
  accessCode?: string | null;
  sic?: string | null;
  notFullTimeMedicalBenefitsEmployees?: number | null;
  status?: string | null;
  isReimbursable?: boolean | null;
  deleted?: boolean | null;
  federalFilingType?: string | null;
  mbtType?: string | null;
  isWorkLocationJurisdiction?: boolean | null;
  uiPaymentAccountNumber?: string | null;
  workersCompActCoverage?: boolean | null;
  businessEFileNumber?: string | null;
  zpCompany?: ZPayrollCompany | null;
  legalName?: string | null;
  participationActivationCode?: string | null;
  pinCode?: string | null;
}

export interface ZPayrollCompanyJurisdictionTaxRate {
  filingMetas?: string | null;
  taxMetas?: string | null;
  year?: number | null;
  taxType?: string | null;
  taxPayee?: string | null;
  rate?: string | null;
  workersCompClassCode?: string | null;
  zpCompanyJurisdiction?: ZPayrollCompanyJurisdiction | null;
  id?: string | null;
}

export interface ZPayrollCompanyJurisdictionTaxCategory {
  taxCategory?: string | null;
  zpCompanyJurisdiction?: ZPayrollCompanyJurisdiction | null;
  id?: string | null;
  serviceLevel?: string | null;
}

export interface CompanyBenefitsEnrollment {
  companyId?: string | null;
  previousHealthEnrollments?: (CompanyHealthEnrollment | null)[] | null;
  currentHealthEnrollments?: (CompanyHealthEnrollment | null)[] | null;
  upcomingHealthEnrollments?: (CompanyHealthEnrollment | null)[] | null;
  setupFlow?: SetupFlow | null;
}

export interface SetupFlow {
  id?: string | null;
  companyId?: string | null;
  flowId?: string | null;
  status?: number | null;
  contributionSchemeId?: string | null;
  shouldRedirectToBenConnect?: boolean | null;
}

export interface BenAdminContact {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  phoneExtension?: string | null;
  contactTypes?: (number | null)[] | null;
}

export interface Partner {
  id?: string | null;
  companyId?: string | null;
  config?: PartnerConfiguration | null;
  name?: string | null;
  partnerUsers: PartnerUser[];
}

export interface PartnerConfiguration {
  allowedEmailDomains: string[] /** example: ['onedigital.com', 'foo.com'] */;
}

export interface PartnerUser {
  id: string /** Id of employee in partner's company */;
  userId: string;
  partnerId: string;
  companyId: string /** partner's companyId */;
  roles: string[] /** Permission.BENEFITS_BROKER_PARTNER_ADMINPermission.BENEFITS_FULFILLMENT_MANAGERPermission.BENEFITS_RENEWALS_MANAGERPermission.BENEFITS_ANALYST */;
  permissions: string[] /** Permission.EDIT_EMPLOYEE_BENEFITS_DATA */;
  status: string /** 'Act': active'Sus': suspended */;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  phoneExtension?: string | null;
}

export interface ZenefitsEmployee {
  employee?: AllEmployee | null /** contractor: Contractor */;
  user?: User | null;
  id?: string | null /** roles: [Role]permissions: [Permission] */;
  isActive?: boolean | null;
}

export interface FilterEmployee {
  id?: string | null;
  user_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  photoUrl?: string | null;
  email?: string | null;
}

export interface RolesPermissionsData {
  grants?: JSON | null;
  spans?: JSON | null;
}

export interface Flow {
  name?: string | null;
  dispatcherArgs?: string | null;
  version_id?: number | null;
  isComplete?: boolean | null;
  sections?: (FlowSection | null)[] | null;
  id?: string | null;
  isActive?: boolean | null;
  resource_uri?: string | null;
}

export interface FlowSection {
  index?: number | null;
  isReady?: boolean | null;
  errors?: (FlowError | null)[] | null;
  name?: string | null;
  tag?: string | null;
  dispatcherArgs?: string | null;
  isEntered?: boolean | null;
  entered?: number | null;
  isComplete?: boolean | null;
  flow?: Flow | null;
  id?: string | null;
  isActive?: boolean | null;
  resource_uri?: string | null;
}

export interface FlowError {
  code?: string | null;
  section?: FlowSection | null;
  field?: string | null;
  mustChangeValue?: string | null;
  reasonCode?: string | null;
  id?: string | null;
  isActive?: boolean | null;
  resource_uri?: string | null;
}

export interface SearchClientsResult {
  _type?: string | null;
  _score?: number | null;
  _id?: string | null;
  _source?: SearchClientsSource | null;
  _index?: string | null;
}

export interface SearchClientsSource {
  isReal?: boolean | null;
  id?: number | null;
  enrollmentStatus?: string | null;
  name?: string | null;
}

export interface InboxTask {
  id: string;
  ownerIds?: (string | null)[] | null;
  ownerData?: InboxAssignee[] | null;
  status?: string | null;
  creationDate?: string | null;
  completionDate?: string | null;
  completedById?: string | null;
  completedByName?: string | null;
  benefitsData?: InboxTaskBenefitsData | null;
  coreData?: InboxTaskCoreData | null;
  template?: InboxTaskTemplate | null;
  inboxAction?: FulfillmentInboxAction | null;
  inboxActionComments?: InboxActionComment[] | null;
  attachments?: FulfillmentAttachment[] | null;
  snoozeDueDate?: string | null;
}

export interface InboxAssignee {
  employeeId: string;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
}

export interface InboxTaskBenefitsData {
  effectiveDate?: string | null;
  carrierId?: string | null;
  linesOfCoverage?: string[] | null;
  carrierName?: string | null;
  taskType?: string | null;
  bundleId?: string | null;
  benefitsTransactionId?: string | null;
  fulfillmentForms?: FulfillmentFormData[] | null;
}

export interface FulfillmentFormData {
  id: string;
  pdfUrl?: string | null;
  validationErrorCount?: number | null;
  templateName?: string | null;
}

export interface InboxTaskCoreData {
  employeeId?: string | null;
  companyName?: string | null;
  employeeName?: string | null;
  companyId?: string | null;
}

export interface InboxTaskTemplate {
  id: string;
  name?: string | null;
  isBlocking?: boolean | null;
  isForDashboard?: boolean | null;
}

export interface FulfillmentInboxAction {
  id: string;
  templateName: string;
  variables?: InboxTaskVariables | null;
  titleWithNamesAndVariables?: string | null;
  descriptionWithNamesAndVariables?: string | null;
}

export interface InboxTaskVariables {
  benefitsTransaction?: BenefitsTransaction | null;
  benefitsSettlementBundle?: BenefitsSettlementBundle | null;
  benefitsSettlementBundles?: (BenefitsSettlementBundle | null)[] | null;
  renewalGroupLines?: string | null;
  newGroupLines?: string | null;
  locsAffected?: string | null;
  zippedPDFsLink?: string | null;
  carrierId?: string | null;
}

export interface BenefitsSettlementBundle {
  id?: string | null;
  carrier?: Carrier | null;
  employee?: AllEmployee | null;
  company?: Company | null;
  effectiveDate?: Date | null;
  sendChannelName?: string | null;
  action_id?: string | null;
  carrier_id?: string | null;
  event?: string | null;
  dependsOnBundleIds?: string | null;
  status?: string | null;
  current_context?: BundleCurrentContext | null;
  forms?: (FulfillmentForm | null)[] | null;
}

export interface BundleCurrentContext {
  personalInfo?: BenefitsTransaction | null;
  medical?: BenefitsTransaction | null;
  dental?: BenefitsTransaction | null;
  vision?: BenefitsTransaction | null;
  group_term_life_insurance?: BenefitsTransaction | null;
  adnd?: BenefitsTransaction | null;
  vol_ltd_insurance?: BenefitsTransaction | null;
  vol_std_insurance?: BenefitsTransaction | null;
  acc?: BenefitsTransaction | null;
  cancer?: BenefitsTransaction | null;
  ci?: BenefitsTransaction | null;
  hi?: BenefitsTransaction | null;
}

export interface FulfillmentForm {
  id?: string | null;
  pdfUrl?: string | null;
  validationErrorCount?: string | null;
}

export interface InboxActionComment {
  id: string;
  taskId: string;
  employeeId: string;
  employeeFirstName: string;
  employeeLastName: string;
  employeePhotoUrl: string;
  employee: AllEmployee;
  value: string;
  createDateTime: DateTime;
  mentions?: FilterEmployee[] | null;
}

export interface FulfillmentAttachment {
  id: string;
  url: string;
  filename: string;
  uploadedByEmployeeId: string;
}

export interface InboxTaskSearchResult {
  hits?: number | null;
  offset?: number | null;
  size?: number | null;
  data?: InboxTask[] | null;
}

export interface PdfInfo {
  id?: string | null;
  fields?: (PdfElement | null)[] | null;
  error?: string | null;
  success?: boolean | null;
  images?: (string | null)[] | null;
}

export interface PdfElement {
  id?: number | null;
  name?: string | null;
  type?: string | null;
  value?: string | null;
  error?: string | null;
  top?: number | null;
  left?: number | null;
  height?: number | null;
  width?: number | null;
  page_num?: number | null;
  font_size?: number | null;
}

export interface FulfillmentTaskEmployee {
  employeeId: string;
  fullName: string;
  firstName?: string | null;
  lastName?: string | null;
  companyId: string;
  companyName: string;
  email?: string | null /** Employee's email */;
  status?: string | null /** Employee's status -- Act, Ter, Set, Del */;
  score?: number | null;
}

export interface SuggestedCompany {
  companyId: string;
  companyName: string;
  score?: number | null;
}

export interface RestrictionData {
  restrictionForEmployee?: Restriction | null;
  restrictionForDependents?: (Restriction | null)[] | null;
}

export interface Restriction {
  enrolleeId?: string | null;
  guaranteeIssue?: string | null;
  maxAmount?: string | null;
  computedPremium?: (PremiumSummary | null)[] | null;
  planAmountStyle?: string | null;
  flatAmounts?: string | null;
  incrementalUnits?: string | null;
  rateType?: string | null;
}

export interface PremiumSummary {
  amount?: string | null;
  premium?: string | null;
}

export interface EmployeeHsaInfo {
  maximumAnnualHsaContribution: number;
  previousHsaContribution: number;
  employeeContribution: number;
  maxEmployeeMonthlyContribution: number;
  employerContribution: number;
  frontLoadedCompanyContribution: number;
  effectiveDate: Date;
  isEligibleForFSA: boolean;
}

export interface AuditError {
  id?: string | null;
  audit?: Audit | null;
  company?: Company | null;
  employee?: AllEmployee | null;
  carrier?: Carrier | null;
  lineOfCoverage?: string | null;
  firstSeen?: DateTime | null;
  lastSeen?: DateTime | null;
  addressedDeadline?: DateTime | null;
  severity?: string | null;
  classification?: string | null;
}

export interface Audit {
  lastRun?: DateTime | null;
  firstRun?: DateTime | null;
  argsJSON?: string | null;
  auditVersion?: string | null;
  resource_uri?: string | null;
  numErrors?: number | null;
  id?: string | null;
  name?: string | null;
}

export interface EtaTasks {
  workflowId?: string | null;
  taskName?: string | null;
  group?: string | null;
  isPeriodicTask?: boolean | null;
  started?: DateTime | null;
  when?: DateTime | null;
  effectiveEnd?: DateTime | null;
  queuedAt?: DateTime | null;
  topParentTaskName?: string | null;
  queued?: boolean | null;
  priority?: number | null;
  finished?: DateTime | null;
  swfRunId?: string | null;
  useSwf?: boolean | null;
  signatureId?: number | null;
  swfDomain?: string | null;
  topParentTaskId?: number | null;
  resource_uri?: string | null;
  id?: string | null;
  errorId?: string | null;
  recoverCount?: number | null;
}

export interface PartnerInfo {
  partnerName?: string | null;
  partnerEmail?: string | null;
  partnerOrganization?: string | null;
  partnerId?: string | null;
  success?: boolean | null;
  error?: string | null;
}

export interface EmployeeStatusInfo {
  employeeExists: boolean;
}

export interface CompanyBenefitsCost {
  lineOfCoverage?: string | null;
  numberOfEnrollments?: number | null;
  totalCost?: string | null;
  totalDeduction?: string | null;
  totalContribution?: string | null;
}

export interface CobraClassification {
  documents?: (CobraClassificationDocument | null)[] | null;
  adminName?: string | null;
  effectiveDate?: string | null;
  cobraPartTimeCountRawData?: string | null;
  resource_uri?: string | null;
  adminSignature?: string | null;
  cobraType?: string | null;
  cobraPartTimeCount?: number | null;
  adminTitle?: string | null;
  reason?: string | null;
  cobraFullTimeCount?: number | null;
  countingMethod?: string | null;
  companyCobra?: CompanyCobra | null;
  id?: string | null;
  isVerified?: boolean | null;
  adminSignDate?: string | null;
}

export interface CobraClassificationDocument {
  classification?: CobraClassification | null;
  id?: string | null;
  document?: Document | null;
  resource_uri?: string | null;
}

export interface CompanyTag {
  description?: string | null;
  resource_uri?: string | null;
  ruleExpressionStr?: string | null;
  isNonDeterministicTag?: boolean | null;
  isOverwritableByAdmin?: boolean | null;
  isDisplayableToAdmin?: boolean | null;
  isEligible?: boolean | null;
  eligibilityStartDate?: string | null;
  companyProductTag?: CompanyProductTag | null;
  eligibilityNegatedTag?: CompanyTag | null;
  displayableEmployeeGroups?: JSON | null;
  isEligibilityNegatedTag?: boolean | null;
  id?: string | null;
  isActive?: boolean | null;
  name?: string | null;
  employees?: (AllEmployee | null)[] | null;
  addedEmployees?: (AllEmployee | null)[] | null;
  removedEmployees?: (AllEmployee | null)[] | null;
}

export interface CompanyProductTag {
  subcategory?: string | null;
  tags?: (CompanyTag | null)[] | null;
  company?: Company | null;
  mutuallyExclusiveAllowed?: boolean | null;
  productName?: string | null;
  id?: string | null;
  isActive?: boolean | null;
  resource_uri?: string | null;
  contentObject?: ContentObject | null;
}

export interface ContentObject {
  id?: string | null;
  name?: string | null;
}

export interface EmployeeTag {
  employee?: AllEmployee | null;
  companyTag?: CompanyTag | null;
  companyProductTag?: CompanyProductTag | null;
  id?: string | null;
  isActive?: boolean | null;
  resource_uri?: string | null;
}

export interface Talent {
  accessibleEmployees: AllEmployee[];
}

export interface TalentPermission {
  canCreateReview: boolean;
  canLaunchAllEmployeesReview: boolean;
  canCreateCompanyGoal: boolean;
  canCreateDepartmentGoal: boolean;
  canCreateTeamGoal: boolean;
}

export interface Review {
  id: string;
  questionFlow: QuestionFlow;
  schedules: TalentFlowSchedule[];
  runs: ReviewRun[];
  runsCount: number;
  status: ReviewStatus;
  startDate?: Date | null;
  targetedEmployees?: (AllEmployee | null)[] | null;
  targetableEmployees: AllEmployee[];
  applicableGoals: Goal[];
  permission: ReviewPermission;
  action: ReviewAction;
  nextCycleStartDate?: Date | null;
  temporaryStates: ReviewTemporaryState[];
  cycles: ReviewCycle[];
}

export interface QuestionFlow {
  id: string;
  title: string;
  description?: string | null;
  targetRule: QFTargetRule;
  sections: QFSection[];
  questions: QFQuestion[];
  question?: QFQuestion | null;
  createdBy: AllEmployee;
  createdAt: DateTime;
  sessions: QFSession[];
  clonedFrom?: QuestionFlow | null;
}

export interface QFTargetRule {
  scope?: QFTargetRuleScope | null;
  reviewers?: QFTargetRuleReviewers | null;
}

export interface QFTargetRuleScope {
  type?: TargetRuleScopeType | null;
  departments?: string[] | null;
  locations?: string[] | null;
  specificEmployees?: string[] | null;
  additionalEmployees?: string[] | null;
  titles?: string[] | null;
  compTypes?: CompType[] | null;
  employmentTypes?: EmploymentType[] | null;
  workerTypes?: WorkerType[] | null;
}

export interface QFTargetRuleReviewers {
  predefinedRules?: TargetRuleReviewer[] | null;
  reviewersForAll?: string[] | null;
  specificReviewers?: JSON | null;
  managerSummary?: boolean | null;
}

export interface QFSection {
  id: string;
  title: string;
  order: number;
  questions: QFQuestion[];
  question?: QFQuestion | null;
  type?: string | null;
  comments: QFComment[];
  responses: QFQuestionResponse[];
}

export interface QFQuestion {
  id: string;
  title: string;
  description?: string | null;
  order: number;
  questionType: QFQuestionType;
  config: JSON;
  createdBy: AllEmployee;
  employee?: AllEmployee | null;
  responses: QFQuestionResponse[];
}

export interface QFRatingResponse extends IQFQuestionResponse {
  id: string;
  questionId?: string | null;
  sectionId?: string | null;
  rating: number;
  comment?: string | null;
  contextId?: string | null;
  response: JSON;
  createdAt: DateTime;
  createdBy: AllEmployee;
}

export interface QFTextResponse extends IQFQuestionResponse {
  id: string;
  questionId?: string | null;
  sectionId?: string | null;
  text: string;
  contextId?: string | null;
  response: JSON;
  createdAt: DateTime;
  createdBy: AllEmployee;
}

export interface QFCheckboxResponse extends IQFQuestionResponse {
  id: string;
  questionId?: string | null;
  sectionId?: string | null;
  value: boolean;
  contextId?: string | null;
  response: JSON;
  createdAt: DateTime;
  createdBy: AllEmployee;
}

export interface GenericQFQuestionResponse extends IQFQuestionResponse {
  id: string;
  questionId?: string | null;
  sectionId?: string | null;
  contextId?: string | null;
  response: JSON;
  createdAt: DateTime;
  createdBy: AllEmployee;
}

export interface QFComment {
  id?: string | null;
  questionId?: string | null;
  sectionId?: string | null;
  text?: string | null;
}

export interface QFSession extends IQFSession {
  id: string;
  status: QFSessionStatus;
  completedAt?: DateTime | null;
  responses: QFQuestionResponse[];
  comments: QFComment[];
  respondent: AllEmployee;
  subjectEmployee?: AllEmployee | null;
  type?: string | null;
}

export interface TalentFlowSchedule {
  id: string;
  event: TalentFlowScheduleEvent;
  timeAfterEvent: number;
  timeUnit: TalentTimeUnit;
  duration: number;
}

export interface ReviewRun {
  id: string;
  createdBy: AllEmployee;
  createdAt: DateTime;
  reviewSessions: ReviewSession[];
  summarySessions: ReviewSession[];
  reviewee: AllEmployee;
  permission: RunPermission;
  action: RunAction;
  startDate?: Date | null;
  endDate?: Date | null;
  goals: Goal[];
  status: ReviewRunStatus;
  maxPossibleEndDate?: Date | null;
}

export interface ReviewSession extends IQFSession {
  id: string;
  status: QFSessionStatus;
  completedAt?: DateTime | null;
  responses: QFQuestionResponse[];
  comments: QFComment[];
  reviewer: AllEmployee;
  reviewee: AllEmployee;
  type: ReviewSessionType;
  permission: SessionPermission;
}

export interface SessionPermission {
  qfSessionId: string;
  canViewResponses: boolean;
}

export interface RunPermission {
  runId: string;
  canViewResults: boolean;
  canUpdateRunSettings: boolean;
}

export interface RunAction {
  runId: string;
  updateRunSettings: boolean;
}

export interface Goal {
  id: string;
  questionFlow: QuestionFlow;
  startDate: Date;
  dueDate: Date;
  owner: AllEmployee;
  createdBy: AllEmployee;
  createdAt: DateTime;
  status: GoalStatus;
  progress?: number | null /** TODO: drop after UI stop querying for them. */;
  progressUpdatedAt?: DateTime | null;
  target?: GoalTarget | null;
  permission: GoalPermission;
  parentGoal?: Goal | null;
  alignedGoals: Goal[];
}

export interface GoalPermission {
  goalId: string;
  canTakeActionOnGoal: boolean;
}

export interface ReviewPermission {
  reviewId: string;
  canTakeActionOnReview: boolean;
  canSaveReviewAsTemplate: boolean;
  canExtendDueDates: boolean;
  canExportReviewCycleReport: boolean;
}

export interface ReviewAction {
  reviewId: string;
  extendDueDates: boolean;
  reopenReview: boolean;
}

export interface ReviewCycle {
  runs: ReviewRun[];
  revieweeStatusSummary: RevieweeStatusSummary /** Deprecated, it's copied to metaTODO: Mason, remove the following when completion charts on frontend starts using meta */;
  meta: ReviewCycleMeta;
}

export interface RevieweeStatusSummary {
  review?: RevieweeStatusSummaryStats | null;
  summary?: RevieweeStatusSummaryStats | null;
}

export interface RevieweeStatusSummaryStats {
  complete?: number | null;
  inProgress?: number | null;
  notStarted?: number | null;
}

export interface ReviewCycleMeta {
  reviewees: RevieweesMeta;
}

export interface RevieweesMeta {
  locations: CompanyLocation[];
  departments: Department[];
  statusSummary: RevieweeStatusSummary;
}

export interface ReviewTemplate {
  id: string;
  companyId?: string | null;
  createdBy: AllEmployee;
  status: ReviewTemplateStatus;
  questionFlow: QuestionFlow;
  permission: ReviewTemplatePermission;
}

export interface ReviewTemplatePermission {
  templateId: string;
  canEditReviewTemplate: boolean;
}

export interface MeetingSpace {
  id: string;
  createdBy: AllEmployee;
  createdAt: DateTime;
  meetings: Meeting[];
  participants: MeetingParticipant[];
  summary: MeetingSpaceSummary;
}

export interface Meeting {
  id: string;
  questionFlow: QuestionFlow;
  createdBy: AllEmployee;
  createdAt: DateTime;
  time: DateTime;
}

export interface MeetingParticipant {
  id: string;
  employee: AllEmployee;
}

export interface MeetingSpaceSummary {
  lastMeetingDate?: Date | null;
  actionsCount: number;
}

export interface WellbeingAssessment {
  id: string;
  questionFlow: QuestionFlow;
  runs: WellbeingAssessmentRun[];
  activeRun: WellbeingAssessmentRun;
  lastCompleteRun?: WellbeingAssessmentRun | null;
  status: WellbeingAssessmentStatus;
}

export interface WellbeingAssessmentRun {
  id: string;
  createdAt: DateTime;
  sessions: WellbeingAssessmentSession[];
  employee: AllEmployee;
  startDate: Date;
  endDate?: Date | null;
  status: WellbeingAssessmentRunStatus;
  recommendedArticles: WellbeingArticle[];
  recommendedArticle?: WellbeingArticle | null;
}

export interface WellbeingAssessmentSession extends IQFSession {
  id: string;
  status: QFSessionStatus;
  completedAt?: DateTime | null;
  responses: GenericQFQuestionResponse[];
  comments: QFComment[];
  employee: AllEmployee;
  type: WellbeingAssessmentSessionType;
}

export interface WellbeingArticle {
  id: string;
  summary: string;
  body: string;
  imageUrl: string;
  articleUrl: string;
  title: string;
  publishedAt: DateTime;
  categories: string[];
  authors: WellbeingArticleAuthor[];
}

export interface WellbeingArticleAuthor {
  id: string;
  name: string;
  title: string;
  bio: string;
  companyName: string;
}

export interface WellbeingLifeEvent {
  id: string;
  event: WellbeingLifeEventType;
  recommendedArticles: WellbeingArticle[];
  recommendedArticle?: WellbeingArticle | null;
}

export interface FulfillmetTaskCarrier {
  id: string;
  name: string;
}

export interface CompanyRateVersion {
  id?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  genderBandedStyle?: string | null;
  lineOfCoverage?: string | null;
  quoteReason?: string | null;
  rateStyle?: string | null;
  rates?: AllRates | null;
}

export interface AllRates {
  companyRates?: (JSON | null)[] | null;
  planRates?: (JSON | null)[] | null;
}

export interface DataFields {
  id?: number | null;
  fields?: (DataField | null)[] | null;
  error?: string | null;
  success?: boolean | null;
}

export interface DataField {
  id?: number | null;
  fieldName?: string | null;
  description?: string | null;
  expression?: string | null;
  createdBy?: string | null;
  modifiedBy?: string | null;
  updatedDate?: string | null;
}

export interface StpFormTemplate {
  name?: string | null;
  description?: string | null;
  isLive?: boolean | null;
  created_by?: string | null;
  modified_by?: string | null;
  created_date?: DateTime | null;
  modified_date?: DateTime | null;
  templateUrl?: string | null;
  category?: string | null;
  FieldMappings?: (StpFieldMapping | null)[] | null;
  groups?: (StpFieldGroup | null)[] | null;
  id?: string | null;
  success?: boolean | null;
  error?: string | null;
}

export interface StpFieldMapping {
  expression?: string | null;
  fieldName?: string | null;
  formId?: string | null;
  created?: DateTime | null;
  modified?: DateTime | null;
  isValid?: boolean | null;
  id?: string | null;
  groupId?: string | null;
  fieldValidationType?: string | null;
}

export interface StpFieldGroup {
  id?: string | null;
  name?: string | null;
  operationType?: string | null;
  operationInteger?: string | null;
}

export interface StpInputFieldsAndOperators {
  fields?: (string | null)[] | null;
  operators?: (string | null)[] | null;
  keys?: (string | null)[] | null;
}

export interface ZPayrollCompanySearchResult {
  count: number;
  totalCount: number;
  data?: (ZPayrollCompany | null)[] | null;
}

export interface CompanyImplementationOverviewSearchResult {
  count: number;
  totalCount: number;
  data?: (CompanyImplementationOverview | null)[] | null;
}

export interface CompanyImplementationOverview {
  id: string;
  company: Company;
  assignedTo?: User | null;
  overallOnboardingState: OverallOnboardingState;
  _payrollOnboardingState?: PayrollOnboardingState | null;
  payrollOnboardingStartDate?: DateTime | null;
  payrollOnboardingCompletedDate?: DateTime | null;
  payrollTimeline?: OnboardingProductImplementationTimeline | null;
  _benefitsOnboardingState?: BenefitsOnboardingState | null;
  benefitsOnboardingStartDate?: DateTime | null;
  benefitsOnboardingCompletedDate?: DateTime | null;
  benefitsTimeline?: OnboardingProductImplementationTimeline | null;
}

export interface OnboardingProductImplementationTimeline {
  startDate?: string | null;
  endDate?: string | null;
  durationDays?: string | null;
  events?: (OnboardingProductImplementationTimelineEvent | null)[] | null;
}

export interface OnboardingProductImplementationTimelineEvent {
  state?: string | null;
  eventDate?: string | null;
}

export interface ZScoreCompany {
  id: string;
  companyId?: number | null;
  ein?: string | null;
  dunsNumber?: string | null;
  salesForceAccountId?: string | null;
  status?: ZScoreCompanyStatus | null;
  type?: string | null;
  legalName?: string | null;
  legalAddress?: string | null;
  legalCity?: string | null;
  legalState?: string | null;
  legalZip?: string | null;
  countryCode?: string | null;
  phone?: string | null;
  naicsCode?: string | null;
  sicCode?: string | null;
  createdOn?: DateTime | null;
  activatedOn?: DateTime | null;
  deactivatedOn?: DateTime | null;
  latestZScore?: ZScore | null;
  isUsingZPAY?: boolean | null;
  blockPeriod?: number | null;
}

export interface ZScore {
  id: string;
  zScoreCompany?: ZScoreCompany | null;
  score?: number | null;
  commercialStressScore?: number | null;
  financialStressScore?: number | null;
  noOfEEScore?: number | null;
  timeOnPayrollScore?: number | null;
  billingFailureScore?: number | null;
  payrollFailureScore?: number | null;
  payrollQualificationLevel?: ZScorePayrollQualificationLevel | null;
  blockScoreOfacResult?: ZScoreBlockScoreOfacResult | null;
  riskLevel?: ZScoreRiskLevel | null;
  companyEvents?: (ZScoreCompanyEvent | null)[] | null;
  createdOn?: DateTime | null;
  lastRefreshedOn?: DateTime | null;
}

export interface ZScoreCompanyEvent {
  id?: string | null;
  category?: ZScoreCategory | null;
  value?: string | null;
  createdOn?: DateTime | null;
  isActive?: boolean | null;
  deactivatedOn?: DateTime | null;
  deactivatedBy?: number | null;
  details?: JSON | null;
}

export interface ZScoreCategory {
  name?: ZScoreCategoryName | null;
  description?: string | null;
  verboseName?: string | null;
  updateFrequencyUnit?: ZScoreUpdateFrequencyUnit | null;
  updateFrequencyNumber?: number | null;
  newCustomerValue?: number | null;
  existingCustomerValue?: number | null;
  existingZPAYCustomerValue?: number | null;
  rangeConfigurations?: (ZScoreRangeConfiguration | null)[] | null;
  failureConfigurations?: (ZScoreFailureConfiguration | null)[] | null;
}

export interface ZScoreRangeConfiguration {
  id?: string | null;
  startRange?: number | null;
  endRange?: number | null;
  zenefitsValue?: number | null;
}

export interface ZScoreFailureConfiguration {
  id?: string | null;
  value?: number | null;
  operator?: string | null;
  zenefitsValue?: number | null;
}

export interface ZScoreReduced {
  score?: number | null;
  createdOn?: DateTime | null;
}

export interface IndustryData {
  industry?: (Industry | null)[] | null;
}

export interface Industry {
  id: string;
  name: string;
  subIndustry?: (SubIndustry | null)[] | null;
}

export interface SubIndustry {
  id: string;
  name: string;
}

export interface LocationData {
  location?: (Location | null)[] | null;
  city?: (City | null)[] | null;
  state?: (StateInfo | null)[] | null;
}

export interface Location {
  id: string;
  name?: string | null;
}

export interface City {
  id: string;
  name?: string | null;
  stateId?: string | null;
  csaId?: string | null;
}

export interface StateInfo {
  id: string;
  name?: string | null;
}

export interface JobFamilyData {
  jobFamily?: (JobFamily | null)[] | null;
}

export interface JobFamily {
  id: string;
  name: string;
  jobSubFamily?: (JobSubfamily | null)[] | null;
}

export interface JobSubfamily {
  id: string;
  name: string;
  jobTitle?: (JobTitle | null)[] | null;
}

export interface JobTitle {
  id: string;
  name: string;
}

export interface JobLevelData {
  jobLevel?: (JobLevel | null)[] | null;
}

export interface JobLevel {
  id: string;
  name: string;
  description?: string | null;
}

export interface CompanyConfig {
  subIndustry?: number | null;
  location?: (Location | null)[] | null;
  minPercentile?: number | null;
  maxPercentile?: number | null;
  isConfigured?: boolean | null;
  isLocked?: boolean | null;
  appStatus?: ZAppInstall | null;
}

export interface CompanyJobTitleMapping {
  companyTitleList?: (CompanyJobTitle | null)[] | null;
}

export interface CompanyJobTitle {
  rawTitle: string;
  jobFamily?: JobFamily | null;
  jobSubFamily?: JobSubfamily | null;
  jobTitle?: JobTitle | null;
  jobLevel?: JobLevel | null;
  employeeCount?: number | null;
}

export interface EmployeeJobTitle {
  employee?: Employee | null;
  jobFamily?: JobFamily | null;
  jobSubFamily?: JobSubfamily | null;
  jobTitle?: JobTitle | null;
  jobLevel?: JobLevel | null;
  city?: City | null;
  rollupRule?: RollupRule | null;
  minPercentileSalary?: number | null;
  maxPercentileSalary?: number | null;
  salaryBenchmarkingId?: number | null;
  medianSalary?: number | null;
  locationName?: string | null;
}

export interface Employee {
  id: string;
  fullName: string;
  managerName?: string | null;
  salary?: number | null;
  gender?: string | null;
  department?: string | null;
  title?: string | null;
}

export interface RollupRule {
  priority?: number | null;
  locationType?: number | null;
  industryType?: number | null;
  jobFamilyType?: number | null;
  jobLevelType?: number | null;
}

export interface JobTitleSuggestion {
  jobTitle?: JobTitle | null;
  jobFamily?: JobFamily | null;
  jobSubfamily?: JobSubfamily | null;
  description?: string | null;
  keywords?: (string | null)[] | null;
}

export interface EmployeeJobTitleMapping {
  employeeJobTitleList?: (EmployeeJobTitle | null)[] | null;
  unmappedEmployeeCount?: number | null;
  totalEmployee?: number | null;
  lastUpdatedDate?: string | null;
}

export interface JobLevelSalaryMapping {
  jobLevel?: JobLevel | null;
  salary5thPercentile?: number | null;
  salary25thPercentile?: number | null;
  salary50thPercentile?: number | null;
  salary75thPercentile?: number | null;
  salary95thPercentile?: number | null;
  minPercentileSalary?: number | null;
  maxPercentileSalary?: number | null;
  rollupRule?: RollupRule | null;
}

export interface CompanyDataMetrics {
  jobFamily?: CompanyMarketMetrics | null;
  jobLevel?: CompanyMarketMetrics | null;
  salaryLocation?: (CompanyMarketMetrics | null)[] | null;
}

export interface CompanyMarketMetrics {
  company?: (DataMetrics | null)[] | null;
  market?: (DataMetrics | null)[] | null;
  name?: string | null;
}

export interface DataMetrics {
  y?: number | null;
  name?: string | null;
}

export interface SalaryBenchmarkingBlacklistData {
  salaryBenchmarkingBlacklist?: (SalaryBenchmarkingBlacklistElement | null)[] | null;
}

export interface SalaryBenchmarkingBlacklistElement {
  id?: number | null;
  locationTypeId?: number | null;
  locationId?: number | null;
  industryTypeId?: number | null;
  industryId?: number | null;
  jobFamilyTypeId?: number | null;
  jobFamilyId?: number | null;
  jobLevelId?: number | null;
  isActive?: boolean | null;
  modifiedBy?: number | null;
}

export interface SalaryBenchmarkAggr {
  id?: number | null;
  locationTypeId?: number | null;
  locationId?: number | null;
  industryTypeId?: number | null;
  industryId?: number | null;
  jobFamilyTypeId?: number | null;
  jobFamilyId?: number | null;
  jobLevelId?: number | null;
  displayFlag?: boolean | null;
  salaryAvg?: number | null;
  salary25thPerc?: number | null;
  salary50thPerc?: number | null;
  salary75thPerc?: number | null;
  salaryStdDev?: number | null;
  noOfDpBelow25?: number | null;
  noOfDpBtw2550?: number | null;
  noOfDpBtw5075?: number | null;
  noOfDpAbove75?: number | null;
}

export interface PaAppInstall {
  appStatus?: ZAppInstall | null;
  employeeSubscription?: (EmployeeSubscription | null)[] | null;
}

export interface EmployeeSubscription {
  id?: number | null;
  employeeId?: number | null;
  employeeName?: string | null;
  status?: number | null;
}

export interface ProductDeal {
  id: string;
  company_id: string;
  caption?: string | null;
  description?: string | null;
  createdOn: Date;
  expiresOn: Date;
  dealLink?: string | null;
  price?: number | null;
  billingFrequency?: string | null;
  businessGroup?: string | null;
  productStatus?: string | null;
  company_name?: string | null;
  logoUrl?: string | null;
}

export interface ProductCategory {
  value?: string | null;
  label?: string | null;
}

export interface Filter {
  placeholder?: string | null;
  choices?: (FilterElement | null)[] | null;
}

export interface FilterElement {
  value?: string | null;
  label?: string | null;
}

export interface CurrentUserCompany {
  company_id: string;
  company_name?: string | null;
}

export interface EmployeeDetails {
  employee_id: string;
  first_name?: string | null;
  last_name?: string | null;
  entityDict?: JSON | null;
}

export interface MyDeal {
  id: string;
  company_id: string;
  caption?: string | null;
  description?: string | null;
  createdOn: Date;
  expiresOn: Date;
  dealLink?: string | null;
  price?: number | null;
  billingFrequency?: string | null;
  businessGroup?: string | null;
  productStatus?: string | null;
  view_count?: number | null;
}

export interface CompanySetupPTOPlan {
  type?: string | null;
  timeOffDaysPerYear?: number | null;
  sickLeaveDaysPerYear?: number | null;
}

export interface CompanySetupEmployeeStats {
  Active?: number | null;
  Completed?: number | null;
}

export interface CompanySetupInviteEmailRecipients {
  id: string;
  first_name: string;
  last_name: string;
  email?: string | null;
}

export interface CompanySetupReminderEmailRecipients {
  id: string;
  first_name: string;
  last_name: string;
  email?: string | null;
  lastReminderEmailTimestamp?: number | null;
}

export interface PayrollBankSetUpStatus {
  zPBankAccountCreated?: boolean | null;
  checkUploadedOrPlaidVerified?: boolean | null;
  isPlaidVerification?: boolean | null;
}

export interface DocumentInfo {
  document_meta?: DocumentMeta | null;
  doc_action_status?: DocumentActionStatus | null;
  uploaded_files?: (UploadedFile | null)[] | null;
}

export interface DocumentMeta {
  id: string;
  companyId?: number | null;
  section?: string | null;
  name?: string | null;
  description?: string | null;
}

export interface DocumentActionStatus {
  doc_meta_id?: string | null;
  status?: string | null;
  requested_by_fullname?: string | null;
  requested_at?: Date | null;
  uploaded_by_fullname?: string | null;
  uploaded_at?: Date | null;
  deleted_by_fullname?: string | null;
  deleted_at?: Date | null;
}

export interface UploadedFile {
  id?: string | null;
  document_file_group_id?: number | null;
  fileName?: string | null;
  path?: string | null;
}

export interface CompanyAdmin {
  employeeId?: string | null;
  fullName?: string | null;
}

export interface DocActionHistory {
  action?: string | null;
  userName?: string | null;
  actionTimestamp?: Date | null;
  uploadedFile?: UploadedFile | null;
}

export interface chatStatus {
  status?: string | null;
  iframe?: string | null;
  liveagentInit?: string | null;
  button?: string | null;
  caseId?: string | null;
}

export interface holidayInfo {
  isBusinessToday?: boolean | null;
  isBusinessHours?: boolean | null;
  nextBusinessDay?: string | null;
  holidayDate?: string | null;
}

export interface GroupType {
  id: string;
  name: string;
  description?: string | null;
  isSystemType: boolean;
  memberType: string;
  groups: Group[];
  membership?: Group[] | null;
}

export interface Group {
  id: string;
  name?: string | null;
  description?: string | null;
  groupTypeId: string;
  memberIds: string[];
  members: AllEmployee[];
  laborCode?: string | null;
  domainData?: JSON | null;
}

export interface AdherenceReportFormData {
  departments?: (AdherenceReportDepartment | null)[] | null;
  locations?: (AdherenceReportLocation | null)[] | null;
}

export interface AdherenceReportDepartment {
  id?: string | null;
  department?: string | null;
}

export interface AdherenceReportLocation {
  id?: string | null;
  location?: string | null;
}

export interface SchedulingCompany {
  id: string;
  startDayOfWeek: string;
  flags?: number | null;
  state: string;
}

export interface SchedulingEmployee {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string | null;
  roles: string[];
  positions: string[];
  shifts: SchedulingShift[];
  vacationRequests?: (SchedulingVacationRequest | null)[] | null;
  employee?: AllEmployee | null;
}

export interface SchedulingShift {
  id?: string | null;
  shiftId?: string | null;
  position?: string | null;
  startDateTime?: DateTime | null;
  endDateTime?: DateTime | null;
  isPublished?: boolean | null;
  schedulingEmployee?: SchedulingEmployee | null;
  warningIds?: (string | null)[] | null;
  groups?: (SchedulingShiftGroup | null)[] | null;
  status?: string | null;
  shiftType?: number | null;
  seriesData?: SchedulingShiftSeries | null;
  createdAt?: Date | null;
}

export interface SchedulingShiftGroup {
  groupId?: string | null;
  groupTypeId?: string | null;
  id?: string | null;
  shiftId?: string | null;
}

export interface SchedulingShiftSeries {
  id?: number | null;
  shiftId?: number | null;
  frequency?: number | null;
  onDays?: (number | null)[] | null;
  rangeEndDate?: Date | null;
}

export interface SchedulingVacationRequest {
  date?: Date | null;
  isFullDay?: boolean | null;
  status?: string | null;
  hours?: number | null;
  minutes?: number | null;
}

export interface PlaidEnvironment {
  plaid_env: string;
  plaid_key: string;
}

export interface BankAccountInfo {
  bankName: string;
  accountNumber: string;
}

export interface Mutation {
  recalculateContribution?: BenefitsTransaction | null /** BenConnect mutations */;
  recalculateCost?: BenefitsTransaction | null;
  enrollEmployee?: BenefitsTransaction | null;
  declineEmployee?: BenefitsTransaction | null;
  updateDependent?: Dependent | null;
  updateBeneficiary?: Beneficiary | null;
  updateAddress?: Address | null;
  updateEmployee?: AllEmployee | null;
  updatePersonalInfo?: PersonalInfo | null;
  deactivateDependent?: boolean | null;
  deactivateBeneficiary?: boolean | null;
  startEmployeeHsaSetUp?: boolean | null;
  resetEmployeeHsa?: boolean | null;
  hsaEnrollEmployeeWithoutUpdatingState?: boolean | null;
  hsaEnrollEmployee?: boolean | null;
  createDependentRecord?: Dependent | null;
  createBeneficiaryRecord?: Beneficiary | null;
  editDependentPersonalInfo?: Dependent | null /** !!!!!!! this is deprecated in favor of comprehensive updateDependent !!!!!!! */;
  addDependentsToCoverage?: BenefitsTransaction | null;
  removeDependentsFromCoverage?: BenefitsTransaction | null;
  cancelCoverage?: BenefitsTransaction | null;
  terminateBenefit?: BenefitsTransaction | null;
  planCorrection?: BenefitsTransaction | null;
  changeTransactionEffectiveDate?: BenefitsTransaction | null;
  approveEvidenceOfInsurability?: (BenefitsTransaction | null)[] | null;
  setCompanyContext?: boolean | null;
  setupPolicyNumber?: boolean | null;
  updateEoiForm?: boolean | null;
  updateSbcFile?: boolean | null;
  changeContractLength?: CompanyHealthEnrollmentEditResponse | null;
  changeWaitingPeriod?: CompanyHealthEnrollmentEditResponse | null;
  changeTerminationPolicy?: CompanyHealthEnrollmentEditResponse | null;
  runBenefitsAuditTask?: EtaTasks[] | null;
  changeCompanyCobraThirdPartyAdministrator?: CompanyCobraThirdPartyAdministratorChangeResult | null /** cobra Mutations */;
  changeCompanyCobraClassification?: CompanyCobraClassificationChangeResult | null;
  createOrUpdateReview?: Review | null;
  createReview?: Review | null;
  launchReview?: Review | null;
  endReview?: Review | null;
  createReviewFromTemplate?: Review | null;
  updateReviewRunSettings?: ReviewRun | null;
  createOrUpdateReviewTemplate?: ReviewTemplate | null;
  deleteReviewTemplate?: boolean | null;
  extendReviewDueDates?: Review | null;
  deleteMeeting?: MeetingSpace | null;
  createMeetingSpace?: MeetingSpace | null;
  createOrUpdateMeeting?: MeetingSpace | null;
  moveMeetingItem?: QFQuestion | null;
  deleteReview?: boolean | null;
  reopenReview?: Review | null;
  paSetupStart?: boolean | null /** people_analytics mutation startsclient app */;
  paSetupFinish?: boolean | null;
  paCreateCompanyConfig?: CompanyConfig | null;
  paUpdateCompanyConfig?: CompanyConfig | null;
  paUpdateCompanyJobTitleMapping?: CompanyJobTitle | null;
  paUpdateEmployeeJobTitleMapping?: EmployeeJobTitle | null;
  paCreateFeedback?: Feedback | null;
  paUpdateSalaryBenchmarkBlackList?: SalaryBenchmarkingBlacklistElement | null;
  paConsoleCompanyInfo?: CompanyConfig | null /** console app */;
  paConsoleUpdateCompanyJobTitleMapping?: CompanyJobTitle | null;
  paConsoleUpdateIndustryJob?: UpdateName | null;
  updateQuestionFlow?: QuestionFlow | null /** question flow mutations */;
  createOrUpdateQFQuestion?: QFSection | null;
  deleteQFQuestion?: QFSection | null;
  submitSessionResponses?: boolean | null;
  submitSessionComments?: boolean | null;
  submitQuestionUniqueResponse?: QFQuestion | null;
  generateReviewRunResponsesPdf?: string | null;
  generateReviewCycleReport?: string | null;
  createOrUpdateTalentGoal?: Goal | null;
  deleteGoal?: boolean | null;
  updatePDFInfo?: PdfInfo | null;
  closeInboxTasks?: InboxTasksCloseResult | null /** partner dashboard mutations */;
  assignInboxTasks?: InboxActionAssigneesResult | null;
  snoozeInboxTasks?: InboxActionSnoozeResult | null;
  unSnoozeInboxTasks?: InboxActionUnSnoozeResult | null;
  createInboxActionComment?: boolean | null;
  addFulfillmentAttachments?: boolean | null;
  removeFulfillmentAttachment?: boolean | null;
  sendFullStpEmail?: SendFullStpEmailResult | null;
  declineEnrollment?: boolean | null;
  submitEnrollmentSelection?: boolean | null;
  employeeSetPhysicianDentist?: boolean | null;
  employeeSetBeneficiary?: boolean | null;
  createEmployeeBenefitsEnrollments: EmployeeBenefitsEnrollmentEditResult[];
  changeEmployeeBenefitsEnrollments: EmployeeBenefitsEnrollmentEditResult[];
  cancelEmployeeBenefitsEnrollments: EmployeeBenefitsEnrollmentEditResult[];
  addQleDocument?: QualifyingEvent | null /** start QLE mutations */;
  addQleDocumentReview?: GenericQleChangeResult | null;
  cancelQle?: GenericQleChangeResult | null;
  changeQleDate?: GenericQleChangeResult | null;
  addPartnerUser: PartnerUser;
  editPartnerUser: PartnerUser;
  changePartnerUserStatus: PartnerUser;
  updateCompanyLegalInfo?: Company | null /** company setup mutations */;
  updateCompanyLegalInfoV2?: Company | null;
  addCompanyLocations?: (CompanyLocation | null)[] | null;
  setupCompanyPaySchedule?: CompanyPaySchedule | null /** Should ideally move this out later. */;
  createOrUpdateEmployees?: (AllEmployee | null)[] | null;
  sendEmployeeInviteEmails?: boolean | null;
  sendEmployeeReminderEmails?: boolean | null;
  sendEmployeeReminderEmailsV2?: (CompanySetupReminderEmailRecipients | null)[] | null;
  updateEmployeesAdditionalInfo?: (AllEmployee | null)[] | null;
  markFlowSectionEntered?: FlowSection | null /** Should ideally move this out later. */;
  updateFlowSection?: FlowSection | null;
  skipPTOSetup?: boolean | null;
  updatePTOPlan?: boolean | null;
  unlockDashboardForCompany?: boolean | null;
  createProduct?: data | null /** zenmarket mutations */;
  addProductCategories?: boolean | null;
  addMetaDataToProduct?: boolean | null;
  addMatchingCriteria?: boolean | null;
  createOrEditDeal?: data | null;
  editInterestStatus?: string | null;
  editProductStatus?: string | null;
  updateUploadDocInfo?: UploadStatus | null;
  requestDocuments?: boolean | null /** Document Collection */;
  cancelDocumentRequest?: boolean | null;
  completeDocumentRequest?: boolean | null;
  deleteDocInfo?: boolean | null;
  createCompanyDocMeta?: CompanyDocMetaCreateResponse | null;
  handleCompanyDocMetaAction?: CompanyDocMetaCreateResponse | null;
  benefitsFormMapperUpdateOrInsertDataField?: DataFields | null;
  benefitsFormMapperStpFormTemplateMutation?: StpFormTemplate | null;
  benefitsFormMapperStpFetchMasterMappings?: (StpFieldMapping | null)[] | null;
  benefitsFormMapperStpReloadExistingMappings?: (StpFieldMapping | null)[] | null;
  fetchDefaultValuesForUniqueBaseFieldsInExpressionList?: StpBaseFieldMappingOutput | null;
  generateTestPdf?: GenerateTestPdfOutput | null;
  createSupportCase?: supportCase | null;
  createOrUpdateGroupType?: GroupType | null;
  createGroup?: Group | null;
  updateGroup?: Group | null;
  partialUpdateGroup?: Group | null;
  deleteGroup?: boolean | null;
  assignGroups: GroupMembership;
  createOrUpdateSchedulingShift?: boolean | null /** Time Scheduling App Mutations */;
  clearSchedulingShifts?: boolean | null;
  deleteSchedulingShifts?: boolean | null;
  publishSchedulingShifts?: boolean | null;
  copySchedule?: (SchedulingShift | null)[] | null;
  revertScheduleToLastPublishedState?: boolean | null;
  generateAdherenceReportXlsx?: string | null;
  enrollSchedulingCompany?: SchedulingCompany | null;
  bulkUpdateZAppInstallSubscriptionsStatus?: boolean | null;
  savePlaidAccount?: SavePlaidAccountResponse | null /** Payroll mutations */;
  createBankAccountVerification?: BankAccountVerification | null;
  addZPCompanyBankAccount?: boolean | null;
  setVoidCheckUrl?: boolean | null;
  setPayrollSignatory?: boolean | null;
}

export interface CompanyHealthEnrollmentEditResponse {
  success?: boolean | null;
  error?: string | null;
  enrollment?: CompanyHealthEnrollment | null;
}

export interface CompanyCobraThirdPartyAdministratorChangeResult {
  status?: string | null;
  administratorName?: string | null;
}

export interface CompanyCobraClassificationChangeResult {
  status?: string | null;
}

export interface Feedback {
  rating?: string | null;
  comment?: string | null;
}

export interface UpdateName {
  type?: string | null;
  id?: number | null;
  name?: string | null;
}

export interface InboxTasksCloseResult {
  success: boolean;
  error?: string | null;
  data?: InboxTaskCloseResult[] | null;
}

export interface InboxTaskCloseResult {
  success: boolean;
  taskId: string;
  error?: string | null;
  task?: InboxTask | null;
}

export interface InboxActionAssigneesResult {
  success: boolean;
  error?: string | null;
  data?: (InboxActionAssignee | null)[] | null;
}

export interface InboxActionAssignee {
  success: boolean;
  error?: string | null;
  task?: InboxTask | null;
}

export interface InboxActionSnoozeResult {
  success: boolean;
  error?: string | null;
  data?: (InboxActionSnoozeData | null)[] | null;
}

export interface InboxActionSnoozeData {
  success: boolean;
  error?: string | null;
  task?: InboxTask | null;
}

export interface InboxActionUnSnoozeResult {
  success: boolean;
  error?: string | null;
  data?: (InboxActionSnoozeData | null)[] | null;
}

export interface SendFullStpEmailResult {
  success: boolean;
  error?: string | null;
  physicalEmailId?: string | null;
}

export interface EmployeeBenefitsEnrollmentEditResult {
  success: boolean;
  error?: string | null;
  enrollment?: EmployeeBenefitsEnrollment | null;
}

export interface GenericQleChangeResult {
  success: boolean;
  error?: string | null;
}

export interface data {
  product_id: string;
}

export interface UploadStatus {
  status?: string | null;
}

export interface CompanyDocMetaCreateResponse {
  status?: string | null;
  docMetaId?: string | null;
}

export interface StpBaseFieldMappingOutput {
  baseFieldMappings?: (StpBaseFieldMapping | null)[] | null;
  error?: string | null;
  success?: boolean | null;
}

export interface StpBaseFieldMapping {
  baseFieldName?: string | null;
  value?: string | null;
  fieldType?: string | null;
}

export interface GenerateTestPdfOutput {
  fileUrl?: string | null;
  error?: string | null;
  success?: boolean | null;
}

export interface supportCase {
  caseId?: string | null;
  initialPosition?: number | null;
}

export interface GroupMembership {
  memberId: string;
  groupIds: string[];
}

export interface SavePlaidAccountResponse {
  verificationId: number;
  accountNumber: string;
  routingNumber: string;
  accountType: string;
  identity?: PlaidIdentityInfo | null;
}

export interface PlaidIdentityInfo {
  haveNamesMatched?: boolean | null;
  companyNames?: (string | null)[] | null;
  plaidNames?: (string | null)[] | null;
}

export interface BankAccountVerification {
  verificationId: number;
  accountNumber: string;
  routingNumber: string;
  accountType: string;
}

export interface AddressSubAction {
  isCompleted?: boolean | null;
  completionDate?: string | null;
  description?: string | null;
  city?: string | null;
  street1?: string | null;
  street2?: string | null;
  completedBy_id?: number | null;
  state?: string | null;
  ctaText?: string | null;
  uniqueId?: string | null;
  country?: string | null;
  postalCode?: string | null;
  inboxSubAction?: InboxSubAction | null;
  descriptionWithNamesAndVariables?: string | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface InboxSubAction {
  signatureSubActions?: (SignatureSubAction | null)[] | null;
  bankSubActions?: (BankSubAction | null)[] | null;
  description?: string | null;
  inboxAction?: InboxAction | null;
  singleValueSubActions?: (SingleValueSubAction | null)[] | null;
  addressSubActions?: (AddressSubAction | null)[] | null;
  confirmationSubActions?: (ConfirmationSubAction | null)[] | null;
  employee_id?: number | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface SignatureSubAction {
  isCompleted?: boolean | null;
  completionDate?: string | null;
  description?: string | null;
  completedBy_id?: number | null;
  ctaText?: string | null;
  uniqueId?: string | null;
  signature?: string | null;
  inboxSubAction?: InboxSubAction | null;
  resource_uri?: string | null;
  descriptionWithNamesAndVariables?: string | null;
  id?: string | null;
  name?: string | null;
}

export interface BankSubAction {
  isCompleted?: boolean | null;
  completionDate?: string | null;
  description?: string | null;
  bankName?: string | null;
  country?: string | null;
  bankAccountType?: string | null;
  bankSwiftCode?: string | null;
  completedBy_id?: number | null;
  bankBranchName?: string | null;
  additionalRoutingNumber?: string | null;
  ctaText?: string | null;
  uniqueId?: string | null;
  inboxSubAction?: InboxSubAction | null;
  bankRoutingNumber?: string | null;
  resource_uri?: string | null;
  descriptionWithNamesAndVariables?: string | null;
  id?: string | null;
  isActive?: boolean | null;
  bankAccountNumber?: string | null;
}

export interface InboxAction {
  attachments?: (InboxAttachment | null)[] | null;
  hideCannotComplete?: boolean | null;
  variables?: string | null;
  requestCompletionDate?: string | null;
  tag?: string | null;
  id?: string | null;
  descriptionWithNamesAndVariables?: string | null;
  dueDate?: string | null;
  completionDate?: string | null;
  completionNotificationList?: string | null;
  title?: string | null;
  internalNote?: string | null;
  priority?: string | null;
  isForDashboard?: boolean | null;
  zAppId?: string | null;
  type?: string | null;
  isAutomated?: boolean | null;
  status?: string | null;
  description?: string | null;
  deletedReason?: string | null;
  isBlocking?: boolean | null;
  errorMsg?: string | null;
  inboxSubActions?: (InboxSubAction | null)[] | null;
  version_id?: number | null;
  requestDate?: string | null;
  contextObjectId?: string | null;
  disableClientEmails?: boolean | null;
  requester?: User | null;
  viewCount?: number | null;
  cannotCompleteReason?: string | null;
  isUserInputCompleted?: boolean | null;
  forceUnique?: number | null;
  completedBy_id?: number | null;
  titleWithNamesAndVariables?: string | null;
  inboxOwners?: (InboxOwner | null)[] | null;
  template?: InboxActionTemplate | null;
  resource_uri?: string | null;
}

export interface InboxAttachment {
  url?: string | null;
  inboxAction?: InboxAction | null;
  resource_uri?: string | null;
  id?: string | null;
  filename?: string | null;
}

export interface InboxOwner {
  inboxAction?: InboxAction | null;
  resource_uri?: string | null;
  id?: string | null;
  owner_id?: number | null;
}

export interface InboxActionTemplate {
  templateDir?: string | null;
  zAppId?: string | null;
  description?: string | null;
  tags?: (InboxActionTag | null)[] | null;
  title?: string | null;
  variables?: string | null;
  templateDescription?: string | null;
  inboxSubActionTemplates?: (InboxSubActionTemplate | null)[] | null;
  isAutomated?: boolean | null;
  priority?: string | null;
  multiActionType?: string | null;
  isForDashboard?: boolean | null;
  isBlocking?: boolean | null;
  disableClientEmails?: boolean | null;
  subActions?: string | null;
  resource_uri?: string | null;
  type?: string | null;
  id?: string | null;
  isActive?: boolean | null;
  name?: string | null;
}

export interface InboxActionTag {
  resource_uri?: string | null;
  template?: InboxActionTemplate | null;
  name?: string | null;
  id?: string | null;
}

export interface InboxSubActionTemplate {
  addressSubActionTemplates?: (AddressSubActionTemplate | null)[] | null;
  bankSubActionTemplates?: (BankSubActionTemplate | null)[] | null;
  confirmationSubActionTemplates?: (ConfirmationSubActionTemplate | null)[] | null;
  inboxActionTemplate?: InboxActionTemplate | null;
  singleValueSubActionTemplates?: (SingleValueSubActionTemplate | null)[] | null;
  resource_uri?: string | null;
  signatureSubActionTemplates?: (SignatureSubActionTemplate | null)[] | null;
  id?: string | null;
  description?: string | null;
}

export interface AddressSubActionTemplate {
  id?: string | null;
  resource_uri?: string | null;
  description?: string | null;
  inboxSubActionTemplate?: InboxSubActionTemplate | null;
}

export interface BankSubActionTemplate {
  id?: string | null;
  resource_uri?: string | null;
  description?: string | null;
  inboxSubActionTemplate?: InboxSubActionTemplate | null;
}

export interface ConfirmationSubActionTemplate {
  id?: string | null;
  resource_uri?: string | null;
  description?: string | null;
  inboxSubActionTemplate?: InboxSubActionTemplate | null;
}

export interface SingleValueSubActionTemplate {
  description?: string | null;
  value?: string | null;
  name?: string | null;
  choices?: (InboxSubActionChoiceTemplate | null)[] | null;
  inboxSubActionTemplate?: InboxSubActionTemplate | null;
  type?: string | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface InboxSubActionChoiceTemplate {
  value?: string | null;
  id?: string | null;
  singleValueSubActionTemplate?: SingleValueSubActionTemplate | null;
  resource_uri?: string | null;
}

export interface SignatureSubActionTemplate {
  id?: string | null;
  resource_uri?: string | null;
  description?: string | null;
  inboxSubActionTemplate?: InboxSubActionTemplate | null;
}

export interface SingleValueSubAction {
  isCompleted?: boolean | null;
  completionDate?: string | null;
  description?: string | null;
  descriptionWithNamesAndVariables?: string | null;
  completedBy_id?: number | null;
  choices?: (InboxSubActionChoice | null)[] | null;
  ctaText?: string | null;
  value?: string | null;
  uniqueId?: string | null;
  inboxSubAction?: InboxSubAction | null;
  resource_uri?: string | null;
  type?: string | null;
  id?: string | null;
  null?: (InboxSubActionChoice | null)[] | null;
  name?: string | null;
}

export interface InboxSubActionChoice {
  singleValueSubAction?: SingleValueSubAction | null;
  id?: string | null;
  value?: string | null;
  resource_uri?: string | null;
}

export interface ConfirmationSubAction {
  isCompleted?: boolean | null;
  completionDate?: string | null;
  description?: string | null;
  ctaInfo?: string | null;
  completedBy_id?: number | null;
  ctaText?: string | null;
  value?: boolean | null;
  uniqueId?: string | null;
  secondaryCtaText?: string | null;
  redirectUrl?: string | null;
  inboxSubAction?: InboxSubAction | null;
  descriptionWithNamesAndVariables?: string | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface AssociatedDocument {
  description?: string | null;
  resource_uri?: string | null;
  fileName?: string | null /** ipAssignment: IpAssignment */;
  uploadUrl?: string | null;
  id?: string | null;
  isActive?: boolean | null;
  name?: string | null;
}

export interface AuditCard {
  audit?: Audit | null;
  taskIds?: string | null;
  company?: Company | null;
  lineOfCoverage?: string | null;
  cardType?: string | null;
  companyHealthEnrollment?: CompanyHealthEnrollment | null;
  id?: string | null;
  isActive?: boolean | null;
  resource_uri?: string | null;
}

export interface BaddataValidate {
  resource_uri?: string | null;
}

export interface BenefitsTransactionHelpFlow {
  id?: string | null;
  company?: Company | null;
  employee?: AllEmployee | null;
  benefitsType?: string | null;
  originalContext?: BenefitsContext | null;
  originalCost?: BenefitsCost | null;
  originalContribution?: ContributionBreakdown | null;
  newCost?: BenefitsCost | null;
  newContribution?: ContributionBreakdown | null;
  triageData?: string | null;
  contextChange?: BenefitsContext | null;
  costChange?: BenefitsCost | null;
  contributionChange?: ContributionBreakdown | null;
  flow?: Flow | null;
  jiraTicket?: string | null;
  isApproved?: boolean | null;
  isCompleted?: boolean | null;
  createdAt?: DateTime | null;
  createdBy?: User | null;
  approvedBy?: User | null;
  completedAt?: DateTime | null;
}

export interface BulkUpload {
  status?: string | null;
  errors?: string | null;
  duplicates?: string | null;
  changes?: string | null;
  updateOn?: DateTime | null;
  company?: Company | null;
  id?: string | null;
  content?: string | null;
  warning?: string | null;
  message?: string | null;
  type?: string | null;
  fileUrl?: string | null;
  resource_uri?: string | null;
}

export interface Category {
  mainCategory?: string | null;
  subCategory?: string | null;
}

export interface Csa {
  id: string;
  name?: string | null;
}

export interface CustomZenefitsEmployee {
  status?: string | null;
  firstName?: string | null;
  title?: string | null;
  lastName?: string | null;
  id?: string | null;
  isContractor?: boolean | null;
  department?: string | null;
  email?: string | null;
  zenefitsEmployees?: JSON | null;
}

export interface EmployeeBadRecords {
  resolved?: boolean | null;
  employee?: AllEmployee | null;
  verbose_key?: string | null;
  reason?: string | null;
  key?: string | null;
  pushType?: string | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface EmployeeLifeEventQualification {
  needSpouseInfo?: boolean | null;
  needDomesticPartnerInfo?: boolean | null;
  needRelevantDependentInfo?: boolean | null;
  action?: number | null;
  needChildInfo?: boolean | null;
  needAddressInfo?: boolean | null;
  needEmployeeInfo?: boolean | null;
}

export interface EmployeeTestContext {
  personalInfo?: PersonalInfoContext | null;
}

export interface GroupMember {
  id: string;
  employee: AllEmployee;
}

export interface HelpArticleInfo {
  link?: string | null;
  resource_uri?: string | null;
  pageHelpArticle?: PageHelpArticle | null;
  id?: string | null;
  title?: string | null;
}

export interface PageHelpArticle {
  title?: string | null;
  tags?: string | null;
  searchKeyword?: string | null;
  pageRoute?: string | null;
  helpArticleInfo?: (HelpArticleInfo | null)[] | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface InboxActionPartial {
  id?: string | null;
  isForDashboard?: boolean | null;
  requestDate?: string | null;
  status?: string | null;
  titleWithNamesAndVariables?: string | null;
  type?: string | null;
  viewCount?: number | null;
  zAppId?: string | null;
}

export interface InboxProductIntro {
  seenDate?: string | null;
  resource_uri?: string | null;
  employeeId?: number | null;
  id?: string | null;
}

export interface InboxSnoozeLog {
  snoozeDate?: string | null;
  inboxAction?: InboxAction | null;
  snoozedFor?: number | null;
  reason?: string | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface MatchingCriteria {
  product_id: string;
  matchingCriteria?: string | null;
  target?: string | null;
  condition?: string | null;
  lowerRange?: number | null;
  upperRange?: number | null;
  strictMatchOrNot?: boolean | null;
}

export interface MobileInboxSubAction {
  null?: (ConfirmationSubAction | null)[] | null;
  description?: string | null;
  inboxAction?: InboxAction | null;
  employee_id?: number | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface Permission {
  codename?: string | null;
  productName?: string | null;
  description?: string | null;
  id?: string | null;
}

export interface ProductCategories {
  categories?: (ProductCategory | null)[] | null;
}

export interface QualifyingEventWaiver {
  migratedFrom?: string | null;
  otherReason?: string | null;
  otherIDNumber?: string | null;
  idCardUrl?: string | null;
  datetime?: DateTime | null;
  lineOfCoverage?: string | null;
  reason?: string | null;
  waiveReason?: WaiverMetadata | null;
  signature?: string | null;
  qualifyingEvent?: QualifyingEvent | null;
  otherCarrier?: string | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface WaiverMetadata {
  category?: string | null;
  applicableDependentTypes?: string | null;
  description?: string | null;
  resource_uri?: string | null;
  softDeleted?: boolean | null;
  name?: string | null;
  requiresCarrierInfo?: boolean | null;
  id?: string | null;
  isDefaultValid?: boolean | null;
}

export interface Role {
  rght?: number | null;
  name?: string | null;
  parent?: Role | null;
  level?: number | null;
  lft?: number | null;
  tree_id?: number | null;
  id?: string | null;
  isActive?: boolean | null;
  permissions?: (Permission | null)[] | null;
}

export interface ScrapedAudit {
  lastRun?: DateTime | null;
  firstRun?: DateTime | null;
  argsJSON?: string | null;
  auditVersion?: string | null;
  resource_uri?: string | null;
  numErrors?: number | null;
  id?: string | null;
  name?: string | null;
}

export interface ShiftDetailsFormData {
  schedulingEmployees?: (SchedulingEmployee | null)[] | null;
  positions?: (Group | null)[] | null;
}

export interface Smp {
  isCompanyLocationsComplete?: boolean | null;
  isPayrollReports?: boolean | null;
  isNativeDeductionsReport?: boolean | null;
  syncType?: string | null;
  isNativeNewHireReport?: boolean | null;
  isNativeModReport?: boolean | null;
  isBasicCompanyInfoComplete?: boolean | null;
  id?: string | null;
  isAddEmployeesComplete?: boolean | null;
  isFileSync?: boolean | null;
  isNativeTerminationReport?: boolean | null;
  company?: Company | null;
  blockPeriod?: number | null;
  status?: string | null;
  isBulkEmailComplete?: boolean | null;
  isNative?: boolean | null;
  bulkUpload?: BulkUpload | null;
  isActive?: boolean | null;
  badModCount?: number | null;
  isBulkValidationComplete?: boolean | null;
  isNativeTaReport?: boolean | null;
  hasStarted?: boolean | null;
  resource_uri?: string | null;
}

export interface SmpRun {
  deductionCount?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  terminationCount?: number | null;
  fullReportUrl?: string | null;
  eeTerminationModSummary?: string | null;
  taCount?: number | null;
  eeDeductionsReportCreateOn?: DateTime | null;
  id?: string | null;
  terminatedEmployeeModificationCount?: number | null;
  modificationCount?: number | null;
  eeNewHireSummary?: string | null;
  newHireCount?: number | null;
  previousRunDay?: string | null;
  newHireReportCreateOn?: DateTime | null;
  eeModReportUrl?: string | null;
  terminatedEmployeeIds?: string | null;
  fullReportCreateOn?: DateTime | null;
  missingPayrollIdEmployeeIds?: string | null;
  eeModReportCreateOn?: DateTime | null;
  taReportUrl?: string | null;
  eeTerminationSummary?: string | null;
  eeNonPushModReportUrl?: string | null;
  newHireReportUrl?: string | null;
  currentRunDay?: string | null;
  isOpen?: boolean | null;
  eeDeductionsSummary?: string | null;
  eeTerminationReportCreateOn?: DateTime | null;
  companyPaySchedule?: CompanyPaySchedule | null;
  eeDeductionsReportUrl?: string | null;
  taReportCreateOn?: DateTime | null;
  checkDate?: string | null;
  eeModSummary?: string | null;
  nonPushableEmployeeModificationDetails?: string | null;
  eeTerminationReportUrl?: string | null;
  resource_uri?: string | null;
}

export interface TagsProductMeta {
  isProductName?: boolean | null;
  subcategories?: (TagsProductMeta | null)[] | null;
  adminDisplayName?: string | null;
  name?: string | null;
  adminDisplayContext?: string | null;
  contentObjectDetails?: string | null;
  permission?: Permission | null;
  isDisplayableToAdmin?: boolean | null;
  lineOfCoverage?: string | null;
  consoleDisplayName?: string | null;
  id?: string | null;
  isActive?: boolean | null;
  resource_uri?: string | null;
}

export interface TasksClassdivisioncodesbusinessstep {
  company?: Company | null /** task: WfStep */;
  isActionable?: boolean | null;
  isApplicable?: boolean | null;
  acknowledgeAction?: boolean | null;
  companyHealthEnrollment?: CompanyHealthEnrollment | null;
  resource_uri?: string | null;
  id?: string | null;
  answerQuestionOne?: string | null;
}

export interface TasksGenericborauditbusinessstep {
  company?: Company | null /** task: WfTask */;
  isActionable?: boolean | null;
  businessStepType?: string | null;
  lineOfCoverage?: string | null;
  isApplicable?: boolean | null;
  companyHealthEnrollment?: CompanyHealthEnrollment | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface TasksQualifyingeventbusinessstep {
  category?: string | null;
  isActionable?: boolean | null /** task: WfStep */;
  businessStepType?: string | null;
  qualifyingEvent?: QualifyingEvent | null;
  isApplicable?: boolean | null;
  id?: string | null;
  linesOfCoverage?: JSON | null;
  resource_uri?: string | null;
}

export interface UploadedDocument {
  is_deleted?: boolean | null;
  name?: string | null;
  tags?: (UploadedDocumentTag | null)[] | null;
  file_id?: number | null;
  id?: string | null;
  resource_uri?: string | null;
}

export interface UploadedDocumentTag {
  resource_uri?: string | null;
  id?: string | null;
  name?: string | null;
}

export interface ZAppActionUrl {
  id?: string | null;
  title?: JSON | null;
  actionUrl?: JSON | null;
  role?: JSON | null;
}

export interface ZPayrollAccountingAccount {
  accountingOrganization?: ZPayrollAccountingOrganization | null;
  description?: string | null;
  accountName?: string | null;
  isReferenceBankAccount?: boolean | null;
  accountType?: string | null;
  id?: string | null;
  accountID?: string | null;
}

export interface ZPayrollAccountingOrganization {
  accessToken?: string | null;
  automaticExportOn?: boolean | null;
  zpCompany?: ZPayrollCompany | null;
  accountingProvider?: string | null;
  accessTokenSecret?: string | null;
  oauthSessionHandle?: string | null;
  accountingOrganizationId?: string | null;
  id?: string | null;
}

export interface ZPayrollAccountingExportStatus {
  accountingOrganization?: ZPayrollAccountingOrganization | null;
  lastExportTime?: Time | null;
  journalEntryId?: string | null;
  isExported?: boolean | null;
  isErrorEmailSent?: boolean | null;
  id?: string | null;
}

export interface ZPayrollCompanyContributionType {
  category?: string | null;
  isPercentage?: boolean | null;
  name?: string | null;
  isGenerated?: boolean | null;
  accountingAccounts?: (ZPayrollAccountingAccount | null)[] | null;
  annualMax?: string | null;
  value?: string | null;
  zpCompany?: ZPayrollCompany | null;
  isCreatedForDNP?: boolean | null;
  version_id?: number | null;
  contribution?: string | null;
  id?: string | null;
  isActive?: boolean | null;
}

export interface ZPayrollCompanyDeductionType {
  category?: string | null;
  isPercentage?: boolean | null;
  name?: string | null;
  isGenerated?: boolean | null;
  accountingAccounts?: (ZPayrollAccountingAccount | null)[] | null;
  annualMax?: string | null;
  value?: string | null;
  deduction?: string | null;
  zpCompany?: ZPayrollCompany | null;
  version_id?: number | null;
  isCreatedForDNP?: boolean | null;
  id?: string | null;
  isActive?: boolean | null;
}

export interface ZPayrollCompanyDocument {
  category?: string | null;
  isJurisdictionDocument?: boolean | null;
  shouldShowZPDocument?: string | null;
  description?: string | null;
  signatureName?: string | null;
  title?: string | null;
  needsNotary?: string | null;
  version_id?: number | null;
  isComplete?: boolean | null;
  notarizedFormUrl?: string | null;
  notarizedDate?: string | null;
  zpCompany?: ZPayrollCompany | null;
  isNotarized?: boolean | null;
  isSigned?: boolean | null;
  requireSignature?: string | null;
  signatureDate?: string | null;
  signature?: string | null;
  id?: string | null;
}

export interface ZPayrollCompanyEarningType {
  category?: string | null;
  ratePerUnit?: string | null;
  name?: string | null;
  unitName?: string | null;
  isGenerated?: boolean | null;
  accountingAccounts?: (ZPayrollAccountingAccount | null)[] | null;
  isRatePerUnit?: boolean | null;
  regularEarningMultiplier?: string | null;
  zpCompany?: ZPayrollCompany | null;
  amount?: string | null;
  isSupplemental?: boolean | null;
  accountingCode?: string | null;
  isMultipleOfRegularEarning?: boolean | null;
  accrueTimeOff?: boolean | null;
  isCreatedForDNP?: boolean | null;
  id?: string | null;
  isActive?: boolean | null;
}

export interface ZPayrollCompanyOtherExpenseType {
  accountingAccounts?: (ZPayrollAccountingAccount | null)[] | null;
  id?: string | null;
  expenseName?: string | null;
  zpCompany?: ZPayrollCompany | null;
}

export interface ZPayrollCompanyPriorPayrollDocument {
  url?: string | null;
  uploadedOn?: DateTime | null;
  documentName?: string | null;
  id?: string | null;
  zpCompany?: ZPayrollCompany | null;
}

export interface UpdateDependentRequest {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  gender?: string | null;
  type?: string | null;
  dateOfBirth?: string | null;
  socialSecurity?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  sameAddress?: boolean | null;
  sameEmail?: boolean | null;
  isSmoker?: boolean | null;
  isDependentDisabled?: boolean | null;
  isFullTimeStudent?: boolean | null;
  autoSelectPCP?: boolean | null;
  samePCP?: boolean | null;
  hmoPhysicianName?: string | null;
  hmoPhysicianProviderNumber?: string | null;
  hmoPhysicianExistingPatient?: boolean | null;
  autoSelectDentalPCP?: boolean | null;
  sameDentalPCP?: boolean | null;
  hmoDentalName?: string | null;
  hmoDentalProviderNumber?: string | null;
  hmoDentalExistingPatient?: boolean | null;
}

export interface UpdateBeneficiaryRequest {
  id: string;
  type?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  relationship?: string | null;
  entityName?: string | null;
  entityType?: string | null;
  dateOfBirth?: string | null;
  phone?: string | null;
  entityDateEstablished?: string | null;
  hasSocialSecurity?: boolean | null;
  socialSecurity?: string | null;
  isEnrolledInInsurance?: boolean | null;
  percentage?: string | null;
}

export interface UpdateAddressRequest {
  id: string;
  street1?: string | null;
  street2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
}

export interface UpdateEmployeeRequest {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  gender?: string | null;
  dob?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  socialSecurity?: string | null;
  isWaitingForSSNInfo?: boolean | null;
  socialSecurityExpectedDate?: string | null;
}

export interface UpdatePersonalInfoRequest {
  id: string;
  jobTitle?: string | null;
  salary?: string | null;
  maritalStatus?: string | null;
  marriageDate?: string | null;
  marriageState?: string | null;
  marriageCountry?: string | null;
  contactPreference?: string | null;
}
/** Message structure used to represent plan amount change. */
export interface AmountApprovalEntry {
  enrolleeId: string;
  enrolleeType: string;
  amount: number;
}

export interface TalentFlowScheduleInput {
  event: TalentFlowScheduleEvent;
  timeAfterEvent: number;
  timeUnit: TalentTimeUnit;
}

export interface SalaryBenchmarkingBlacklistInput {
  id?: number | null;
  locationTypeId?: number | null;
  locationId?: number | null;
  industryTypeId?: number | null;
  industryId?: number | null;
  jobFamilyTypeId?: number | null;
  jobFamilyId?: number | null;
  jobLevelId?: number | null;
  isActive?: boolean | null;
}

export interface QFCommentInput {
  questionId?: string | null;
  sectionId?: string | null;
  text: string;
}

export interface FulfillmentAttachmentInput {
  url: string;
  filename: string;
}

export interface FullStpEmailAttachmentInput {
  url: string;
  filename: string;
}

export interface SetPhysicianDentistInput {
  autoSelectPCP?: boolean | null;
  hmoPhysicianName?: string | null;
  hmoPhysicianProviderNumber?: string | null;
  hmoPhysicianExistingPatient?: boolean | null;
  dependents?: (DependentPhysicianDentistInput | null)[] | null;
}

export interface DependentPhysicianDentistInput {
  id?: string | null;
  samePCP?: boolean | null;
  autoSelectPCP?: boolean | null;
  hmoPhysicianName?: string | null;
  hmoPhysicianProviderNumber?: string | null;
  hmoPhysicianExistingPatient?: boolean | null;
}

export interface SetBeneficiaryInput {
  beneficiaries?: (BeneficiaryInput | null)[] | null;
}

export interface BeneficiaryInput {
  id?: string | null;
  percentage?: string | null;
  type?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  entityName?: string | null;
  relationship?: string | null;
  ssn?: string | null;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
  entityType?: string | null;
  entityDateEstablished?: string | null;
}
/** Message structure used to represent the creation of an enrollment for a specific line. */
export interface CreateEmployeeBenefitsEnrollment {
  lineOfCoverage: string;
  effectiveDate: Date;
  enrollmentType: string;
  endDate: Date;
}
/** Message structure used to represent the enrollment date change for a single line. */
export interface ChangeEmployeeBenefitsEnrollment {
  lineOfCoverage: string;
  effectiveDate: Date;
  newEffectiveDate?: Date | null;
  newEndDate?: Date | null;
}
/** Message structure used to represent the enrollment cancellation for a specific line. */
export interface CancelEmployeeBenefitsEnrollment {
  lineOfCoverage: string;
  effectiveDate: Date;
}

export interface AddQleDocumentReviewRequest {
  decision: string;
  comment?: string | null;
}

export interface CompanyWorkLocation {
  id?: string | null;
  name: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  zip: string;
}

export interface CompanySetupBasicEmployeeInput {
  id?: string | null;
  first_name: string;
  last_name: string;
  email: string;
  location_id?: string | null;
}

export interface CompanySetupAdditionalInfoEmployeeInput {
  id: string;
  hireDate: Date;
  employmentType: EmploymentType;
  compType: CompType;
  payRate?: number | null;
  annualSalary?: number | null;
}

export interface FlowSectionUpdate {
  isEntered?: boolean | null;
  isComplete?: boolean | null;
}

export interface StpFormTemplateInput {
  name?: string | null;
  description?: string | null;
  isLive?: boolean | null;
  templateUrl?: string | null;
  category?: string | null;
  FieldMappings?: (StpFieldMappingInput | null)[] | null;
  id?: string | null;
  groups?: (StpFieldGroupInput | null)[] | null;
}

export interface StpFieldMappingInput {
  expression?: string | null;
  fieldName?: string | null;
  id?: string | null;
  fieldValidationType?: string | null;
}

export interface StpFieldGroupInput {
  fields?: (string | null)[] | null;
  id?: string | null;
  name?: string | null;
  operationType?: string | null;
  operationInteger?: string | null;
}

export interface StpBaseFieldMappingInput {
  baseFieldName?: string | null;
  value?: string | null;
  fieldType?: string | null;
}

export interface SchedulingShiftGroupInput {
  groupId?: string | null;
  groupTypeId?: string | null;
  id?: string | null;
  shiftId?: string | null;
}

export interface SchedulingShiftSeriesInput {
  id?: number | null;
  shiftId?: number | null;
  frequency?: number | null;
  onDays?: (number | null)[] | null;
  rangeEndDate?: Date | null;
  originalStartDate?: Date | null;
}

export interface PlaidMetaData {
  link_session_id?: string | null;
  institution?: Institution | null;
  account?: PlaidAccountDetail | null /** Plaid api returns a  "selected account" and list of accounts */;
  accounts?: (PlaidAccountDetail | null)[] | null;
  public_token?: string | null;
  account_id?: string | null;
}

export interface Institution {
  name?: string | null;
  institution_id?: string | null;
}

export interface PlaidAccountDetail {
  id?: string | null;
  name?: string | null;
  mask?: number | null;
  type?: string | null;
  subtype?: string | null;
}

export interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: string;
  verificationType: string;
}
export interface DashboardQueryArgs {
  id?: string | null;
}
export interface CompanyQueryArgs {
  id?: string | null;
}
export interface EmployeeQueryArgs {
  id?: string | null;
}
export interface FilterEmployeeQueryArgs {
  id: string;
}
export interface SignatureQueryArgs {
  id?: string | null;
}
export interface FlowQueryArgs {
  id: string;
}
export interface SearchClientsQueryArgs {
  text?: string | null;
}
export interface InboxTaskQueryArgs {
  id: string;
}
export interface InboxActionCommentsQueryArgs {
  id: string;
}
export interface QualifyingEventsQueryArgs {
  ids?: string[] | null;
}
export interface FilteredCompaniesQueryArgs {
  ids?: string[] | null;
}
export interface InboxTaskSearchQueryArgs {
  status?: string[] | null /** Open/Closed task status */;
  carriers?: string[] | null;
  groups?: string[] | null;
  employees?: string[] | null;
  events?: string[] | null;
  sort?:
    | string
    | null /** Column header sort, ascending: [Carrier, employee, effectiveDate, company]descending: [-carrier, -employee, -effectiveDate, -company] */;
  snoozed?: string | null;
  effectiveDateMax?: string | null;
  effectiveDateMin?: string | null;
  creationDateMax?: string | null;
  creationDateMin?: string | null;
  assigneeUserIds?: string[] | null;
  offset?: number | null /** Pagination page value */;
  size?: number | null /** Number of tasks per pagination */;
}
export interface GetPdfInfoQueryArgs {
  id: string;
}
export interface FulfillmentTaskEmployeesQueryArgs {
  name?: string | null /** Search keyword for employee names, return no employee if name is null */;
  company?: string[] | null /** IDs of companies where the search is restricted to */;
  size?: number | null /** The max number of results returned, for default search for SIZE_EMPLOYEE_SEARCH */;
}
export interface AutocompletedCompaniesQueryArgs {
  name?: string | null;
  size?: number | null;
}
export interface BenefitsEnrollmentsQueryArgs {
  ids: string[];
}
export interface BenefitsTransactionQueryArgs {
  id: string;
}
export interface BenefitsTransactionsQueryArgs {
  companyId: string;
  employeeId: string;
  benefitsTypes?: string[] | null;
  sort?: string | null;
}
export interface RestrictionDataForEmployeeAndDependentsQueryArgs {
  chp_id: string;
  effective_date: string;
}
export interface EmployeeBenefitsHsaInfoQueryArgs {
  numEnrolledDependents?: number | null;
}
export interface BenefitsAuditErrorsQueryArgs {
  companyId: string;
  employeeId?: string | null;
  names?: string[] | null;
}
export interface EtaTasksQueryArgs {
  ids?: string[] | null;
}
export interface PartnerQueryArgs {
  id: string;
}
export interface PartnerUserQueryArgs {
  id: string;
}
export interface FetchPartnerInfoQueryArgs {
  companyId: string;
}
export interface EmployeeStatusQueryArgs {
  employeeId: string;
}
export interface EmployeeHealthEnrollmentsQueryArgs {
  companyId?: string | null;
  employeeId?: string | null;
  isActive?: boolean | null;
  includedInGroupApp?: boolean | null;
}
export interface EmployeeBenefitsEnrollmentsQueryArgs {
  employeeId: string;
  linesOfCoverage?: string[] | null;
  activeOnly: boolean;
}
export interface CompanyBenefitsCostQueryArgs {
  companyId?: string | null;
}
export interface CobraThirdPartyAdministratorsQueryArgs {
  isKnownPartner?: boolean | null;
}
export interface CobraClassificationTypeQueryArgs {
  companyCobra_id?: string | null;
}
export interface CompanyTagsQueryArgs {
  companyId: string;
  product: string;
}
export interface EmployeeTagsQueryArgs {
  employeeId: string;
  product: string;
}
export interface ReviewQueryArgs {
  reviewId: string;
}
export interface ReviewTemplatesQueryArgs {
  id?: string | null;
  status?: ReviewTemplateStatus | null;
}
export interface ReviewsQueryArgs {
  companyId?: string | null;
  statuses?: ReviewStatus[] | null;
  hasAssignedSummaries?: boolean | null;
  hasAssignedReviews?: boolean | null;
  specificRevieweeId?: string | null;
}
export interface GoalsQueryArgs {
  status?: GoalStatus | null;
  targets?: GoalTarget[] | null;
  id?: string | null;
  contextualize?: boolean | null;
}
export interface QuestionFlowsQueryArgs {
  questionFlowId?: string | null;
  appId?: string | null;
}
export interface MeetingSpaceQueryArgs {
  id: string;
}
export interface WellbeingLifeEventQueryArgs {
  id: string;
}
export interface WellbeingAssessmentQueryArgs {
  id: string;
}
export interface WellbeingArticleQueryArgs {
  id: string;
}
export interface WellbeingFeaturedArticlesQueryArgs {
  page: number;
  pageSize: number;
}
export interface BenefitsFulfillmentDetailsQueryArgs {
  btIds: (string | null)[];
}
export interface CompanyRateVersionQueryArgs {
  companyHealthPlanId: string;
}
export interface CompanyHealthPlanQueryArgs {
  chpId: string;
}
export interface BenefitsFormMapperGetDataFieldsQueryArgs {
  searchString?: string | null;
}
export interface BenefitsFormMapperStpFormTemplateQueryQueryArgs {
  id?: string | null;
}
export interface BenefitsFormMapperGetFieldOnPdfFormQueryArgs {
  url?: string | null;
}
export interface ZPayrollCompanySearchQueryArgs {
  onboardingState?: (string | null)[] | null;
  offset: number /** For Pagination */;
  limit: number;
}
export interface ZpCompanyQueryArgs {
  companyId: string;
}
export interface CompanyImplementationOverviewSearchQueryArgs {
  companyName?: string | null /** Filter/search fields */;
  companyId?: string | null;
  assignedToId?: string | null;
  overallOnboardingState?: (string | null)[] | null;
  offset: number /** For Pagination */;
  limit: number;
}
export interface CompanyImplementationOverviewQueryArgs {
  companyId: string;
}
export interface ZScoreCompanyQueryArgs {
  id?: string | null;
}
export interface AllZScoresForCompanyQueryArgs {
  id?: string | null;
}
export interface PaGetJobTitleSuggestionsQueryArgs {
  query?: string | null;
}
export interface PaJobLevelSalaryBenchmarkQueryArgs {
  location?: number | null;
  jobTitle?: number | null;
}
export interface PaGetSalaryBenchmarkQueryArgs {
  locationTypeId?: number | null;
  locationId?: number | null;
  industryTypeId?: number | null;
  industryId?: number | null;
  jobFamilyTypeId?: number | null;
  jobFamilyId?: number | null;
  jobLevelId?: number | null;
}
export interface PaConsoleGetCompanyConfigQueryArgs {
  companyId?: number | null;
}
export interface PaConsoleGetCompanyTitleLevelMappingQueryArgs {
  companyId?: number | null;
}
export interface PaConsoleAppInstallQueryArgs {
  companyId?: number | null;
}
export interface DealsForCompanyQueryArgs {
  company_id?: string | null;
  filter?: JSON | null;
}
export interface DealsForEmployeeQueryArgs {
  employee_id?: string | null;
  filter?: JSON | null;
}
export interface GetDealsQueryArgs {
  filter?: JSON | null;
  offset?: number | null;
  limit?: number | null;
}
export interface MetaKeysForProductQueryArgs {
  product_id?: string | null;
}
export interface AllProductDetailsAndOptionsQueryArgs {
  product_id?: string | null;
}
export interface MetaKeysForCategoryQueryArgs {
  categories?: (JSON | null)[] | null;
}
export interface ProductDetailsQueryArgs {
  product_id?: string | null;
}
export interface DocumentsInfoQueryArgs {
  company_id?: string | null;
  view_type?: string | null;
}
export interface CompanyAdminsQueryArgs {
  company_id?: string | null;
}
export interface DocActionHistoryQueryArgs {
  companyId?: string | null;
  docMetaId: number;
}
export interface GetChatStatusQueryArgs {
  id?: string | null;
}
export interface GroupTypesQueryArgs {
  ids?: string[] | null;
  memberType?: string | null;
  name?: string | null;
  isSystemType?: boolean | null;
}
export interface GroupsQueryArgs {
  ids?: string[] | null;
  groupTypeIds?: string[] | null;
}
export interface MembershipQueryArgs {
  memberId: string;
  groupTypeIds?: string[] | null;
}
export interface ListSchedulingEmployeesQueryArgs {
  startDateTime?: DateTime | null;
  endDateTime?: DateTime | null;
}
export interface ListSchedulingShiftsQueryArgs {
  startDateTime?: DateTime | null;
  endDateTime?: DateTime | null;
}
export interface SwitchesDashboardArgs {
  switches?: string[] | null;
}
export interface EmployeesDashboardArgs {
  first?: number | null;
  offset?: number | null;
  allStatus?: EmployeeStatus | null;
  status?: EmployeeStatus | null;
  status__in?: (EmployeeStatus | null)[] | null;
  status__not?: (EmployeeStatus | null)[] | null;
  status__not_in?: (EmployeeStatus | null)[] | null;
  type?: EmployeeType | null;
  type__in?: (EmployeeType | null)[] | null;
  type__not?: (EmployeeType | null)[] | null;
  type__not_in?: (EmployeeType | null)[] | null;
  employmentType__in?: (EmploymentType | null)[] | null;
  employmentType__not?: (EmployeeType | null)[] | null;
  employmentType__not_in?: (EmployeeType | null)[] | null;
  canManage?: boolean | null;
  canAdminister?: boolean | null;
  isPastHireDate?: boolean | null;
  isTeamMember?: boolean | null;
  isManager?: boolean | null;
  hireDate__gte?: string | null;
  hireDate__lte?: string | null;
  hireDate__range?: string | null;
  canManageOrAdminister?: boolean | null;
  isPendingOrRecentHire?: boolean | null;
}
export interface ZAppInstallSubscriptionsDashboardArgs {
  appUniqueIds?: string[] | null;
}
export interface EmployeesCompanyArgs {
  type?: string | null;
}
export interface PermissionedAdminsCompanyHrProxyArgs {
  permission: string;
}
export interface BenefitsPlanOptionsAllEmployeeArgs {
  lineOfCoverage: string;
  effectiveDate: string;
  enrollmentType?: string | null;
}
export interface BenefitsEnrollmentsAllEmployeeArgs {
  benefitsType?: string | null;
}
export interface BenefitsTransactionsAllEmployeeArgs {
  benefitsType?: string | null;
}
export interface EffectiveBenefitsTransactionsAllEmployeeArgs {
  benefitsTypes: string[];
  effectiveDate?: string | null;
}
export interface NextEffectiveBenefitsTransactionsAllEmployeeArgs {
  benefitsTypes: string[];
  effectiveDate?: string | null;
}
export interface DependentsAllEmployeeArgs {
  ids?: (string | null)[] | null;
}
export interface BeneficiariesAllEmployeeArgs {
  ids?: (string | null)[] | null;
}
export interface ZAppSubscriptionAllEmployeeArgs {
  zAppUniqueId: string;
}
export interface PlanCostContributionEmployeeBenefitsArgs {
  effectiveDate: string;
  dependentIds: (string | null)[];
  chpIds: string[];
}
export interface PlanAvailabilityEmployeeBenefitsArgs {
  effectiveDate: string;
  dependentIds: (string | null)[];
  chpIds: string[];
}
export interface OngoingBenefitsEnrollmentEmployeeBenefitsArgs {
  lineOfCoverage: string;
  effectiveDate: string;
}
export interface EmployeeReinstateBenefitsEmployeeBenefitsArgs {
  lineOfCoverage: string;
}
export interface PaySchedulesCompanyPayrollProxyArgs {
  status?: CompanyPayScheduleStatus | null;
}
export interface SchedulesReviewArgs {
  event?: TalentFlowScheduleEvent | null;
}
export interface RunsReviewArgs {
  runId?: string | null;
  revieweeId?: string | null;
  offset?: number | null;
  first?: number | null;
  hasAssignedSummaries?: boolean | null;
  hasAssignedReviews?: boolean | null;
}
export interface RunsCountReviewArgs {
  revieweeId?: string | null;
}
export interface TargetedEmployeesReviewArgs {
  targetScope?: JSON | null;
}
export interface ApplicableGoalsReviewArgs {
  employeeId: string;
}
export interface ReviewSessionsReviewRunArgs {
  sessionId?: string | null;
  isAssigned?: boolean | null;
  revieweeId?: string | null;
}
export interface SummarySessionsReviewRunArgs {
  sessionId?: string | null;
  isAssigned?: boolean | null;
  revieweeId?: string | null;
}
export interface RunsReviewCycleArgs {
  offset?: number | null;
  first?: number | null;
}
export interface RunsWellbeingAssessmentArgs {
  statuses?: WellbeingAssessmentRunStatus[] | null;
  id?: string | null;
}
export interface SessionsWellbeingAssessmentRunArgs {
  id?: string | null;
  type?: WellbeingAssessmentSessionType | null;
}
export interface RecommendedArticleWellbeingAssessmentRunArgs {
  id: string;
}
export interface RecommendedArticleWellbeingLifeEventArgs {
  id: string;
}
export interface MembershipGroupTypeArgs {
  memberId: string;
}
export interface RecalculateContributionMutationArgs {
  employeeId: string;
  benefitsType: string;
  effectiveDate: string;
}
export interface RecalculateCostMutationArgs {
  employeeId: string;
  benefitsType: string;
  effectiveDate: string;
}
export interface EnrollEmployeeMutationArgs {
  employeeId: string;
  benefitsType: string;
  enrollmentType: string;
  companyHealthPlanId?: string | null;
  volCompanyHealthPlanId?: string | null;
  enrollingDependentIds?: string[] | null;
  effectiveDate: string;
  employeeElectedBasicAmount?: string | null;
  spouseElectedBasicAmount?: string | null;
  childrenElectedBasicAmount?: string | null;
  employeeApprovedBasicAmount?: string | null;
  spouseApprovedBasicAmount?: string | null;
  childrenApprovedBasicAmount?: string | null;
  employeeElectedVoluntaryAmount?: string | null;
  spouseElectedVoluntaryAmount?: string | null;
  childrenElectedVoluntaryAmount?: string | null;
  employeeApprovedVoluntaryAmount?: string | null;
  spouseApprovedVoluntaryAmount?: string | null;
  childrenApprovedVoluntaryAmount?: string | null;
}
export interface DeclineEmployeeMutationArgs {
  employeeId: string;
  lineOfCoverage: string;
  enrollmentType: string;
  effectiveDate: string;
}
export interface UpdateDependentMutationArgs {
  request: UpdateDependentRequest;
}
export interface UpdateBeneficiaryMutationArgs {
  request: UpdateBeneficiaryRequest;
}
export interface UpdateAddressMutationArgs {
  request: UpdateAddressRequest;
}
export interface UpdateEmployeeMutationArgs {
  request: UpdateEmployeeRequest;
}
export interface UpdatePersonalInfoMutationArgs {
  request: UpdatePersonalInfoRequest;
}
export interface DeactivateDependentMutationArgs {
  dependentId: string;
}
export interface DeactivateBeneficiaryMutationArgs {
  beneficiaryId: string;
}
export interface HsaEnrollEmployeeWithoutUpdatingStateMutationArgs {
  employeeId: string;
  effectiveDate: string;
  amount: number;
}
export interface HsaEnrollEmployeeMutationArgs {
  employeeId: string;
  effectiveDate: Date;
  amount: number;
}
export interface CreateDependentRecordMutationArgs {
  employeeId: string;
  type: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  ssn?: string | null;
  zip: string;
}
export interface CreateBeneficiaryRecordMutationArgs {
  employeeId: string;
  type: string;
  firstName?: string | null;
  lastName?: string | null;
  relationship?: string | null;
  entityName?: string | null;
  entityType?: string | null;
}
export interface EditDependentPersonalInfoMutationArgs {
  dependentId: string;
  type: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  ssn?: string | null;
  zip: string;
}
export interface AddDependentsToCoverageMutationArgs {
  employeeId: string;
  benefitsType: string;
  dependentIds: (string | null)[];
  effectiveDate: string;
}
export interface RemoveDependentsFromCoverageMutationArgs {
  employeeId: string;
  benefitsType: string;
  dependentIds: (string | null)[];
  effectiveDate: string;
}
export interface CancelCoverageMutationArgs {
  employeeId: string;
  benefitsType: string;
  effectiveDate: string;
}
export interface TerminateBenefitMutationArgs {
  employeeId: string;
  benefitsType: string;
  effectiveDate: string;
}
export interface PlanCorrectionMutationArgs {
  employeeId: string;
  benefitsType: string;
  effectiveDate: string;
  planId: string;
  companyHealthPlanId: string;
  planName: string;
  carrierId: string;
  carrierName: string;
}
export interface ChangeTransactionEffectiveDateMutationArgs {
  employeeId: string;
  benefitsType: string;
  effectiveDate: string;
  newEffectiveDate: string;
}
export interface ApproveEvidenceOfInsurabilityMutationArgs {
  employeeId: string;
  benefitsType: string;
  planId: string;
  effectiveDate: string;
  amountApprovalEntries: (AmountApprovalEntry | null)[];
}
export interface SetCompanyContextMutationArgs {
  employeeId: string;
}
export interface SetupPolicyNumberMutationArgs {
  companyId: string;
  policyNumber: string;
  companyHealthPlanId: string;
  samePolicyNumberForAllPlan?: boolean | null;
}
export interface UpdateEoiFormMutationArgs {
  companyHealthPlanId: string;
  newEoiFormUrl: string;
}
export interface UpdateSbcFileMutationArgs {
  companyHealthPlanId: string;
  newSbcFileUrl: string;
}
export interface ChangeContractLengthMutationArgs {
  companyEnrollmentId: string;
  contractLength?: number | null;
  effectiveEndDate?: string | null;
}
export interface ChangeWaitingPeriodMutationArgs {
  companyEnrollmentId: string;
  waitingPeriod: string;
}
export interface ChangeTerminationPolicyMutationArgs {
  companyEnrollmentId: string;
  terminationPolicy: string;
}
export interface RunBenefitsAuditTaskMutationArgs {
  companyId: string;
  employeeId?: string | null;
  linesOfCoverage?: string[] | null;
}
export interface ChangeCompanyCobraThirdPartyAdministratorMutationArgs {
  companyCobraId: string;
  administratorId: string;
}
export interface ChangeCompanyCobraClassificationMutationArgs {
  companyCobraId: string;
  classificationType: string;
}
export interface CreateOrUpdateReviewMutationArgs {
  id?: string | null;
  title: string;
  description?: string | null;
  targetRule: JSON;
}
export interface CreateReviewMutationArgs {
  title: string;
  description?: string | null;
  targetRule: JSON;
}
export interface LaunchReviewMutationArgs {
  reviewId: string;
  startDate?: Date | null;
  schedules: TalentFlowScheduleInput[];
  duration: number;
}
export interface EndReviewMutationArgs {
  reviewId: string;
}
export interface CreateReviewFromTemplateMutationArgs {
  reviewTemplateId: string;
}
export interface UpdateReviewRunSettingsMutationArgs {
  id: string;
  startDate: Date;
  endDate: Date;
  reviewerIds: string[];
}
export interface CreateOrUpdateReviewTemplateMutationArgs {
  title: string;
  status: ReviewTemplateStatus;
  description?: string | null;
  id?: string | null;
  sourceQuestionFlowId?: string | null;
}
export interface DeleteReviewTemplateMutationArgs {
  id: string;
}
export interface ExtendReviewDueDatesMutationArgs {
  id: string;
  duration?: number | null;
  endDate?: Date | null;
}
export interface DeleteMeetingMutationArgs {
  id: string;
}
export interface CreateMeetingSpaceMutationArgs {
  employeeId: string;
  firstMeetingTime: DateTime;
}
export interface CreateOrUpdateMeetingMutationArgs {
  id?: string | null;
  spaceId: string;
  time: DateTime;
}
export interface MoveMeetingItemMutationArgs {
  qfQuestionId: string;
  qfSectionId: string;
  order: number;
}
export interface DeleteReviewMutationArgs {
  id: string;
}
export interface ReopenReviewMutationArgs {
  id: string;
  endDate: Date;
}
export interface PaCreateCompanyConfigMutationArgs {
  subIndustry?: number | null;
  location?: (number | null)[] | null;
}
export interface PaUpdateCompanyConfigMutationArgs {
  minPercentile?: number | null;
  maxPercentile?: number | null;
}
export interface PaUpdateCompanyJobTitleMappingMutationArgs {
  rawTitle: string;
  jobTitle?: number | null;
  jobLevel?: number | null;
}
export interface PaUpdateEmployeeJobTitleMappingMutationArgs {
  employeeId?: number | null;
  jobTitle?: number | null;
  jobLevel?: number | null;
}
export interface PaCreateFeedbackMutationArgs {
  rating?: string | null;
  comment?: string | null;
}
export interface PaUpdateSalaryBenchmarkBlackListMutationArgs {
  salaryBenchmark?: SalaryBenchmarkingBlacklistInput | null;
}
export interface PaConsoleCompanyInfoMutationArgs {
  companyId?: number | null;
  subIndustry?: number | null;
  minPercentile?: number | null;
  maxPercentile?: number | null;
  isLocked?: boolean | null;
  isConfigured?: boolean | null;
}
export interface PaConsoleUpdateCompanyJobTitleMappingMutationArgs {
  companyId?: number | null;
  rawTitle: string;
  jobTitle?: number | null;
  jobLevel?: number | null;
}
export interface PaConsoleUpdateIndustryJobMutationArgs {
  type?: string | null;
  id?: number | null;
  name?: string | null;
}
export interface UpdateQuestionFlowMutationArgs {
  questionFlowId: string;
  title?: string | null;
  description?: string | null;
  targetRule?: JSON | null;
  appId?: string | null;
}
export interface CreateOrUpdateQfQuestionMutationArgs {
  questionId?: string | null;
  sectionId: string;
  order: number;
  title: string;
  description?: string | null;
  questionType: QFQuestionType;
  employeeId?: string | null;
  config: JSON;
  appId?: string | null;
}
export interface DeleteQfQuestionMutationArgs {
  questionId: string;
  sectionId: string;
  appId?: string | null;
}
export interface SubmitSessionResponsesMutationArgs {
  sessionId: string;
  responses: JSON[] /** A JSON in the format [{id, questionId|sectionId, response}] */;
  status: QFSessionStatus;
  appId?: string | null;
}
export interface SubmitSessionCommentsMutationArgs {
  sessionId: string;
  comments: QFCommentInput[];
  status: QFSessionStatus;
  appId?: string | null;
}
export interface SubmitQuestionUniqueResponseMutationArgs {
  sessionId: string;
  questionId: string;
  response: JSON;
  contextId?: string | null;
  appId?: string | null;
}
export interface GenerateReviewRunResponsesPdfMutationArgs {
  runId: string;
  includeDraftRemarks: boolean;
  isManagerVersion: boolean;
}
export interface GenerateReviewCycleReportMutationArgs {
  reviewId: string;
  cycleStartDate: Date;
}
export interface CreateOrUpdateTalentGoalMutationArgs {
  id?: string | null;
  title: string;
  description?: string | null;
  startDate: Date;
  dueDate: Date;
  status: GoalStatus;
  measurementConfig: JSON;
  measurementUnit: QFQuestionType;
  target?: GoalTarget | null;
  parentGoalId?: string | null;
}
export interface DeleteGoalMutationArgs {
  id: string;
}
export interface UpdatePdfInfoMutationArgs {
  id: string;
  updatedValues?: JSON | null;
}
export interface CloseInboxTasksMutationArgs {
  taskIds: string[];
}
export interface AssignInboxTasksMutationArgs {
  ownerUserId: string;
  inboxActionIds: string[];
}
export interface SnoozeInboxTasksMutationArgs {
  inboxActionIds: string[];
  snoozeDueDate: Date;
}
export interface UnSnoozeInboxTasksMutationArgs {
  inboxActionIds: string[];
}
export interface CreateInboxActionCommentMutationArgs {
  taskId: string;
  value: string;
}
export interface AddFulfillmentAttachmentsMutationArgs {
  taskId: string;
  attachments: FulfillmentAttachmentInput[];
}
export interface RemoveFulfillmentAttachmentMutationArgs {
  taskId: string;
  attachmentId: string;
}
export interface SendFullStpEmailMutationArgs {
  taskId: string;
  taskType: string;
  carrierId: string;
  subject: string;
  fromEmail: string;
  toEmails: string;
  attachmentFiles: FullStpEmailAttachmentInput[];
  body: string;
  bundleId: string;
  partnerId?: string | null;
  ccEmails?: string | null;
  companyId?: string | null;
}
export interface DeclineEnrollmentMutationArgs {
  employeeId: string;
  effectiveDate: string;
  benefitsType: string;
  chpId?: string | null;
}
export interface SubmitEnrollmentSelectionMutationArgs {
  employeeId: string;
  effectiveDate: string;
  benefitsType: string;
  chpId: string;
  dependentIds: (string | null)[];
  electedAmount?: number | null;
  dependentElectedAmounts?: (number | null)[] | null;
}
export interface EmployeeSetPhysicianDentistMutationArgs {
  action: EmployeeSetPhysicianDentistActions;
  request: SetPhysicianDentistInput;
}
export interface EmployeeSetBeneficiaryMutationArgs {
  action: EmployeeSetBeneficiaryAction;
  request: SetBeneficiaryInput;
}
export interface CreateEmployeeBenefitsEnrollmentsMutationArgs {
  employeeId: string;
  data: CreateEmployeeBenefitsEnrollment[];
}
export interface ChangeEmployeeBenefitsEnrollmentsMutationArgs {
  employeeId: string;
  data: ChangeEmployeeBenefitsEnrollment[];
}
export interface CancelEmployeeBenefitsEnrollmentsMutationArgs {
  employeeId: string;
  data: CancelEmployeeBenefitsEnrollment[];
}
export interface AddQleDocumentMutationArgs {
  qualifyingEventId: string;
  fileType: string;
  fileUrl: string;
}
export interface AddQleDocumentReviewMutationArgs {
  qualifyingEventId: string;
  data?: AddQleDocumentReviewRequest | null;
}
export interface CancelQleMutationArgs {
  qualifyingEventId: string;
}
export interface ChangeQleDateMutationArgs {
  qualifyingEventId: string;
  newEventDate: Date;
}
export interface AddPartnerUserMutationArgs {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  permissions: string[];
}
export interface EditPartnerUserMutationArgs {
  id: string;
  firstName: string;
  lastName: string;
  roles: string[];
  permissions: string[];
}
export interface ChangePartnerUserStatusMutationArgs {
  id: string;
  status: string;
}
export interface UpdateCompanyLegalInfoMutationArgs {
  id: string;
  legalName: string;
  dbaName?: string | null;
  ein: string;
  legalAddress: string;
  legalAddress2: string;
  legalCity: string;
  legalState: string;
  legalZip: string;
}
export interface UpdateCompanyLegalInfoV2MutationArgs {
  id: string;
  legalName: string;
  dbaName?: string | null;
  ein: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  legalAddress: string;
  legalAddress2: string;
  legalCity: string;
  legalState: string;
  legalZip: string;
}
export interface AddCompanyLocationsMutationArgs {
  locations: CompanyWorkLocation[];
}
export interface SetupCompanyPayScheduleMutationArgs {
  company_id: string;
  id?: string | null;
  payFrequency: PayFrequencyChoices;
  payDayOfMonth?: number | null;
  secondPayDayOfMonth?: number | null;
  unshiftedAnchorCheckDate: Date;
  holidayShift: PayScheduleShift;
  saturdayShift: PayScheduleShift;
  sundayShift: PayScheduleShift;
}
export interface CreateOrUpdateEmployeesMutationArgs {
  employees: CompanySetupBasicEmployeeInput[];
}
export interface SendEmployeeReminderEmailsMutationArgs {
  employeeIds: number[];
}
export interface SendEmployeeReminderEmailsV2MutationArgs {
  employeeIds: number[];
}
export interface UpdateEmployeesAdditionalInfoMutationArgs {
  employees: CompanySetupAdditionalInfoEmployeeInput[];
}
export interface MarkFlowSectionEnteredMutationArgs {
  sectionId: string;
}
export interface UpdateFlowSectionMutationArgs {
  flowSectionId: string;
  flowSectionUpdate: FlowSectionUpdate;
}
export interface UpdatePtoPlanMutationArgs {
  planType: string;
  timeOffDaysPerYear?: number | null;
  sickLeaveDaysPerYear?: number | null;
}
export interface CreateProductMutationArgs {
  company_id: string;
  caption: string;
  description: string;
  createdOn: string;
  expiresOn: string;
  dealLink: string;
  metadata: string;
  price: number;
  businessGroup: string;
  productStatus: string;
}
export interface AddProductCategoriesMutationArgs {
  data?: (JSON | null)[] | null;
}
export interface AddMetaDataToProductMutationArgs {
  metadata?: JSON | null;
}
export interface AddMatchingCriteriaMutationArgs {
  data?: (JSON | null)[] | null;
}
export interface CreateOrEditDealMutationArgs {
  product_id?: string | null;
  company_id?: string | null;
  caption?: string | null;
  description?: string | null;
  createdOn?: string | null;
  expiresOn?: string | null;
  dealLink?: string | null;
  metadata?: JSON | null;
  price?: number | null;
  billingFrequency?: string | null;
  pricingDetails?: string | null;
  businessGroup?: string | null;
  productStatus?: string | null;
  categories?: (JSON | null)[] | null;
  criterias?: (JSON | null)[] | null;
  images?: (JSON | null)[] | null;
}
export interface EditInterestStatusMutationArgs {
  product_id?: string | null;
  interestLevel?: string | null;
  entity_id?: string | null;
  entity?: string | null;
}
export interface EditProductStatusMutationArgs {
  product_id?: string | null;
  expiresOn?: string | null;
  action?: string | null;
}
export interface UpdateUploadDocInfoMutationArgs {
  company_id?: number | null;
  fileId: number;
  key: string;
  filename: string;
  document_meta_id: string;
}
export interface RequestDocumentsMutationArgs {
  company_id: number;
  admin_id: string[];
  doc_meta_id: (string | null)[];
}
export interface CancelDocumentRequestMutationArgs {
  company_id: number;
}
export interface CompleteDocumentRequestMutationArgs {
  company_id?: number | null;
  admin_id?: (number | null)[] | null;
}
export interface DeleteDocInfoMutationArgs {
  companyId?: number | null;
  docFileGroupIds: (number | null)[];
}
export interface CreateCompanyDocMetaMutationArgs {
  companyId?: number | null;
  section: string;
  name: string;
  description: string;
}
export interface HandleCompanyDocMetaActionMutationArgs {
  companyId: number;
  docMetaId: string;
  action: string;
  name?: string | null;
  description?: string | null;
}
export interface BenefitsFormMapperUpdateOrInsertDataFieldMutationArgs {
  id?: string | null;
  updatedValues?: JSON | null;
}
export interface BenefitsFormMapperStpFormTemplateMutationMutationArgs {
  formTemplateAndMappingData?: StpFormTemplateInput | null;
}
export interface BenefitsFormMapperStpFetchMasterMappingsMutationArgs {
  fieldMappings?: (StpFieldMappingInput | null)[] | null;
}
export interface BenefitsFormMapperStpReloadExistingMappingsMutationArgs {
  fieldNames?: (string | null)[] | null;
  formId?: string | null;
}
export interface FetchDefaultValuesForUniqueBaseFieldsInExpressionListMutationArgs {
  expressionList?: (string | null)[] | null;
}
export interface GenerateTestPdfMutationArgs {
  userInput?: (StpBaseFieldMappingInput | null)[] | null;
  fields?: (StpFieldMappingInput | null)[] | null;
  templateUrl?: string | null;
}
export interface CreateSupportCaseMutationArgs {
  caseData?: JSON | null;
}
export interface CreateOrUpdateGroupTypeMutationArgs {
  name: string;
  description?: string | null;
  memberType: string;
  isSystemType?: boolean | null;
}
export interface CreateGroupMutationArgs {
  groupTypeId: string;
  name: string;
  description?: string | null;
  memberIds?: string[] | null;
  laborCode?: string | null;
  domainData?: JSON | null;
}
export interface UpdateGroupMutationArgs {
  id: string;
  name?: string | null;
  description?: string | null;
  memberIds?: string[] | null;
  laborCode?: string | null;
  domainData?: JSON | null;
}
export interface PartialUpdateGroupMutationArgs {
  id: string;
  name?: string | null;
  description?: string | null;
  memberIds?: string[] | null;
  laborCode?: string | null;
  domainData?: JSON | null;
}
export interface DeleteGroupMutationArgs {
  id: string;
}
export interface AssignGroupsMutationArgs {
  memberId?: string | null;
  groupIds?: string[] | null;
  memberType: string;
}
export interface CreateOrUpdateSchedulingShiftMutationArgs {
  shiftId?: string | null;
  shiftType?: number | null;
  position?: string | null;
  startDateTime: DateTime;
  endDateTime: DateTime;
  isPublished?: boolean | null;
  schedulingEmployeeId?: string | null;
  groups?: (SchedulingShiftGroupInput | null)[] | null;
  status?: string | null;
  seriesData?: SchedulingShiftSeriesInput | null;
}
export interface ClearSchedulingShiftsMutationArgs {
  startDateTime?: DateTime | null;
  endDateTime?: DateTime | null;
}
export interface DeleteSchedulingShiftsMutationArgs {
  shiftId?: number | null;
  seriesId?: number | null;
  shiftDate?: Date | null;
  editType?: number | null;
}
export interface PublishSchedulingShiftsMutationArgs {
  ids?: string[] | null;
  startDateTime?: DateTime | null;
  endDateTime?: DateTime | null;
  seriesData?: SchedulingShiftSeriesInput | null;
}
export interface CopyScheduleMutationArgs {
  fromStartDate: Date;
  fromEndDate: Date;
  toStartDate: Date;
  toEndDate: Date;
}
export interface RevertScheduleToLastPublishedStateMutationArgs {
  startDateTime?: DateTime | null;
  endDateTime?: DateTime | null;
}
export interface GenerateAdherenceReportXlsxMutationArgs {
  startDateTime?: DateTime | null;
  endDateTime?: DateTime | null;
  departments?: (string | null)[] | null;
  locations?: (string | null)[] | null;
}
export interface BulkUpdateZAppInstallSubscriptionsStatusMutationArgs {
  zappInstallSubscriptions: JSON[];
}
export interface SavePlaidAccountMutationArgs {
  public_token?: string | null;
  metadata?: PlaidMetaData | null;
  verificationType?: string | null;
  verifyIdentity?: boolean | null;
}
export interface CreateBankAccountVerificationMutationArgs {
  bankDetails?: BankDetails | null;
}
export interface AddZpCompanyBankAccountMutationArgs {
  verificationId: number;
  accountNumber: string;
  routingNumber: string;
  accountHolderName?: string | null;
}
export interface SetVoidCheckUrlMutationArgs {
  voidCheckUrl: string;
}
export interface SetPayrollSignatoryMutationArgs {
  signatoryId: string;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  title?: string | null;
}
/** Different statuses of employees */
export enum EmployeeStatus {
  Act = 'Act',
  Req = 'Req',
  Set = 'Set',
  Ter = 'Ter',
  Del = 'Del',
  LOA = 'LOA',
  NA = 'NA',
}
/** Different types of employees */
export enum EmployeeType {
  AD = 'AD',
  RE = 'RE',
  HC = 'HC',
  IN = 'IN',
  SH = 'SH',
  TE = 'TE',
}
/** The employee's employment status/type */
export enum EmploymentType {
  FT = 'FT',
  PT = 'PT',
  TP = 'TP',
  CO = 'CO',
}

export enum TerminationType {
  IN = 'IN',
  VR = 'VR',
  VN = 'VN',
  UN = 'UN',
  NS = 'NS',
}

export enum CompType {
  S = 'S',
  H = 'H',
  A = 'A',
  N = 'N',
}

export enum BenefitsSettlementStatus {
  created = 'created',
  send_fail = 'send_fail',
  send_channel_processing = 'send_channel_processing',
  aborted = 'aborted',
  sent = 'sent',
  completed = 'completed',
}

export enum WorkerType {
  AW = 'AW',
  CW = 'CW',
  VE = 'VE',
  IC = 'IC',
  IN = 'IN',
}

export enum CompanyPayScheduleStatus {
  REQUESTED = 'REQUESTED',
  ACTIVE = 'ACTIVE',
  UPDATED = 'UPDATED',
  DEACTIVATED = 'DEACTIVATED',
  DELETED = 'DELETED',
}

export enum PayScheduleCreationMethod {
  PYP = 'PYP',
  SMP = 'SMP',
}

export enum PayFrequencyChoices {
  We = 'We',
  BW = 'BW',
  SM = 'SM',
  Mo = 'Mo',
}

export enum PayScheduleShift {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
  NONE = 'NONE',
}

export enum ArrearDayType {
  C = 'C',
  B = 'B',
}

export enum CompanyPayScheduleCompType {
  H = 'H',
  S = 'S',
  B = 'B',
}

export enum TargetRuleScopeType {
  ALL = 'ALL',
  CREATOR_TEAM = 'CREATOR_TEAM',
  CUSTOM = 'CUSTOM',
  SPECIFIC_EMPLOYEES = 'SPECIFIC_EMPLOYEES',
}

export enum TargetRuleReviewer {
  MANAGER = 'MANAGER',
  PEERS = 'PEERS',
  DIRECT_REPORTS = 'DIRECT_REPORTS',
  SELF = 'SELF',
}

export enum QFQuestionType {
  RATING = 'RATING',
  TEXT = 'TEXT',
  CHECKBOX = 'CHECKBOX',
  NUMERIC = 'NUMERIC',
  PERCENTAGE = 'PERCENTAGE',
  MONEY = 'MONEY',
  SELECT = 'SELECT',
}

export enum QFSessionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
}

export enum TalentFlowScheduleEvent {
  HIRE_DATE = 'HIRE_DATE',
  PREV_RUN = 'PREV_RUN',
  ONE_TIME_RUN = 'ONE_TIME_RUN',
}

export enum TalentTimeUnit {
  DAY = 'DAY',
  MONTH = 'MONTH',
}

export enum ReviewSessionType {
  REVIEW = 'REVIEW',
  SUMMARY = 'SUMMARY',
}

export enum GoalStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
}

export enum GoalTarget {
  INDIVIDUAL = 'INDIVIDUAL',
  COMPANY = 'COMPANY',
  DEPARTMENT = 'DEPARTMENT',
  TEAM = 'TEAM',
}

export enum ReviewRunStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  ENDED = 'ENDED',
  INACTIVE = 'INACTIVE',
}

export enum ReviewStatus {
  DRAFT = 'DRAFT',
  STARTING = 'STARTING',
  RUNNING = 'RUNNING',
  ENDED = 'ENDED',
}

export enum ReviewTemporaryState {
  EXTEND_DUE_DATES = 'EXTEND_DUE_DATES',
  ALLOW_PERIODIC_REVIEW_REOPENING = 'ALLOW_PERIODIC_REVIEW_REOPENING',
}

export enum ReviewTemplateStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum WellbeingAssessmentRunStatus {
  RUNNING = 'RUNNING',
  PENDING_RESULTS = 'PENDING_RESULTS',
  ENDED = 'ENDED',
}

export enum WellbeingAssessmentSessionType {
  SELF = 'SELF',
  THIRD_PARTY = 'THIRD_PARTY',
}

export enum WellbeingAssessmentStatus {
  DRAFT = 'DRAFT',
  STARTING = 'STARTING',
  RUNNING = 'RUNNING',
  ENDED = 'ENDED',
}

export enum WellbeingLifeEventType {
  NewHire = 'NewHire',
  ManagerChange = 'ManagerChange',
  TitleChange = 'TitleChange',
  DepartmentChange = 'DepartmentChange',
  AddressChange = 'AddressChange',
  WorkLocationChange = 'WorkLocationChange',
}

export enum OverallOnboardingState {
  INDETERMINATE = 'INDETERMINATE',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
}

export enum PayrollOnboardingState {
  SETUP = 'SETUP',
  PENDING = 'PENDING',
  COMPLETE = 'COMPLETE',
  INACTIVE = 'INACTIVE',
  CANCELLED = 'CANCELLED',
}

export enum BenefitsOnboardingState {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
  CANCELLED = 'CANCELLED',
}

export enum ZScoreCompanyStatus {
  new = 'new',
  active = 'active',
  inactive = 'inactive',
  former = 'former',
}

export enum ZScorePayrollQualificationLevel {
  two_day = 'two_day',
  four_day = 'four_day',
}

export enum ZScoreBlockScoreOfacResult {
  hit = 'hit',
  no_hit = 'no_hit',
  not_found = 'not_found',
  overridden = 'overridden',
}

export enum ZScoreRiskLevel {
  low_risk = 'low_risk',
  medium_risk = 'medium_risk',
  high_risk = 'high_risk',
  very_high_risk = 'very_high_risk',
}
/** List of all ZScore Category Names */
export enum ZScoreCategoryName {
  duns_and_brad_ccs = 'duns_and_brad_ccs',
  duns_and_brad_fss = 'duns_and_brad_fss',
  employee_count = 'employee_count',
  zpay_time_spent = 'zpay_time_spent',
  zpay_nsf_failures = 'zpay_nsf_failures',
  billing_failures = 'billing_failures',
  blockscore_ofac = 'blockscore_ofac',
  two_day_payroll = 'two_day_payroll',
}

export enum ZScoreUpdateFrequencyUnit {
  days = 'days',
  weeks = 'weeks',
  months = 'months',
  years = 'years',
}

export enum EmployeeSetPhysicianDentistActions {
  employeeSetPhysician = 'employeeSetPhysician',
  dependentSetPhysician = 'dependentSetPhysician',
  employeeSetDentist = 'employeeSetDentist',
  dependentSetDentist = 'dependentSetDentist',
}

export enum EmployeeSetBeneficiaryAction {
  employeeBulkSetBeneficiaries = 'employeeBulkSetBeneficiaries',
  employeeSetSingleBeneficiary = 'employeeSetSingleBeneficiary',
}

export type BenefitsPlan =
  | Plan
  | DentalPlan
  | VisionPlan
  | LifePlanNew
  | AddPlan
  | StdPlanNew
  | LtdPlanNew
  | SupplementalPlan;

/** TODO: remove all types and just expose the genericQFQuestionResponse asQFQuestionResponse and stop injecting questionType on the response. */
export type QFQuestionResponse = QFRatingResponse | QFTextResponse | QFCheckboxResponse | GenericQFQuestionResponse;
