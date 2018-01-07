import React from 'react';
import { mountWithTheme, renderWithTheme, shallowWithTheme } from 'z-frontend-theme/test-utils/theme';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should shallow render without throwing an error', () => {
    // NOTE: a shallow render is useful for unit tests (don't depend on children)
    // it also avoids some of the component lifecycle by default.
    // more: https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
    expect(
      shallowWithTheme(<MyComponent>Hi</MyComponent>)
        .children()
        .text(),
    ).toBe('Hi');
  });

  it('should mount without throwing an error', () => {
    // NOTE: mount is useful where your component or test interact with DOM APIs and needs
    // the full lifecycle. More: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md
    // This is useful for simulating clicks
    expect(mountWithTheme(<MyComponent>Hi</MyComponent>).text()).toBe('Hi');
    // expect(<MyComponent >Hi</MyComponent>)).contains(<span className="foo">Bar</span>)).toBe(true);
  });

  it('should render without throwing an error', () => {
    // NOTE: render will generate static HTML from your component and return a Cheerio object
    // that can be used for traversal of that static DOM. More:
    // - https://github.com/airbnb/enzyme/blob/master/docs/api/render.md
    // - https://cheerio.js.org/
    expect(renderWithTheme(<MyComponent>Hi</MyComponent>).text()).toBe('Hi');
  });
});
