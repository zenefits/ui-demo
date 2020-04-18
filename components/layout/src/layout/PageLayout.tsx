import React, { Component } from 'react';

import { LoadingScreen } from 'z-frontend-elements';

import { PageLayoutColumns, PageLayoutContext } from './PageLayoutContext';
import { AppContentContainerFlex } from '../../index';
import PageLayoutNav from './PageLayoutNav';
import PageLayoutMain from './PageLayoutMain';
import PageLayoutAside from './PageLayoutAside';
import { rowSpacing } from './pageLayoutHelpers';

export { rowSpacing };

interface PageLayoutProps {
  mode: 'fixed' | 'fluid';
  columns: PageLayoutColumns;
  isLoading?: boolean;
}

class PageLayout extends Component<PageLayoutProps> {
  static defaultProps = {
    isLoading: false,
  };

  static Nav = PageLayoutNav;
  static Main = PageLayoutMain;
  static Aside = PageLayoutAside;

  render() {
    const { mode, columns, isLoading, children } = this.props;
    if (isLoading) {
      return <LoadingScreen />;
    }

    return (
      <PageLayoutContext.Provider value={{ columns }}>
        <AppContentContainerFlex isFullWidth={mode === 'fluid'} wrap>
          {children}
        </AppContentContainerFlex>
      </PageLayoutContext.Provider>
    );
  }
}

export default PageLayout;
