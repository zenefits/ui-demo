import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import { Permissions } from './permissionTypes';
import { addPermissionsReducer, setPermissionsAction } from '../../../index';
import PermissionChecker, { checkPermission } from './PermissionChecker';

const selfId = 2294371;
const reportId = 2224373;
const terminatedEmployee = 2343293;
const bossId = 2343113;
const someOtherEmployeeId = 12345;

const rolesPermissionsData: Permissions = {
  grants: {
    download_benefits_reports: null,
    handle_cobra_benefits: null,
    edit_employee_benefits_data: [],
    view_employee_compensation: [['RE', 0], ['AE', 0], ['SE', 0]],
    can_view_sensitive_pto_data: [['SE', 0]],
    manage_employee_edit_basic_info: [['AE', 1], ['RE', 0]],
  },
  spans: {
    RE: {
      '0': [reportId],
    },
    CL: {
      '0': [reportId, bossId, selfId],
    },
    AE: {
      '0': [reportId, bossId, selfId, terminatedEmployee],
      '1': [someOtherEmployeeId],
    },
    SE: {
      '0': [selfId],
    },
    RS: {
      '0': [],
    },
  },
};

function makeStore() {
  const store = createStore(combineReducers(addPermissionsReducer({})));
  store.dispatch(setPermissionsAction(rolesPermissionsData));
  return store;
}

describe('PermissionChecker', () => {
  describe('component', () => {
    it('should render children when permission is set', () => {
      const downloadReportLink = 'Download report';
      const wrapper = mount(
        <Provider store={makeStore()}>
          <PermissionChecker permission="download_benefits_reports">
            <div>{downloadReportLink}</div>
          </PermissionChecker>
        </Provider>,
      );
      expect(wrapper.html().includes(downloadReportLink)).toBe(true);
    });

    it('should not render children when permission is missing', () => {
      const editPayrollLink = 'Edit Payroll';
      const wrapper = mount(
        <Provider store={makeStore()}>
          <PermissionChecker permission="admin_edit_employee_payroll_data">
            <div>{editPayrollLink}</div>
          </PermissionChecker>
        </Provider>,
      );
      expect(wrapper.html()).toBe(null);
    });

    it('should render when `on` matches', () => {
      const editPayrollLink = 'Edit Payroll';
      const wrapper = mount(
        <Provider store={makeStore()}>
          <PermissionChecker permission="can_view_sensitive_pto_data" id={selfId}>
            <div>{editPayrollLink}</div>
          </PermissionChecker>
        </Provider>,
      );
      expect(wrapper.html().includes(editPayrollLink)).toBe(true);
    });

    it('should not render when `on` does not match', () => {
      const editPayrollLink = 'Edit Payroll';
      const wrapper = mount(
        <Provider store={makeStore()}>
          <PermissionChecker permission="can_view_sensitive_pto_data" id={bossId}>
            <div>{editPayrollLink}</div>
          </PermissionChecker>
        </Provider>,
      );
      expect(wrapper.html()).toBe(null);
    });
  });

  describe('checkPermission', () => {
    it('false if no grant at all', () => {
      expect(checkPermission(rolesPermissionsData, 'does_not_exist' as any)).toBe(false);
    });
    it('true if grant exists (unparameterized)', () => {
      expect(checkPermission(rolesPermissionsData, 'download_benefits_reports')).toBe(true);
    });
    it('true if grant exists (parameterized)', () => {
      expect(checkPermission(rolesPermissionsData, 'view_employee_compensation', selfId)).toBe(true);
      expect(checkPermission(rolesPermissionsData, 'view_employee_compensation', reportId)).toBe(true);
    });
    it('false if grant exists (parameterized) but span does not contain id', () => {
      expect(checkPermission(rolesPermissionsData, 'can_view_sensitive_pto_data', bossId)).toBe(false);
      expect(checkPermission(rolesPermissionsData, 'view_employee_compensation', 1234)).toBe(false);
    });
    it('false if grant exists (parameterized) but grant has no spans', () => {
      expect(checkPermission(rolesPermissionsData, 'edit_employee_benefits_data', bossId)).toBe(false);
    });
    it('handles grant exists (parameterized) using multiple spans', () => {
      expect(checkPermission(rolesPermissionsData, 'manage_employee_edit_basic_info', someOtherEmployeeId)).toBe(true);
      expect(checkPermission(rolesPermissionsData, 'manage_employee_edit_basic_info', reportId)).toBe(true);
      expect(checkPermission(rolesPermissionsData, 'manage_employee_edit_basic_info', terminatedEmployee)).toBe(false);
    });
    it('throws when grant requires id but none provided', () => {
      expect(() => checkPermission(rolesPermissionsData, 'view_employee_compensation')).toThrowError(
        /requires a parameter/,
      );
    });
    it('throws when grant does not require id but one provided', () => {
      expect(() => checkPermission(rolesPermissionsData, 'download_benefits_reports', 1234)).toThrowError(
        /does not take a parameter/,
      );
    });
  });
});
