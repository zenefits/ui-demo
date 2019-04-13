/* tslint:disable */

/** Dummy DateTime, represented as a string */
export type DateTime = any;

/** Dummy Date, represented as a string */
export type Date = any;

/** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
export type JSON = any;

/** Dummy Time, represented as a string */
export type Time = any;

/** Dummy Currency, represented as a decimal */
export type Currency = any;

export type Decimal = any;

export interface SendToFilter {
  filterName?: string | null;
  filterValues?: (string | null)[] | null;
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
  country?: string | null;
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

export interface MedicalSbcPlanDesignRequest {
  deductibleIndividualPreferredNetwork?: number | null;
  deductibleIndividual?: number | null;
  deductibleIndividualOutOfNetwork?: number | null;
  oopMaxIndividualPreferredNetwork?: number | null;
  deductibleFamily?: number | null;
  deductibleFamilyOutOfNetwork?: number | null;
  oopMaxIndividual?: number | null;
  oopMaxIndividualOutOfNetwork?: number | null;
  oopMaxFamilyPreferredNetwork?: number | null;
  oopMaxFamily?: number | null;
  oopMaxFamilyOutOfNetwork?: number | null;
  pharmacyDeductiblePreferredNetwork?: number | null;
  pharmacyDeductible?: number | null;
  pharmacyDeductibleOutOfNetwork?: number | null;
  deductibleReset?: string | null;
  oopMaxIncludeDeductible?: boolean | null;
  hasNetworkProviders?: boolean | null;
  network_id?: string | null;
}

export interface DentalSbcPlanDesignRequest {
  deductibleIndividual?: number | null;
  deductibleIndividualOutOfNetwork?: number | null;
  deductibleFamily?: number | null;
  deductibleFamilyOutOfNetwork?: number | null;
  maxBenefits?: number | null;
  hasNetworkProviders?: boolean | null;
  network_id?: string | null;
}

export interface VisionSbcPlanDesignRequest {
  coPay?: string | null;
  examFrequency?: number | null;
  lensFrequency?: number | null;
  lensAllowable?: string | null;
  lensAllowableCondition?: number | null;
  lensAllowableSecondary?: string | null;
  frameFrequency?: number | null;
  frameAllowable?: string | null;
  frameAllowableCondition?: number | null;
  frameAllowableSecondary?: string | null;
  contactsFrequency?: number | null;
  contactsAllowable?: string | null;
  contactsAllowableCondition?: number | null;
  lasikCoverage?: boolean | null;
  retailDiscountAvailable?: boolean | null;
  hasNetworkProviders?: boolean | null;
  network_id?: string | null;
}

export interface RemoveEnrolleeEntry {
  enrolleeId: string;
  enrolleeType: string;
}

export interface TalentFlowScheduleInput {
  event: TalentFlowScheduleEvent;
  timeAfterEvent: number;
  timeUnit: TalentTimeUnit;
}

export interface WellbeingAnalyticsEventDataInput {
  contentType: WellbeingAnalyticsContentType;
  metadata: JSON;
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

export interface SubmitEnrollmentWaiverInput {
  benefitsType: string;
  effectiveDate: string;
  employee?: WaiverContextInput | null;
  dependents?: (WaiverContextInput | null)[] | null;
}

export interface WaiverContextInput {
  id?: string | null /** only applicable for dependents */;
  otherCarrier?: string | null;
  reasonForDecliningCoverage?: string | null;
  waiveReasonName?: string | null;
  otherIdNumber?: string | null;
  idCardUrl?: string | null;
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
  hireDate?: Date | null;
  employmentType?: EmploymentType | null;
  compType?: CompType | null;
  payRate?: number | null;
  annualSalary?: number | null;
}

export interface FlowSectionUpdate {
  isEntered?: boolean | null;
  isComplete?: boolean | null;
}

export interface OpenEnrollmentPeriodInput {
  startDate: Date;
  endDate: Date;
}

export interface GroupApplicationSignatureInput {
  dataUrl: string;
  date: Date;
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

export interface UpdateAccountInfo {
  payType?: string | null;
  categoryName?: string | null;
  accountingAccount?: GetAccountInfo | null;
  includedFields?: (MappingColumn | null)[] | null;
}

export interface GetAccountInfo {
  id?: number | null;
  accountNumber?: string | null;
  subAccountNumber?: string | null;
  accountType?: string | null;
}

export interface MappingColumn {
  columnName?: string | null;
  columnCode?: string | null;
}

export interface FolderPermission {
  worker?: string | null;
  workerId?: string | null;
  permissions?: (FolderPermissionType | null)[] | null;
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

export enum AdHocUnit {
  RIDE = 'RIDE',
  FIXED = 'FIXED',
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

export enum TargetRuleManagerRole {
  SHARED_FEEDBACK = 'SHARED_FEEDBACK',
  PRIVATE_FEEDBACK = 'PRIVATE_FEEDBACK',
  PRIVATE_AND_SHARED_FEEDBACK = 'PRIVATE_AND_SHARED_FEEDBACK',
  NO_FEEDBACK = 'NO_FEEDBACK',
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

export enum MeetingsUserPreferenceGroupType {
  EMAIL = 'EMAIL',
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

export enum FolderPermissionType {
  CAN_VIEW = 'CAN_VIEW',
  CAN_EDIT = 'CAN_EDIT',
}

export enum OmniSearchSource {
  employees = 'employees',
  actions = 'actions',
  help = 'help',
}

export enum WellbeingAnalyticsEventType {
  UserContentInteraction = 'UserContentInteraction',
}

export enum WellbeingAnalyticsContentType {
  Article = 'Article',
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
