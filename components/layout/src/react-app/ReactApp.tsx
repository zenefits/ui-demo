import React, { useEffect, useRef, useState } from 'react';

import { getEventLogger, ErrorBoundary } from 'z-frontend-app-bootstrap';
import { LoadingScreen } from 'z-frontend-elements';

import { fetchAssetPaths, insertScriptTag } from './embeddedReactAppUtils';

declare global {
  interface Window {
    embeddedReactApps: any;
  }
}

type ReactAppProps = {
  /**
   * Name of the react app to load.
   */
  appName: string;
};

type LoadingState = 'notStarted' | 'loading' | 'complete' | 'error';

async function insertScripts(appName: string) {
  if (window.embeddedReactApps[appName] && window.embeddedReactApps[appName].scriptsPromise) {
    return window.embeddedReactApps[appName].scriptsPromise;
  }

  const scripts = await fetchAssetPaths(appName);
  window.embeddedReactApps[appName] = window.embeddedReactApps[appName] || {};

  window.embeddedReactApps[appName].scriptsPromise = Promise.all(scripts.map(insertScriptTag));
  return window.embeddedReactApps[appName].scriptsPromise;
}

const ReactApp: React.FunctionComponent<ReactAppProps> = ({ appName }) => {
  const [loadingState, setLoadingState] = useState<LoadingState>('notStarted');
  const targetEl = useRef(null);

  window.embeddedReactApps[appName] = window.embeddedReactApps[appName] || {};
  window.embeddedReactApps[appName].fullPageActive = true;

  useEffect(() => {
    if (loadingState === 'notStarted') {
      setLoadingState('loading');

      insertScripts(appName)
        .then(() => {
          window.embeddedReactApps[appName].waitForReady.then(() => {
            setLoadingState('complete');
            window.embeddedReactApps[appName].start(targetEl.current);
          });
        })
        .catch((err: Error) => {
          console.error(`Error rendering react app ${appName}`, err);
          getEventLogger().logError(err);
          setLoadingState('error');
          throw err;
        });
    }
    // Cleanup embedded app state
    return () => {
      window.embeddedReactApps.unmount(targetEl.current);
      if (window.embeddedReactApps[appName]) {
        window.embeddedReactApps[appName].fullPageActive = false;
      }
    };
  }, []);

  return (
    <ErrorBoundary
      onError={() => {
        getEventLogger().logError(new Error(`Failed to load ReactApp ${appName}`));
      }}
    >
      <div ref={targetEl} id={`react-app-${appName}`}>
        {loadingState === 'notStarted' || (loadingState === 'loading' && <LoadingScreen />)}
      </div>
    </ErrorBoundary>
  );
};

export default ReactApp;
