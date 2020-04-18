import { EmploymentType } from '../../schema/schemaTypes';
import { AndFilterGroup, ExcludingFilterGroup, FilterInputType, FilterValueType, OverrulingFilterGroup } from './types';

export const compTypeToDisplay = {
  S: 'Salaried',
  H: 'Hourly',
  A: 'Fixed Amount',
  N: 'Not Applicable',
};

export const employmentTypeToDisplay = {
  // Regular Employmet Types
  FT: 'Full-time',
  PT: 'Part-time',
  TP: 'Intern',

  // Contingent Worker Types
  AW: 'Agency-paid Temp',
  CW: 'Company-paid Temp',
  IC: 'Independent Contractor',
  VE: 'Vendor Employee',
  IN: 'Volunteer',
};

export const EMPLOYEE_FILTER_INPUT_TYPES = {
  MULTI_SELECT: 'multi-select' as FilterInputType,
  SIMPLE_SELECT: 'simple-select' as FilterInputType,
};

export const FILTER_OPTION_VALUE_TYPE = {
  STRING_ARRAY: 'string-array' as FilterValueType,
  NUMBER: 'number' as FilterValueType,
};

export const OVERRULING_FILTERS: OverrulingFilterGroup = {
  EMPLOYEE_IDS: {
    name: 'employeeIds',
    inputType: EMPLOYEE_FILTER_INPUT_TYPES.MULTI_SELECT,
    filterValueType: FILTER_OPTION_VALUE_TYPE.STRING_ARRAY,
  },
};

export const AND_FILTERS: AndFilterGroup = {
  DEPARTMENTS: {
    name: 'departments',
    inputType: EMPLOYEE_FILTER_INPUT_TYPES.MULTI_SELECT,
    filterValueType: FILTER_OPTION_VALUE_TYPE.STRING_ARRAY,
  },
  LOCATIONS: {
    name: 'locations',
    inputType: EMPLOYEE_FILTER_INPUT_TYPES.MULTI_SELECT,
    filterValueType: FILTER_OPTION_VALUE_TYPE.STRING_ARRAY,
  },
  TITLES: {
    name: 'titles',
    inputType: EMPLOYEE_FILTER_INPUT_TYPES.MULTI_SELECT,
    filterValueType: FILTER_OPTION_VALUE_TYPE.STRING_ARRAY,
  },
  COMPENSATION_TYPES: {
    name: 'compTypes',
    inputType: EMPLOYEE_FILTER_INPUT_TYPES.MULTI_SELECT,
    filterValueType: FILTER_OPTION_VALUE_TYPE.STRING_ARRAY,
  },
  EMPLOYMENT_TYPES: {
    name: 'employmentTypes',
    inputType: EMPLOYEE_FILTER_INPUT_TYPES.MULTI_SELECT,
    filterValueType: FILTER_OPTION_VALUE_TYPE.STRING_ARRAY,
  },
};

export const EXCLUDING_FILTERS: ExcludingFilterGroup = {
  EMPLOYEE_IDS: {
    name: 'employeeIds',
    inputType: EMPLOYEE_FILTER_INPUT_TYPES.MULTI_SELECT,
    filterValueType: FILTER_OPTION_VALUE_TYPE.STRING_ARRAY,
  },
  DAYS_FROM_HIRE_DATE: {
    name: 'daysFromHireDate',
    inputType: EMPLOYEE_FILTER_INPUT_TYPES.SIMPLE_SELECT,
    filterValueType: FILTER_OPTION_VALUE_TYPE.NUMBER,
  },
};

export const GROUPED_FILTER_KEYS: { [key: string]: 'overruling' | 'and' | 'excluding' } = {
  OVERRULING: 'overruling',
  AND: 'and',
  EXCLUDING: 'excluding',
};

export const GROUPED_FILTERS_KEY_NAMES: {
  [key: string]: AndFilterGroup | OverrulingFilterGroup | ExcludingFilterGroup;
} = {
  [GROUPED_FILTER_KEYS.OVERRULING]: OVERRULING_FILTERS,
  [GROUPED_FILTER_KEYS.AND]: AND_FILTERS,
  [GROUPED_FILTER_KEYS.EXCLUDING]: EXCLUDING_FILTERS,
};

export const REGULAR_EMPLOYMENT_TYPES: string[] = [EmploymentType.FT, EmploymentType.PT, EmploymentType.TP];
