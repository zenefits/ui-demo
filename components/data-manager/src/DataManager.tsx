import React, { Component } from 'react';
import _ from 'lodash';

const doFilter = (items, filterDescriptor) => {
  const filterKeys = Object.keys(filterDescriptor);
  if (filterKeys.length === 0) {
    return items;
  }

  return _.filter(items, item => _.every(filterKeys, key => passesFilter(filterDescriptor[key], item[key])));
};

const passesFilter = (filter, value) => {
  const matchAnySet = new Set(filter['matchAny']);
  if (matchAnySet.size && !matchAnySet.has(value)) {
    return false;
  }

  const substring = filter['stringContains'];
  if (substring && value && !value.toLocaleLowerCase().includes(substring.toLocaleLowerCase())) {
    return false;
  }

  return true;
};

export const updateFilters = (filterDescriptor, type, key, value, addFilter) => {
  const filters = _.cloneDeep(filterDescriptor);
  if (!(key in filters)) {
    filters[key] = {};
  }

  if (type === 'matchAny') {
    const matchSet = new Set(filters[key]['matchAny']);
    matchSet[addFilter ? 'add' : 'delete'](value);
    filters[key]['matchAny'] = [...matchSet];
  }

  if (type === 'stringContains') {
    filters[key]['stringContains'] = value;
  }

  return filters;
};

export default class DataManager extends Component<any, any> {
  constructor(props) {
    super(props);
    const filterDescriptor = props.filterDescriptor || {};
    const filteredData = doFilter(props.sourceData || [], filterDescriptor);

    this.state = {
      filterDescriptor,
      filteredData,
      onFilterChange: this.onFilterChange,
    };
  }

  onFilterChange = newFilterDesc =>
    this.setState({
      filterDescriptor: newFilterDesc,
      filteredData: doFilter(this.props.sourceData || [], newFilterDesc),
    });

  render() {
    return this.props.children(this.state);
  }
}
