import { generateValidators } from './validators';

const helper = (generateValidatorsArg, val) => {
  const validatorArr = generateValidators(generateValidatorsArg);
  return validatorArr[0](val);
};

describe('validators#generateValidators', () => {
  it('caches validator arrays', () => {
    const validatorArr1 = generateValidators({ required: true, minLength: 4 });
    const validatorArr2 = generateValidators({ required: true, minLength: 4 });

    expect(validatorArr1).toEqual(validatorArr2);
  });

  describe('required', () => {
    it('returns error message when value is empty', () => {
      expect(helper({ required: true }, '')).toBe('required');
    });
    it('returns undefined when value exists', () => {
      expect(helper({ required: true }, 'something')).toBe(undefined);
    });
  });
  describe('minimum value', () => {
    it('returns error message when value less than min', () => {
      expect(helper({ minVal: 5 }, 4)).toBe('must be at least 5');
    });
    it('returns undefined when value is equal to min', () => {
      expect(helper({ minVal: 5 }, 5)).toBe(undefined);
    });
    it('returns undefined when value greater than min', () => {
      expect(helper({ minVal: 5 }, 6)).toBe(undefined);
    });
  });
  describe('maximum value', () => {
    it('returns error message when value greater than min', () => {
      expect(helper({ maxVal: 9 }, 10)).toBe('must be less than 9');
    });
    it('returns undefined when value is equal to max', () => {
      expect(helper({ maxVal: 9 }, 9)).toBe(undefined);
    });
    it('returns undefined when value less than max', () => {
      expect(helper({ maxVal: 9 }, 6)).toBe(undefined);
    });
  });
  describe('minimum length', () => {
    it('returns error message when value does not have at least 5 characters', () => {
      expect(helper({ minLength: 5 }, 'abcd')).toBe('must be at least 5 characters or more');
    });
    it('returns undefined when value has 5 characters', () => {
      expect(helper({ minLength: 5 }, 'abcde')).toBe(undefined);
    });
    it('returns undefined when value has more than 5 characters', () => {
      expect(helper({ minLength: 5 }, 'abcdefgh')).toBe(undefined);
    });
  });
  describe('maximum length', () => {
    it('returns error message when value has more than 5 characters', () => {
      expect(helper({ maxLength: 5 }, 'abcdefg')).toBe('must be 5 characters or less');
    });
    it('returns undefined when value has 5 characters', () => {
      expect(helper({ maxLength: 5 }, 'abcde')).toBe(undefined);
    });
    it('returns undefined when value has less than 5 characters', () => {
      expect(helper({ maxLength: 5 }, 'abc')).toBe(undefined);
    });
  });
});
