import React, { Component } from 'react';
import { Field, Form as ReduxForm, reduxForm, InjectedFormProps } from 'redux-form';

class Form extends Component<InjectedFormProps, undefined> {
  onCreateUser = values => {
    console.log('onCreateUser', values);
  };
  render() {
    return (
      <ReduxForm onSubmit={this.props.handleSubmit(this.onCreateUser)}>
        <h2>Create new user</h2>
        <div>
          <Field autoFocus required name="username" type="text" component="input" placeholder="Username" />
        </div>
        <div>{this.props.children}</div>

        <input type="submit" value="create" />
      </ReduxForm>
    );
  }
}

export default storeKey => {
  return reduxForm({ form: storeKey })(Form);
};
