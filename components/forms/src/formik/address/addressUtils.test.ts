import { geocodeToAddressValue, getValidationSchema } from './addressUtils';

const emptyInput: any[] = [{}];

const completeInput = [
  {
    address_components: [
      {
        long_name: '123',
        short_name: '123',
        types: ['street_number'],
      },
      {
        long_name: 'Main Street',
        short_name: 'Main St',
        types: ['route'],
      },
      {
        long_name: 'Central',
        short_name: 'Central',
        types: ['neighborhood', 'political'],
      },
      {
        long_name: 'Vancouver',
        short_name: 'Vancouver',
        types: ['locality', 'political'],
      },
      {
        long_name: 'Greater Vancouver',
        short_name: 'Greater Vancouver',
        types: ['administrative_area_level_2', 'political'],
      },
      {
        long_name: 'British Columbia',
        short_name: 'BC',
        types: ['administrative_area_level_1', 'political'],
      },
      {
        long_name: 'Canada',
        short_name: 'CA',
        types: ['country', 'political'],
      },
      {
        long_name: 'V6A 2S5',
        short_name: 'V6A 2S5',
        types: ['postal_code'],
      },
    ],
    formatted_address: '123 Main St, Vancouver, BC V6A 2S5, Canada',
  },
];

const streetInput = [
  {
    address_components: [
      {
        long_name: 'Main Street',
        short_name: 'Main St',
        types: ['route'],
      },
      {
        long_name: 'South Beach',
        short_name: 'South Beach',
        types: ['neighborhood', 'political'],
      },
      {
        long_name: 'San Francisco',
        short_name: 'SF',
        types: ['locality', 'political'],
      },
      {
        long_name: 'San Francisco County',
        short_name: 'San Francisco County',
        types: ['administrative_area_level_2', 'political'],
      },
      {
        long_name: 'California',
        short_name: 'CA',
        types: ['administrative_area_level_1', 'political'],
      },
      {
        long_name: 'United States',
        short_name: 'US',
        types: ['country', 'political'],
      },
      {
        long_name: '94105',
        short_name: '94105',
        types: ['postal_code'],
      },
    ],
    formatted_address: 'Main St, San Francisco, CA 94105, USA',
  },
];

const cityInput = [
  {
    address_components: [
      {
        long_name: 'San Francisco',
        short_name: 'SF',
        types: ['locality', 'political'],
      },
      {
        long_name: 'San Francisco County',
        short_name: 'San Francisco County',
        types: ['administrative_area_level_2', 'political'],
      },
      {
        long_name: 'California',
        short_name: 'CA',
        types: ['administrative_area_level_1', 'political'],
      },
      {
        long_name: 'United States',
        short_name: 'US',
        types: ['country', 'political'],
      },
    ],
    formatted_address: 'San Francisco, CA, USA',
  },
];

describe('geocodeToAddressValue', () => {
  it('empty input', () => {
    const address = geocodeToAddressValue(emptyInput);
    expect(address).toEqual({ line1: '' });
  });
  it('complete input', () => {
    const address = geocodeToAddressValue(completeInput);
    expect(address).toEqual({
      city: 'Vancouver',
      line1: '123 Main Street',
      state: 'BC',
      zip: 'V6A 2S5',
      country: 'CA',
    });
  });
  it('street only input', () => {
    const address = geocodeToAddressValue(streetInput);
    expect(address).toEqual({ city: 'San Francisco', line1: 'Main Street', state: 'CA', zip: '94105', country: 'US' });
  });
  it('city only input', () => {
    const address = geocodeToAddressValue(cityInput);
    expect(address).toEqual({ city: 'San Francisco', line1: '', state: 'CA', country: 'US' });
  });
});

describe('getValidationSchema', () => {
  it('allows standard US address', () => {
    const schema = getValidationSchema('address').address;
    const data = {
      line1: 'Brannan Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '90210',
      country: 'US',
    };
    expect(schema.isValidSync(data)).toBeTruthy();
  });

  it('catches missing zip', () => {
    const schema = getValidationSchema('address').address;
    const data = {
      line1: 'Brannan Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '', // missing
      country: 'US',
    };
    expect(schema.isValidSync(data)).toBeFalsy();
  });

  it('catches missing state', () => {
    const schema = getValidationSchema('address').address;
    const data = {
      line1: 'Brannan Street',
      city: 'San Francisco',
      state: '', // missing
      zip: '90210',
      country: 'US',
    };
    expect(schema.isValidSync(data)).toBeFalsy();
  });

  it('allows missing state for certain countries (FR)', () => {
    const schema = getValidationSchema('address').address;
    const data = {
      line1: '555 Rue de Turbigo',
      city: 'Paris',
      state: '', // missing
      zip: '75000',
      country: 'FR',
    };
    expect(schema.validateSync(data)).toBeTruthy();
  });

  it('catches missing country', () => {
    const schema = getValidationSchema('address').address;
    const data = {
      line1: '555 Rue de Turbigo',
      city: 'Nowhere',
      state: 'BC',
      zip: '75000',
      country: '', // missing
    };
    expect(schema.isValidSync(data)).toBeFalsy();
  });
});
