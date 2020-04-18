import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { Box, Flex } from 'zbase';
import { IconButton } from 'z-frontend-elements';

import { storiesOf } from '../../.storybook/storyHelpers';
import DataFilterPanel from './DataFilterPanel';
import DataFilter from '../filter/DataFilter';
import { employeeData, Employee, FilterResults } from '../filter/DataFilter.stories';
import DataManager, { DataManagerRenderProps } from '../DataManager';

storiesOf('data-manager|DataFilterPanel', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 900]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultFilterPanelExample />);
export class DefaultFilterPanelExample extends Component {
  state = {
    panelVisible: true,
  };

  render() {
    const { panelVisible } = this.state;
    return (
      <Router>
        <DataManager
          sourceData={employeeData}
          render={(managerProps: DataManagerRenderProps<Employee>) => (
            <>
              <IconButton iconName="filter-list" onClick={() => this.setState({ panelVisible: !panelVisible })} mb={2}>
                Filter
              </IconButton>
              {/* NOTE: would typically be used in DataLayout */}
              <Flex direction={['column', 'row']}>
                <DataFilterPanel
                  width={300} // force long label wrap for visual testing
                  isVisible={panelVisible}
                  onClose={() => this.setState({ panelVisible: false })}
                  mr={2}
                >
                  <DataFilter.Section label="Employee">
                    <DataFilter.Text label="Name" dataKey="name" />
                    <DataFilter.CheckboxGroup label="Department" dataKey="departmentName" data={employeeData} />
                    <DataFilter.MultiSelect label="Location" dataKey="location" />
                    <DataFilter.DateRange label="Hired" dataKey="dateHire" />
                  </DataFilter.Section>
                </DataFilterPanel>
                <Box>
                  <FilterResults results={managerProps.displayData} />
                </Box>
              </Flex>
            </>
          )}
        />
      </Router>
    );
  }
}
