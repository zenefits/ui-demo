import { Component } from 'react';

// useful for visual testing: submit the form immediately to show validation errors

class FormSubmitter extends Component<{ submitForm: () => void }> {
  componentDidMount() {
    this.props.submitForm();
  }

  render(): null {
    return null;
  }
}

export default FormSubmitter;
