export type ValidationType = 'regex' | 'required' | 'valueRange' | 'lengthRange' | 'custom';

export type ValidationDataType = 'string' | 'number' | 'boolean' | 'date';

export type RegexValidationOptions = {
  pattern: string;
};

export type RangeValidationOptions = {
  min?: number;
  max?: number;
};

export type ValidationConfiguration = {
  dataType: ValidationDataType;
  type: ValidationType;
  message: string;
  key?: string;
  options?: RegexValidationOptions | RangeValidationOptions;
};
