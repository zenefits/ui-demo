import React from 'react';
// @ts-ignore
import { cleanup, wait, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/react-testing';
import gql from 'graphql-tag';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { checkPermission } from './permissionUtil';
import { Permissions } from './permissionTypes';
import PermissionChecker from './PermissionChecker';
import PermissionManager from './PermissionManager';

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
    view_employee_compensation: [
      ['RE', 0],
      ['AE', 0],
      ['SE', 0],
    ],
    can_view_sensitive_pto_data: [['SE', 0]],
    manage_employee_edit_basic_info: [
      ['AE', 1],
      ['RE', 0],
    ],
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

const permissionsRefreshQuery = gql`
  query PermissionsRefreshQuery {
    rolesPermissionsData {
      grants
      spans
    }
  }
`;

const mocks = [
  {
    request: {
      query: permissionsRefreshQuery,
      variables: {},
    },
    result: {
      data: {
        rolesPermissionsData,
      },
    },
  },
];

const mountWithPermissionsManager = (children: JSX.Element) => {
  return renderWithContext(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PermissionManager>{children}</PermissionManager>
    </MockedProvider>,
  );
};

describe('PermissionChecker', () => {
  describe('component', () => {
    afterEach(cleanup);

    const editPayrollLink = 'Edit Payroll';

    it('should render children when permission is set', async () => {
      const downloadReportLink = 'Download report';
      const { getByText } = mountWithPermissionsManager(
        <PermissionChecker permission="download_benefits_reports">
          <div>{downloadReportLink}</div>
        </PermissionChecker>,
      );
      await wait(() => {
        getByText(downloadReportLink);
      });
    });

    it('should not render children when permission is missing', async () => {
      const { queryByText } = mountWithPermissionsManager(
        <PermissionChecker permission="admin_edit_employee_payroll_data">
          <div>{editPayrollLink}</div>
        </PermissionChecker>,
      );
      await wait(() => {
        expect(queryByText(editPayrollLink)).toBeNull();
      });
    });

    it('should render when `id` matches', async () => {
      const { getByText } = mountWithPermissionsManager(
        <PermissionChecker permission="can_view_sensitive_pto_data" id={selfId}>
          <div>{editPayrollLink}</div>
        </PermissionChecker>,
      );
      await wait(() => {
        getByText(editPayrollLink);
      });
    });

    it('should not render when `id` does not match', async () => {
      const { queryByText } = mountWithPermissionsManager(
        <PermissionChecker permission="can_view_sensitive_pto_data" id={bossId}>
          <div>{editPayrollLink}</div>
        </PermissionChecker>,
      );
      await wait(() => {
        expect(queryByText(editPayrollLink)).toBeNull();
      });
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
