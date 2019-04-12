import React, { Component } from 'react';
import * as Coveo from 'coveo-search-ui';
import 'coveo-search-ui/bin/css/CoveoFullSearch.css';

class CoveoSearchbox extends Component<{ initSearchbox?: boolean; url?: string }> {
  searchInterface: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.searchInterface = React.createRef();
  }

  componentDidMount() {
    if (this.props.initSearchbox) {
      Coveo.SearchEndpoint.configureSampleEndpointV2();
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
