import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import querystring from 'query-string';

import { Form } from 'z-frontend-forms';

import CustomOption from './CustomOption';
import { OmniSearchSelectOption, OmniSearchSelectOptions } from '../types';
import { getSelectOptionsFromData } from '../utils';
import { defaultSources, helpCenterType } from '../constants';

const omniSearchFormQuery = gql`
  query OmniSearchFormQuery($query: String, $sources: [OmniSearchSource!]!) {
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
      help {
        items {
          title
          link
        }
      }
    }
  }
`;

type OmniSearchFormProps = {
  dashboardData: any;
};

type OmniSearchFormState = {
  loading: boolean;
  selectOptions: OmniSearchSelectOptions;
};

class OmniSearchForm extends Component<OmniSearchFormProps, OmniSearchFormState> {
  constructor(props: OmniSearchFormProps) {
    super(props);
    this.state = {
      loading: false,
      selectOptions: [],
    };
  }

  updateOptions = async (inputValue: string, query: any) => {
    if (!inputValue) {
      return this.setState({ selectOptions: [] });
    }

    this.setState({ loading: true });

    const { data } = await query({
      query: omniSearchFormQuery,
      variables: {
        query: inputValue,
        sources: defaultSources,
      },
    });

    const selectOptions: OmniSearchSelectOptions = getSelectOptionsFromData(
      this.props.dashboardData,
      data.omniSearchSuggestion,
    );

    this.setState({
      selectOptions,
      loading: false,
    });
  };

  selectHandler = (selection: OmniSearchSelectOption) => {
    if (selection.type === helpCenterType) {
      const searchString = selection.searchString;
      const link = `/dashboard/#/search?${querystring.stringify({ q: searchString })}`;
      window.location.href = link;
    } else {
      const link = selection.link;
      if (link.startsWith('http://') || link.startsWith('https://')) {
        window.open(link);
      } else {
        window.location.href = link;
      }
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <ApolloConsumer>
        {client => {
          return (
            <Form onSubmit={() => {}} initialValues={{ omniSearch: '' }}>
              <Form.SearchSelect<OmniSearchSelectOption>
                alwaysExpandInput
                name="omniSearch"
                onChange={(inputValue: string) => this.updateOptions(inputValue, client.query)}
                getOptionText={o => o.displayName}
                isLoading={loading}
                onSelect={this.selectHandler}
                label=""
                containerProps={{ mb: 0 }}
              >
                {({ SelectOption, withMatchEmphasis, inputValue }) => {
                  const selectOptions = this.state.selectOptions;

                  // add the last option to search in help center
                  const lastOption = selectOptions[selectOptions.length - 1];
                  if (inputValue && ((lastOption && lastOption.type !== helpCenterType) || !lastOption)) {
                    selectOptions.push({ type: helpCenterType, searchString: inputValue });
                  }

                  return selectOptions.map((option, i) => (
                    <SelectOption option={option} key={i}>
                      <CustomOption withMatchEmphasis={withMatchEmphasis} option={option} />
                    </SelectOption>
                  ));
                }}
              </Form.SearchSelect>
            </Form>
          );
        }}
      </ApolloConsumer>
    );
  }
}
export default OmniSearchForm;
