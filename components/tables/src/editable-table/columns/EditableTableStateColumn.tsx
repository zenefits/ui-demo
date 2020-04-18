import React from 'react';
import { get } from 'lodash';

import { InputDisplay, SearchSelect, SUPPORTED_STATES } from 'z-frontend-forms';

import Column from '../../DataTableColumn';
import { RowStateContext } from '../EditableRow';
import DataTableCellErrorPopper from '../../DataTableCellErrorPopper';
import { editableTableColumnProps, parseReadOnlyProp, InputColumnProps } from './EditableTableInputColumn';

export type StateColumnProps<RowObject> = InputColumnProps<RowObject> & {
  countryFieldKey: string;
};

const DEFAULT_STATE_COLUMN_WIDTH = 200;

export default class EditableTableStateColumn<RowObject> extends React.Component<StateColumnProps<RowObject>> {
  static displayName = 'EditableTableStateColumn';

  // @ts-ignore
  render() {
    throw new Error('EditableTable.StateColumn should never be rendered.');
    return null;
  }
}

type LabelValue = { [key: string]: { label: string; value: string } };

type MapKey = 'value' | 'label';
function buildStateMap(optionKey: MapKey) {
  return Object.entries(SUPPORTED_STATES).reduce((statesMap, [countryCode, states]) => {
    statesMap[countryCode] = states.reduce((statesByValue, state) => {
      statesByValue[state[optionKey]] = state;
      return statesByValue;
    }, {} as LabelValue);
    return statesMap;
  }, {} as { [key: string]: LabelValue });
}

const stateValueMap = buildStateMap('value');
const stateLabelMap = buildStateMap('label');

// Using a function here because DataTable expects Column components as immediate children
export function generateStateColumn<RowObject>(props: StateColumnProps<RowObject>) {
  const { fieldKey, countryFieldKey, width, onChange, readOnly: readOnlyProp, ...columnProps } = props;
  return (
    <Column<RowObject>
      key={fieldKey as string}
      fieldKey={fieldKey}
      headerLabel={props.headerLabel}
      width={width || DEFAULT_STATE_COLUMN_WIDTH}
      {...editableTableColumnProps}
      {...columnProps}
    >
      {({ isActive, rowIndex, hasFocus }) => (
        <RowStateContext.Consumer>
          {({ values, setValue, errors, readOnly: tableReadOnly, deleted }) => {
            const firstError = errors[fieldKey as any] && errors[fieldKey as any][0];
            const countryValue = values[countryFieldKey];
            const availableStates = countryValue ? SUPPORTED_STATES[countryValue] || [] : SUPPORTED_STATES.US;

            const rawValue = values[fieldKey];
            const value =
              rawValue && stateValueMap[countryValue] && stateValueMap[countryValue][rawValue]
                ? stateValueMap[countryValue][rawValue].label
                : rawValue;

            const columnReadOnly = parseReadOnlyProp<RowObject>(readOnlyProp, values);
            const readOnly = tableReadOnly || columnReadOnly;

            return isActive && !readOnly ? (
              <DataTableCellErrorPopper
                error={firstError && firstError.message}
                hasFocus={hasFocus}
                target={
                  <div>
                    <SearchSelect<{ value: string; label: string }>
                      omitIcon
                      name={`state-select-${fieldKey}-${rowIndex}`}
                      value={value || ''}
                      onChange={newVal => {
                        const mappedValue =
                          stateLabelMap[countryValue] && stateLabelMap[countryValue][newVal]
                            ? stateLabelMap[countryValue][newVal].value
                            : newVal;

                        setValue(fieldKey, mappedValue);
                        onChange &&
                          onChange({
                            values,
                            setValue,
                            change: {
                              fieldKey,
                              newValue: mappedValue,
                            },
                          });
                      }}
                      alwaysExpandInput
                      getOptionText={o => o.label}
                      error={firstError && firstError.message}
                      tetherProps={{ closeOnScroll: true }}
                    >
                      {({ SelectOption, basicOptionFilter }) =>
                        basicOptionFilter(availableStates).map(option => (
                          <SelectOption key={option.value} option={option} />
                        ))
                      }
                    </SearchSelect>
                  </div>
                }
              />
            ) : (
              <span className={deleted && value ? 'deleted-cell-content' : undefined}>
                <InputDisplay
                  value={
                    value && get(`${countryValue}.${value}.label`, value)
                      ? get(`${countryValue}.${value}.label`, value)
                      : value
                  }
                />
              </span>
            );
          }}
        </RowStateContext.Consumer>
      )}
    </Column>
  );
}
