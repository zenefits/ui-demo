import React, { Component } from 'react';

type CoveoDummyDeflectionFormProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

class CoveoDummyDeflectionForm extends Component<CoveoDummyDeflectionFormProps> {
  render() {
    return (
      <form>
        <label>Subject</label>
        <br />
        <input type="text" onChange={this.props.handleChange} />
      </form>
    );
  }
}

export default CoveoDummyDeflectionForm;
