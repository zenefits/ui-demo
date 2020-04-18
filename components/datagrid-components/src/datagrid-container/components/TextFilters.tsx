import React from 'react';

import { DataFilter } from 'z-frontend-data-manager';

import { Filter } from '../../types';

type TextFiltersProps = {
  filters: Filter[];
};

class TextFilters extends React.Component<TextFiltersProps> {
  render() {
    return this.props.filters.map((filter: Filter) => <DataFilter.Text key={filter.dataKey} {...filter} />);
  }
}

export default TextFilters;
