import React, { Component, ComponentClass, StatelessComponent } from 'react';

import { getEventLogger } from '..';

// This screen is intentionally made with as less dependencies as possible

export type ErrorBoundaryProps = {
  onError?: (error?: any) => void;
  isFullscreen?: boolean;
  text?: string;
};

const containerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  // backgroundColor: 'lightyellow',
  width: '100%',
  padding: '24px',
  overflow: 'auto',
};

const fullscreenStyles: React.CSSProperties = {
  position: 'fixed',
  height: '100vh',
  left: 0,
  top: 0,
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps, { caughtError: any }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      caughtError: null,
    };
  }

  componentDidCatch(error: any) {
    // TODO: add some visual error handling
    this.setState({ caughtError: error || true });
    // TODO: pass the second arg (info) to include the component stack (needs changes in zen-js)
    if (typeof this.props.onError === 'function') {
      this.props.onError(error);
    }
    getEventLogger().logError(error);
  }

  render() {
    if (this.state.caughtError) {
      const stack = (this.state.caughtError as Error).stack || '';

      return (
        <div
          style={{
            ...containerStyles,
            ...(this.props.isFullscreen ? fullscreenStyles : {}),
          }}
        >
          {__DEVELOPMENT__ ? (
            <div>
              <h2>Exception happened, check the browser console.</h2>
              <div>{(this.state.caughtError as Error).message || this.state.caughtError}</div>
              <div style={{ color: 'red' }}>
                {stack.split(/\n/).map((line: string, i: number) => (
                  <div key={i} style={{ paddingLeft: i > 0 ? '20px' : '' }}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <style>{`#cloud-icon:before { content: '\\f21b'; }`}</style>
              <i
                id="cloud-icon"
                style={{
                  display: 'inline-block',
                  font: "normal normal normal 14px/1 'Material-Design-Iconic-Font'",
                  fontSize: '54px',
                  textRendering: 'auto',
                }}
              />
              <p>{this.props.text || `Sorry, we were unable to load the requested page`}</p>
            </>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<OwnProps>(params: ErrorBoundaryProps = {}) {
  return function withErrorBoundary<WrappedComponentProps>(WrappedComponent: ComponentClass | StatelessComponent) {
    class WithErrorBoundary extends Component<OwnProps> {
      static displayName = `WithErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
      render() {
        return (
          <ErrorBoundary {...params}>
            <WrappedComponent {...this.props} />
          </ErrorBoundary>
        );
      }
    }

    return WithErrorBoundary;
  };
}
