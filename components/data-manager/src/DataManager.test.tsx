import React from 'react';
import { render } from 'enzyme';
import DataManager from './DataManager';

const emps = [{ id: 1, name: 'Edison Keebler' }, { id: 2, name: 'Lonnie Deckow' }, { id: 3, name: 'Alene Keeling' }];
const eeNameFilter = { name: { stringContains: 'ee' } };

describe('DataManager', () => {
  it('should render without throwing an error', () => {
    expect(render(<DataManager sourceData={[]} render={managerProps => <p>Hi</p>} />).text()).toEqual('Hi');
  });

  it('should filter data correctly', () => {
    expect(
      render(
        <DataManager
          sourceData={emps}
          initialFilter={eeNameFilter}
          render={managerProps => <div>{managerProps.filtering.outputData.map((emp: any) => emp.name)}</div>}
        />,
      ).text(),
    ).toEqual('Edison KeeblerAlene Keeling');
  });
});
