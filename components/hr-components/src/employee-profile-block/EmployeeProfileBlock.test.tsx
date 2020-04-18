import React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import { shallow } from 'enzyme';

import EmployeeProfileBlock, { EmployeeType } from './EmployeeProfileBlock';
import { employee, employeeWithManager } from '../../factories/employee';

export const EMPLOYEE = employee();
export const EMPLOYEE_WITH_MANAGER = employeeWithManager();

describe('EmployeeProfileBlock', () => {
  it('renders employee', () => {
    const shallowElement = shallow(<EmployeeProfileBlock employee={EMPLOYEE as EmployeeType} />);
    expect(shallowElement.find('[data-testid="employee-avatar"]').props()).toMatchObject({
      s: 'xlarge',
      photoUrl: 'test-file-stub',
      firstName: 'Bob',
      lastName: 'Pug',
    });

    const name = shallowElement.find('[data-testid="employee-name"]');
    expect(name.props().value).toEqual(`${EMPLOYEE.preferredOrFirstName} ${EMPLOYEE.last_name}`);

    const detail = shallowElement.find('[data-testid="horizontal-employee-detail"]');
    expect(detail.props().value).toEqual(`${EMPLOYEE.title} | ${EMPLOYEE.department.name}`);

    expect(shallowElement.find('[data-testid="employee-reports-to"]')).toHaveLength(0);
  });

  it('renders employee manager', () => {
    const shallowElement = shallow(<EmployeeProfileBlock employee={EMPLOYEE_WITH_MANAGER as EmployeeType} />);

    const reportsTo = shallowElement.find('[data-testid="employee-reports-to"]');
    expect(reportsTo.props().value).toEqual(
      `Reports to ${EMPLOYEE_WITH_MANAGER.reportToEmployee.preferredOrFirstName} ${EMPLOYEE_WITH_MANAGER.reportToEmployee.last_name}`,
    );
  });

  it('renders different avatar size', () => {
    const shallowElement = shallow(<EmployeeProfileBlock employee={EMPLOYEE as EmployeeType} size="small" />);
    expect(shallowElement.find('[data-testid="employee-avatar"]').props()).toMatchObject({
      s: 'small',
    });
  });
});
