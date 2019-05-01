import moment from 'moment';
import { Validator } from 'redux-form';

// TODO: localize all the strings
const required = (value: any) => {
  return isSpecified(value) ? undefined : 'Required';
};

function isSpecified(value: any) {
  if (typeof value === 'string') {
    return Boolean(value && value.trim());
  }
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (value !== null && value !== undefined) {
    console.warn(`Missing validator support for required: ${value} (${typeof value})`);
  }
  return Boolean(value);
}

const numericValidators: { [validationName in keyof ValidatorOptions]?: (validatorValue: any) => Validator } = {
  minVal: (minVal: any) => (value: any) =>
    getNumericValue(value) >= minVal ? undefined : `Must be at least ${minVal}.`,
  maxVal: (maxVal: any) => (value: any) =>
    getNumericValue(value) <= maxVal ? undefined : `Must be ${maxVal} or less.`,
  minLength: (min: any) => (value: any) =>
    value && value.length >= min ? undefined : `Must be at least ${min} characters.`,
  maxLength: (max: any) => (value: any) =>
    value && value.length <= max ? undefined : `Must be ${max} or fewer characters.`,
};

const CACHE_VALIDATORS: { [key: string]: Validator[] } = {};

interface ValidatorOptions {
  required?: boolean;
  minVal?: number | string;
  maxVal?: number | string;
  minLength?: number;
  maxLength?: number;
  maxDate?: { maxDate: Date; format: string };
  minDate?: { minDate: Date; format: string };
}

export const generateValidators = (options: ValidatorOptions) => {
  const stringifiedOptions = JSON.stringify(options);
  if (CACHE_VALIDATORS.hasOwnProperty(stringifiedOptions)) {
    return CACHE_VALIDATORS[stringifiedOptions];
  }

  const validators: Validator[] = Object.keys(numericValidators)
    .map((validatorKey: keyof ValidatorOptions) => {
      const numericValue = getNumericValue(options[validatorKey]);
      if (options.hasOwnProperty(validatorKey) && Number.isFinite(numericValue)) {
        return numericValidators[validatorKey](numericValue);
      }
    })
    .filter(Boolean);

  if (options.maxDate) {
    validators.push(value =>
      !value || moment(value).isSameOrBefore(options.maxDate.maxDate)
        ? undefined
        : `Select a date before ${moment(options.maxDate.maxDate)
            .add({ days: 1 })
            .format(options.maxDate.format || 'L')}.`,
    );
  }
  if (options.minDate) {
    validators.push(value =>
      !value || moment(value).isSameOrAfter(options.minDate.minDate)
        ? undefined
        : `Select a date after ${moment(options.minDate.minDate)
            .add({ days: -1 })
            .format(options.minDate.format || 'L')}.`,
    );
  }
  if (options.required) {
    validators.push(required);
  }

  CACHE_VALIDATORS[stringifiedOptions] = validators;
  return validators;
};

function getNumericValue(value: any) {
  if (value === null) {
    return NaN; // Number(null) is 0 :(
  }

  let normalized = value;
  if (typeof value === 'string') {
    normalized = value.replace(/[$,%]/g, '');
  }
  return Number(normalized);
}
