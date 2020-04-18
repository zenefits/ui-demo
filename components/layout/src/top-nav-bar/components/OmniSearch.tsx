import React, { Component } from 'react';
import gql from 'graphql-tag';
import qs from 'qs';

import { Form, FormSearchSelect } from 'z-frontend-forms';
import { getApollo, getEventLogger } from 'z-frontend-app-bootstrap';

import CustomOption from './CustomOption';
import { OmniSearchSelectOption, OmniSearchSelectOptions } from '../types';
import { OmniSearchQuery } from '../../gqlTypes';
import { getSelectOptionsFromData } from '../utils';
import { getDashboardData } from './utils/omni-search-util';
import { defaultSources, helpCenterType } from '../constants';

const omniSearchFormQuery = gql`
  query OmniSearchQuery($query: String, $sources: [OmniSearchSource!]!) {
    omniSearchSuggestion(query: $query, sources: $sources) {
      employees {
        items {
          id
          preferred_name
          name
        }
      }
      actions {
        items {
          id
          title
          link
          zAppId
        }
      }
    }
  }
`;

const eventLogger = getEventLogger();
let isFirstRender = true;
function logFirstRender() {
  if (isFirstRender) {
    isFirstRender = false;
    const duration = Date.now() - performance.timing.connectStart;
    eventLogger.log('time-to-omnisearch', { duration });
  }
}

type OmniSearchFormProps = {};
type OmniSearchFormState = {
  loading: boolean;
  selectOptions: OmniSearchSelectOptions;
};

class OmniSearch extends Component<OmniSearchFormProps, OmniSearchFormState> {
  constructor(props: OmniSearchFormProps) {
    super(props);
    this.state = {
      loading: false,
      selectOptions: [],
    };
  }

  updateOptions = async (inputValue: string) => {
    if (!inputValue) {
      return this.setState({ selectOptions: [] });
    }

    this.setState({ loading: true });

    const dashboardData = await getDashboardData();

    const { data } = await getApollo().query<OmniSearchQuery.Query>({
      query: omniSearchFormQuery,
      context: { headers: { 'IS-BACKGROUND-QUERY': true } },

      variables: {
        query: inputValue,
        sources: defaultSources,
      },
    });

    const selectOptions: OmniSearchSelectOptions = getSelectOptionsFromData(dashboardData, data.omniSearchSuggestion);

    this.setState({
      selectOptions,
      loading: false,
    });
  };

  selectHandler = (selection: OmniSearchSelectOption) => {
    if (selection.type === helpCenterType) {
      const { searchString } = selection;
      const link = `/dashboard/#/search?${qs.stringify({ q: searchString })}`;
      window.location.href = link;
    } else {
      const { link } = selection;
      if (link.startsWith('http://') || link.startsWith('https://')) {
        window.open(link);
      } else {
        window.location.href = link;
      }
    }
  };

  render() {
    const { loading } = this.state;

    logFirstRender();
    return (
      <Form onSubmit={() => {}} initialValues={{ omniSearch: '' }}>
        <FormSearchSelect<OmniSearchSelectOption>
          alwaysExpandInput
          name="omniSearch"
          onChange={(inputValue: string) => this.updateOptions(inputValue)}
          getOptionText={o => o.displayName}
          isLoading={loading}
          onSelect={this.selectHandler}
          label=""
          containerProps={{ mb: 0 }}
        >
          {({ SelectOption, withMatchEmphasis }) => {
            const { selectOptions } = this.state;

            return selectOptions.map(option => (
              <SelectOption option={option} key={option.link}>
                <CustomOption withMatchEmphasis={withMatchEmphasis} option={option} />
              </SelectOption>
            ));
          }}
        </FormSearchSelect>
      </Form>
    );
  }
}
export default OmniSearch;
