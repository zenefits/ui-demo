import React, { Component } from 'react';
import { withRouter, Prompt, RouteComponentProps } from 'react-router-dom';

interface PreventTransitionProps {
  dirty: boolean;
  preventTransitionMessage?: string;
}

class PreventTransition extends Component<PreventTransitionProps & RouteComponentProps<{}>, {}> {
  static defaultProps = {
    preventTransitionMessage: `Leave site?\nChanges that you made may not be saved.`,
  };

  beforeUnloadListener = (e: BeforeUnloadEvent) => {
    if (this.props.dirty) {
      e.preventDefault();
      e.returnValue = '';
      return '';
    }
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.beforeUnloadListener);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeUnloadListener);
  }

  render() {
    const { preventTransitionMessage, dirty } = this.props;
    return <Prompt when={dirty} message={() => preventTransitionMessage} />;
  }
}

export default withRouter<PreventTransitionProps>(PreventTransition);
