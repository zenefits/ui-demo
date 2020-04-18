import * as Yup from 'yup';

import { COUNTRIES_WITH_NO_STATE } from './states';

export type AddressValue = {
  name?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
};

export type AddressHelperOptions = {
  country?: string;
  includeName?: boolean;
};

export type AddressValidationOptions = {
  includeName?: boolean;
  includeCountry?: boolean;
};

export function getEmptyValue(options: AddressHelperOptions = {}): AddressValue {
  const emptyValue: AddressValue = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
  };
  if (options.country) {
    emptyValue.country = options.country;
  }
  if (options.includeName) {
    emptyValue.name = '';
  }
  return emptyValue;
}

type AddressValidationSchemaType = { [key in keyof AddressValue]: Yup.StringSchema };
type AddressValidationType = { [key in string]: Yup.ObjectSchema<any> };

const requiredMessage = (key: string): string => `${key} is a required field.`;

export function getValidationSchema(
  namePrefix: string,
  options: AddressValidationOptions = { includeCountry: true },
): AddressValidationType {
  // TODO: schema error messages should use country-specific labels
  const schema: AddressValidationSchemaType = {
    line1: Yup.string().required(requiredMessage('Address Line 1')),
    city: Yup.string().required(requiredMessage('City')),
    state: Yup.string().when('country', (country: string, schema: Yup.StringSchema) => {
      return country && COUNTRIES_WITH_NO_STATE.includes(country)
        ? schema
        : schema.nullable(true).required(requiredMessage('State/Province'));
    }),
    zip: Yup.string()
      .required(requiredMessage('Zip Code'))
      .when('country', (country: string, schema: Yup.StringSchema) => {
        return country === 'US'
          ? schema.matches(/^[0-9]{5}(?:-[0-9]{4})?$/, { message: 'Invalid zip code.', excludeEmptyString: true })
          : schema;
      }),
    country: options.includeCountry
      ? Yup.string()
          .nullable(true)
          .required(requiredMessage('Country'))
      : Yup.string().nullable(true),
  };

  if (options.includeName) {
    schema.name = Yup.string().required(requiredMessage('Name'));
  }

  const validation: AddressValidationType = {};
  validation[namePrefix] = Yup.object().shape(schema);
  return validation;
}

type GoogleFieldMapping = { [key in string]: { type: string; key: keyof AddressValue } };

// https://github.com/zenefits/yourPeople3/blob/master/component-library/addon/components/address-text-field.js#L16
export const GOOGLE_PLACES_API_FIELD_MAPPING: GoogleFieldMapping = {
  street_number: {
    key: 'line1',
    type: 'short_name',
  },
  route: {
    key: 'line1',
    type: 'long_name',
  },
  locality: {
    key: 'city',
    type: 'long_name',
  },
  administrative_area_level_1: {
    key: 'state',
    type: 'short_name',
  },
  // administrative_area_level_2: {
  //   key: 'county'
  //   type: 'short_name',
  // },
  postal_code: {
    key: 'zip',
    type: 'short_name',
  },
  country: {
    key: 'country',
    type: 'short_name',
  },
};

type GeocodeResult = {
  address_components: Object[];
};

export function geocodeToAddressValue(geocodeResult: GeocodeResult[]): AddressValue {
  const place = geocodeResult[0]; // take best match

  const mappedAddress: AddressValue = {
    line1: '',
  };
  if (!place.address_components) {
    return mappedAddress;
  }

  place.address_components.forEach((component: any) => {
    const addressType = component.types[0];
    const field = GOOGLE_PLACES_API_FIELD_MAPPING[addressType];
    if (!field) {
      return;
    }

    const addressValue = component[field.type];
    if (addressType === 'street_number') {
      mappedAddress.line1 = `${addressValue} ${mappedAddress.line1}`.trim();
    } else if (addressType === 'route') {
      mappedAddress.line1 = `${mappedAddress.line1} ${addressValue}`.trim();
    } else {
      mappedAddress[field.key] = addressValue;
    }
  });
  return mappedAddress;
}

// extracted from https://github.com/zenefits/yourPeople3/blob/master/static/js/views.js#L1110
export const SUPPORTED_COUNTRY_SELECTOR_OPTIONS = [
  { value: 'AU', label: 'Australia' },
  { value: 'CA', label: 'Canada' },
  { value: 'DE', label: 'Germany' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'IN', label: 'India' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'SG', label: 'Singapore' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'IE', label: 'Ireland' },
  { value: 'FR', label: 'France' },
  { value: 'BR', label: 'Brazil' },
];
