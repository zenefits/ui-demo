import React, { Component } from 'react';
import * as Coveo from 'coveo-search-ui';
import 'coveo-search-ui/bin/css/CoveoFullSearch.css';

class SearchUI extends Component {
  
  componentDidMount() {
    Coveo.SearchEndpoint.configureSampleEndpointV2();
    Coveo.init(this.refs.searchInterface as HTMLElement);
  }
  
  render() {
    return (
      <div id="search" className="CoveoSearchInterface" data-enable-history="true" ref="searchInterface">
        {this.props.children}
      </div>
    );
  }
}

class CoveoSearch extends Component {

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
        <SearchUI>
          <div className="CoveoAnalytics"/>
          <div className="coveo-tab-section">
            <a className="CoveoTab" data-id="All" data-caption="All Content"/>
          </div>
          <div className="coveo-search-section">
            <div className="CoveoSettings"/>
            <div className="CoveoSearchbox" data-enable-omnibox="true"/>
          </div>
          <div className="coveo-main-section">
            <div className="coveo-facet-column">
              <div className="CoveoFacet" data-title="Type" data-field="@objecttype" data-tab="All"/>
              <div className="CoveoFacet" data-title="FileType" data-field="@filetype" data-tab="All"/>
              <div className="CoveoFacet" data-title="Author" data-field="@author" data-tab="All"/>
            </div>
            <div className="coveo-results-column">
              <div className="CoveoShareQuery"/>
              <div className="CoveoPreferencesPanel">
                <div className="CoveoResultsPreferences"/>
                <div className="CoveoResultsFiltersPreferences"/>
              </div>
              <div className="CoveoTriggers"/>
              <div className="CoveoBreadcrumb"/>
              <div className="CoveoDidYouMean"/>
              <div className="coveo-results-header">
                <div className="coveo-summary-section">
                  <span className="CoveoQuerySummary"/>
                  <span className="CoveoQueryDuration"/>
                </div>
                <div className="coveo-result-layout-section">
                  <span className="CoveoResultLayout"/>
                </div>
                <div className="coveo-sort-section">
                  <span className="CoveoSort" data-sort-criteria="relevancy" data-caption="Relevance"/>
                  <span className="CoveoSort" data-sort-criteria="date descending,date ascending" data-caption="Date"/>
                </div>
              </div>
              <div className="CoveoHiddenQuery"/>
              <div className="CoveoErrorReport" data-pop-up="false"/>
              <div className="CoveoResultList" data-layout="list" data-wait-animation="fade" data-auto-select-fields-to-include="false">
                  <script className='result-template' type='text/underscore' dangerouslySetInnerHTML={{ __html: this.getTemplateContent() }}/>
              </div>
              <div className="CoveoPager"/>
              <div className="CoveoLogo"/>
              <div className="CoveoResultsPerPage"/>
            </div>
          </div>
        </SearchUI>
      </div>
    );
  }
}

export default CoveoSearch;