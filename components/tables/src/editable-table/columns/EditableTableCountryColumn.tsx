import React from 'react';

import { ALL_COUNTRIES, SimpleSelect, SimpleSelectDisplay, ZENEFITS_SUPPORTED_COUNTRIES } from 'z-frontend-forms';

import Column from '../../DataTableColumn';
import { RowStateContext } from '../EditableRow';
import DataTableCellErrorPopper from '../../DataTableCellErrorPopper';
import { editableTableColumnProps, parseReadOnlyProp, InputColumnProps } from './EditableTableInputColumn';

const DEFAULT_COUNTRY_COLUMN_WIDTH = 210;

export default class CountryColumn<RowObject> extends React.Component<InputColumnProps<RowObject>> {
  static displayName = 'EditableTableCountryColumn';

  // @ts-ignore
  render() {
    throw new Error('EditableTable.CountryColumn should never be rendered.');
    return null;
  }
}

type LabelValue = { value: string; label: string };

export const allCountriesMap: { [key: string]: LabelValue } = ALL_COUNTRIES.reduce(
  (countriesMap: { [key: string]: LabelValue }, country: LabelValue) => {
    countriesMap[country.value] = country;
    return countriesMap;
  },
  {},
);

// Using a function here because DataTable expects Column components as immediate children
export function generateCountryColumn<RowObject>(props: InputColumnProps<RowObject>) {
  const { fieldKey, width, onChange, readOnly: readOnlyProp, ...columnProps } = props;
  return (
    <Column<RowObject>
      key={fieldKey as string}
      fieldKey={fieldKey}
      headerLabel={props.headerLabel}
      width={width || DEFAULT_COUNTRY_COLUMN_WIDTH}
      {...editableTableColumnProps}
      {...columnProps}
    >
      {({ isActive, rowIndex, hasFocus }) => (
        <RowStateContext.Consumer>
          {({ values, setValue, errors, readOnly: tableReadOnly, deleted }) => {
            const firstError = errors[fieldKey as any] && errors[fieldKey as any][0];

            const value = values[fieldKey];
            const countryValue = allCountriesMap[value];

            const columnReadOnly = parseReadOnlyProp<RowObject>(readOnlyProp, values);
            const readOnly = tableReadOnly || columnReadOnly;

            return isActive && !readOnly ? (
              <DataTableCellErrorPopper
                error={firstError && firstError.message}
                hasFocus={hasFocus}
                target={
                  <SimpleSelect<{ label: string; value: string }>
                    name={`state-select-${fieldKey}-${rowIndex}`}
                    value={countryValue}
                    onChange={(option: any) => {
                      setValue(fieldKey, option && option.value);
                      onChange &&
                        onChange({
                          values,
                          setValue,
                          change: {
                            fieldKey,
                            newValue: option.value,
                          },
                        });
                    }}
                    getOptionText={option => option.label}
                    error={firstError && firstError.message}
                  >
                    {({ SelectOption }) =>
                      ZENEFITS_SUPPORTED_COUNTRIES.map(option => <SelectOption key={option.value} option={option} />)
                    }
                  </SimpleSelect>
                }
              />
            ) : (
              <span className={deleted && countryValue ? 'deleted-cell-content' : undefined}>
                <SimpleSelectDisplay value={countryValue && countryValue.label} />
              </span>
            );
          }}
        </RowStateContext.Consumer>
      )}
    </Column>
  );
}
