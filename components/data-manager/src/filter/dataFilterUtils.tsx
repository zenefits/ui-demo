import { FormFieldFormat } from 'z-frontend-forms';

import { DataManagerRenderProps } from '../DataManager';

export type DataFilterCommonProps<T> = {
  label: string;
  dataKey: Extract<keyof T, string>;
  dataManagerProps: DataManagerRenderProps<T>;
};

export const commonFilterStyleProps = {
  format: 'form-row-top-label' as FormFieldFormat,
  containerProps: { mb: 2 }, // reduce from default
};
