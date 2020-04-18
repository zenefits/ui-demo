import React from 'react';
import { debounce, isEqual } from 'lodash';
import { produce } from 'immer';
import { MixedSchema } from 'yup';

import DataTableRow, { RowProps } from '../DataTableRow';
import { DEFAULT_CELL_HEIGHT } from '../DataTableCell';
import EditableRowErrors from './EditableRowErrors';
import { SaveState, SaveStateHelpers, SaveStatus } from './SaveStateManager';

export type RowStateProps = {
  values: any;
  setValue: (key: any, value: any) => void;
  validateRow: ValidateRow<any>;
  errors: Errors;
  columnNameMapping: ColumnNameMapping;
  readOnly: boolean;
  deleted: boolean;
};

export const RowStateContext = React.createContext<RowStateProps>({} as any);

export type Error = {
  key: string;
  message: string;
  /*
   * Set internally on errors generated from validationSchema. Do not set when manually generating errors
   */
  isGeneratedFromSchema?: boolean;
};

export type Errors = {
  [field: string]: Error[];
};

type ErrorProducer = (errors: Errors) => void;
type EditErrors = (errorProducer: ErrorProducer) => void;

export interface RowObjectInterface {
  errors?: Errors;
  timestamp?: string;
}

type EditableRowState<RowObject extends RowObjectInterface> = {
  editedRowObject: RowObject;
  lastRowObjectProp: RowObject;
  lastErrorsProps: Errors;
  errors: Errors;
  latestTimestamp: string;
  lastSavingStatus: SaveStatus;
};

export type RowOperationReferences = {
  [rowIndex: number]: {
    flushSave: () => void;
  };
};

export type ColumnNameMapping = {
  [key: string]: string;
};

/**
 * These props are initially passed to EditableTable and then passed to EditableRow
 */
export type CustomEditableRowPropsFromEditableTable<RowObject> = {
  /**
   * Dirty rows will be have saveHandler callback fired after this interval
   * @default 3000
   * */
  autoSaveTimeout?: number;
  readOnly?: boolean;
  /**
   * Callback to execute row save (auto-fired after editing inputs and upon leaving row edit)
   * */
  saveHandler?: SaveHandler<RowObject>;
  validateRow?: ValidateRow<RowObject>;
  validationSchema?: { [key: string]: MixedSchema | MixedSchema[] };
  hasRowBeenDeleted?: (row: RowObject) => boolean;
  isRowReadOnly?: (params: { row: RowObject; saveState: SaveState<RowObject> }) => boolean;
};

export type CustomEditableRowProps<RowObject extends RowObjectInterface> = CustomEditableRowPropsFromEditableTable<
  RowObject
> & {
  rowOperationReferences: RowOperationReferences;
  saveStateHelpers: SaveStateHelpers<RowObject>;
  /**
   * EditableTable also has columnNameMapping as a prop, but it's optional
   */
  columnNameMapping: ColumnNameMapping;
  errors?: Errors;
};

type EditableRowProps<RowObject extends RowObjectInterface> = RowProps<RowObject> & CustomEditableRowProps<RowObject>;

export type ValidateRow<RowObject extends RowObjectInterface> = (params: {
  row: RowObject;
  editErrors: EditErrors;
}) => void;

export type SaveHandler<RowObject extends RowObjectInterface> = (params: {
  row: RowObject;
  editErrors: EditErrors;
}) => Promise<any>;

class EditableRow<RowObject extends RowObjectInterface> extends React.Component<
  EditableRowProps<RowObject>,
  EditableRowState<RowObject>
> {
  static getDerivedStateFromProps(
    props: EditableRowProps<any>,
    state: EditableRowState<any>,
  ): Partial<EditableRowState<any>> {
    let newState: Partial<EditableRowState<any>> = {
      lastSavingStatus: props.saveStateHelpers.getSaveStateForKey(props.rowKey).status,
    };

    // If a new value for row comes in, reset edit state
    if (props.rowObject !== state.lastRowObjectProp) {
      newState = {
        ...newState,
        editedRowObject: props.rowObject,
        lastRowObjectProp: props.rowObject,
        latestTimestamp: props.rowObject.timestamp,
      };
    }

    if (!isEqual(props.errors, state.lastErrorsProps)) {
      newState = {
        ...newState,
        errors: props.errors,
        lastErrorsProps: props.errors,
      };
    }

    return newState;
  }

  // As of React 16.8, these updates won't affect this.state referenced in subsequent componentShouldUpdate
  shouldComponentUpdate(nextProps: EditableRowProps<RowObject>, nextState: EditableRowState<RowObject>) {
    const hasStateChanged = Object.keys(this.state).some((k: keyof EditableRowState<RowObject>) => {
      const hasKeyChanged = this.state[k] !== nextState[k];
      return hasKeyChanged;
    });

    if (hasStateChanged) {
      return true;
    } else if (DataTableRow.prototype.shouldComponentUpdate.call(this, nextProps)) {
      return true;
    } else {
      const hasRowBeenDeleted = this.props.hasRowBeenDeleted && this.props.hasRowBeenDeleted(this.props.rowObject);
      const willRowBeDeleted = nextProps.hasRowBeenDeleted && nextProps.hasRowBeenDeleted(nextProps.rowObject);

      const hasColumnMappingChanged = !isEqual(this.props.columnNameMapping, nextProps.columnNameMapping);

      const hasReadOnlyChanged = this.props.readOnly !== nextProps.readOnly;

      const hasRowObjectBeenUpdated = nextProps.rowObject !== this.state.lastRowObjectProp;
      const haveErrorsBeenUpdated = !isEqual(nextProps.errors, this.state.lastErrorsProps);

      const currentSavingStatus = this.getSavingState().status;
      const saveStateChanged = currentSavingStatus !== this.state.lastSavingStatus;

      return (
        hasRowBeenDeleted !== willRowBeDeleted ||
        hasColumnMappingChanged ||
        hasRowObjectBeenUpdated ||
        haveErrorsBeenUpdated ||
        hasReadOnlyChanged ||
        saveStateChanged
      );
    }
  }

  static defaultProps = {
    autoSaveTimeout: 3000,
  };

  static validateRowTimeout = 300;

  constructor(props: EditableRowProps<RowObject>) {
    super(props);
    this.state = {
      editedRowObject: props.rowObject,
      lastRowObjectProp: props.rowObject,
      lastErrorsProps: props.errors,
      errors: props.errors || {},
      latestTimestamp: props.rowObject.timestamp,
      lastSavingStatus: null,
    };
  }

  validateCellsWithSchema = (errors: Errors) => {
    const { validationSchema } = this.props;
    if (validationSchema) {
      const newErrors: Errors = {};

      const schemaValidationKeys: { [errorKey: string]: boolean } = {};

      Object.entries(validationSchema).forEach(([fieldKey, schemaOrSchemas]) => {
        const schemas = schemaOrSchemas instanceof Array ? schemaOrSchemas : [schemaOrSchemas];

        schemas.forEach((schema, i) => {
          const validationKey =
            schema.meta() && schema.meta().key ? schema.meta().key : `cell-validation-${fieldKey}-${i}`;

          // Remember keys are created by schema and which aren't
          schemaValidationKeys[validationKey] = true;

          try {
            const fieldVal = (this.state.editedRowObject as any)[fieldKey];
            schema.validateSync(fieldVal, { context: this.state.editedRowObject });
          } catch (error) {
            if (error.name === 'ValidationError') {
              newErrors[fieldKey] = error.errors.map((errorMessage: string, i: number) => ({
                key: validationKey,
                message: errorMessage,
                isGeneratedFromSchema: true,
              }));
            }
          }
        });
      });

      Object.keys(this.state.editedRowObject).forEach(key => {
        // Remove old generated errors and add new ones. We need to do this so that old ones are removed
        // if no longer present but want to retain errors that aren't controlled by a schema (ex: customErrors)
        errors[key] = errors[key] ? errors[key].filter(error => !schemaValidationKeys[error.key]) : [];
        errors[key] = [...errors[key], ...(newErrors[key] || [])];
      });
    }
    return errors;
  };

  getSavingState = () => this.props.saveStateHelpers.getSaveStateForKey(this.props.rowKey);

  getDataSavingPromise = () => this.getSavingState().promise;

  validateRow = debounce(async () => {
    await this.getDataSavingPromise();

    this.setState(prevState => {
      const newErrors = produce(prevState.errors, draft => {
        this.validateCellsWithSchema(draft);

        if (this.props.validateRow) {
          this.props.validateRow({
            row: this.state.editedRowObject,
            editErrors: (errorProducer: ErrorProducer) => {
              errorProducer(draft);
            },
          });
        }
      });
      return { errors: newErrors };
    });
  }, EditableRow.validateRowTimeout);

  triggerSave = () => {
    const savingPromise =
      this.props.saveHandler &&
      this.props.saveHandler({
        row: { ...this.state.editedRowObject, timestamp: this.state.latestTimestamp },
        editErrors: this.editErrors,
      });

    if (savingPromise) {
      this.props.saveStateHelpers.startSaveForKey(this.props.rowKey, {
        promise: savingPromise,
        record: this.state.editedRowObject,
      });
    }
  };

  scheduleSave = debounce(async () => {
    const { isDirty } = this.getSavingState();

    if (isDirty) {
      const data = await this.getDataSavingPromise();
      if (data && data.timestamp) {
        this.setState(
          {
            latestTimestamp: data.timestamp,
          },
          this.triggerSave,
        );
      } else {
        this.triggerSave();
      }
    }
  }, this.props.autoSaveTimeout);

  flushSave = () => {
    // This will be passed UP to the wrapping EditableTable component to be called when row loses focus
    // Making a note of this here because it is not a common pattern in React.
    this.scheduleSave.flush();
  };

  setValue = (key: keyof RowObject, value: any) => {
    this.setState(state => {
      const newRowObject = {
        ...state.editedRowObject,
        [key]: value,
      };

      this.validateRow();
      this.scheduleSave();
      this.props.saveStateHelpers.markRecordDirty(this.props.rowKey);

      return {
        editedRowObject: newRowObject,
      };
    });
  };

  editErrors = async (errorProducer: ErrorProducer) => {
    await this.getDataSavingPromise();

    this.setState(prevState => ({
      errors: produce(prevState.errors, errorProducer),
    }));
  };

  componentDidMount() {
    // Do an initial validation run
    this.validateRow();
    this.validateRow.flush();
  }

  componentWillUnmount() {
    if (this.getSavingState().isDirty && this.props.saveHandler) {
      this.flushSave();
    }
  }

  render() {
    this.props.rowOperationReferences[this.props.rowIndex] = {
      flushSave: this.flushSave,
    };
    const hasRowBeenDeleted = this.props.hasRowBeenDeleted && this.props.hasRowBeenDeleted(this.props.rowObject);
    const isRowReadOnly =
      this.props.isRowReadOnly &&
      this.props.isRowReadOnly({
        row: this.props.rowObject,
        saveState: this.getSavingState(),
      });

    return (
      <RowStateContext.Provider
        value={{
          values: this.state.editedRowObject,
          setValue: this.setValue,
          validateRow: this.validateRow,
          errors: this.state.errors,
          columnNameMapping: this.props.columnNameMapping,
          readOnly: this.props.readOnly || isRowReadOnly || hasRowBeenDeleted,
          deleted: hasRowBeenDeleted,
        }}
      >
        <DataTableRow {...this.props} cellHeight={DEFAULT_CELL_HEIGHT} />
      </RowStateContext.Provider>
    );
  }
}

export default class EditableRowWithErrors<RowObject extends RowObjectInterface> extends React.Component<
  EditableRowProps<RowObject>,
  EditableRowState<RowObject>
> {
  render() {
    return (
      <EditableRowErrors<RowObject> rowObject={this.props.rowObject} rowKey={this.props.rowKey}>
        {errors => <EditableRow<RowObject> errors={errors} {...this.props} />}
      </EditableRowErrors>
    );
  }
}
