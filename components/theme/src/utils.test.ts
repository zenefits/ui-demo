import { color, heights, icon, fontSizes, space, zIndex } from './utils';
import { ColorString } from './colors';

declare global {
  interface Window {
    __DEVELOPMENT__: boolean;
  }
}

let originalDevMode;
beforeEach(() => {
  originalDevMode = __DEVELOPMENT__;
});

afterEach(() => {
  window.__DEVELOPMENT__ = originalDevMode;
});

describe('utils#color', () => {
  const props = {
    theme: {
      colors: {
        'primary.a': '#fff',
      },
    },
  };

  it('supports opacity', () => {
    expect(color('primary.a', 0.5)(props)).toBe('rgba(255,255,255,0.5)');
  });

  it('supports transparent', () => {
    expect(color('transparent')(props)).toBe('transparent');
  });

  describe('for __DEV__ = true', () => {
    beforeEach(() => (window.__DEVELOPMENT__ = true));
    makeThrowTest(props, () => color('not.found' as ColorString));
    makeFoundTest(props, () => color('primary.a' as ColorString), '#fff');
  });

  describe('for __DEV__ = false', () => {
    beforeEach(() => (window.__DEVELOPMENT__ = false));
    makeFoundTest(props, () => color('primary.a'), '#fff');
    // returns undefined if passed incorrect ColorString
    makeFoundTest(props, () => color('#000' as ColorString), undefined);
  });
});

describe('utils#fontSizes', () => {
  const props = { theme: { fontSizes: [10, 20, 30] } };
  makeFoundTest(props, () => fontSizes(2), '30px');
  makeNotFoundTest(props, () => fontSizes(100));
  makeThrowTest(props, () => fontSizes(100));
});

describe('utils#heights', () => {
  const props = { theme: { heights: { small: 1, medium: 2, large: 3 } } };
  makeFoundTest(props, () => heights('large'), '3px');
  makeNotFoundTest(props, () => heights('not.found'));
  makeThrowTest(props, () => heights('not.found'));
});

describe('utils#icon', () => {
  const props = { theme: { icons: { 'chevron-left': '\\f2f9' } } };
  makeFoundTest(props, () => icon('chevron-left'), '\\f2f9');
  makeNotFoundTest(props, () => icon('not.found'));
  makeThrowTest(props, () => icon('not.found'));
});

describe('utils#space', () => {
  const props = { theme: { space: [1, 2, 4] } };
  makeFoundTest(props, () => space(2), '4px');
  makeNotFoundTest(props, () => space(100));
  makeThrowTest(props, () => space(100));
});

describe('utils#zIndex', () => {
  const props = { theme: { zIndex: { dropdown: 1, modal: 10 } } };
  makeFoundTest(props, () => zIndex('dropdown'), 1);
});

function makeFoundTest(props, getter, expected) {
  it('should get available from the theme', () => {
    expect(getter()(props)).toBe(expected);
  });
}

function makeNotFoundTest(props, getter) {
  it('should gracefully handle not found when __DEV__ is false', () => {
    window.__DEVELOPMENT__ = false;
    expect(getter()(props)).toBe(undefined);
  });
}

function makeThrowTest(props, getter) {
  it('should throw if property is not found when __DEV__ is true', () => {
    window.__DEVELOPMENT__ = true;
    expect(() => getter()(props)).toThrow(/referenced undefined/);
  });
}
