// TODO: localize all the strings
const required = value => (value && value.trim() ? undefined : 'required');
const validatorHofs = {
  minVal: minVal => value => (value >= minVal ? undefined : `must be at least ${minVal}`),
  maxVal: maxVal => value => (value <= maxVal ? undefined : `must be less than ${maxVal}`),
  minLength: min => value => (value && value.length >= min ? undefined : `must be at least ${min} characters or more`),
  maxLength: max => value => (value && value.length <= max ? undefined : `must be ${max} characters or less`),
};

const CACHE_VALIDATORS = {};

export const generateValidators = (options: {
  required?: boolean;
  minVal?: number;
  maxVal?: number;
  minLength?: number;
  maxLength?: number;
}) => {
  const stringifiedOptions = JSON.stringify(options);
  if (!CACHE_VALIDATORS.hasOwnProperty(stringifiedOptions)) {
    CACHE_VALIDATORS[stringifiedOptions] = [];
    if (options.required) {
      CACHE_VALIDATORS[stringifiedOptions].push(required);
    }
    Object.keys(validatorHofs).forEach(validatorKey => {
      if (options[validatorKey]) {
        const fn = validatorHofs[validatorKey](options[validatorKey]);
        CACHE_VALIDATORS[stringifiedOptions].push(fn);
      }
    });
  }
  return CACHE_VALIDATORS[stringifiedOptions];
};
