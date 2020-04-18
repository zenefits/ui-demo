import * as Yup from 'yup';

import { SUPPORTED_STATES } from 'z-frontend-forms';

import { RangeValidationOptions, RegexValidationOptions, ValidationConfiguration, ValidationDataType } from './types';

// In some cases these are overly permissive but it's a better place to start than the other way around
const regexes: { [key: string]: RegExp } = {
  CA: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/i, // https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s15.htm
  US: /^[0-9]{5}(?:-[0-9]{4})?$/i, // https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s14.html
  UK: /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/i, // https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s16.html
  AU: /^\d{4}$/,
  IN: /^\d{6}$/,
  SG: /^\d{6}$/,
  DE: /^\d{5}$/,
  FR: /^\d{5}$/,
  BR: /^\d{5}-?\d{3}$/i, // 8 digits with optional -
  IE: /^[a-z\d]{3} ?[a-z\d]{4}$/i,
};

export function generatePostalCodeSchema(countryFieldKey: string, message?: string) {
  return Yup.string().when(`$${countryFieldKey}`, (country: string, schema: any) => {
    const regex = regexes[country];
    if (regex) {
      return schema.matches(regex, message);
    }
    return schema;
  });
}

export function generateValidStateProvinceSchema(countryFieldKey: string, message?: string) {
  return Yup.string().when(`$${countryFieldKey}`, (country: string, schema: any) => {
    const validStateValues = SUPPORTED_STATES[country] ? SUPPORTED_STATES[country].map(state => state.value) : [];
    return validStateValues && validStateValues.length ? schema.oneOf(validStateValues) : schema;
  });
}

const YupSchemaMap: { [key in ValidationDataType]: Yup.AnySchemaConstructor } = {
  string: Yup.string,
  number: Yup.number,
  boolean: Yup.boolean,
  date: Yup.date,
};

export function buildValidationSchema(validation: ValidationConfiguration) {
  let schema = YupSchemaMap[validation.dataType]
    ? new YupSchemaMap[validation.dataType]().nullable(true)
    : Yup.mixed().nullable(true);

  // Empty strings should be treated as null
  schema = schema.transform(val => (val === '' ? null : val));

  if (validation.key) {
    schema = schema.meta({ key: validation.key });
  }

  switch (validation.type) {
    case 'required':
      schema = schema.required(validation.message);
      break;
    case 'valueRange':
      // guard against valueRange being on a non-numeric column type. Min/max mean different things for string types
      if (schema instanceof Yup.number) {
        const options = validation.options as RangeValidationOptions;
        if (typeof options.min === 'number') {
          schema = schema.min(options.min, validation.message);
        }
        if (typeof options.max === 'number') {
          schema = (schema as Yup.NumberSchema).max(options.max, validation.message);
        }
      } else {
        console.warn(`Validation of type valueRange is not valid for column type ${validation.dataType}`);
      }
      break;
    case 'regex': {
      const options = validation.options as RegexValidationOptions;
      if (schema instanceof Yup.string) {
        schema = schema.matches(new RegExp(options.pattern), {
          message: validation.message,
          excludeEmptyString: true,
        });
      } else {
        console.warn(`Validation of type regex is not valid for column type ${validation.dataType}`);
      }
      break;
    }
    case 'lengthRange':
      // guard against valueRange being on a numeric column type. Min/max mean different things for number types
      if (schema instanceof Yup.string) {
        const options = validation.options as RangeValidationOptions;
        if (typeof options.min === 'number') {
          schema = schema.min(options.min, validation.message);
        }
        if (typeof options.max === 'number') {
          schema = (schema as Yup.StringSchema).max(options.max, validation.message);
        }
      } else {
        console.warn(`Validation of type valueRange is not valid for column type ${validation.dataType}`);
      }
      break;
    case 'custom':
      return null;
    default:
      console.warn(`Validation type ${validation.type} not recognized`);
      return null;
  }

  return schema;
}
