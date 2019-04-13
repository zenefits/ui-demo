import React, { Component } from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { combineReducers, createStore, Store } from 'redux';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

import withPermissions, { WithPermissionsProps } from './withPermissions';
import { addPermissionsReducer, resetApolloClientForTesting, setPermissionsAction } from '../../../index';
import { Permissions, RolePermissionGrant } from './permissionTypes';
import { initializeMockedNetworkInterface } from '../../createApolloClient';

function makePermissions(grantKey: RolePermissionGrant): Permissions {
  const permissions: Permissions = {
    grants: {},
    spans: {},
  };
  if (grantKey && permissions.grants) {
    permissions.grants[grantKey] = null;
  }
  return permissions;
}

function mockApolloClientWithPermission(permission: RolePermissionGrant, options: { shouldFail?: boolean } = {}) {
  const permissions = makePermissions(permission);
  const mockedClient = new ApolloClient({
    link: initializeMockedNetworkInterface({
      resolvers: {
        Query: {
          rolesPermissionsData() {
            if (options.shouldFail) {
              return Promise.reject('simulated graphql error');
            }
            return Promise.resolve(permissions);
          },
        },
      },
      typeDefs: 'type Query { rolesPermissionsData: JSON } scalar JSON',
    }),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  } as any);
  resetApolloClientForTesting(mockedClient);
}

describe('withPermissions HOC', () => {
  let store: Store<any>;

  beforeEach(() => {
    store = createStore(combineReducers(addPermissionsReducer({})));
  });

  it('should add permissions to wrapped component', () => {
    store.dispatch(setPermissionsAction(makePermissions('download_benefits_reports')));

    interface OwnProps {}
    class MyComponent extends Component<OwnProps & WithPermissionsProps> {
      render() {
        return <pre>{JSON.stringify(this.props.permissions)}</pre>;
      }
    }
    const MyComponentWithPermissions = withPermissions<OwnProps>()(MyComponent);

    const rendered = mount(
      <Provider store={store}>
        <MyComponentWithPermissions />
      </Provider>,
    );
    expect(rendered.html()).toContain('download_benefits_reports');
  });

  describe('refetchPermissions', () => {
    interface OwnProps {
      onRefetchSuccess: () => void;
      onRefetchFail?: (err: any) => void;
    }
    class RefetchingComponent extends Component<OwnProps & WithPermissionsProps> {
      refetch = () => {
        const { refetchPermissions, onRefetchSuccess, onRefetchFail } = this.props;
        refetchPermissions()
          .then(onRefetchSuccess)
          .catch(onRefetchFail);
      };

      render() {
        const { permissions } = this.props;
        return (
          <div>
            <button onClick={this.refetch}>Refetch</button>
            <pre>{JSON.stringify(permissions)}</pre>
          </div>
        );
      }
    }
    const RefetchingComponentWithPermissions = withPermissions<OwnProps>()(RefetchingComponent);

    it('should update redux', done => {
      expect.assertions(3);

      const initialPermissions = 'administer_employee_edit_basic_info';
      store.dispatch(setPermissionsAction(makePermissions(initialPermissions)));

      const updatedPermissions = 'can_approve_pto';
      mockApolloClientWithPermission(updatedPermissions);

      const wrapper = mount(
        <Provider store={store}>
          <RefetchingComponentWithPermissions
            onRefetchSuccess={() => {
              expect(wrapper.html()).toContain(updatedPermissions);
              expect(store.getState().permissions.values.grants).toHaveProperty(updatedPermissions);
              done();
            }}
          />
        </Provider>,
      );
      expect(wrapper.html()).toContain(initialPermissions);

      wrapper.find('button').simulate('click'); // trigger refetch
    });

    it('should invalidate before loading', done => {
      expect.assertions(3);

      const initialPermissions = 'administer_employee_edit_basic_info';
      store.dispatch(setPermissionsAction(makePermissions(initialPermissions)));

      const updatedPermissions = 'can_approve_pto';
      const withFailure = { shouldFail: true };
      mockApolloClientWithPermission(updatedPermissions, withFailure);

      const wrapper = mount(
        <Provider store={store}>
          <RefetchingComponentWithPermissions
            onRefetchSuccess={() => {
              done(new Error('this should not succeed'));
            }}
            onRefetchFail={err => {
              expect(wrapper.html()).not.toContain(initialPermissions);
              expect(store.getState().permissions.values).toEqual({});
              done();
            }}
          />
        </Provider>,
      );
      expect(wrapper.html()).toContain(initialPermissions);

      wrapper.find('button').simulate('click'); // trigger refetch
    });
  });
});
