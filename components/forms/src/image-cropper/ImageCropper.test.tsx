import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { images } from 'z-frontend-theme';
import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import ImageCropper from './ImageCropper';

describe('ImageCropper', () => {
  afterEach(cleanup);

  it('provides an alt tag', () => {
    const { getByAltText } = renderWithContext(<ImageCropper src={images.pug} />);
    getByAltText('Original image');
  });
});
