import React from 'react';

export type GenericDataManagerContextType = {
  data: any;
  loading: boolean;
  totalItemsCount?: number;
};

export default React.createContext<GenericDataManagerContextType>({ data: null, loading: false });
