const { max, min, ceil } = Math;

export const doPage = <T>(items: T[], pageSize: number, currentPage: number): T[] => {
  if (!currentPage || pageSize === Infinity) {
    return items;
  }

  const totalPages = ceil(items.length / pageSize);
  const pageNum = max(min(currentPage, totalPages), 1);
  const start = pageSize * (pageNum - 1);
  return items.slice(start, start + pageSize);
};
