export type Selections<T> = Set<T[keyof T]>;

type DisplayedDataSelectedParams<T> = {
  data: T[];
  selections: Selections<T>;
  selectionKey: keyof T;
};

export function getSelectionCount<T>({ data, selections, selectionKey }: DisplayedDataSelectedParams<T>) {
  if (!selectionKey) {
    return 0;
  }
  return data.filter((datum: T) => selections.has(datum[selectionKey])).length;
}
