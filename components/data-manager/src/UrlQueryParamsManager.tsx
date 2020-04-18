import React from 'react';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import { FILTER_PREFIX } from './url-filters/urlFilterUtils';

type PageSize = 5 | 10 | 25 | 50 | 100;

export type QueryParams = {
  [key: string]: string | string[] | number | number[];
  // TODO: This component should not know specific keys such as these for pagination.
  pageSize?: PageSize;
  currentPage?: number;
};

export type UpdateQueryParamsFn = (updates: QueryParams) => void;

export const updateQueryParams = (params: URLSearchParams, updates: QueryParams, isReset: boolean) => {
  const appendStringOrNumber = (key: string, el: string | number) => {
    if (typeof el === 'number') {
      params.append(key, el.toString());
    } else {
      params.append(key, el);
    }
  };

  if (Object.keys(updates).length === 0) {
    // reset the pagination on reset Filter
    params.set('currentPage', '1');
  }

  Object.keys(updates).forEach(key => {
    // reset the pagination on filterChange
    if (key.startsWith(FILTER_PREFIX)) {
      params.set('currentPage', '1');
    }
    const value = updates[key];
    params.delete(key);
    if (Array.isArray(value)) {
      // We are using key repeat message with [] suffix to
      // a.) keep URL readable
      // b.) be able to distinguish between arrays with one element and non-array elements
      params.delete(`${key}[]`);
      // This is needed for clearing the default filters when we manually change them
      // except the case of reset where we need to preserve the defaults
      if (value.length === 0 && !isReset) {
        appendStringOrNumber(`${key}[]`, '');
      }
      value.forEach((el: string | number) => {
        appendStringOrNumber(`${key}[]`, el);
      });
    } else if (value !== undefined && value !== null) {
      appendStringOrNumber(key, value);
    } else {
      // For date and text filters we set the values to null when they are empty
      appendStringOrNumber(key, '');
    }
  });
};

export const convertType = (val: string, baseKey: string, numberKeys: string[]): string | number => {
  // we are appending the Filter Prefix in the numberKeys[] to avoid passing keys like ['filter_department']
  // if the params matches with the values in the numberKey we convert the value to number
  if (numberKeys.length > 0) {
    // if the numberKey matches with the params then convert the value to number
    if (numberKeys.includes(baseKey)) {
      return Number(val);
    } else {
      // else append the filter prefix and check if the number key matches with the params
      let convertedValue;
      numberKeys.forEach(key => {
        if (`filter_${key}` === baseKey) {
          convertedValue = Number(val);
        } else {
          convertedValue = val;
        }
      });
      return convertedValue;
    }
  } else {
    // if there are no number keys then don't convert the value
    return val;
  }
};

export const parseParamsIntoObject = (params: URLSearchParams, defaults: QueryParams, numberKeys: string[]) => {
  const paramsObject = { ...defaults };

  params.forEach((value, key) => {
    const isArrayKey = key.endsWith('[]');
    const baseKey = isArrayKey ? key.slice(0, key.length - 2) : key;
    if (isArrayKey) {
      const paramsValue = params.getAll(key);
      paramsObject[baseKey] =
        paramsValue.length > 0 && paramsValue[0]
          ? (params.getAll(key).map(value => convertType(value, baseKey, numberKeys)) as string[])
          : null;
    } else if (baseKey === 'currentPage') {
      paramsObject[baseKey] = Number(value);
    } else {
      paramsObject[baseKey] = convertType(value, baseKey, numberKeys);
    }
  });

  return paramsObject;
};

export const UrlQueryParamsContext = React.createContext<{
  queryParams: QueryParams;
  updateQueryParams: (updates: QueryParams, isReset?: boolean) => void;
}>({
  queryParams: {},
  updateQueryParams: () => {},
});

type UrlQueryParamsOwnProps = {
  /**
   * If the query param is missing from the URL, these values will be used for the
   * missing values when parsing the URL
   */
  defaults?: Partial<QueryParams>;
  /**
   * These url param keys will be parsed as numbers, not strings
   */
  numberKeys?: string[];
};

const paginationDefaults: { pageSize: PageSize; currentPage: number } = {
  pageSize: 25,
  currentPage: 1,
};

export type UrlQueryParamsProps = UrlQueryParamsOwnProps & RouteComponentProps<{}>;

/**
 * UrlQueryParamsManager reads query params from URL, parses the data into an object and exposes it through
 * UrlQueryParamsContext.
 *
 * The context also exposes a method to update query params.
 *
 * Currently this component is not totally generic. It knows about specific keys for pagination, such as "pageSize" and
 * "currentPage", also knows about filtering and sorting prefixes.
 * It might make sense to make it generic, not knowing any specific keys.
 */
class UrlQueryParamsManager extends React.Component<UrlQueryParamsProps> {
  static defaultProps = {
    numberKeys: [] as string[],
    filterDefaults: {},
  };

  updateQueryParams = (updates: QueryParams, isReset = false) => {
    const params = new URLSearchParams(this.props.location.search);
    updateQueryParams(params, updates, isReset);
    this.props.history.push(`${this.props.location.pathname}?${params.toString()}`);
  };

  render() {
    const { defaults, numberKeys } = this.props;

    const params = new URLSearchParams(this.props.location.search);

    /**
     * TODO: Setting defaults should not be a concern of UrlQueryParamsManager
     */
    const queryParamsDefaults: QueryParams = {
      ...paginationDefaults,
      ...defaults,
    };

    const queryParamsState = parseParamsIntoObject(params, queryParamsDefaults, numberKeys);

    return (
      <UrlQueryParamsContext.Provider
        value={{
          queryParams: queryParamsState,
          updateQueryParams: this.updateQueryParams,
        }}
      >
        {this.props.children}
      </UrlQueryParamsContext.Provider>
    );
  }
}

export default withRouter<UrlQueryParamsOwnProps>(UrlQueryParamsManager);
