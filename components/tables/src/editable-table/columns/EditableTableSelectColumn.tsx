import React from 'react';
import { isNil } from 'lodash';

import { SimpleSelect, SimpleSelectDisplay, SimpleSelectProps, SimpleSelectSubcomponents } from 'z-frontend-forms';

import Column from '../../DataTableColumn';
import { RowStateContext } from '../EditableRow';
import DataTableCellErrorPopper from '../../DataTableCellErrorPopper';
import { editableTableColumnProps, parseReadOnlyProp, OnFieldChange } from './EditableTableInputColumn';

type FunctionAsChild<RowObject, OptionValue> = (
  row: RowObject,
  rowIndex: number,
  subcomponents: SimpleSelectSubcomponents<OptionValue>,
) => React.ReactNode;

type SelectColumnProps<RowObject, OptionValue = string> = {
  /**
   * Label for column header
   */
  headerLabel: string;
  /**
   * Width of column
   */
  width?: number;
  /**
   * Propery of row object to map to
   */
  fieldKey: keyof RowObject;
  /**
   * Should identical values for row[fieldKey] will be grouped into span cells
   * @default false
   */
  spanByFieldKey?: boolean;
  /**
   * If false, column be scrolled off-screen
   * @default false
   */
  isFixed?: boolean;
  /**
   * Text to show when no option is selected
   */
  placeholder?: string;
  /**
   * Should sort be disabled if used within data manager
   */
  disableSort?: boolean;
  /**
   * Transforms selected value: row[fieldKey] into selection text
   */
  getOptionText: SimpleSelectProps<OptionValue>['getOptionText'];

  /**
   * Boolean or function returning boolean; if true, column-editing will be disabled
   */
  readOnly?: boolean | ((row: RowObject) => boolean);

  /**
   * Callback that fires immediately after field is updated
   */
  onChange?: OnFieldChange<RowObject>;
  /**
   * Should user be able to clear the input?
   * SETTING THIS PROP DOES NOT MAKE FORM-LEVEL VALIDATION UNNECESSARY!!!
   * @default true
   * */
  clearable?: boolean;

  children: FunctionAsChild<RowObject, OptionValue>;
};

const DEFAULT_SELECT_COLUMN_WIDTH = 190;

export default class SelectColumn<RowObject, OptionValue> extends React.Component<
  SelectColumnProps<RowObject, OptionValue>
> {
  static displayName = 'EditableTableSelectColumn';

  // @ts-ignore
  render() {
    throw new Error('EditableTable.SelectColumn should never be rendered.');
    return null;
  }
}

// Using a function here because DataTable expects Column components as immediate children
export function generateSelectColumn<RowObject, OptionValue = string>(
  props: SelectColumnProps<RowObject, OptionValue>,
) {
  const { fieldKey, width, onChange, readOnly: readOnlyProp, ...columnProps } = props;

  return (
    <Column<RowObject>
      key={fieldKey as string}
      fieldKey={fieldKey}
      headerLabel={props.headerLabel}
      width={width || DEFAULT_SELECT_COLUMN_WIDTH}
      {...editableTableColumnProps}
      {...columnProps}
    >
      {({ isActive, rowIndex, hasFocus }) => (
        <RowStateContext.Consumer>
          {({ values, setValue, errors, readOnly: rowReadOnly, deleted }) => {
            const firstError = errors[fieldKey as any] && errors[fieldKey as any][0];
            const value = isNil(values[fieldKey]) ? '' : values[fieldKey];
            const shouldMarkDeleted = deleted && (value || value === 0);

            const columnReadOnly = parseReadOnlyProp<RowObject>(readOnlyProp, values);
            const readOnly = rowReadOnly || columnReadOnly;

            return isActive && !readOnly ? (
              <DataTableCellErrorPopper
                error={firstError && firstError.message}
                hasFocus={hasFocus}
                target={
                  <SimpleSelect<OptionValue>
                    name={`select-${fieldKey}-${rowIndex}`}
                    value={value}
                    onChange={(newValue: any) => {
                      setValue(fieldKey, newValue);
                      onChange &&
                        onChange({
                          values,
                          setValue,
                          change: {
                            fieldKey,
                            newValue,
                          },
                        });
                    }}
                    placeholder={props.placeholder}
                    clearable={props.clearable}
                    getOptionText={props.getOptionText}
                    children={props.children.bind(this, values, rowIndex)}
                    error={firstError && firstError.message}
                  />
                }
              />
            ) : (
              <span className={shouldMarkDeleted ? 'deleted-cell-content' : undefined}>
                <SimpleSelectDisplay value={values[fieldKey]} getOptionText={props.getOptionText} />
              </span>
            );
          }}
        </RowStateContext.Consumer>
      )}
    </Column>
  );
}
