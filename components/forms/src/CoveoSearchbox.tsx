import React, { Component } from 'react';
import * as Coveo from 'coveo-search-ui';
import 'coveo-search-ui/bin/css/CoveoFullSearch.css';
import './CoveoSearchbox.css';

type CoveoSearchboxProps = {
  organizationId: string;
  accessToken: string;
  redirectUrl?: string;
  newTab?: boolean;
  initSearchbox?: boolean;
};

class CoveoSearchbox extends Component<CoveoSearchboxProps> {
  searchInterface: React.RefObject<HTMLDivElement>;

  constructor(props: CoveoSearchboxProps) {
    super(props);
    this.searchInterface = React.createRef();
  }

  registerEventHandlers() {
    const searchInterface = Coveo.$$(this.searchInterface.current);

    // Prevent the search box from restoring its state with last saved query
    searchInterface.on('beforeInitialization', (e, args) => {
      const localStorage = new Coveo.LocalStorageUtils('LocalStorageHistoryController');
      localStorage.remove();
    });

    // Open up search results in a new tab when newTab prop is set
    if (this.props.newTab) {
      searchInterface.on('beforeRedirect', (e, args) => {
        args.cancel = true;

        const stateValues = Coveo.state(this.searchInterface.current).getAttributes();
        stateValues['firstQueryCause'] = 'searchFromLink';

        const link = document.createElement('a');
        link.href = args.searchPageUri;
        link.href = link.href; // IE11 needs this to correctly fill the properties that are used below.

        const pathname = link.pathname.indexOf('/') == 0 ? link.pathname : '/' + link.pathname; // IE11 does not add a leading slash to this property.
        const hash = link.hash ? link.hash + '&' : '#';
        
        window.open(link.protocol + '//' + link.host + pathname + link.search + hash + Coveo.HashUtils.encodeValues(stateValues), '_blank');
      });
    }
  }

  componentDidMount() {
    if (this.props.initSearchbox) {
      Coveo.SearchEndpoint.configureCloudV2Endpoint(this.props.organizationId, this.props.accessToken);

      this.registerEventHandlers();

      Coveo.initSearchbox(this.searchInterface.current, this.props.redirectUrl || '');
    }
  }

  getSearchInterface() {
    return this.searchInterface.current;
  }

  render() {
    return (
      <div>
        <div id="searchbox" data-enable-history="true" data-use-local-storage-for-history="true" ref={this.searchInterface}>
          <div className="coveo-search-section">
            <div className="CoveoOmnibox" data-placeholder="How can we help?" />
          </div>
        </div>
      </div>
    );
  }
}

export default CoveoSearchbox;
