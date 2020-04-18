import React from 'react';

import { mountEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import PdfDocumentViewer from './PdfDocumentViewer';

describe('PdfDocumentViewer', () => {
  it('should mount without throwing an error', () => {
    const wrapper = mountEnzymeWithTheme(
      <PdfDocumentViewer pdf="https://zenefits.s3.amazonaws.com/media/plandetails/United/United_HMO%20Platinum%20Select%2020-10.pdf" />,
    );
    expect(wrapper).toHaveLength(1);
  });
});
