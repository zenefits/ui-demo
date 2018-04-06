import React from 'react';
import { renderWithTheme } from 'z-frontend-theme/test-utils/theme';
import Drawer from './Drawer';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Drawer', () => {
  it('should render Drawer without throwing an error', () => {
    expect(renderWithTheme(<Drawer />).text()).toEqual('zenefits');
  });

  it('should render Drawer.Section without throwing an error', () => {
    expect(renderWithTheme(<Drawer.Section>Hi</Drawer.Section>).text()).toEqual('Hi');
  });

  it('should render Drawer.Link without throwing an error', () => {
    expect(renderWithTheme(<Drawer.Link>Hi</Drawer.Link>).text()).toEqual('Hi');
  });

  it('should render Drawer.NavLink without throwing an error', () => {
    expect(
      renderWithTheme(
        <Router>
          <Drawer.NavLink to="/stuff">Hi</Drawer.NavLink>
        </Router>,
      ).text(),
    ).toEqual('Hi');
  });
});
