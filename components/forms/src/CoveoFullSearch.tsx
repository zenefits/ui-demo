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
    const SearchboxStyle = {
      "margin-left": "15px",
      "margin-right": "10px"
    };
    
    return(
      <div>
        <div style={SearchboxStyle}>
          <CoveoSearchbox
            organizationId="searchuisamples"
            accessToken="xx564559b1-0045-48e1-953c-3addd1ee4457"
            ref={this.coveoDeflectionSearch}
          />
        </div>
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
