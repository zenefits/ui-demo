import React, { Component } from 'react';

class CoveoDeflectionForm extends Component<{}, { subject: string }> {
  constructor(props) {
    super(props);
    this.state = { subject: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ subject: event.target.value }, () => {
      window['CoveoGlobalEvents'].callback({ subject: this.state.subject });
    });
  }

  render() {
    return (
      <form>
        <label>Subject</label>
        <br />
        <input type="text" value={this.state.subject} onChange={this.handleChange} />
      </form>
    );
  }
}

export default CoveoDeflectionForm;
