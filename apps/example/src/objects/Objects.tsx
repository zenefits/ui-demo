import React, { Component } from 'react';

import { DataManager, DataPager } from 'z-frontend-data-manager';
import { DataTable } from 'z-frontend-tables';
import { DataLayout, PageLayout } from 'z-frontend-layout';
import { Flex } from 'zbase';
import { Button } from 'z-frontend-elements';

import { getMockedObjects, ObjectType } from '../mockedBackend';

const ObjectTable = () => (
  <DataTable<ObjectType> border={false}>
    <DataTable.Column<ObjectType> headerLabel="Name" fieldKey="name" />
    <DataTable.Column<ObjectType> headerLabel="Origin" fieldKey="origin">
      {({ row }) => (row.origin ? row.origin.join(', ') : '')}
    </DataTable.Column>
    <DataTable.Column<ObjectType> headerLabel="Size" fieldKey="size" />
    <DataTable.Column<ObjectType> headerLabel="Year" fieldKey="created" textAlign="right" />
  </DataTable>
);

export default class ObjectsPage extends Component<{}> {
  render() {
    // NOTE: fetched with Query in a real app
    const objectData = getMockedObjects();
    return (
      <PageLayout mode="fluid" columns="12" data-testid="PageLayout">
        <PageLayout.Main>
          <>
            <Flex align="center" justify="flex-end" mb={4}>
              <Button.RouteLink mode="primary" to="/objects/new">
                Add Object
              </Button.RouteLink>
            </Flex>
            <DataManager<ObjectType>
              sourceData={objectData}
              selectionKey="name"
              initialPageSize="xs"
              render={() => <DataLayout title="Objects" main={<ObjectTable />} pager={<DataPager />} />}
            />
          </>
        </PageLayout.Main>
      </PageLayout>
    );
  }
}
