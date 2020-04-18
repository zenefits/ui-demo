import React from 'react';
import { cleanup } from '@testing-library/react';

import * as responsiveUtils from './responsive-utils';

import { renderWithContext } from '../../test-utils/theme';
import Render from './Render';

describe('RenderFor', () => {
  describe('viewports', () => {
    it('obeys viewports', () => {
      const renderAt = [true, false, true, false, true];
      const matches = [false, false, false, false, false];

      matches.forEach((_, idx) => {
        const curMatches = [...matches];
        curMatches[idx] = true;

        jest.spyOn(responsiveUtils, 'getBreakpointMatches').mockReturnValue(curMatches);

        const { getByText, queryAllByText } = renderWithContext(<Render forBreakpoints={renderAt}>hi</Render>);

        if (renderAt[idx]) {
          getByText('hi');
        } else {
          expect(queryAllByText('hi').length).toBe(0);
        }

        cleanup();
      });
    });
  });

  describe('mobile', () => {
    beforeEach(() => {
      window.ZENEFITS_MOBILE_INTEGRATION = {};
      cleanup();
    });

    afterEach(() => {
      window.ZENEFITS_MOBILE_INTEGRATION = undefined;
    });

    it('renders on mobile embedded', () => {
      window.ZENEFITS_MOBILE_INTEGRATION.isEmbeddedNativeView = true;

      const { getByText } = renderWithContext(<Render inEmbeddedNativeView>hi</Render>);
      getByText('hi');
    });

    it('does not display on anything other than mobile embedded', () => {
      const { queryAllByText } = renderWithContext(<Render inEmbeddedNativeView>hi</Render>);
      expect(queryAllByText('hi').length).toBe(0);
    });

    it('does not crash if ZENEFITS_MOBILE_INTEGRATION does not exist', () => {
      window.ZENEFITS_MOBILE_INTEGRATION = undefined;

      function tryRender() {
        renderWithContext(<Render inEmbeddedNativeView>hi</Render>);
      }
      expect(tryRender).not.toThrow();
    });
  });
});
