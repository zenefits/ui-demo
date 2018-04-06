import React from 'react';
import { render } from 'enzyme';
import DataManager from './DataManager';
import { updateFilters } from './filterUtils';

describe('DataManager', () => {
  it('should render without throwing an error', () => {
    expect(render(<DataManager sourceData={[]} render={managerProps => <p>Hi</p>} />).text()).toEqual('Hi');
  });

  it('should filter data correctly', () => {
    const emps = [
      { id: 1, name: 'Edison Keebler', department: 'Games' },
      { id: 2, name: 'Lonnie Deckow', department: 'Outdoor' },
      { id: 3, name: 'Alene Keeling', department: 'Auto' },
    ];
    const eeNameFilter = { name: { stringContains: 'ee' } };
    const deptFilter = updateFilters({}, 'matchAny', 'department', 'Auto', true);

    expect(
      render(
        <DataManager
          sourceData={emps}
          initialFilter={eeNameFilter}
          render={managerProps => <div>{managerProps.filtering.outputData.map((emp: any) => emp.name)}</div>}
        />,
      ).text(),
    ).toEqual('Edison KeeblerAlene Keeling');

    expect(
      render(
        <DataManager
          sourceData={emps}
          initialFilter={deptFilter}
          render={managerProps => <div>{managerProps.filtering.outputData.map((emp: any) => emp.name)}</div>}
        />,
      ).text(),
    ).toEqual('Alene Keeling');

    const updatedDeptFilter = updateFilters(deptFilter, 'matchAny', 'department', 'Outdoor', true);

    expect(
      render(
        <DataManager
          sourceData={emps}
          initialFilter={updatedDeptFilter}
          render={managerProps => <div>{managerProps.filtering.outputData.map((emp: any) => emp.name)}</div>}
        />,
      ).text(),
    ).toEqual('Lonnie DeckowAlene Keeling');
  });
});
