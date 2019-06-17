import React, { Component } from 'react';
import * as Coveo from 'coveo-search-ui';
import 'coveo-search-ui/bin/css/CoveoFullSearch.css';

type CoveoDeflectionSearchProps = {
  subject: string;
  organizationId: string;
  accessToken: string;
  delayMilliseconds?: number;
};

class SearchUI extends Component<CoveoDeflectionSearchProps> {
  searchInterface: React.RefObject<HTMLDivElement>;
  searchTimeout: number;
  shouldLogOnUnload: boolean;

  constructor(props: CoveoDeflectionSearchProps) {
    super(props);
    this.searchInterface = React.createRef();
    this.shouldLogOnUnload = true;
    this.onUnload = this.onUnload.bind(this);
    this.handleBuildingQuery = this.handleBuildingQuery.bind(this);
  }

  handleBuildingQuery(e: Event, args: Coveo.IBuildingQueryEventArgs) {
    if (this.props.subject) {
      args.queryBuilder.longQueryExpression.add(this.props.subject);
      args.queryBuilder.addContext({
        subject: this.props.subject
      });
    }
  }

  logCancelButtonEvent() {
    Coveo.logCustomEvent(this.searchInterface.current, {
      name: 'cancelButton',
      type: 'caseCreation'
    }, {});

    // Don't log an unload page event since we cancelled the case
    this.shouldLogOnUnload = false;
  }

  logSubmitButtonEvent() {    
    Coveo.logCustomEvent(this.searchInterface.current, {
      name: 'submitButton',
      type: 'caseCreation'
    }, {});

    // Don't log an unload page event since we submitted the case
    this.shouldLogOnUnload = false;
  }

  onUnload() {
    if (this.shouldLogOnUnload) {
      Coveo.logCustomEvent(this.searchInterface.current, {
        name: 'unloadPage',
        type: 'caseCreation'
      }, {});
    }
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnload);

    Coveo.SearchEndpoint.configureCloudV2Endpoint(this.props.organizationId, this.props.accessToken);
    Coveo.$$(this.searchInterface.current).on('buildingQuery', this.handleBuildingQuery);
    Coveo.init(this.searchInterface.current);
  }

  componentDidUpdate() {
    clearTimeout(this.searchTimeout);

    this.searchTimeout = window.setTimeout(() => {
      Coveo.logSearchEvent(this.searchInterface.current, {
        name: 'inputChange',
        type: 'caseCreation'
      }, {});
      Coveo.executeQuery(this.searchInterface.current);
    }, this.props.delayMilliseconds || 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.searchTimeout);

    window.removeEventListener('beforeunload', this.onUnload);
    Coveo.$$(this.searchInterface.current).off('buildingQuery', this.handleBuildingQuery);
  }

  render() {
    return (
      <div id="search" className="CoveoSearchInterface" data-enable-history="false" data-results-per-page="4" ref={this.searchInterface}>
        {this.props.children}
      </div>
    );
  }
}

class CoveoDeflection extends Component<CoveoDeflectionSearchProps> {
  child: React.RefObject<SearchUI>;

  constructor(props: CoveoDeflectionSearchProps) {
    super(props);
    this.child = React.createRef();
    this.triggerCancelButton = this.triggerCancelButton.bind(this);
    this.triggerSubmitButton = this.triggerSubmitButton.bind(this);
  }
  
  componentDidMount() {
    Coveo.TemplateCache.registerTemplate("default", Coveo.HtmlTemplate.fromString(`
      <div class='coveo-result-frame'>
        <div class='coveo-result-row' style='padding-bottom: 10px;'>
          <a class='CoveoResultLink' data-always-open-in-new-window='true'></a>
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

  triggerCancelButton(){
    this.child.current.logCancelButtonEvent();
  }

  triggerSubmitButton(){
    this.child.current.logSubmitButtonEvent();
  }

  render() {
    return (
      <div>
        <SearchUI {...this.props} ref={this.child}>
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
              <div className="coveo-result-layout-section">
                <span className="CoveoResultLayout" />
              </div>
              <div className="CoveoHiddenQuery" />
              <div className="CoveoErrorReport" data-pop-up="false" />
              <div
                className="CoveoResultList"
                data-layout="list"
                data-wait-animation="fade"
                data-auto-select-fields-to-include="false"
              />
            </div>
          </div>
        </SearchUI>
      </div>
    );
  }
}

export default CoveoDeflection;
