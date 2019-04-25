import React, { Component } from 'react';
import CoveoSearch from './CoveoSearch';
import CoveoSearchbox from './CoveoSearchbox';

class CoveoFullSearch extends Component {
  coveoDeflectionSearch: React.RefObject<CoveoSearchbox>;

  constructor(props: any){
    super(props);
    this.coveoDeflectionSearch = React.createRef();
  }
    
  render() {
    return(
      <div>
        <CoveoSearchbox
          organizationId="searchuisamples"
          accessToken="xx564559b1-0045-48e1-953c-3addd1ee4457"
          ref={this.coveoDeflectionSearch}
        />
        <br />
        <CoveoSearch
          organizationId="searchuisamples"
          accessToken="xx564559b1-0045-48e1-953c-3addd1ee4457"
          searchbox={this.coveoDeflectionSearch}
        />
      </div>
    );
  }
}

export default CoveoFullSearch;
