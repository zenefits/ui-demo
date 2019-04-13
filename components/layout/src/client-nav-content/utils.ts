type QueryParams = { [key: string]: string };

export type ParsedZenefitsUrl =
  | string
  | {
      route: string;
      params: { queryParams: QueryParams } | null;
    };

export const parseZenefitsUrl = (url: string): ParsedZenefitsUrl => {
  const getQueryParams = (a: string[]) => {
    const b: QueryParams = {};
    for (let i = 0; i < a.length; i += 1) {
      const p = a[i].split('=');
      if (p.length === 2) {
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
      }
    }
    return b;
  };

  const matches = url.match(/^zenefits:\/\/client\/(.*)/);
  if (!matches) {
    return url;
  }

  const queryParams = matches[1].indexOf('?') !== -1 ? getQueryParams(matches[1].split('?')[1].split('&')) : {};

  return {
    route: matches[1].replace(/\//g, '.').split('?')[0],
    params: Object.keys(queryParams).length ? { queryParams } : null,
  };
};
