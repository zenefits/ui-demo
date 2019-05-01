import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'jest-styled-components';

import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';
import { IconButton } from 'z-frontend-elements';

import Drawer from './Drawer';

describe('Drawer', () => {
  it('should render Drawer without throwing an error', () => {
    expect(renderWithTheme(<Drawer />).text()).toEqual('zenefits');
  });

  it('should render Drawer.Section without throwing an error', () => {
    expect(renderWithTheme(<Drawer.Section>Title</Drawer.Section>).text()).toEqual('Title');
  });

  it('should render Drawer.Link without throwing an error', () => {
    expect(renderWithTheme(<Drawer.Link>Dashboard</Drawer.Link>).text()).toEqual('Dashboard');
  });

  it('should render Drawer.NavLink without throwing an error', () => {
    expect(
      renderWithTheme(
        <Router>
          <Drawer.NavLink to="/dashboard">Dashboard</Drawer.NavLink>
        </Router>,
      ).text(),
    ).toEqual('Dashboard');
  });

  it('should be hidden by default', () => {
    const wrapper = mountWithTheme(
      <Drawer>
        <Drawer.Link href="/dashboard">Dashboard</Drawer.Link>
      </Drawer>,
    );
    expect(wrapper.state('isVisible')).toBe(false);
  });

  it('should open when clicking the icon', () => {
    const wrapper = mountWithTheme(
      <Drawer>
        <Drawer.Link href="/dashboard">Dashboard</Drawer.Link>
      </Drawer>,
    );
    wrapper
      .find(IconButton)
      .first()
      .simulate('click');
    expect(wrapper.state('isVisible')).toBe(true);
  });

  it('should close when clicking a link', () => {
    const wrapper = mountWithTheme(
      <Drawer show>
        <Drawer.Link href="/dashboard">Dashboard</Drawer.Link>
      </Drawer>,
    );
    expect(wrapper.state('isVisible')).toBe(true);
    wrapper.find(Drawer.Link).simulate('click');
    expect(wrapper.state('isVisible')).toBe(false);
  });

  it('should not close when clicking a section title', () => {
    const wrapper = mountWithTheme(
      <Drawer show>
        <Drawer.Section title="Section 1">
          <Drawer.Link href="/dashboard">Dashboard</Drawer.Link>
        </Drawer.Section>
      </Drawer>,
    );
    wrapper.find(Drawer.Section).simulate('click');
    expect(wrapper.state('isVisible')).toBe(true);
  });
});
