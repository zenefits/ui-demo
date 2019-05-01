import { generateValidators } from './validators';

const helper = (generateValidatorsArg: any, val: any) => {
  const validatorArr = generateValidators(generateValidatorsArg);
  return validatorArr[0](val);
};

describe('validators#generateValidators', () => {
  it('caches validator arrays', () => {
    const validatorArr1 = generateValidators({ required: true, minLength: 4 });
    const validatorArr2 = generateValidators({ required: true, minLength: 4 });

    expect(validatorArr1).toEqual(validatorArr2);
  });

  it('handles null and undefined', () => {
    const validatorArr1 = generateValidators({ maxVal: null, minVal: undefined });
    expect(validatorArr1).toHaveLength(0);
  });

  describe('required', () => {
    it('handles strings intelligently', () => {
      expect(helper({ required: true }, '')).toBe('Required');
      expect(helper({ required: true }, '  ')).toBe('Required');
      expect(helper({ required: true }, ' Something ')).toBe(undefined);
    });
    it('handles numbers intelligently', () => {
      expect(helper({ required: true }, 25)).toBe(undefined);
      expect(helper({ required: true }, 0)).toBe(undefined);
      expect(helper({ required: true }, NaN)).toBe('Required');
    });
    it('handles arrays intelligently', () => {
      expect(helper({ required: true }, ['something'])).toBe(undefined);
      expect(helper({ required: true }, [1, 2, 3])).toBe(undefined);
      expect(helper({ required: true }, [])).toBe('Required');
    });
    it('returns message when value does not exist', () => {
      expect(helper({ required: true }, null)).toBe('Required');
      expect(helper({ required: true }, undefined)).toBe('Required');
    });
  });
  describe('minimum value', () => {
    it('returns error message when value less than min', () => {
      expect(helper({ minVal: 5 }, 4)).toBe('Must be at least 5.');
    });
    it('returns undefined when value is equal to min', () => {
      expect(helper({ minVal: 5 }, 5)).toBe(undefined);
    });
    it('returns undefined when value greater than min', () => {
      expect(helper({ minVal: 5 }, 6)).toBe(undefined);
    });
    it('handles 0 correctly', () => {
      expect(helper({ minVal: 0 }, -2)).toBe('Must be at least 0.');
      expect(helper({ minVal: 0 }, 2)).toBe(undefined);
    });
    it('handles $ correctly', () => {
      expect(helper({ minVal: 2000 }, '$1,500')).toBe('Must be at least 2000.');
      expect(helper({ minVal: 5 }, '$5')).toBe(undefined);
    });
  });
  describe('maximum value', () => {
    it('returns error message when value greater than min', () => {
      expect(helper({ maxVal: 9 }, 10)).toBe('Must be 9 or less.');
    });
    it('returns undefined when value is equal to max', () => {
      expect(helper({ maxVal: 9 }, 9)).toBe(undefined);
    });
    it('returns undefined when value less than max', () => {
      expect(helper({ maxVal: 9 }, 6)).toBe(undefined);
    });
    it('handles 0 correctly', () => {
      expect(helper({ maxVal: 0 }, 2)).toBe('Must be 0 or less.');
      expect(helper({ maxVal: 0 }, -2)).toBe(undefined);
    });
    it('handles $ correctly', () => {
      expect(helper({ maxVal: 1000 }, '$1,500')).toBe('Must be 1000 or less.');
      expect(helper({ maxVal: 5 }, '$5')).toBe(undefined);
    });
  });
  describe('minimum length', () => {
    it('returns error message when value does not have at least 5 characters', () => {
      expect(helper({ minLength: 5 }, 'abcd')).toBe('Must be at least 5 characters.');
    });
    it('returns undefined when value has 5 characters', () => {
      expect(helper({ minLength: 5 }, 'abcde')).toBe(undefined);
    });
    it('returns undefined when value has more than 5 characters', () => {
      expect(helper({ minLength: 5 }, 'abcdefgh')).toBe(undefined);
    });
    it('handles 0', () => {
      expect(helper({ minLength: 0 }, 'abcdefgh')).toBe(undefined);
    });
  });
  describe('maximum length', () => {
    it('returns error message when value has more than 5 characters', () => {
      expect(helper({ maxLength: 5 }, 'abcdefg')).toBe('Must be 5 or fewer characters.');
    });
    it('returns undefined when value has 5 characters', () => {
      expect(helper({ maxLength: 5 }, 'abcde')).toBe(undefined);
    });
    it('returns undefined when value has less than 5 characters', () => {
      expect(helper({ maxLength: 5 }, 'abc')).toBe(undefined);
    });
  });
});
