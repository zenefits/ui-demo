import React from 'react';
import gql from 'graphql-tag';

import { IconButton } from 'z-frontend-elements';
import { Mutation } from 'z-frontend-network';
import {
  Form,
  FormDateInput,
  FormMoneyInput,
  FormNumberInput,
  FormPercentageInput,
  FormPhoneInput,
  FormSimpleSelect,
  FormTextInput,
} from 'z-frontend-forms';
import { ActionModal, ActionModalProps, DialogManager } from 'z-frontend-overlays';

import { AddRowMutation, EditQuery } from '../../gqlTypes';
import { ComponentDescription, SelectColumnIdMap } from '../../types';
import { editQuery } from '../DatagridContainer';

type AddRowButtonProps = {
  columnConfiguration: EditQuery.ColumnConfiguration[];
  datagridId: string;
  selectColumnIdMap: SelectColumnIdMap;
};

const addRowMutation = gql`
  mutation AddRowMutation($datagridId: ID!, $rows: [DatagridRowInput!]!) {
    saveDatagridRows(datagridId: $datagridId, rows: $rows) {
      id
      data
      errors
    }
  }
`;

// Empty value is used for form initialValues
const columnTypeToFormInputComponent: {
  [key: string]: ComponentDescription & { component?: React.ComponentClass<any> };
} = {
  decimal: { name: 'NumberInput', component: FormNumberInput, props: { allowDecimal: true }, emptyValue: null },
  integer: { name: 'NumberInput', component: FormNumberInput, props: { allowDecimal: false }, emptyValue: null },
  money: { name: 'MoneyInput', component: FormMoneyInput, emptyValue: null },
  percentage: { name: 'PercentageInput', component: FormPercentageInput, emptyValue: null },
  date: { name: 'DateInput', component: FormDateInput, emptyValue: '' },
  email: { name: 'TextInput', component: FormTextInput, props: { type: 'email' }, emptyValue: '' },
  phone: { name: 'PhoneInput', component: FormPhoneInput, props: { allowInternational: true }, emptyValue: '' }, // TODO: international should come from column config
  // We don't have form inputs for below columns yet
  addressCountry: { name: '' },
  addressState: { name: '' },
  addressZip: { name: '' },
};

class AddRowButton extends React.Component<AddRowButtonProps> {
  getFormOnSubmit = (addRowMutation, closeDialog) => async values => {
    const { datagridId, selectColumnIdMap, columnConfiguration } = this.props;
    await addRowMutation({
      variables: {
        datagridId,
        rows: [getRowInput(values, selectColumnIdMap, columnConfiguration)],
      },
    });

    closeDialog();
  };

  render() {
    const { columnConfiguration, datagridId } = this.props;
    const firstCategory = columnConfiguration[0].category;
    const requiredColumnsInFirstCategory = columnConfiguration.filter(column => {
      const isRequired = column.validations.some(validation => validation.type === 'required');
      const isInFirstCategory = column.category.key === firstCategory.key;
      return isRequired && isInFirstCategory;
    });
    const validationSchema = getValidationSchema(requiredColumnsInFirstCategory);
    const initialValues = getFormInitialValues(requiredColumnsInFirstCategory);

    return (
      <Mutation<AddRowMutation.Mutation>
        mutation={addRowMutation}
        refetchQueries={() => [{ query: editQuery, variables: { id: datagridId } }]}
      >
        {(addRowMutation, { loading }) => {
          return (
            <DialogManager
              render={dialog => {
                const modalProps: ActionModalProps = {
                  title: 'Add Row',
                  buttons: [{ text: 'Add', type: 'submit', inProgress: loading }],
                  isVisible: dialog.isVisible,
                  controlEl: dialog.controlEl,
                  onCancel: dialog.close,
                };

                return (
                  <>
                    {dialog.isVisible && (
                      <Form
                        initialValues={initialValues}
                        onSubmit={this.getFormOnSubmit(addRowMutation, dialog.close)}
                        validationSchema={validationSchema}
                      >
                        <ActionModal {...modalProps}>
                          {requiredColumnsInFirstCategory.map(column => {
                            const commonInputProps = {
                              key: column.id,
                              name: column.id,
                              label: column.label,
                              required: true,
                            };

                            if (column.values.length) {
                              return (
                                <FormSimpleSelect<EditQuery.Values>
                                  {...commonInputProps}
                                  getOptionText={(option: EditQuery.Values) => option.label}
                                >
                                  {({ SelectOption }) =>
                                    column.values.map(option => <SelectOption key={option.label} option={option} />)
                                  }
                                </FormSimpleSelect>
                              );
                            } else if (columnTypeToFormInputComponent[column.type]) {
                              const mappedComponent = columnTypeToFormInputComponent[column.type];
                              const { props, component: InputComponent } = mappedComponent;

                              if (!InputComponent) {
                                throw new Error(`${column.type} column is not supported in add row modal`);
                              }

                              return <InputComponent {...commonInputProps} {...props} />;
                            } else {
                              return <FormTextInput {...commonInputProps} />;
                            }
                          })}
                        </ActionModal>
                      </Form>
                    )}

                    <IconButton iconName="plus-circle" onClick={dialog.open}>
                      Add Row
                    </IconButton>
                  </>
                );
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default AddRowButton;

function getValidationSchema(columns) {
  return columns.reduce((schema, column) => {
    schema[column.id] = Form.Yup.mixed().required(getRequiredErrorMessage(column));
    return schema;
  }, {});
}

function getRequiredErrorMessage(column) {
  const { validations } = column;
  const requiredValidation = validations.find(validation => validation.type === 'required');
  return requiredValidation.message || `${column.label} is required`;
}

function getRowInput(
  values,
  selectColumnIdMap: SelectColumnIdMap,
  columnConfiguration: EditQuery.ColumnConfiguration[],
): { data: any } {
  /**
   * Create an object with all columns
   */
  const defaultRowData = columnConfiguration.reduce((rowData, column) => {
    if (
      columnTypeToFormInputComponent[column.type] &&
      columnTypeToFormInputComponent[column.type].emptyValue !== undefined
    ) {
      rowData[column.id] = columnTypeToFormInputComponent[column.type].emptyValue;
    } else {
      rowData[column.id] = '';
    }
    return rowData;
  }, {});

  /**
   * Select input fields have value in the shape of {value: 'xx', label: 'xx'}. We need to extract the value before
   * calling a mutation
   * Note: value.value can be null so we cannot simply use value.value as an select option
   */
  Object.keys(selectColumnIdMap).forEach(columnId => {
    const inputValue = values[columnId];

    if (inputValue && inputValue.label) {
      // The input value is in shape {value: 'xx', label: 'xx'}
      values[columnId] = inputValue.value;
    } else if (inputValue === null) {
      // null is the value for placeholder option. We convert it to ''
      values[columnId] = '';
    }
  });

  return { data: { ...defaultRowData, ...values } };
}

function getFormInitialValues(requiredColumnsInFirstCategory) {
  return requiredColumnsInFirstCategory.reduce((initialValues, column) => {
    let initialValue;
    if (column.values.length) {
      // Empty value for SimpleSelect with objects as value options
      initialValue = null;
    } else if (columnTypeToFormInputComponent[column.type]) {
      const mappedComponent: ComponentDescription = columnTypeToFormInputComponent[column.type];
      const { name, emptyValue } = mappedComponent;

      if (!name) {
        throw new Error(`${column.type} column is not supported in add row modal`);
      }
      initialValue = emptyValue;
    } else {
      // Empty value for TextInput
      initialValue = '';
    }

    initialValues[column.id] = initialValue;

    return initialValues;
  }, {});
}
