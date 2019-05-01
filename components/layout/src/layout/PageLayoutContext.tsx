import React from 'react';

export type PageLayoutColumns = '2-8-2' | '8-4' | '12';

export type PageLayoutContext = {
  columns: PageLayoutColumns;
};

export const PageLayoutContext = React.createContext<PageLayoutContext>({ columns: '12' });
