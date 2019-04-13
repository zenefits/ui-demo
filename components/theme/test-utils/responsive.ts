const minWidthRegex = /min-width: (\d+)px/;
const maxWidthRegex = /max-width: (\d+)px/;

export function stubWindowSize(size: number) {
  window.matchMedia = query => {
    const minWidthMatch = minWidthRegex.exec(query);
    const maxWidthMatch = maxWidthRegex.exec(query);
    const minWidth = minWidthMatch && minWidthMatch[1] ? Number(minWidthMatch[1] as String) : 0;
    const maxWidth = maxWidthMatch && maxWidthMatch[1] ? Number(maxWidthMatch[1] as String) : Infinity;
    return {
      matches: size >= minWidth && size <= maxWidth,
    } as MediaQueryList;
  };
}
