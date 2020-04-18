import { FormFieldFormat } from 'z-frontend-forms';

export type DataFilterCommonProps<T> = {
  label: string;
  dataKey: Extract<keyof T, string>;
};

export const commonFilterStyleProps = {
  format: 'form-row-top-label' as FormFieldFormat,
  containerProps: { mb: 2 }, // reduce from default
};
