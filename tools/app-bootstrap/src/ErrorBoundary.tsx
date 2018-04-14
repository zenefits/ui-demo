import React, { Component } from 'react';

// This screen is intentionally made with as less dependencies as possible

const Fragment = (React as any).Fragment;

export default class ErrorBoundary extends Component<{ onError: (any?) => void }, { caughtError: any }> {
  constructor(props) {
    super(props);
    this.state = {
      caughtError: null,
    };
  }

  componentDidCatch(error) {
    // TODO: add some visual error handling
    this.setState({ caughtError: error || true });
    // TODO: pass the second arg (info) to include the component stack (needs changes in zen-js)
    this.props.onError(error);
  }

  render() {
    if (__DEVELOPMENT__ && this.state.caughtError) {
      // You can render any custom fallback UI
      const stack = this.state.caughtError.stack || '';

      return (
        <Fragment>
          <div
            style={{
              position: 'fixed',
              background: 'rgba(0,0,0,0.15)',
              padding: '20px',
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <h2>Exception happened, check the browser console.</h2>
            <p>{this.state.caughtError.message || this.state.caughtError}</p>
            <div style={{ color: 'red' }}>
              {stack.split(/\n/).map((line, i) => (
                <div key={i} style={{ paddingLeft: i > 0 ? '20px' : '' }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </Fragment>
      );
    }
    return this.props.children;
  }
}
