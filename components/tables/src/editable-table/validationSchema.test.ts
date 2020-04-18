import { buildValidationSchema, generatePostalCodeSchema, generateValidStateProvinceSchema } from './validationSchema';

describe('EditableTable|validationSchemas', () => {
  const postalCodeShema = generatePostalCodeSchema('country', 'Please enter a valid postal code');
  const stateSchema = generateValidStateProvinceSchema('country', 'Please enter a valid state/province');

  it('Validates CA postal code', () => {
    postalCodeShema.validateSync('V6B 2X5', { context: { postalCode: 'V6B 2X5', country: 'CA' } });
    postalCodeShema.validateSync('V6B2X5', { context: { postalCode: 'V6B2X5', country: 'CA' } });
    postalCodeShema.validateSync('v6b2X5', { context: { postalCode: 'v6b2X5', country: 'CA' } });

    expect(() => {
      postalCodeShema.validateSync('V6B 2', { context: { postalCode: 'V6B 2', country: 'CA' } });
    }).toThrow();
  });

  it('Validates US postal code', () => {
    postalCodeShema.validateSync('12345', { context: { postalCode: '12345', country: 'US' } });
    postalCodeShema.validateSync('12345-6789', { context: { postalCode: '12345-6789', country: 'US' } });

    expect(() => {
      postalCodeShema.validateSync('123', { context: { postalCode: '123', country: 'US' } });
    }).toThrow();
  });

  it('Validates UK post code', () => {
    postalCodeShema.validateSync('L1 8JQ', { context: { postalCode: 'L1 8JQ', country: 'UK' } });
    postalCodeShema.validateSync('B33 8TH', { context: { postalCode: 'B33 8TH', country: 'UK' } });

    expect(() => {
      postalCodeShema.validateSync('L1z', { context: { postalCode: 'L1z', country: 'UK' } });
    }).toThrow();
  });

  it('Validates IE post code', () => {
    postalCodeShema.validateSync('A65 B2CD', { context: { postalCode: 'A65 B2CD', country: 'IE' } });
    postalCodeShema.validateSync('D01 F5P2', { context: { postalCode: 'D01 F5P2', country: 'IE' } });
    postalCodeShema.validateSync('D6W XY00', { context: { postalCode: 'D6W XY00', country: 'IE' } });

    expect(() => {
      postalCodeShema.validateSync('A65 B', { context: { postalCode: 'A65 B', country: 'IE' } });
    }).toThrow();
  });

  it('validates BZ post code', () => {
    postalCodeShema.validateSync('12345123', { context: { postalCode: '12345123', country: 'BR' } });
    postalCodeShema.validateSync('12345-123', { context: { postalCode: '12345-123', country: 'BR' } });

    expect(() => {
      postalCodeShema.validateSync('12345-1', { context: { postalCode: '12345-1', country: 'BR' } });
    }).toThrow();
  });

  it('Validates AU post code', () => {
    postalCodeShema.validateSync('0212', { context: { postalCode: '0212', country: 'AU' } });

    expect(() => {
      postalCodeShema.validateSync('021', { context: { postalCode: '021', country: 'AU' } });
    }).toThrow();
  });

  it('permits anything with no country', () => {
    postalCodeShema.validateSync('0212', { context: { postalCode: '0212', country: 'FOO' } });
  });

  it('permits a valid state selection', () => {
    stateSchema.validateSync('BC', { context: { country: 'CA' } });
  });

  it('does not permit a state selection in the wrong country', () => {
    expect(() => {
      stateSchema.validateSync('BC', { context: { country: 'US' } });
    }).toThrow();
  });

  it('allows anything if no states defined', () => {
    stateSchema.validateSync('Bonjour', { context: { country: 'FR' } });
  });

  describe('getValidationSchema', () => {
    it('creates a required schema', () => {
      const schema = buildValidationSchema({ type: 'required', dataType: 'string', message: 'Field is required' });

      schema.validateSync('val');
      expect(() => {
        schema.validateSync('');
      }).toThrow('Field is required');
      expect(() => {
        schema.validateSync(undefined);
      }).toThrow('Field is required');
    });

    it('creates a regex schema', () => {
      const schema = buildValidationSchema({
        type: 'regex',
        dataType: 'string',
        message: 'Field must match regex',
        options: { pattern: '(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$)' }, // valid email
      });

      schema.validateSync('test@example.com');
      schema.validateSync('');
      expect(() => {
        schema.validateSync('123');
      }).toThrow('Field must match regex');
    });

    it('creates a value range schema', () => {
      const schema = buildValidationSchema({
        type: 'valueRange',
        dataType: 'number',
        message: 'Field must be in range',
        options: { min: 1, max: 5 },
      });

      schema.validateSync(2);
      expect(() => {
        schema.validateSync(0);
      }).toThrow('Field must be in range');
      expect(() => {
        schema.validateSync(100);
      }).toThrow('Field must be in range');
    });

    it('creates a length range schema', () => {
      const schema = buildValidationSchema({
        type: 'lengthRange',
        dataType: 'string',
        message: 'Field must be in length range',
        options: { min: 2, max: 5 },
      });

      schema.validateSync('123');
      expect(() => {
        schema.validateSync('1');
      }).toThrow('');
      expect(() => {
        schema.validateSync('123456');
      }).toThrow('Field must be in length range');
    });

    it('skips a custom validation', () => {
      const schema = buildValidationSchema({
        type: 'custom',
        dataType: 'string',
        message: 'Custom validation',
      });

      expect(schema).toBeNull();
    });

    it("Doesn't throw error on null number", () => {
      const schema = buildValidationSchema({
        type: 'valueRange',
        dataType: 'number',
        message: 'Field must be in range',
        options: { min: 1, max: 5 },
      });

      schema.validateSync(null);
    });

    it('Catches required number', () => {
      const schema = buildValidationSchema({
        type: 'required',
        dataType: 'number',
        message: 'Field required',
      });

      expect(() => {
        schema.validateSync(null);
      }).toThrow('Field required');
    });

    it('Allows null with value range', () => {
      const schema = buildValidationSchema({
        type: 'valueRange',
        dataType: 'string',
        message: 'Field must be in value range',
        options: { min: 2, max: 5 },
      });

      schema.validateSync(null);
    });

    it('Allows empty string with length range', () => {
      const schema = buildValidationSchema({
        type: 'lengthRange',
        dataType: 'string',
        message: 'Field must be in length range',
        options: { min: 2, max: 5 },
      });

      schema.validateSync('');
    });
  });
});
