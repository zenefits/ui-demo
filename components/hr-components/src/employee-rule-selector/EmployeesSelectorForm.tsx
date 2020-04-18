import React, { Component } from 'react';
import { cloneDeep, isEqual } from 'lodash';

import { Flex } from 'zbase';
import { Button } from 'z-frontend-elements';
import { Form } from 'z-frontend-forms';
import { Card } from 'z-frontend-composites';
import { QueryProps } from 'z-frontend-network';

import {
  AllFilteringOptions,
  EmployeesSelectorAndFormData,
  EmployeesSelectorFormData,
  NumberLabelValue,
  SimpleFormValues,
  StringLabelValue,
  TargetableEmployee,
  TargetedEmployee,
} from './types';
import {
  AND_FILTERS,
  EMPLOYEE_FILTER_INPUT_TYPES,
  FILTER_OPTION_VALUE_TYPE,
  GROUPED_FILTER_KEYS,
  GROUPED_FILTERS_KEY_NAMES,
  OVERRULING_FILTERS,
  REGULAR_EMPLOYMENT_TYPES,
} from './constants';
import EmployeeRuleSelector from './EmployeeRuleSelector';
import { EmploymentType, QFTargetRuleScope, TargetRuleScopeType, WorkerType } from '../../schema/schemaTypes';

type Props<Data, Variables> = {
  employeeInfo: {
    id: string;
    locationId?: string;
    departmentId?: string;
    canTargetEveryone: boolean;
    isOnlyLocationAdmin: boolean;
    isOnlyDepartmentAdmin: boolean;
    isManager: boolean;
  };
  onSubmit: (targetScope: QFTargetRuleScope) => Promise<void>;
  targetScope: QFTargetRuleScope;
  allFilteringOptions: AllFilteringOptions;
  targetableEmployees: TargetableEmployee[];
  getTargetedEmployeesFromData: (data: Data) => TargetedEmployee[];
  queryVariables: Omit<Variables, 'targetScope'>;
  query: QueryProps<Data, Variables>['query'];
  backLink: string;
  customFooterRender?: (targetScope: QFTargetRuleScope) => JSX.Element;
  creatorExcluded?: boolean;
};

export default class EmployeesSelectorForm<Data, Variables> extends Component<Props<Data, Variables>> {
  getFormInitialValues = (): EmployeesSelectorFormData => {
    const {
      creatorExcluded,
      targetScope,
      employeeInfo: { id: employeeId },
      allFilteringOptions,
    } = this.props;
    const initialValues: EmployeesSelectorFormData = {
      and: {},
      excluding: {},
      overruling: {},
    };

    // Populating the 'and' group values
    // For backwards compatibility: If 'and' key exists, we're getting the filters from that otherwise
    // they would be on the root level.
    const andFiltersValueHolder = targetScope?.and || targetScope;
    initialValues.and = Object.values(AND_FILTERS).reduce((response, filter) => {
      response[filter.name] =
        (andFiltersValueHolder &&
          andFiltersValueHolder[filter.name] &&
          allFilteringOptions.and &&
          allFilteringOptions.and[filter.name].options.filter(option =>
            (andFiltersValueHolder[filter.name] as string[]).includes(option.value),
          )) ||
        [];
      return response;
    }, {} as EmployeesSelectorAndFormData);

    // Include workerTypes on target scope to employmentTypes
    if (andFiltersValueHolder && andFiltersValueHolder.workerTypes) {
      const workerTypesOptions = allFilteringOptions.and?.employmentTypes?.options?.filter(option =>
        (andFiltersValueHolder.workerTypes as string[]).includes(option.value),
      );

      initialValues.and.employmentTypes = initialValues.and.employmentTypes?.concat(workerTypesOptions);
    }

    // Populating the 'overruling' group values
    let selectedIndividualIds: string[] = [];
    if (targetScope) {
      // This is for backwards compatibility
      if (targetScope.type === TargetRuleScopeType.SPECIFIC_EMPLOYEES) {
        selectedIndividualIds = targetScope.specificEmployees;
      }

      // This is for backwards compatibility
      const { additionalEmployees } = targetScope;
      if (additionalEmployees) {
        selectedIndividualIds = additionalEmployees;
      }

      const overrulingEmployeeIds = targetScope.overruling?.employeeIds;
      if (overrulingEmployeeIds) {
        selectedIndividualIds = overrulingEmployeeIds;
      }
    }

    initialValues.overruling.employeeIds = allFilteringOptions.overruling?.employeeIds?.options?.filter(
      employeeOption => selectedIndividualIds.includes(employeeOption.value),
    );

    // Populating the 'excluding' group values
    const excludedEmployeeIds = targetScope?.excluding?.employeeIds || [];

    // Creator should be in the excluded individuals by default
    if (!targetScope && creatorExcluded) {
      excludedEmployeeIds.push(employeeId);
    }

    initialValues.excluding.employeeIds = allFilteringOptions.excluding?.employeeIds?.options?.filter(employeeOption =>
      excludedEmployeeIds.includes(employeeOption.value),
    );

    const excludedDaysFromHireDate = targetScope?.excluding?.daysFromHireDate;
    if (excludedDaysFromHireDate && !allFilteringOptions.excluding?.daysFromHireDate?.disabled) {
      initialValues.excluding.daysFromHireDate = allFilteringOptions.excluding?.daysFromHireDate?.options?.find(
        option => option.value === excludedDaysFromHireDate,
      );
    }

    return initialValues;
  };

  /**
   * Prepares the TargetScope for the queries and mutations to the server
   */
  getNormalizedTargetScope = (formValues: EmployeesSelectorFormData): QFTargetRuleScope => {
    const {
      employeeInfo: {
        canTargetEveryone,
        id: employeeId,
        departmentId,
        locationId,
        isOnlyDepartmentAdmin,
        isOnlyLocationAdmin,
        isManager,
      },
    } = this.props;
    const selectedFiltersSimpleValues = this.getSelectedFiltersSimpleValues(formValues);

    const normalizedData = cloneDeep(selectedFiltersSimpleValues) as QFTargetRuleScope;
    // Setting "or" filters to empty values
    normalizedData['or'] = {
      locationIds: [],
      departmentIds: [],
      teamIds: [],
    };

    const nonEmptyFilterKeys = this.getNonEmptyFilterKeys(selectedFiltersSimpleValues);

    const filterKeysExceptExcluding = Object.values(GROUPED_FILTER_KEYS).filter(
      key => key !== GROUPED_FILTER_KEYS.EXCLUDING,
    );
    const isOnlyExcludingFiltersSelected =
      filterKeysExceptExcluding.every(key => !nonEmptyFilterKeys[key].length) &&
      !!nonEmptyFilterKeys[GROUPED_FILTER_KEYS.EXCLUDING].length;

    // If no filter is selected, we populate the scope with creator-related values
    if (
      (!this.isAnyFilterSelected(selectedFiltersSimpleValues) || isOnlyExcludingFiltersSelected) &&
      canTargetEveryone
    ) {
      normalizedData['type'] = TargetRuleScopeType.ALL;
      return normalizedData;
    }

    normalizedData['type'] = TargetRuleScopeType.CUSTOM;

    // If only individuals were added to the list, we don't need to add any creator-related values
    if (
      !nonEmptyFilterKeys.and.length &&
      !nonEmptyFilterKeys.excluding.length &&
      isEqual(nonEmptyFilterKeys.overruling, [OVERRULING_FILTERS.EMPLOYEE_IDS.name])
    ) {
      return normalizedData;
    }

    // Split workerTypes from employmentTypes
    const selectedEmploymentTypes = selectedFiltersSimpleValues.and.employmentTypes;

    // Pass employment and worker types only if the filters were selected
    if (selectedEmploymentTypes?.length) {
      normalizedData.and.employmentTypes = (selectedEmploymentTypes as EmploymentType[]).filter(selectedValue =>
        REGULAR_EMPLOYMENT_TYPES.includes(selectedValue),
      );

      normalizedData.and.workerTypes = (selectedEmploymentTypes as WorkerType[]).filter(
        selectedValue => !REGULAR_EMPLOYMENT_TYPES.includes(selectedValue),
      );
    } else {
      delete normalizedData.and.employmentTypes;
    }

    if (!canTargetEveryone) {
      if (isOnlyLocationAdmin && locationId) {
        normalizedData['or']['locationIds'] = [locationId];
      }
      if (isOnlyDepartmentAdmin && departmentId) {
        normalizedData['or']['departmentIds'] = [departmentId];
      }
      if (isManager) {
        normalizedData['or']['teamIds'] = [employeeId];
      }
    }

    return normalizedData;
  };

  /**
   * Filters out the individuals from overruling or excluded options if selected in excluded or overruling respectively
   */
  filterOutAlreadySelectedIndividuals = (formValues: EmployeesSelectorFormData) => {
    const { allFilteringOptions } = this.props;
    const filteringOptions = cloneDeep(allFilteringOptions);
    const overrulingEmployeeIds = (formValues.overruling?.employeeIds || []).map(option => option.value);
    const excludedEmployeeIds = (formValues.excluding?.employeeIds || []).map(option => option.value);

    filteringOptions.overruling.employeeIds.options = allFilteringOptions.overruling?.employeeIds?.options?.filter(
      option => !excludedEmployeeIds.includes(option.value as string),
    );
    filteringOptions.excluding.employeeIds.options = allFilteringOptions.excluding?.employeeIds?.options?.filter(
      option => !overrulingEmployeeIds.includes(option.value as string),
    );

    return filteringOptions;
  };

  /**
   * For each group returns the selected values as a list.
   * e.g.,
   * {
   *    overruling: {
   *      employeeIds: ["5", "7"]
   *    }
   *    and: {
   *      departments: ["4", "6"],
   *      locations: ["2", "5"],
   *       ...
   *    }
   *    excluding: {
   *      employeeIds: ["2", "3"],
   *      daysFromHireDate: 60
   *    }
   * }
   */

  getSelectedFiltersSimpleValues = (formValues: EmployeesSelectorFormData): SimpleFormValues =>
    Object.values(GROUPED_FILTER_KEYS).reduce((response, groupFilterKey) => {
      const groupedFilterValues = formValues[groupFilterKey] as any;
      response[groupFilterKey] = Object.values(GROUPED_FILTERS_KEY_NAMES[groupFilterKey]).reduce((response, filter) => {
        if (filter.filterValueType === FILTER_OPTION_VALUE_TYPE.STRING_ARRAY) {
          const selectedValues = (groupedFilterValues && groupedFilterValues[filter.name]) as StringLabelValue[];
          response[filter.name] = ((formValues[groupFilterKey] && selectedValues) || []).map(
            formOption => formOption.value,
          );
        }

        if (
          filter.filterValueType === FILTER_OPTION_VALUE_TYPE.NUMBER &&
          filter.inputType === EMPLOYEE_FILTER_INPUT_TYPES.SIMPLE_SELECT
        ) {
          const selectedValue = (groupedFilterValues && groupedFilterValues[filter.name]) as NumberLabelValue;
          if (selectedValue) {
            response[filter.name] = +selectedValue.value;
          }
        }
        return response;
      }, {} as SimpleFormValues);
      return response;
    }, {} as SimpleFormValues);

  /**
   * For each of the 'overruling', 'and' and 'excluding' group, returns the key of the non-empty filters
   * e.g.,
   * {
   *    overruling: ["employeeIds"],
   *    and: ["departments", "locations"]
   *    excluding: ["employeeIds"],
   * }
   */
  getNonEmptyFilterKeys = (
    selectedFiltersSimpleValues: SimpleFormValues,
  ): {
    overruling: string[];
    and: string[];
    excluding: string[];
  } => {
    return Object.values(GROUPED_FILTER_KEYS).reduce(
      (response, groupFilterKey) => {
        const groupedFilterValues = selectedFiltersSimpleValues[groupFilterKey] as any;
        response[groupFilterKey] = Object.keys(groupedFilterValues).filter(
          filter => groupedFilterValues[filter] && !!groupedFilterValues[filter].length,
        );
        return response;
      },
      {
        overruling: [],
        and: [],
        excluding: [],
      },
    );
  };

  /**
   * Looks at all of the selected values for 'overruling', 'and' and 'excluding' groups and returns whether any of them has any value
   */
  isAnyFilterSelected = (selectedFiltersSimpleValues: SimpleFormValues): boolean =>
    Object.values(this.getNonEmptyFilterKeys(selectedFiltersSimpleValues)).some(
      selectedValues => !!selectedValues.length,
    );
  onSubmit = (formData: EmployeesSelectorFormData) => {
    const targetScope = this.getNormalizedTargetScope(formData);
    return this.props.onSubmit(targetScope);
  };

  render() {
    const {
      targetableEmployees,
      getTargetedEmployeesFromData,
      queryVariables,
      query,
      backLink,
      customFooterRender,
    } = this.props;
    const initialValues = this.getFormInitialValues();

    return (
      <Form<EmployeesSelectorFormData> onSubmit={this.onSubmit} initialValues={initialValues}>
        {formProps => {
          const { isSubmitting, values, resetForm } = formProps;
          const filteringOptions = this.filterOutAlreadySelectedIndividuals(values);
          const targetScope = this.getNormalizedTargetScope(values);
          const customFooter = customFooterRender && customFooterRender(targetScope);
          return (
            <>
              {/* Table */}
              <Card.Row p={0} borderTop>
                <EmployeeRuleSelector
                  filteringOptions={filteringOptions}
                  initialFilterValues={initialValues}
                  targetableEmployees={targetableEmployees}
                  getTargetedEmployeesFromData={getTargetedEmployeesFromData}
                  query={query}
                  queryVariables={{
                    targetScope,
                    ...queryVariables,
                  }}
                  resetForm={() =>
                    // HACK HACK: if we don't explicitly set the value for SimpleSelect, label does not clear
                    // We should refactor this to a function that would clear the value of all of the inputs
                    resetForm({
                      values: {
                        excluding: {
                          daysFromHireDate: null,
                        },
                      } as EmployeesSelectorFormData,
                    })
                  }
                />
              </Card.Row>
              {customFooter || (
                <Card.Footer>
                  <Flex wrap direction="column-reverse">
                    <Flex justify="flex-end">
                      <Button.RouteLink mr={2} to={backLink}>
                        Back
                      </Button.RouteLink>
                      <Button type="submit" mode="primary" inProgress={isSubmitting}>
                        Next
                      </Button>
                    </Flex>
                  </Flex>
                </Card.Footer>
              )}
            </>
          );
        }}
      </Form>
    );
  }
}
