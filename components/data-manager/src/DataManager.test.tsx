import React from 'react';
import { render } from 'enzyme';

import DataManager, { DataManagerRenderProps } from './DataManager';
import { updateFilters } from './filterUtils';

type EmptyItem = {
  id: number;
  name: string;
  department: string;
};
const emps: EmptyItem[] = [
  { id: 1, name: 'Edison Keebler', department: 'Games' },
  { id: 2, name: 'Lonnie Deckow', department: 'Outdoor' },
  { id: 3, name: 'Alene Keeling', department: 'Auto' },
];

function renderFiltered(managerProps: DataManagerRenderProps<EmptyItem>) {
  return <div>{managerProps.filtering.outputData.map((emp: any) => emp.name)}</div>;
}

describe('DataManager', () => {
  it('should render without throwing an error', () => {
    expect(render(<DataManager sourceData={[]} render={managerProps => <p>Hi</p>} />).text()).toEqual('Hi');
  });

  it('should filter data correctly', () => {
    const eeNameFilter = { name: { stringContains: 'ee' } };
    expect(
      render(<DataManager<EmptyItem> sourceData={emps} initialFilter={eeNameFilter} render={renderFiltered} />).text(),
    ).toEqual('Edison KeeblerAlene Keeling');

    const deptFilter = updateFilters({}, 'matchAny', 'department', 'Auto', true);
    expect(
      render(<DataManager<EmptyItem> sourceData={emps} initialFilter={deptFilter} render={renderFiltered} />).text(),
    ).toEqual('Alene Keeling');

    const updatedDeptFilter = updateFilters(deptFilter, 'matchAny', 'department', 'Outdoor', true);
    expect(
      render(
        <DataManager<EmptyItem> sourceData={emps} initialFilter={updatedDeptFilter} render={renderFiltered} />,
      ).text(),
    ).toEqual('Lonnie DeckowAlene Keeling');
  });
});
