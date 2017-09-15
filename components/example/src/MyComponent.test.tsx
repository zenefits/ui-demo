import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ThemeProvider from 'z-frontend-theme/src/ThemeProvider';
import MyComponent from './MyComponent';

const theme = { colors: { primary: { orange100: 'orange' } } };
describe('A suite', () => {
  it('should shallow render without throwing an error', () => {
    // NOTE: a shallow render is useful for unit tests (don't depend on children)
    // it also avoids component the lifecycle by default.
    // more: https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
    expect(
      shallow(<MyComponent>Hi</MyComponent>)
        .children()
        .text(),
    ).toEqual('Hi');
  });

  it('should mount without throwing an error', () => {
    // NOTE: mount is useful where your component or test interact with DOM APIs and needs
    // the full lifecycle. More: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md
    // This is useful for simulating clicks
    expect(
      mount(
        <ThemeProvider>
          <MyComponent>Hi</MyComponent>
        </ThemeProvider>,
      ).text(),
    ).toEqual('Hi');
    // expect(<MyComponent >Hi</MyComponent>)).contains(<span className="foo">Bar</span>)).toBe(true);
  });

  it('should render without throwing an error', () => {
    // NOTE: render will generate static HTML from your component and return a Cheerio object
    // that can be used for travesal of that static DOM. More:
    // - https://github.com/airbnb/enzyme/blob/master/docs/api/render.md
    // - https://cheerio.js.org/
    expect(
      render(
        <ThemeProvider>
          <MyComponent>Hi</MyComponent>
        </ThemeProvider>,
      ).text(),
    ).toEqual('Hi');
  });
});
