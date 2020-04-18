import React from 'react';
import { produce } from 'immer';

export type SaveStatus = 'idle' | 'saving' | 'failed';

// Keeping dirty separate from saving status because a record can be made dirty
// when saving is in progress.
export type SaveState<Record> = {
  record: Record;
  promise: Promise<any>;
  status: SaveStatus;
  isDirty: boolean;
};

export type SaveStateHelpers<Record> = {
  getSaveStateForKey: (key: string | number) => SaveState<Record>;
  startSaveForKey: (
    key: string | number,
    saveParams: {
      promise: SaveState<Record>['promise'];
      record: SaveState<Record>['record'];
    },
  ) => void;
  markRecordDirty: (key: string | number) => void;
  markRecordFailed: (key: string | number) => void;
  markRecordSaving: (key: string | number) => void;
  markRecordSaved: (key: string | number) => void;
  getDirtyRecords: () => Record[];
  getSavingRecords: () => Record[];
  getSavingPromises: () => Promise<Record>[];
  getFailedRecords: () => Record[];
  isDefaultContext?: boolean;
};

function createNullSaveState<Record>(): SaveState<Record> {
  return {
    status: 'idle',
    record: null,
    promise: Promise.resolve(),
    isDirty: false,
  };
}

const defaultHelpers: SaveStateHelpers<any> = {
  getSaveStateForKey: () => createNullSaveState(),
  startSaveForKey: () => {},
  markRecordDirty: () => {},
  markRecordFailed: () => {},
  markRecordSaving: () => {},
  markRecordSaved: () => {},
  getDirtyRecords: () => [],
  getSavingRecords: () => [],
  getSavingPromises: () => [],
  getFailedRecords: () => [],
};

type SaveStateContextType<Record> = {
  failures: SaveState<Record>[];
  saving: SaveState<Record>[];
  helpers: SaveStateHelpers<Record>;
  isDefaultContext?: boolean;
};

export const SaveStateHelpersContext = React.createContext<SaveStateHelpers<any>>(defaultHelpers);

// Splitting this up into two contexts because any consumer of the full
// record of save states will rerender on any save or failure
// This is important for EditableTable, which only needs the helpers and has expensive rerenders
//
// The full context is only needed for parts of the DOM to that actively respond to records saving or
// failing
export const SaveStateContext = React.createContext<SaveStateContextType<any>>({
  failures: [],
  saving: [],
  helpers: defaultHelpers,
  isDefaultContext: true,
});

type SaveManagerState<Record> = {
  saves: {
    [key: string]: SaveState<Record>;
  };
};

export default class SaveManager<Record> extends React.Component<{}, SaveManagerState<Record>> {
  state: SaveManagerState<Record> = {
    saves: {},
  };

  getSaveStateForKey: SaveStateHelpers<Record>['getSaveStateForKey'] = key =>
    this.state.saves[key] || createNullSaveState();

  updateSaveState = (key: number | string, newState: Partial<SaveState<Record>>) => {
    return new Promise(resolve => {
      this.setState(state => {
        const currentRecord = state.saves[key] || createNullSaveState();
        return {
          saves: {
            ...state.saves,
            [key]: {
              ...currentRecord,
              ...newState,
            },
          },
        };
      }, resolve);
    });
  };

  markRecordDirty = (key: string | number) => this.updateSaveState(key, { isDirty: true });

  markRecordSaving = (key: string | number) => this.updateSaveState(key, { status: 'saving', isDirty: false });

  markRecordFailed = (key: string | number) => this.updateSaveState(key, { status: 'failed', isDirty: true });

  getDirtyRecords = () => Object.values(this.state.saves).filter(record => record.isDirty);

  getSavingRecords = () => Object.values(this.state.saves).filter(record => record.status === 'saving');

  getSavingPromises = () => this.getSavingRecords().map(r => r.promise);

  getFailedRecords = () => Object.values(this.state.saves).filter(record => record.status === 'failed');

  markRecordSaved = (key: string | number) => {
    this.setState(state => ({
      saves: produce(state.saves, savesDraft => {
        // If the state has been set to dirty since we triggered the save, we shouldn't remove the record yet
        if (savesDraft[key].isDirty) {
          savesDraft[key].status = 'idle';
        } else {
          delete savesDraft[key];
        }
      }),
    }));
  };

  startSaveForKey: SaveStateHelpers<Record>['startSaveForKey'] = async (key, { record, promise }) => {
    this.markRecordSaving(key);

    const handledPromise = promise
      .then(() => {
        this.markRecordSaved(key);
      })
      .catch(() => {
        this.setState(state => ({
          saves: produce(state.saves, savesDraft => {
            savesDraft[key].status = 'failed';
          }),
        }));
      });

    this.setState(state => ({
      saves: produce(state.saves, savesDraft => {
        savesDraft[key] = {
          record: record as any,
          status: 'saving',
          promise: handledPromise,
          isDirty: false,
        };
      }),
    }));
  };

  hasUnsavedChanges = () =>
    Object.values(this.state.saves).some(saveState => saveState.isDirty || saveState.status !== 'idle');

  beforeUnloadListener = (e: BeforeUnloadEvent) => {
    if (this.hasUnsavedChanges()) {
      e.preventDefault();
      e.returnValue = '';
      return '';
    }
  };

  componentDidMount = () => {
    window.addEventListener('beforeunload', this.beforeUnloadListener);
  };

  componentWillUnmount = () => {
    window.removeEventListener('beforeunload', this.beforeUnloadListener);
  };

  helpers = {
    markRecordDirty: this.markRecordDirty,
    markRecordFailed: this.markRecordFailed,
    markRecordSaving: this.markRecordSaving,
    markRecordSaved: this.markRecordSaved,
    startSaveForKey: this.startSaveForKey,
    getSaveStateForKey: this.getSaveStateForKey,
    getDirtyRecords: this.getDirtyRecords,
    getSavingRecords: this.getSavingRecords,
    getSavingPromises: this.getSavingPromises,
    getFailedRecords: this.getFailedRecords,
  };

  render() {
    return (
      <SaveStateContext.Consumer>
        {({ isDefaultContext }) => {
          if (isDefaultContext) {
            // If isDefaultContext is true, it means we aren't inside another SaveStateManager
            // In this case, we will wrap the children in new context providers
            return (
              <SaveStateContext.Provider
                value={{
                  helpers: this.helpers,
                  saving: this.helpers.getSavingRecords(),
                  failures: this.helpers.getFailedRecords(),
                }}
              >
                <SaveStateHelpersContext.Provider value={this.helpers}>
                  {this.props.children}
                </SaveStateHelpersContext.Provider>
              </SaveStateContext.Provider>
            );
          } else {
            // If we aren't inside another SaveStateManager, we should not create more context providers
            // This is the case when wrapping an EditableTable component inside a SaveStateManager component
            return this.props.children;
          }
        }}
      </SaveStateContext.Consumer>
    );
  }
}
