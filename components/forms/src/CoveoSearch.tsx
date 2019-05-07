import React, { Component } from 'react';
import * as Coveo from 'coveo-search-ui';
import 'coveo-search-ui/bin/css/CoveoFullSearch.css';
import CoveoSearchbox from './CoveoSearchbox';
import './CoveoSearch.css';

type CoveoSearchProps = {
  organizationId: string;
  accessToken: string;
  searchbox?: React.RefObject<CoveoSearchbox>;
};

class SearchUI extends Component<CoveoSearchProps> {
  searchInterface: React.RefObject<HTMLDivElement>;

  constructor(props: CoveoSearchProps) {
    super(props);
    this.searchInterface = React.createRef();
  }

  registerEventHandlers() {
    const searchInterface = Coveo.$$(this.searchInterface.current);
    const resultTitle = Coveo.$$(document.querySelector('.CustomCoveoResultTitle') as HTMLElement);

    searchInterface.on('querySuccess', (e, args) => {
      if (args.results.totalCount > 0) {
        resultTitle.el.innerHTML = 'Showing Help Center Results';
      } else {
        resultTitle.el.innerHTML = 'No Results';
      }
      if (args.query.q !== undefined) {
        resultTitle.el.innerHTML += ' for ' + args.query.q;
      }
      resultTitle.el.style.display = 'block';
    });
  }

  componentDidMount() {
    Coveo.SearchEndpoint.configureCloudV2Endpoint(this.props.organizationId, this.props.accessToken);

    // initialize the search box as an external component if found
    const options = this.props.searchbox && this.props.searchbox.current
      ? {
          externalComponents: [this.props.searchbox.current.getSearchInterface()],
        }
      : {};
    
    this.registerEventHandlers();
    
    Coveo.init(this.searchInterface.current, options);
  }

  render() {
    return (
      <div id="search" className="CoveoSearchInterface" data-enable-history="false" ref={this.searchInterface}>
        {this.props.children}
      </div>
    );
  }
}

class CoveoSearch extends Component<CoveoSearchProps> {
  componentDidMount() {
    Coveo.TemplateCache.registerTemplate("default", Coveo.HtmlTemplate.fromString(`
      <div class='coveo-result-frame'>
        <div class='coveo-result-row' style='padding-bottom: 10px;'>
          <a class='CoveoResultLink'></a>
        </div>
        <div class='coveo-result-row'>
          <div class='CoveoExcerpt'></div>
        </div>
      </div>
      `, {
        condition: null,
        layout: "list",
        fieldsToMatch: null,
        mobile: null,
        role: null
      }), true, true);
  }

  render() {
    return (
      <div>
        <SearchUI {...this.props}>
          <div className="CoveoAnalytics" />
          <div className="coveo-main-section">
            <div className="coveo-results-column">
              <div className="CoveoShareQuery" />
              <div className="CoveoPreferencesPanel">
                <div className="CoveoResultsPreferences" />
                <div className="CoveoResultsFiltersPreferences" />
              </div>
              <div className="CoveoTriggers" />
              <div className="CoveoBreadcrumb" />
              <div className="coveo-result-header">
                <div className="coveo-summary-section">
                  <span className="CustomCoveoResultTitle" />
                  <div className="CoveoDidYouMean" />
                </div>
                <div className="coveo-result-layout-section">
                  <span className="CoveoResultLayout" />
                </div>
              </div>
              <div className="CoveoHiddenQuery" />
              <div className="CoveoErrorReport" data-pop-up="false" />
              <div
                className="CoveoResultList"
                data-layout="list"
                data-wait-animation="fade"
                data-auto-select-fields-to-include="false"
              />
              <div className="coveo-result-footer">
                <span
                  className="CoveoQuerySummary"
                  data-enable-cancel-last-action="false"
                  data-enable-no-results-found-message="false"
                  data-enable-search-tips="false" />
                <div className="CoveoPager" />
              </div>
            </div>
          </div>
        </SearchUI>
      </div>
    );
  }
}

export default CoveoSearch;
