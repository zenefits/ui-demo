import React, { Component } from 'react';
import styled from 'styled-components';

// tslint:disable-next-line:variable-name
const StyledInput = styled.input`
  :focus {
    border: 1px solid ${props => props.theme.colors.primary.blueDark};
    outline: none;
  }
`;

interface Props {
  value?: string;
}
interface State {
  value: string;
}

export default class Input extends Component<Props, State> {
  constructor(props) {
    super();

    this.state = {
      value: props.value || '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return <StyledInput type="text" value={this.state.value} onChange={this.onChange} />;
  }
}
