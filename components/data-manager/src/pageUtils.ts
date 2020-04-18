const { max, min, ceil } = Math;

export type PageConfig = {
  pageSize: number;
  currentPage: number;
};
export const doPage = <T>(items: T[], config: PageConfig): T[] => {
  const currentPage = config.currentPage || 1;
  const pageSize = config.pageSize || Infinity;

  if (!currentPage || pageSize === Infinity) {
    return items;
  }

  const totalPages = ceil(items.length / pageSize);
  const pageNum = max(min(currentPage, totalPages), 1);
  const start = pageSize * (pageNum - 1);
  return items.slice(start, start + pageSize);
};
