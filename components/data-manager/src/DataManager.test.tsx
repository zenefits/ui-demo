import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ThemeProvider from 'z-frontend-theme/src/ThemeProvider';
import DataManager from './DataManager';

const emps = [{ id: 1, name: 'Edison Keebler' }, { id: 2, name: 'Lonnie Deckow' }, { id: 3, name: 'Alene Keeling' }];
const fd = { name: { stringContains: 'ee' } };

describe('DataManager', () => {
  it('should render without throwing an error', () => {
    expect(render(<DataManager>{data => <p>Hi</p>}</DataManager>).text()).toEqual('Hi');
  });

  it('should filter data correctly', () => {
    expect(
      render(
        <DataManager sourceData={emps} filterDescriptor={fd}>
          {data => <div>{data.filteredData.map(emp => emp.name)}</div>}
        </DataManager>,
      ).text(),
    ).toEqual('Edison KeeblerAlene Keeling');
  });
});
