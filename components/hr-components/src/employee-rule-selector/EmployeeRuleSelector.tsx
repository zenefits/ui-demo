import React, { Component } from 'react';
import { sortBy } from 'lodash';

import { Box, Flex, TextBlock } from 'zbase';
import { LoadingSpinner } from 'z-frontend-elements';
import { DataLayout, NavBar } from 'z-frontend-layout';
import { Query, QueryProps } from 'z-frontend-network';
import { DataManager, DataPager, SectionContext } from 'z-frontend-data-manager';
import { DataTable } from 'z-frontend-tables';
import { getBreakpointMatches, Render } from 'z-frontend-theme';

import EmployeeProfileBlock from '../employee-profile-block/EmployeeProfileBlock';
import { AllFilteringOptions, EmployeesSelectorFormData, TargetableEmployee, TargetedEmployee } from './types';
import RuleSelectorPanel from './RuleSelectorPanel';

enum TABLE_TAB {
  INCLUDED = 'INCLUDED',
  EXCLUDED = 'EXCLUDED',
}

type SourceDataType = {
  employee: TargetableEmployee;
  fullName: string;
  departmentName: string;
};

type Props<Data> = {
  targetableEmployees: TargetableEmployee[];
  getTargetedEmployeesFromData: (data: Data) => TargetedEmployee[];
  filteringOptions: AllFilteringOptions;
  initialFilterValues: EmployeesSelectorFormData;
  resetForm: () => void;
};

type State = {
  selectedTableTab: TABLE_TAB;
  breakpointMatches: boolean[];
};

type ComponentQueryProps<Data, Variables> = {
  queryVariables?: Variables;
  query: QueryProps<Data, Variables>['query'];
};

type AllProps<Data, Variables> = Props<Data> & ComponentQueryProps<Data, Variables>;

export default class EmployeeRuleSelector<Data, Variables> extends Component<AllProps<Data, Variables>, State> {
  constructor(props: AllProps<Data, Variables>) {
    super(props);
    this.state = {
      selectedTableTab: TABLE_TAB.INCLUDED,
      breakpointMatches: getBreakpointMatches(),
    };
  }

  resizeEventHandler = () => {
    this.setState({ breakpointMatches: getBreakpointMatches() });
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeEventHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEventHandler);
  }

  getSourceData = (employees: TargetableEmployee[]): SourceDataType[] => {
    const normalizedEmployees = employees.map(employee => ({
      employee,
      fullName: employee.preferredOrFirstName + employee.last_name,
      departmentName: employee.department?.name ?? '',
    }));
    return sortBy(normalizedEmployees, ['fullName']);
  };

  getIncludedEmployees = (
    targetableEmployees: TargetableEmployee[],
    targetedEmployees: TargetedEmployee[],
  ): TargetableEmployee[] => {
    const targetedEmployeeIds = new Set(targetedEmployees.map(employee => employee.id));
    return targetableEmployees.filter(employee => targetedEmployeeIds.has(employee.id));
  };

  getExcludedEmployees = (
    targetableEmployees: TargetableEmployee[],
    includedEmployees: TargetedEmployee[],
  ): TargetableEmployee[] => {
    const includedEmployeeIds = new Set(includedEmployees.map(employee => employee.id));
    return targetableEmployees.filter(employee => !includedEmployeeIds.has(employee.id));
  };

  selectTableTab = (sections: SectionContext, sectionKey: TABLE_TAB) => {
    sections.onSectionChange(sectionKey);
    this.setState({ selectedTableTab: sectionKey });
  };

  render() {
    const { query, queryVariables } = this.props;
    const matches = this.state.breakpointMatches;

    return (
      <>
        {/* Filter on top of the table, if in the first or second breakpoint  */}
        <Render forBreakpoints={[true, true]}>
          <Box borderBottom>
            <RuleSelectorPanel
              filteringOptions={this.props.filteringOptions}
              initialValues={this.props.initialFilterValues}
              resetForm={this.props.resetForm}
            />
          </Box>
        </Render>
        <DataLayout
          containerProps={{ border: false, minWidth: 100 }}
          leftPanelConfig={{ minWidth: 250 }}
          // Filter on the left panel, if not in the first or second breakpoint
          leftPanel={
            matches[0] || matches[1] ? null : (
              <RuleSelectorPanel
                filteringOptions={this.props.filteringOptions}
                initialValues={this.props.initialFilterValues}
                resetForm={this.props.resetForm}
              />
            )
          }
          // Targeted employees preview
          main={
            <Query<Data, Variables>
              query={query}
              variables={queryVariables}
              handleLoading={false}
              fetchPolicy="network-only"
            >
              {({ data, loading }) => {
                if (loading) {
                  return (
                    <Flex justify="center" p={6} align="center" width="100%">
                      <LoadingSpinner s="medium" />
                    </Flex>
                  );
                }

                const targetedEmployees = this.props.getTargetedEmployeesFromData(data);
                const includedEmployees = this.getIncludedEmployees(this.props.targetableEmployees, targetedEmployees);
                const excludedEmployees = this.getExcludedEmployees(this.props.targetableEmployees, includedEmployees);
                return (
                  <DataManager<SourceDataType>
                    sourceData={this.getSourceData(
                      this.state.selectedTableTab === TABLE_TAB.INCLUDED ? includedEmployees : excludedEmployees,
                    )}
                    initialPageSize="s"
                    initialSection={TABLE_TAB.INCLUDED}
                    render={({ sections }) => (
                      <DataLayout
                        containerProps={{ border: false }}
                        nav={
                          <NavBar mode="list">
                            <NavBar.NavLink
                              active={sections.config.currentSection === TABLE_TAB.INCLUDED}
                              onClick={() => this.selectTableTab(sections, TABLE_TAB.INCLUDED)}
                            >
                              <TextBlock>Included ({includedEmployees.length})</TextBlock>
                            </NavBar.NavLink>
                            <NavBar.NavLink
                              active={sections.config.currentSection === TABLE_TAB.EXCLUDED}
                              onClick={() => this.selectTableTab(sections, TABLE_TAB.EXCLUDED)}
                            >
                              <TextBlock>Excluded ({excludedEmployees.length})</TextBlock>
                            </NavBar.NavLink>
                          </NavBar>
                        }
                        main={
                          <DataTable<SourceDataType> border={false}>
                            <DataTable.Column<SourceDataType> headerLabel="Full Name" fieldKey="fullName" width={3 / 5}>
                              {({ row }) => (
                                <EmployeeProfileBlock
                                  employee={row.employee}
                                  showManager={false}
                                  showDepartment={false}
                                  size="small"
                                />
                              )}
                            </DataTable.Column>
                            <DataTable.Column<SourceDataType>
                              headerLabel="Department"
                              fieldKey="departmentName"
                              width={2 / 5}
                            />
                          </DataTable>
                        }
                        pager={<DataPager />}
                      />
                    )}
                  />
                );
              }}
            </Query>
          }
        />
      </>
    );
  }
}
