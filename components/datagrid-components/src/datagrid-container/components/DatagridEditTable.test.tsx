import React from 'react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { createErrorSummary } from './DatagridEditTable';
import { EditQuery } from '../../gqlTypes';

describe('DatagridEditTable', () => {
  describe('createErrorSummary', () => {
    const columnConfiguration = [
      { id: 'firstName', label: 'First name', category: { label: 'Contact', key: 'contact' } },
      { id: 'lastName', label: 'Last name', category: { label: 'Contact', key: 'contact' } },
      { id: 'status', label: 'Status', category: { label: 'Employment', key: 'employment' } },
      { id: 'type', label: 'Employment type', category: { label: 'Employment', key: 'employment' } },
    ] as EditQuery.ColumnConfiguration[];

    function renderErrorSummary(currentCategoryKey, errors) {
      return renderWithContext(<>{createErrorSummary(columnConfiguration, currentCategoryKey)(errors)}</>);
    }

    it('Shows error counts for current row', () => {
      const { getByText } = renderErrorSummary('contact', {
        firstName: [{ key: 'fReq', message: 'Required' }],
        lastName: [{ key: 'fReq', message: 'Required' }],
      });

      getByText('2 errors in this tab: First name, Last name');
    });

    it('Shows error counts for other rows', () => {
      const { getByText } = renderErrorSummary('employment', {
        firstName: [{ key: 'fReq', message: 'Required' }],
        lastName: [{ key: 'lReq', message: 'Required' }],
        status: [{ key: 'sReq', message: 'Required' }],
      });

      getByText('1 error in this tab: Status');
      getByText('2 errors in other tabs: Contact');
    });
  });
});
