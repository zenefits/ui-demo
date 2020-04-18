import React, { Component } from 'react';
import { getIn, FieldProps } from 'formik';

import { Box, Flex } from 'zbase';

import Field from '../Field';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import FileUploader, { FileUploaderProps, UploadingFileResponse } from '../../file-uploader/FileUploader';

type FormFileUploaderProps = FileUploaderProps &
  FormFieldProps & {
    additionalInformation?: React.ReactNode | string;
  };

class FormFileUploader extends Component<FormFileUploaderProps> {
  removeFile = (file: UploadingFileResponse, fieldProps: FieldProps) => {
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
    const {
      name,
      label,
      containerProps,
      optional,
      fieldType,
      additionalInformation,
      format,
      limitRerender,
      dependencies,
      ...rest
    } = this.props;
    return (
      <Field name={name} limitRerender={limitRerender} dependencies={dependencies}>
        {fieldProps => {
          const { field, form, setFieldValueAndTouched } = fieldProps;
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);

          return (
            <FormFieldWrapper
              fieldType={fieldType}
              name={name}
              label={label}
              error={error}
              format={format}
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
                  initialFiles={field.value}
                  onSuccess={file => {
                    if (!field.value) {
                      field.value = [];
                    }
                    field.value.push(file);
                    setFieldValueAndTouched(field.name, field.value);
                  }}
                  removeFile={file => this.removeFile(file, fieldProps)}
                />
              </Box>
            </FormFieldWrapper>
          );
        }}
      </Field>
    );
  }
}

export default FormFileUploader;
