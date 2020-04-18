import React from 'react';

import { DataManagerContext, DataManagerRenderProps } from './DataManager';

export default class DataManagerUpdateGate<T> extends React.Component<{}> {
  render() {
    return (
      <DataManagerContext.Consumer>
        {context => {
          if (!context) {
            return this.props.children;
          }
          return (
            <GatedDataManagerContextProvider<T> dataManagerContext={context}>
              {this.props.children}
            </GatedDataManagerContextProvider>
          );
        }}
      </DataManagerContext.Consumer>
    );
  }
}

type GatedDataManagerProviderProps<T> = {
  dataManagerContext: DataManagerRenderProps<T>;
};

type GatedDataManagerProviderState<T> = {
  gatedContext: DataManagerRenderProps<T>;
};

export type UpdateGateControls = {
  refreshData: () => void;
};
export const UpdateGateControlsContext = React.createContext<UpdateGateControls>({ refreshData: () => {} });

class GatedDataManagerContextProvider<T> extends React.Component<
  GatedDataManagerProviderProps<T>,
  GatedDataManagerProviderState<T>
> {
  static getDerivedStateFromProps(
    props: GatedDataManagerProviderProps<any>,
    state: GatedDataManagerProviderState<any>,
  ): GatedDataManagerProviderState<any> {
    const { gatedContext } = state;
    const shouldPassNewData =
      gatedContext.filtering.config !== props.dataManagerContext.filtering.config ||
      gatedContext.sorting.config !== props.dataManagerContext.sorting.config ||
      gatedContext.paging.config !== props.dataManagerContext.paging.config ||
      gatedContext.sourceData.length !== props.dataManagerContext.sourceData.length;

    return {
      gatedContext: shouldPassNewData ? props.dataManagerContext : gatedContext,
    };
  }

  state = {
    gatedContext: this.props.dataManagerContext,
  };

  refreshData = () => {
    this.setState({
      gatedContext: this.props.dataManagerContext,
    });
  };

  render() {
    return (
      <UpdateGateControlsContext.Provider value={{ refreshData: this.refreshData }}>
        <DataManagerContext.Provider value={this.state.gatedContext}>{this.props.children}</DataManagerContext.Provider>
      </UpdateGateControlsContext.Provider>
    );
  }
}
