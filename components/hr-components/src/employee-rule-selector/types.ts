import { EmployeeType } from '../employee-profile-block/EmployeeProfileBlock';

export type FilterValueType = 'string-array' | 'number';

export type AndFilterGroup = {
  [key: string]: {
    name: AndFilterKey;
    inputType: FilterInputType;
    filterValueType: FilterValueType;
  };
};

export type OverrulingFilterGroup = {
  [key: string]: {
    name: OverrulingFilterKey;
    inputType: FilterInputType;
    filterValueType: FilterValueType;
  };
};

export type ExcludingFilterGroup = {
  [key: string]: {
    name: ExcludingFilterKey;
    inputType: FilterInputType;
    filterValueType: FilterValueType;
  };
};

export type AndFilterKey = 'departments' | 'locations' | 'titles' | 'compTypes' | 'employmentTypes';
export type OverrulingFilterKey = 'employeeIds';
export type ExcludingFilterKey = 'employeeIds' | 'daysFromHireDate';

export interface StringFilteringOption {
  options: StringLabelValue[];
  disabled?: boolean;
  helpText?: string;
}

export interface NumberFilteringOption {
  options: NumberLabelValue[];
  disabled?: boolean;
  helpText?: string;
}

export interface StringLabelValue {
  label: string;
  value: string;
}

export interface NumberLabelValue {
  label: string;
  value: number;
}

export interface AndFilteringOptions {
  departments?: StringFilteringOption;
  locations?: StringFilteringOption;
  titles?: StringFilteringOption;
  compTypes?: StringFilteringOption;
  employmentTypes?: StringFilteringOption;
}

export interface OverrulingFilteringOptions {
  employeeIds?: StringFilteringOption;
}

export interface ExcludingFilteringOptions {
  employeeIds?: StringFilteringOption;
  daysFromHireDate?: NumberFilteringOption;
}

export interface AllFilteringOptions {
  overruling: OverrulingFilteringOptions;
  and: AndFilteringOptions;
  excluding: ExcludingFilteringOptions;
}

export type FilterInputType = 'multi-select' | 'simple-select';

export interface SimpleFormValues {
  overruling: {
    employeeIds?: string[];
  };
  and: {
    departments?: string[];
    locations?: string[];
    titles?: string[];
    compTypes?: string[];
    employmentTypes?: string[];
  };
  excluding: {
    employeeIds?: string[];
    daysFromHireDate?: number;
  };
}

export interface EmployeesSelectorAndFormData {
  departments?: StringLabelValue[];
  locations?: StringLabelValue[];
  titles?: StringLabelValue[];
  compTypes?: StringLabelValue[];
  employmentTypes?: StringLabelValue[];
}
export interface EmployeesSelectorFormData {
  overruling: {
    employeeIds?: StringLabelValue[];
  };
  and: EmployeesSelectorAndFormData;
  excluding: {
    employeeIds?: StringLabelValue[];
    daysFromHireDate?: NumberLabelValue;
  };
}

export type TargetedEmployee = {
  id: string;
};

export type TargetableEmployee = {
  id: string;
  preferredOrFirstName: string;
  last_name: string;
} & EmployeeType;
