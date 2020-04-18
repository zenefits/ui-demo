import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'jest-styled-components';
import { cleanup, fireEvent } from '@testing-library/react';

import { renderEnzymeWithTheme, renderWithContext } from 'z-frontend-theme/test-utils/theme';

import Drawer from './Drawer';

describe('Drawer', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render Drawer without throwing an error', () => {
    expect(renderEnzymeWithTheme(<Drawer onClose={() => ({})} />).text()).toEqual('zenefits');
  });

  it('should render Drawer.Section without throwing an error', () => {
    expect(renderEnzymeWithTheme(<Drawer.Section>Title</Drawer.Section>).text()).toEqual('Title');
  });

  it('should render Drawer.Link without throwing an error', () => {
    expect(renderEnzymeWithTheme(<Drawer.Link>Dashboard</Drawer.Link>).text()).toEqual('Dashboard');
  });

  it('should render Drawer.OpenButton without throwing an error', () => {
    renderWithContext(<Drawer.OpenButton onOpen={() => ({})}>Dashboard</Drawer.OpenButton>).getByLabelText(
      'Open navigation menu',
    );
  });

  it('should render Drawer.NavLink without throwing an error', () => {
    expect(
      renderEnzymeWithTheme(
        <Router>
          <Drawer.NavLink to="/dashboard">Dashboard</Drawer.NavLink>
        </Router>,
      ).text(),
    ).toEqual('Dashboard');
  });

  it('Drawer.OpenButton fires callback on click', () => {
    const onOpen = jest.fn();
    const drawer = renderWithContext(<Drawer.OpenButton onOpen={onOpen} />);

    fireEvent.click(drawer.getByLabelText('Open navigation menu'));
    expect(onOpen).toBeCalledTimes(1);
  });

  it('should close when clicking a link', () => {
    const onClose = jest.fn();
    const wrapper = renderWithContext(
      <Router>
        <Drawer show onClose={onClose}>
          <Drawer.Link to="/dashboard">Dashboard</Drawer.Link>
        </Drawer>
      </Router>,
    );

    fireEvent.click(wrapper.getByText('Dashboard'));
    expect(onClose).toBeCalledTimes(1);
  });

  it('should not close when clicking a section title', () => {
    const onClose = jest.fn();
    const wrapper = renderWithContext(
      <Drawer show onClose={onClose}>
        <Drawer.Section title="Section 1">
          <Drawer.Link href="/dashboard">Dashboard</Drawer.Link>
        </Drawer.Section>
      </Drawer>,
    );

    fireEvent.click(wrapper.getByText('Section 1'));
    expect(onClose).toBeCalledTimes(0);
  });
});
