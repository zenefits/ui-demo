import React from 'react';
import { cleanup } from '@testing-library/react';

import * as responsiveUtils from './responsive-utils';

import { renderWithContext } from '../../test-utils/theme';
import { Hide } from '../..';

describe('Hide', () => {
  describe('viewports', () => {
    it('obeys viewports', () => {
      const renderAt = [true, false, true, false, true];
      const matches = [false, false, false, false, false];

      matches.forEach((_, idx) => {
        const curMatches = [...matches];
        curMatches[idx] = true;

        jest.spyOn(responsiveUtils, 'getBreakpointMatches').mockReturnValue(curMatches);

        const { getByText, queryAllByText } = renderWithContext(<Hide forBreakpoints={renderAt}>hi</Hide>);

        if (renderAt[idx]) {
          expect(queryAllByText('hi').length).toBe(0);
        } else {
          getByText('hi');
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

    it('displays on anything other than mobile embedded', () => {
      const { getByText } = renderWithContext(<Hide inEmbeddedNativeView>hi</Hide>);
      getByText('hi');
    });

    it('does not display on mobile embedded', () => {
      window.ZENEFITS_MOBILE_INTEGRATION.isEmbeddedNativeView = true;

      const { queryAllByText } = renderWithContext(<Hide inEmbeddedNativeView>hi</Hide>);
      expect(queryAllByText('hi').length).toBe(0);
    });

    it('does not crash if ZENEFITS_MOBILE_INTEGRATION does not exist', () => {
      window.ZENEFITS_MOBILE_INTEGRATION = undefined;

      function tryRender() {
        renderWithContext(<Hide inEmbeddedNativeView>hi</Hide>);
      }
      expect(tryRender).not.toThrow();
    });
  });
});
