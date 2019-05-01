import React from 'react';
import { cleanup } from 'react-testing-library';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import PageLayout from './PageLayout';

afterEach(cleanup);

describe('PageLayout', () => {
  it('should render 2-8-2', () => {
    const wrapper = renderWithContext(
      <PageLayout mode="fixed" columns="2-8-2">
        <PageLayout.Nav>Nav content</PageLayout.Nav>
        <PageLayout.Main>Main content</PageLayout.Main>
        <PageLayout.Aside>Aside content</PageLayout.Aside>
      </PageLayout>,
    );
    wrapper.getByText('Nav content');
    wrapper.getByText('Main content');
    wrapper.getByText('Aside content');
  });

  it('should render 12', () => {
    const wrapper = renderWithContext(
      <PageLayout mode="fixed" columns="12">
        <PageLayout.Main>Main content</PageLayout.Main>
      </PageLayout>,
    );
    wrapper.getByText('Main content');

    const navSection = wrapper.queryByText('Nav content');
    expect(navSection).toBeNull();
  });

  it('should throw if trying to use inappropriate child', () => {
    function tryRender() {
      renderWithContext(
        <PageLayout mode="fixed" columns="12">
          <PageLayout.Nav>Main content</PageLayout.Nav>
          <PageLayout.Main>Main content</PageLayout.Main>
        </PageLayout>,
      );
    }
    expect(tryRender).toThrowError(/Trying to render unsupported PageLayout section/);
  });
});
