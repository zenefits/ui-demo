import React, { Component, FunctionComponent, RefObject } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import gql from 'graphql-tag';

import { Box, Flex, Heading } from 'zbase';
import {
  transformFiltersToUrlFormat,
  DataFilter,
  DataFilterPanel,
  DataManager,
  DataPager,
  GraphqlDataManager,
  InMemoryDataManager,
  SortConfig,
  UrlFilterPanel,
  UrlPager,
  UrlQueryParamsManager,
} from 'z-frontend-data-manager';
import { DataLayout, NavBar, ProductNavContainer, ProductPageContainer, TopNavBar } from 'z-frontend-layout';
import { ConfirmationModal, DialogManager } from 'z-frontend-overlays';
import { EmptyState, IconButton } from 'z-frontend-elements';
import { FormFooter, Select } from 'z-frontend-forms';

import { storiesOf } from '../.storybook/storyHelpers';
import DataTable from './DataTable';
import { locationOptions, petRows, resolvers, rows, Row } from './storiesMock';

// @ts-ignore
const FilterType = `
  input Filter {
  name: String
  location: [String]
}`;

export const dataTableGqlQuery = gql`
  query dataTableGqlQuery($offset: Int!, $limit: Int!, $filter: Filter, $order_by: [string!]) {
    dataTableGqlQuery(offset: $offset, limit: $limit, filter: $filter, order_by: $order_by) @client {
      rows {
        id
        name
        location
        age
      }
      # totalItemsCount is needed for pagination eg: ( 1 to 5) of 7 .
      # here '7' is the totalCount .
      totalItemsCount
    }
  }
`;

storiesOf('tables|DataTable', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={1} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultExample data={rows} />)
  .add('empty', () => <DefaultExample data={[]} />)
  .add('custom empty', () => <CustomEmptyExample />)
  .add('with fixed columns', () => <FixedColumnsExample data={rows} />)
  .add('empty with fixed columns', () => <FixedColumnsExample data={[]} />)
  .add('with spanned rows', () => <SpannedRowsExample />)
  .add('with data manager', () => <DataManagerExample />)
  .add('with bulk selection', () => <BulkSelectedExample />)
  .add('with mouse interactions', () => <MouseInteractionsExample />)
  .add('with data manager -- no fixed columns', () => <NoFixedColumnsExample />)
  .add('explicit percentage columns widths', () => <ExplicitPercentageColumnWidthsExample />)
  .add('with full layout', () => <DataTableLayoutExample />)
  .add('with fixed layout', () => <FixedLayoutExample />)
  .add('edge cases', () => <EdgeCases />)
  .add('renders under TopNav', () => <WithNavBar />)
  .add('with Graphql Data Manager', () => <DataTableGqlManagerExample />)
  .add('with InMemoryDataManager', () => <WithInMemoryDataManager />);

const DefaultExample = (props: { data: Row[] }) => (
  <DataTable<Row> rows={props.data}>
    <DataTable.Column<Row> headerLabel="Name" fieldKey="name" />
    <DataTable.Column<Row> headerLabel="Location" fieldKey="location" />
    <DataTable.Column<Row> headerLabel="Age" fieldKey="age" textAlign="right" />
    <DataTable.MoneyColumn<Row> headerLabel="Salary" fieldKey="salary" />
    <DataTable.Column<Row> headerLabel="Alive" fieldKey="alive">
      {({ row }) => (row.alive ? 'Alive' : 'Dead')}
    </DataTable.Column>
  </DataTable>
);

const FixedLayoutExample = () => (
  <DataTable<Row> rows={rows}>
    <DataTable.Column<Row> width={4 / 8} headerLabel="Name" fieldKey="name" />
    <DataTable.Column<Row> width={2 / 8} headerLabel="Location" fieldKey="location" />
    <DataTable.Column<Row> width={1 / 8} headerLabel="Age" fieldKey="age" textAlign="right" />
    <DataTable.Column<Row> width={1 / 8} headerLabel="Alive" fieldKey="alive">
      {({ row }) => (row.alive ? 'Alive' : 'Dead')}
    </DataTable.Column>
  </DataTable>
);

const CustomEmptyExample = () => (
  <DataTable<Row>
    rows={[]}
    emptyRender={() => <EmptyState message="No results. Double check your filters." iconName="search" />}
  >
    <DataTable.Column<Row> headerLabel="Name" fieldKey="name" />
  </DataTable>
);

const FixedColumnsExample = (props: { data: Row[] }) => (
  // constrain width to force fixed row to be visible
  <Box width={400}>
    <DataTable<Row> tableLayout="fixed" rows={props.data}>
      <DataTable.Column<Row> isFixed headerLabel="Name" fieldKey="name" />
      <DataTable.Column<Row> width={120} headerLabel="Location" fieldKey="location" />
      <DataTable.Column<Row> width={120} headerLabel="Age" fieldKey="age" textAlign="right" />
      <DataTable.Column<Row> width={120} headerLabel="Alive" fieldKey="alive">
        {({ row }) => (row.alive ? 'Alive' : 'Dead')}
      </DataTable.Column>
    </DataTable>
  </Box>
);

const SpannedRowsExample = () => (
  <DataTable<Row> tableLayout="fixed" rows={rows}>
    <DataTable.Column<Row> isFixed headerLabel="Location" fieldKey="location" spanByFieldKey />
    <DataTable.Column<Row> isFixed headerLabel="Name" fieldKey="name" />
    <DataTable.Column<Row> headerLabel="Occupation" fieldKey="occupation" />
    <DataTable.Column<Row> headerLabel="Age" fieldKey="age" textAlign="right" />
  </DataTable>
);

const DataManagerExample = () => {
  // Force a cell with ellipsis
  const rowsWithEllipsis = rows.map(row => {
    if (row.location === 'Tatooine') {
      return { ...row, location: 'Tatooine,  Tatoo system, Arkanis sector, Outer Rim Territories' };
    }
    return row;
  });
  return (
    <DataManager<Row>
      sourceData={rowsWithEllipsis}
      selectionKey="name"
      render={() => (
        <DataTable<Row> tableLayout="fixed" width={900}>
          <DataTable.RowSelectionColumn isFixed />
          <DataTable.Column<Row> headerLabel="Name" fieldKey="name" isFixed />
          {/* This label is long to force an ellipsis */}
          <DataTable.Column<Row> headerLabel="Location where this person resides" fieldKey="location" />
          <DataTable.Column<Row> headerLabel="Age" fieldKey="age" textAlign="right" />
          <DataTable.Column<Row> headerLabel="Alive" fieldKey="alive">
            {params => {
              return params.row.alive ? 'Alive' : 'Dead';
            }}
          </DataTable.Column>
        </DataTable>
      )}
    />
  );
};

const BulkSelectedExample = () => (
  <DataManager<Row>
    sourceData={rows}
    selectionKey="name"
    initialSelections={new Set(['Fred Flintstone'])}
    render={() => (
      <DialogManager
        render={dialog => {
          const modalProps = {
            title: 'Delete Employees',
            submitActionText: 'Delete',
            onSubmit: () => {
              // perform delete
              dialog.close();
            },
            onCancel: dialog.close,
            isVisible: dialog.isVisible,
            controlEl: dialog.controlEl,
          };

          return (
            <DataTable<Row>
              bulkActions={({ selectionsCount: count, selections }) => (
                <>
                  <ConfirmationModal
                    content={`Are you sure you want to delete ${count} selected employees?`}
                    {...modalProps}
                  />
                  <IconButton iconName="delete" mr={2} onClick={dialog.open}>
                    Delete ({count})
                  </IconButton>
                  <IconButton iconName="download" onClick={() => {}}>
                    Export ({count})
                  </IconButton>
                </>
              )}
            >
              <DataTable.RowSelectionColumn />
              <DataTable.Column<Row> headerLabel="Name" fieldKey="name" />
              <DataTable.Column<Row> headerLabel="Location" fieldKey="location" />
              <DataTable.Column<Row> headerLabel="Age" fieldKey="age" textAlign="right" />
            </DataTable>
          );
        }}
      />
    )}
  />
);

const MouseInteractionsExample = () => (
  <DataTable<Row> rows={rows} shouldClickActivateTable>
    <DataTable.Column<Row> headerLabel="Name" fieldKey="name" />
    <DataTable.Column<Row> headerLabel="Location" fieldKey="location" />
    <DataTable.Column<Row> headerLabel="Age" fieldKey="age" textAlign="right" />
    <DataTable.Column<Row> headerLabel="Occupation" fieldKey="occupation" />
  </DataTable>
);

const NoFixedColumnsExample = () => (
  <DataManager<Row>
    sourceData={rows}
    selectionKey="name"
    render={() => (
      <DataTable<Row>>
        <DataTable.Column<Row> headerLabel="Name" fieldKey="name" />
        <DataTable.Column<Row> headerLabel="Location" fieldKey="location" />
        <DataTable.Column<Row> headerLabel="Alive" fieldKey="alive">
          {({ row }) => (row.alive ? 'Alive' : 'Dead')}
        </DataTable.Column>
        <DataTable.Column<Row> headerLabel="Age" fieldKey="age" textAlign="right" />
      </DataTable>
    )}
  />
);

const ExplicitPercentageColumnWidthsExample = () => (
  <DataManager<Row>
    sourceData={rows}
    selectionKey="name"
    render={() => (
      <DataTable<Row> width={800} height={200} tableLayout="fixed">
        <DataTable.RowSelectionColumn />
        <DataTable.Column<Row> headerLabel="Name (1/2 width)" fieldKey="name" width={2 / 4} />
        <DataTable.Column<Row> headerLabel="Location (1/4 width)" fieldKey="location" width={1 / 4} />
        <DataTable.Column<Row> headerLabel="Age (1/4 width)" fieldKey="age" textAlign="right" width={1 / 4} />
      </DataTable>
    )}
  />
);

const optionList = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];
const EdgeCases = () => (
  <DataManager<Row>
    sourceData={rows}
    selectionKey="name"
    render={() => (
      <>
        <Heading level={3} fontStyle="headings.m">
          Dropdown should render over column headers
        </Heading>
        <Box w={200}>
          <Select<string> name="open" label="open" autoFocus openOnFocus getOptionText={o => o}>
            {({ SelectOption, basicOptionFilter }) =>
              basicOptionFilter(optionList).map(option => <SelectOption key={option} option={option} />)
            }
          </Select>
        </Box>
        <DataTable<Row> width={800} height={200} tableLayout="fixed">
          <DataTable.RowSelectionColumn isFixed />
          <DataTable.Column<Row> headerLabel="Name (1/2 width)" fieldKey="name" isFixed />
          <DataTable.Column<Row> headerLabel="Location (1/4 width)" fieldKey="location" />
          <DataTable.Column<Row> headerLabel="Age (1/4 width)" fieldKey="age" textAlign="right" />
        </DataTable>
      </>
    )}
  />
);

const initialSort: SortConfig = {
  '0': { key: 'name', isAscending: true },
};

const RouteInfo = withRouter<{}>((props: RouteComponentProps<{}>) => (
  <Box mt={3}>location.search: {props.location.search}</Box>
));

type DataTableLayoutExampleState = {
  data: Row[];
};

const dataMap: { [key: string]: Row[] } = {
  humans: rows,
  pets: petRows,
};

class DataTableLayoutExample extends Component<{}, DataTableLayoutExampleState> {
  state = {
    data: rows,
  };

  switchSection(sections: any, sectionKey: string) {
    sections.onSectionChange(sectionKey);
    this.setState({ data: dataMap[sectionKey] });
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <DataManager<Row>
          sourceData={data}
          selectionKey="name"
          initialSorter={initialSort}
          initialSection="humans"
          initialPageSize="xs"
          render={({ sections }) => (
            <DataLayout
              nav={
                <NavBar mode="list">
                  <NavBar.NavLink
                    active={sections.config.currentSection === 'humans'}
                    onClick={() => this.switchSection(sections, 'humans')}
                  >
                    Humans
                  </NavBar.NavLink>
                  <NavBar.NavLink
                    active={sections.config.currentSection === 'pets'}
                    onClick={() => this.switchSection(sections, 'pets')}
                  >
                    Pets
                  </NavBar.NavLink>
                </NavBar>
              }
              actions={FilterButton => (
                <>
                  <IconButton iconName="search" aria-label="Search" onClick={() => {}}>
                    Search
                  </IconButton>
                  <IconButton iconName="settings" aria-label="Edit table settings" onClick={() => {}}>
                    Settings
                  </IconButton>
                  {FilterButton}
                </>
              )}
              leftPanel={
                <DataFilterPanel>
                  <DataFilter.Section label="Employee">
                    <DataFilter.Text label="Name" dataKey="name" />
                    <DataFilter.CheckboxGroup label="Location" dataKey="location" data={rows} />
                  </DataFilter.Section>
                </DataFilterPanel>
              }
              main={
                <DataTable<Row> border={false}>
                  <DataTable.RowSelectionColumn />
                  <DataTable.Column<Row> headerLabel="Name" fieldKey="name" />
                  <DataTable.Column<Row> headerLabel="Location" fieldKey="location" />
                  <DataTable.Column<Row> headerLabel="Age" fieldKey="age" textAlign="right" />
                </DataTable>
              }
              addRowButton={<IconButton iconName="plus-circle">Add Row</IconButton>}
              pager={<DataPager />}
              footer={<FormFooter primaryText="Save" />}
            />
          )}
        />
        {/* show route info because not visible in storybook otherwise (iframe) */}
        <RouteInfo />
      </>
    );
  }
}

class WithNavBar extends Component {
  containerRef: RefObject<HTMLDivElement> = React.createRef();

  // Scroll to bottom so we can verify that DataTable will go under NavBar in chromatic tests
  componentDidMount() {
    this.containerRef.current.scrollTop = this.containerRef.current.offsetHeight;
  }

  render() {
    return (
      <>
        <div ref={this.containerRef} style={{ height: 300, overflowY: 'scroll' }}>
          <TopNavBar />
          <ProductNavContainer>
            <NavBar mode="product">
              <NavBar.RouterNavLink to="/overview">Overview</NavBar.RouterNavLink>
            </NavBar>
          </ProductNavContainer>
          <ProductPageContainer>
            <DataManager<Row>
              sourceData={rows}
              selectionKey="name"
              render={() => (
                <>
                  <DataTable<Row> width={800} height={400} tableLayout="fixed">
                    <DataTable.RowSelectionColumn isFixed />
                    <DataTable.Column<Row> headerLabel="Name (1/2 width)" fieldKey="name" isFixed />
                    <DataTable.Column<Row> headerLabel="Location (1/4 width)" fieldKey="location" />
                    <DataTable.Column<Row> headerLabel="Age (1/4 width)" fieldKey="age" textAlign="right" />
                  </DataTable>
                </>
              )}
            />
          </ProductPageContainer>
        </div>
      </>
    );
  }
}

interface QueryResult {
  dataTableGqlQuery: {
    rows: Row[];
    totalItemsCount: number;
  };
}

const filterDefaults = { name: 'Flint', locations: ['1'] };

export const DataTableGqlManagerExample: FunctionComponent = () => (
  <MockedProvider addTypename={false} resolvers={resolvers}>
    <UrlQueryParamsManager defaults={{ pageSize: 5, ...transformFiltersToUrlFormat(filterDefaults) }}>
      <GraphqlDataManager<QueryResult, {}, Row[]>
        query={dataTableGqlQuery}
        queryOptions={{
          fetchPolicy: 'cache-and-network',
          handleLoading: false,
        }}
        processData={data => {
          // massage the data here so that it can be consumed in DataTable
          const { rows, totalItemsCount } = data.dataTableGqlQuery;
          return { totalItemsCount, processedData: rows };
        }}
      >
        <>
          <DataLayout
            actions={FilterButton => FilterButton}
            leftPanel={
              <UrlFilterPanel>
                <DataFilter.Section label="Employee">
                  <DataFilter.UrlFilterText label="Name" filterName="name" />
                  <DataFilter.UrlFilterCheckboxGroup
                    label="Location"
                    filterName="locations"
                    options={locationOptions}
                  />
                </DataFilter.Section>
              </UrlFilterPanel>
            }
            main={
              <DataTable<Row> tableLayout="fixed" border={false}>
                <DataTable.Column<Row> isFixed headerLabel="Name" fieldKey="name" />
                <DataTable.Column<Row> headerLabel="Location" fieldKey="location" />
                <DataTable.Column<Row> headerLabel="Age" fieldKey="age" textAlign="right" />
              </DataTable>
            }
            addRowButton={<IconButton iconName="plus-circle">Add Row</IconButton>}
            pager={<UrlPager />}
            footer={<FormFooter primaryText="Save" />}
          />
          <RouteInfo />
        </>
      </GraphqlDataManager>
    </UrlQueryParamsManager>
  </MockedProvider>
);

const WithInMemoryDataManager: FunctionComponent = () => {
  return (
    <InMemoryDataManager<Row> sourceData={rows} selectionKey="name" urlQueryParamsDefaults={{ pageSize: 5 }}>
      <>
        <DataTable<Row> tableLayout="fixed">
          <DataTable.RowSelectionColumn isFixed />
          <DataTable.Column<Row> headerLabel="Name" fieldKey="name" isFixed />
          <DataTable.Column<Row> headerLabel="Location" fieldKey="location" />
          <DataTable.Column<Row> headerLabel="Age" fieldKey="age" textAlign="right" />
          <DataTable.Column<Row> headerLabel="Alive" fieldKey="alive">
            {params => {
              return params.row.alive ? 'Alive' : 'Dead';
            }}
          </DataTable.Column>
        </DataTable>
        <Flex justify="flex-end" mt={2}>
          <UrlPager />
        </Flex>
      </>
    </InMemoryDataManager>
  );
};
