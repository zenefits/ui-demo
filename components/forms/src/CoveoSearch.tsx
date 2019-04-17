import React, { Component } from 'react';
import * as Coveo from 'coveo-search-ui';
import 'coveo-search-ui/bin/css/CoveoFullSearch.css';

class SearchUI extends Component<{ organizationId: string; accessToken: string }> {
  searchInterface: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.searchInterface = React.createRef();
  }

  componentDidMount() {
    Coveo.SearchEndpoint.configureCloudV2Endpoint(this.props.organizationId, this.props.accessToken);

    // initialize the search box as an external component if found
    const options = window['CoveoSearchbox']
      ? {
          externalComponents: [window['CoveoSearchbox'].getSearchInterface()],
        }
      : {};

    Coveo.init(this.searchInterface.current, options);
  }

  render() {
    return (
      <div id="search" className="CoveoSearchInterface" data-enable-history="true" ref={this.searchInterface}>
        {this.props.children}
      </div>
    );
  }
}

class CoveoSearch extends Component<{ organizationId: string; accessToken: string }> {
  getTemplateContent() {
    return `
       <div class='coveo-result-frame'>
           <div class='coveo-result-row'>
             <a class='CoveoResultLink'></a>
           </div>
           <div class='coveo-result-row'>
             <div class='CoveoExcerpt'></div>
           </div>
       </div>
      `;
  }

  render() {
    return (
      <div>
        <SearchUI {...this.props}>
          <div className="CoveoAnalytics" />
          <div className="coveo-tab-section">
            <a className="CoveoTab" data-id="All" data-caption="All Content" />
          </div>
          <div className="coveo-search-section" />
          <div className="coveo-main-section">
            <div className="coveo-facet-column">
              <div className="CoveoFacet" data-title="Type" data-field="@objecttype" data-tab="All" />
              <div className="CoveoFacet" data-title="FileType" data-field="@filetype" data-tab="All" />
              <div className="CoveoFacet" data-title="Author" data-field="@author" data-tab="All" />
            </div>
            <div className="coveo-results-column">
              <div className="CoveoShareQuery" />
              <div className="CoveoPreferencesPanel">
                <div className="CoveoResultsPreferences" />
                <div className="CoveoResultsFiltersPreferences" />
              </div>
              <div className="CoveoTriggers" />
              <div className="CoveoBreadcrumb" />
              <div className="CoveoDidYouMean" />
              <div className="coveo-results-header">
                <div className="coveo-summary-section">
                  <span className="CoveoQuerySummary" />
                  <span className="CoveoQueryDuration" />
                </div>
                <div className="coveo-result-layout-section">
                  <span className="CoveoResultLayout" />
                </div>
                <div className="coveo-sort-section">
                  <span className="CoveoSort" data-sort-criteria="relevancy" data-caption="Relevance" />
                  <span className="CoveoSort" data-sort-criteria="date descending,date ascending" data-caption="Date" />
                </div>
              </div>
              <div className="CoveoHiddenQuery" />
              <div className="CoveoErrorReport" data-pop-up="false" />
              <div
                className="CoveoResultList"
                data-layout="list"
                data-wait-animation="fade"
                data-auto-select-fields-to-include="false"
              >
                <script
                  className="result-template"
                  type="text/underscore"
                  dangerouslySetInnerHTML={{ __html: this.getTemplateContent() }}
                />
              </div>
              <div className="CoveoPager" />
              <div className="CoveoLogo" />
              <div className="CoveoResultsPerPage" />
            </div>
          </div>
        </SearchUI>
      </div>
    );
  }
}

export default CoveoSearch;
