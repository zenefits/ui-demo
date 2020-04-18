import React, { FunctionComponent } from 'react';

import Pager from '../Pager';
import { UrlQueryParamsContext } from '../UrlQueryParamsManager';
import GenericDataManagerContext from '../GenericDataManagerContext';

type UrlPagerProps = {
  totalItemsCount?: number;
};

const UrlPager: FunctionComponent<UrlPagerProps> = ({ totalItemsCount }) => {
  const { queryParams, updateQueryParams } = React.useContext(UrlQueryParamsContext);
  // This is needed when using DataTable with DataLayout
  const { totalItemsCount: itemsCountFromContext, loading } = React.useContext(GenericDataManagerContext);

  if (loading) {
    return null;
  }
  return (
    <Pager
      s="small"
      pageSize={queryParams.pageSize}
      currentPage={queryParams.currentPage}
      totalItemsCount={totalItemsCount || itemsCountFromContext}
      onPageChange={page => {
        updateQueryParams({ currentPage: page });
      }}
    />
  );
};

export default UrlPager;
