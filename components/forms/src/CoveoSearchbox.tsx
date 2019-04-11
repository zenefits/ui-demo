import React, { Component } from 'react';
import * as Coveo from 'coveo-search-ui';
import 'coveo-search-ui/bin/css/CoveoFullSearch.css';

class CoveoSearchbox extends Component<{
  organizationId: string;
  accessToken: string;
  url?: string;
  initSearchbox?: boolean;
}> {
  searchInterface: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.searchInterface = React.createRef();
  }

  componentDidMount() {
    if (this.props.initSearchbox) {
      Coveo.SearchEndpoint.configureCloudV2Endpoint(this.props.organizationId, this.props.accessToken);
      Coveo.initSearchbox(this.searchInterface.current, this.props.url || '');
    }
  }

  getSearchInterface() {
    return this.searchInterface.current;
  }

  render() {
    return (
      <div>
        <div id="searchbox" ref={this.searchInterface}>
          <div className="coveo-search-section">
            <div className="CoveoSearchbox" data-enable-omnibox="true" />
          </div>
        </div>
      </div>
    );
  }
}

export default CoveoSearchbox;
