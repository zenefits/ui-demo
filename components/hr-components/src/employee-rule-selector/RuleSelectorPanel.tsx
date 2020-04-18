import React, { Component } from 'react';

import { Box, Flex, Icon, TextBlock, TextInline } from 'zbase';
import { Link } from 'z-frontend-elements';
import { FormFieldFormat, FormMultiSelect, FormSimpleSelect } from 'z-frontend-forms';

import {
  AllFilteringOptions,
  EmployeesSelectorAndFormData,
  EmployeesSelectorFormData,
  FilterInputType,
  NumberLabelValue,
  StringLabelValue,
} from './types';

const EMPLOYEE_FILTER_INPUT_TYPES = {
  MULTI_SELECT: 'multi-select' as FilterInputType,
  SIMPLE_SELECT: 'simple-select' as FilterInputType,
};

type OptionType = StringLabelValue | NumberLabelValue;

interface Filter {
  inputType: FilterInputType;
  label: string;
  name: string;
  options: OptionType[];
  placeholder?: string;
  disabled?: boolean;
  helpText?: string;
}

interface State {
  isMoreFiltersHidden: boolean;
}

interface Props {
  filteringOptions: AllFilteringOptions;
  initialValues: EmployeesSelectorFormData;
  resetForm: () => void;
}

// Filters that are hidden and shown using the More/Less Filters link
const EXTRA_FILTERS: { [key in keyof EmployeesSelectorFormData]?: string[] } = {
  and: ['locations', 'titles', 'compTypes'],
};

export default class RuleSelectorPanel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isMoreFiltersHidden: !this.shouldShowExtraFiltersByDefault(),
    };
  }

  /**
   * Returns true if the extra filters have values initially, otherwise returns false.
   */
  shouldShowExtraFiltersByDefault = (): boolean =>
    EXTRA_FILTERS.and.some(
      (filterName: keyof EmployeesSelectorAndFormData) => !!this.props.initialValues.and[filterName].length,
    );

  // Removing the options that don't have value or label: This could happen because of some HR issues
  filterInvalidOptions = (options?: OptionType[]) => options?.filter(option => !!option.value && !!option.label);

  listOverrulingFilters = (): Filter[] => {
    const overrulingFilters = this.props.filteringOptions.overruling;
    if (!overrulingFilters) {
      return [];
    }
    const { employeeIds } = overrulingFilters;
    return [
      {
        inputType: EMPLOYEE_FILTER_INPUT_TYPES.MULTI_SELECT,
        label: 'Individuals',
        name: 'overruling.employeeIds',
        options: this.filterInvalidOptions(employeeIds?.options),
        placeholder: 'Select Individuals',
        disabled: employeeIds?.disabled,
        helpText: employeeIds?.helpText,
      },
    ].filter(f => !!f.options?.length);
  };

  listAllIncludedFilters = (): Filter[] => {
    const andFilters = this.props.filteringOptions.and;
    if (!andFilters) {
      return [];
    }

    const { departments, locations, titles, compTypes, employmentTypes } = andFilters;
    const extraFilterNames = Object.keys(EXTRA_FILTERS).reduce(
      (acc: string[], filterGroupName: keyof EmployeesSelectorFormData) => {
        const groupFilters = EXTRA_FILTERS[filterGroupName].map(
          (filterName: string) => `${filterGroupName}.${filterName}`,
        );
        return acc.concat(groupFilters);
      },
      [],
    );

    return [
      {
        inputType: EMPLOYEE_FILTER_INPUT_TYPES.MULTI_SELECT,
        label: 'Departments',
        name: 'and.departments',
        options: this.filterInvalidOptions(departments?.options),
        placeholder: 'Select Departments',
        disabled: departments?.disabled,
      },
      {
        inputType: EMPLOYEE_FILTER_INPUT_TYPES.MULTI_SELECT,
        label: 'Employment Type',
        name: 'and.employmentTypes',
        options: this.filterInvalidOptions(employmentTypes?.options),
        placeholder: 'Select Types',
        disabled: employmentTypes?.disabled,
      },
      {
        inputType: EMPLOYEE_FILTER_INPUT_TYPES.MULTI_SELECT,
        label: 'Locations',
        name: 'and.locations',
        options: this.filterInvalidOptions(locations?.options),
        placeholder: 'Select Locations',
        disabled: locations?.disabled,
      },
      {
        inputType: EMPLOYEE_FILTER_INPUT_TYPES.MULTI_SELECT,
        label: 'Job Titles',
        name: 'and.titles',
        options: this.filterInvalidOptions(titles?.options),
        placeholder: 'Select Job Titles',
        disabled: titles?.disabled,
      },
      {
        inputType: EMPLOYEE_FILTER_INPUT_TYPES.MULTI_SELECT,
        label: 'Earnings Type',
        name: 'and.compTypes',
        options: this.filterInvalidOptions(compTypes?.options),
        placeholder: 'Select Types',
        disabled: compTypes?.disabled,
      },
    ].filter(f => !!f.options?.length && (!this.state.isMoreFiltersHidden || !extraFilterNames.includes(f.name)));
  };

  listExcludingFilters = (): Filter[] => {
    const excludingFilters = this.props.filteringOptions.excluding;
    if (!excludingFilters) {
      return [];
    }

    const { employeeIds, daysFromHireDate } = excludingFilters;
    return [
      {
        inputType: EMPLOYEE_FILTER_INPUT_TYPES.MULTI_SELECT,
        label: 'Exclude Individuals',
        name: 'excluding.employeeIds',
        options: this.filterInvalidOptions(employeeIds?.options),
        placeholder: 'Select Individuals',
        disabled: employeeIds?.disabled,
        helpText: employeeIds?.helpText,
      },
      {
        inputType: EMPLOYEE_FILTER_INPUT_TYPES.SIMPLE_SELECT,
        label: 'Exclude New Hires',
        name: 'excluding.daysFromHireDate',
        options: this.filterInvalidOptions(daysFromHireDate?.options),
        disabled: daysFromHireDate?.disabled,
        helpText: daysFromHireDate?.helpText,
      },
    ].filter(f => !!f.options?.length);
  };

  toggleMoreFiltersState = (): void =>
    this.setState(prevState => ({ isMoreFiltersHidden: !prevState.isMoreFiltersHidden }));

  getFilterComponentByType = (
    filterIntupType: FilterInputType,
  ): typeof MultiSelectFilter | typeof SimpleSelectFilter => {
    return {
      [EMPLOYEE_FILTER_INPUT_TYPES.MULTI_SELECT]: MultiSelectFilter,
      [EMPLOYEE_FILTER_INPUT_TYPES.SIMPLE_SELECT]: SimpleSelectFilter,
    }[filterIntupType];
  };

  render() {
    const overrulingFilters = this.listOverrulingFilters();
    const andFilters = this.listAllIncludedFilters();
    const excludingFilters = this.listExcludingFilters();

    return (
      <Box px={4} py={3}>
        <Flex justify="space-between" mb={3}>
          <TextBlock fontStyle="headings.s" color="text.dark">
            Rule Settings
          </TextBlock>
          <Link onClick={e => this.props.resetForm()} fontStyle="paragraphs.m">
            <TextInline>Reset</TextInline>
          </Link>
        </Flex>

        {/* Individuals */}
        {!!overrulingFilters.length && (
          <>
            {overrulingFilters.map(filter => {
              const FilterComponent = this.getFilterComponentByType(filter.inputType);
              return <FilterComponent filter={filter} key={filter.name} />;
            })}
            {/* Divider */}
            <Box borderBottom my={4} mx={-4} />
          </>
        )}

        {/* Include */}
        {!!andFilters.length && (
          <>
            <TextBlock fontStyle="headings.xs" color="text.light" mb={2}>
              INCLUDE
            </TextBlock>
            {andFilters.map(filter => {
              const FilterComponent = this.getFilterComponentByType(filter.inputType);
              return <FilterComponent filter={filter} key={filter.name} />;
            })}
            <Box my={3}>
              <Link onClick={this.toggleMoreFiltersState} fontStyle="paragraphs.m">
                {this.state.isMoreFiltersHidden ? (
                  <>
                    <TextInline>More Filters</TextInline>
                    <Icon iconName="chevron-down" ml={2} />
                  </>
                ) : (
                  <>
                    <TextInline>Less Filters</TextInline>
                    <Icon iconName="chevron-up" ml={2} />
                  </>
                )}
              </Link>
            </Box>

            {/* Divider */}
            <Box borderBottom my={4} mx={-4} />
          </>
        )}

        {/* Exclude */}
        {!!excludingFilters.length && (
          <>
            <TextBlock fontStyle="headings.xs" color="text.light" mb={2}>
              EXCLUDE
            </TextBlock>
            {excludingFilters.map(filter => {
              const FilterComponent = this.getFilterComponentByType(filter.inputType);
              return <FilterComponent filter={filter} key={filter.name} />;
            })}
          </>
        )}
      </Box>
    );
  }
}

interface MultiSelectFilterProps {
  filter: Filter;
}

class MultiSelectFilter extends Component<MultiSelectFilterProps> {
  render() {
    const { filter } = this.props;
    return (
      <FormMultiSelect<StringLabelValue>
        key={filter.name}
        name={filter.name}
        label={filter.label}
        getOptionText={o => o.label}
        format={'form-row-top-label' as FormFieldFormat}
        containerProps={{ mb: 2 }}
        placeholder={filter.placeholder}
        disabled={filter.disabled}
        helpText={filter.helpText}
      >
        {({ SelectOption, multiOptionFilter }) =>
          multiOptionFilter(filter.options as StringLabelValue[]).map(option => (
            <SelectOption key={option.value} option={option} />
          ))
        }
      </FormMultiSelect>
    );
  }
}

interface SimpleSelectFilterProps {
  filter: Filter;
}

class SimpleSelectFilter extends Component<SimpleSelectFilterProps> {
  render() {
    const { filter } = this.props;
    return (
      <FormSimpleSelect<NumberLabelValue>
        name={filter.name}
        getOptionText={o => o.label}
        disabled={filter.disabled}
        format={'form-row-top-label' as FormFieldFormat}
        label={filter.label}
        helpText={filter.helpText}
      >
        {({ SelectOption }) =>
          (filter.options as NumberLabelValue[]).map(option => <SelectOption key={option.value} option={option} />)
        }
      </FormSimpleSelect>
    );
  }
}
