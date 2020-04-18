import React from 'react';

import { Selections } from './utils';

export interface SelectionContext<T> {
  selections: Selections<T>;
  selectionCount: number;
  allDisplayedDataIsSelected: boolean;
  anyDisplayedDataIsSelected: boolean;
  onSelect: (addedSelections: T[]) => void;
  onDeselect: (removedSelections: T[]) => void;
  selectionKey: keyof T;
}

export const RowSelectionContext = React.createContext<SelectionContext<any>>(null);
