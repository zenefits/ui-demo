import React, { Component } from 'react';
import CoveoDeflectionSearch from './CoveoDeflectionSearch';
import CoveoDummyDeflectionForm from './CoveoDummyDeflectionForm';

class CoveoDeflection extends Component<{}, { subject: string }> {
  coveoDeflectionSearch: React.RefObject<CoveoDeflectionSearch>;

  constructor(props: any){
    super(props);
    this.state = {
      subject: ""
    };
    this.coveoDeflectionSearch = React.createRef();
    this.formChange = this.formChange.bind(this);
  }
  
  formChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      subject: event.target.value
    });
  }
  
  render() {
    return(
      <div>
        <CoveoDeflectionSearch
          subject={this.state.subject}
          organizationId="searchuisamples"
          accessToken="xx564559b1-0045-48e1-953c-3addd1ee4457"
          ref={this.coveoDeflectionSearch} />
        <CoveoDummyDeflectionForm handleChange={this.formChange} />
      </div>
    );
  }
}

export default CoveoDeflection;
