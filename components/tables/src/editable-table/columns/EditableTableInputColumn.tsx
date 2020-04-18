import React from 'react';

import {
  formatIsoString,
  DateInput,
  DateInputDisplay,
  DigitInput,
  DigitInputDisplay,
  Input,
  InputDisplay,
  MoneyInput,
  MoneyInputDisplay,
  NumberInput,
  NumberInputDisplay,
  PercentageInput,
  PercentageInputDisplay,
  PhoneInput,
  PhoneInputDisplay,
  TimeInput,
  TimeInputDisplay,
} from 'z-frontend-forms';
import { TextAlign } from 'zbase';

import TextareaColumn from './TextareaColumn';
import Column from '../../DataTableColumn';
import { RowStateContext, RowStateProps } from '../EditableRow';
import DataTableCellErrorPopper from '../../DataTableCellErrorPopper';
import { DEFAULT_PHONE_COLUMN_WIDTH, PhoneColumnProps } from './EditableTablePhoneColumn';
import { DEFAULT_DATE_COLUMN_WIDTH } from './EditableTableDateColumn';
import { DEFAULT_TIME_COLUMN_WIDTH, TimeColumnProps } from './EditableTableTimeColumn';
import { DEFAULT_POSTAL_CODE_COLUMN_WIDTH } from './EditableTablePostalCodeColumn';
import { CellType } from '../../GridAccessibilityProvider';

export type OnFieldChange<RowObject> = (params: {
  values: RowObject;
  setValue: (key: keyof RowObject, value: any) => void;
  change: {
    newValue: any;
    fieldKey: keyof RowObject;
  };
}) => void;

export type InputColumnProps<RowObject> = {
  /**
   * Label for column header
   */
  headerLabel: string;
  /**
   * Width of column
   */
  width?: number;
  /**
   * How to align cell content, eg right for numeric.
   */
  textAlign?: TextAlign;
  /**
   * Property of row object to map to
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
   * Should sort be disabled if used within data manager
   */
  disableSort?: boolean;
  /**
   * Boolean or function returning boolean; if true, column-editing will be disabled
   */
  readOnly?: boolean | ((row: RowObject) => boolean);

  /**
   * Callback that fires immediately after field is updated
   */
  onChange?: OnFieldChange<RowObject>;

  /**
   * Type of input (text, email, tel, etc)
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
   */
  type?: string;
};

const DEFAULT_INPUT_COLUMN_WIDTH = 190;

export const editableTableColumnProps = {
  contentType: 'single-input' as CellType,
  cellStyles: {
    px: 2, // reduced from DataTableColumn default because of inputs
  },
};

export function parseReadOnlyProp<RowObject>(
  readOnlyProp: boolean | ((row: RowObject) => boolean),
  rowObject: RowObject,
): boolean {
  if (typeof readOnlyProp === 'boolean') {
    return readOnlyProp;
  } else if (typeof readOnlyProp === 'function') {
    return readOnlyProp(rowObject);
  }
  return false;
}

export default class EditableTableInputColumn<RowObject> extends React.Component<InputColumnProps<RowObject>> {
  static displayName = 'EditableTableInputColumn';

  // @ts-ignore
  render() {
    throw new Error('EditableTable.InputColumn should never be rendered.');
    return null;
  }
}

const columnComponentMap: { [key: string]: any } = {
  // IMPORTANT!  All columns listed here must have matching displayName properties
  EditableTableInputColumn: Input,
  EditableTableNumberColumn: NumberInput,
  EditableTablePercentageColumn: PercentageInput,
  EditableTableMoneyColumn: MoneyInput,
  EditableTableDateColumn: DateInput,
  EditableTableTimeColumn: TimeInput,
  EditableTablePhoneColumn: PhoneInput,
  EditableTablePostalCodeColumn: Input,
  EditableTableDigitColumn: DigitInput,
  EditableTableTextareaColumn: TextareaColumn,
};

const columnDisplayComponentMap: { [key: string]: any } = {
  EditableTableInputColumn: InputDisplay,
  EditableTableNumberColumn: NumberInputDisplay,
  EditableTablePercentageColumn: PercentageInputDisplay,
  EditableTableMoneyColumn: MoneyInputDisplay,
  EditableTableDateColumn: DateInputDisplay,
  EditableTableTimeColumn: TimeInputDisplay,
  EditableTablePhoneColumn: PhoneInputDisplay,
  EditableTablePostalCodeColumn: InputDisplay,
  EditableTableDigitColumn: DigitInputDisplay,
  EditableTableTextareaColumn: InputDisplay,
};

const columnWidthMap: { [key: string]: number } = {
  EditableTableInputColumn: DEFAULT_INPUT_COLUMN_WIDTH,
  EditableTableNumberColumn: DEFAULT_INPUT_COLUMN_WIDTH,
  EditableTableMoneyColumn: DEFAULT_INPUT_COLUMN_WIDTH,
  EditableTableDateColumn: DEFAULT_DATE_COLUMN_WIDTH,
  EditableTableTimeColumn: DEFAULT_TIME_COLUMN_WIDTH,
  EditableTablePhoneColumn: DEFAULT_PHONE_COLUMN_WIDTH,
  EditableTablePostalCodeColumn: DEFAULT_POSTAL_CODE_COLUMN_WIDTH,
  EditableTableTextareaColumn: DEFAULT_INPUT_COLUMN_WIDTH,
};

function getExtraProps<RowObject>(props: InputColumnProps<RowObject>, columnType: string, rowState: RowStateProps) {
  switch (columnType) {
    case 'EditableTableInputColumn':
      return { extraInputProps: { type: props.type } };
    case 'EditableTableNumberColumn':
      return {
        extraInputProps: { textAlignRight: props.textAlign !== 'left' },
        extraDisplayProps: { textAlignRight: props.textAlign !== 'left' },
      };
    case 'EditableTableMoneyColumn':
      return {
        // Todo: Added suffix as a temp workaround for Editable table .
        extraInputProps: { textAlignRight: props.textAlign !== 'left', prefix: '', suffix: '$' },
        extraDisplayProps: { textAlignRight: props.textAlign !== 'left' },
      };
    case 'EditableTableTimeColumn':
      return {
        extraInputProps: {
          initialInputValue: rowState.values[props.fieldKey],
          tetherProps: { closeOnScroll: true },
          defaultHighlightTime: (props as TimeColumnProps<RowObject>).defaultHighlightTime,
          disableDropdown: (props as TimeColumnProps<RowObject>).disableDropdown,
        },
      };
    case 'EditableTableDateColumn':
      return {
        extraInputProps: {
          onChange: (date: Date) => {
            const formatted = formatIsoString(date) || ''; // remove time portion
            rowState.setValue(props.fieldKey, formatted);
          },
          tetherProps: { closeOnScroll: true },
        },
      };
    case 'EditableTablePhoneColumn': {
      const allow = (props as PhoneColumnProps<RowObject>).allowInternational;
      return {
        extraInputProps: { allowInternational: allow },
        extraDisplayProps: { allowInternational: allow },
      };
    }
    default:
      return {};
  }
}

const componentsWithAlignRight = ['EditableTableNumberColumn', 'EditableTableMoneyColumn'];

// Using a function here because DataTable expects Column components as immediate children
export function generateInputColumn<RowObject>(props: InputColumnProps<RowObject>, columnType: string) {
  const { fieldKey, width, onChange, readOnly: readOnlyProp, ...columnProps } = props;
  const InputComponent = columnComponentMap[columnType];
  const DisplayComponent = columnDisplayComponentMap[columnType];
  const textAlign = componentsWithAlignRight.includes(columnType) ? 'right' : undefined;

  return (
    <Column<RowObject>
      key={fieldKey as string}
      fieldKey={fieldKey}
      headerLabel={props.headerLabel}
      textAlign={textAlign}
      width={width || columnWidthMap[columnType]}
      {...editableTableColumnProps}
      {...columnProps}
    >
      {({ isActive, hasFocus }) => (
        <RowStateContext.Consumer>
          {rowState => {
            const { values, setValue, errors, readOnly: rowReadOnly } = rowState;
            const value = values[fieldKey];
            const firstError = errors[fieldKey as any] && errors[fieldKey as any][0];
            const { extraInputProps, extraDisplayProps } = getExtraProps<RowObject>(props, columnType, rowState);
            const columnReadOnly = parseReadOnlyProp<RowObject>(readOnlyProp, values);
            const readOnly = rowReadOnly || columnReadOnly;
            const shouldMarkDeleted = rowState.deleted && (value || value === 0);
            const showInput = isActive && !readOnly;

            return showInput ? (
              <DataTableCellErrorPopper
                hasFocus={hasFocus}
                error={firstError && firstError.message}
                target={
                  <InputComponent
                    value={value || ''}
                    onChange={(eventOrValue: any) => {
                      const newValue = eventOrValue && eventOrValue.target ? eventOrValue.target.value : eventOrValue;
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
                    hasError={!!firstError}
                    {...extraInputProps}
                  />
                }
              />
            ) : (
              <span className={shouldMarkDeleted ? 'deleted-cell-content' : undefined}>
                <DisplayComponent value={value} {...extraDisplayProps} />
              </span>
            );
          }}
        </RowStateContext.Consumer>
      )}
    </Column>
  );
}
