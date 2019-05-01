import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';

import { Box, Flex } from 'zbase';

import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import FileUploader, { FileResponse, FileUploaderProps } from '../../file-uploader/FileUploader';

type FormFileUploaderProps = FileUploaderProps &
  FormFieldProps & {
    additionalInformation?: React.ReactNode | string;
  };

class FormFileUploader extends Component<FormFileUploaderProps> {
  removeFile = (file: FileResponse, fieldProps: FieldProps) => {
    const { field, form } = fieldProps;
    const fileArray = field.value;
    form.setFieldValue(
      field.name,
      fileArray.filter((item: any, index: number) => {
        return file.fileId !== item.fileId;
      }),
    );
  };

  render() {
    const { name, label, containerProps, optional, fieldType, additionalInformation, ...rest } = this.props;
    return (
      <Field
        name={name}
        render={(fieldProps: FieldProps) => {
          const { field, form } = fieldProps;
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);

          return (
            <FormFieldWrapper
              fieldType={fieldType}
              name={name}
              label={label}
              error={error}
              containerProps={containerProps}
              optional={optional}
            >
              <Box my={this.props.isLink ? 2 : 0}>
                {additionalInformation && (
                  <Flex justify="flex-start" mb={2}>
                    {additionalInformation}
                  </Flex>
                )}
                <FileUploader
                  {...rest}
                  onSuccess={file => {
                    if (!field.value) {
                      field.value = [];
                    }
                    field.value.push(file);
                    form.setFieldValue(field.name, field.value);
                    form.setFieldTouched(name, true);
                  }}
                  removeFile={file => this.removeFile(file, fieldProps)}
                />
              </Box>
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormFileUploader;
