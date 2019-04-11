import React, { Component } from 'react';
import * as Coveo from 'coveo-search-ui';
import 'coveo-search-ui/bin/css/CoveoFullSearch.css';

class SearchUI extends Component<
  { organizationId: string; accessToken: string; delayMilliseconds?: number },
  { subject: string }
> {
  searchInterface: React.RefObject<HTMLDivElement>;
  searchTimeout: number;

  constructor(props) {
    super(props);

    this.state = {
      subject: '',
    };

    this.searchInterface = React.createRef();
    this.handleBuildingQuery = this.handleBuildingQuery.bind(this);
  }

  handleBuildingQuery(e, args) {
    if (this.state.subject) {
      args.queryBuilder.longQueryExpression.add(this.state.subject);
      args.queryBuilder.addContext(this.state);
    }
  }

  componentDidMount() {
    // Listen to form change event
    window['CoveoGlobalEvents'].callback = data => {
      this.setState({ subject: data.subject });
    };

    Coveo.SearchEndpoint.configureCloudV2Endpoint(this.props.organizationId, this.props.accessToken);

    Coveo.$$(this.searchInterface.current).on('buildingQuery', this.handleBuildingQuery);

    Coveo.init(this.searchInterface.current);
  }

  componentDidUpdate(prevProps, prevState) {
    clearTimeout(this.searchTimeout);

    this.searchTimeout = window.setTimeout(() => {
      Coveo.logSearchEvent(this.searchInterface.current, { name: 'inputChange', type: 'caseCreation' }, {});
      Coveo.executeQuery(this.searchInterface.current);
    }, this.props.delayMilliseconds || 1000);
  }

  render() {
    return (
      <div id="search" className="CoveoSearchInterface" data-enable-history="true" ref={this.searchInterface}>
        {this.props.children}
      </div>
    );
  }
}

class CoveoDeflection extends Component<{ organizationId: string; accessToken: string; delayMilliseconds?: number }> {
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
          <div className="coveo-search-section" />
          <div className="coveo-main-section">
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

export default CoveoDeflection;
