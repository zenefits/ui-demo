import {
  getCssFromProps,
  getCssRuleForProp,
  getCssStringForPropValue,
  spaceValueHelper,
  widthValueFn,
} from './withUtilProps';
import { PropsMap, PropsMapValue } from './commonTypes';

const bp = [44, 55, 66];
const theme = { breakpoints: bp };

describe('getCssStringForPropValue', () => {
  it('should work with no breakpoints', () => {
    expect(getCssStringForPropValue('123', null, { theme }, { cssName: 'css-rule' })).toBe('css-rule: 123;');
    expect(getCssStringForPropValue(23, null, {}, { cssName: 'css-rule' })).toBe('css-rule: 23;');
  });

  it('should work with breakpoints', () => {
    expect(getCssStringForPropValue('54px', 0, { theme }, { cssName: 'css-rule' })).toBe(
      `@media screen and (min-width: ${bp[0]}em) { css-rule: 54px; }`,
    );
    expect(getCssStringForPropValue('54px', 1, { theme }, { cssName: 'css-rule' })).toBe(
      `@media screen and (min-width: ${bp[1]}em) { css-rule: 54px; }`,
    );
    expect(getCssStringForPropValue('val', 2, { theme }, { cssName: 'css-rule' })).toBe(
      `@media screen and (min-width: ${bp[2]}em) { css-rule: val; }`,
    );
  });

  it('should use max breakpoint if provided one does not exists', () => {
    expect(getCssStringForPropValue('val', 3, { theme }, { cssName: 'css-rule' })).toBe(
      `@media screen and (min-width: 66em) { css-rule: val; }`,
    );
  });
});

const propsMapValuesWithResults: {
  testName: string;
  propName: string;
  propValue: any;
  propsMapValue: PropsMapValue;
  result: string;
}[] = [
  {
    testName: 'minimal params',
    propName: 'cs',
    propValue: 'val',
    propsMapValue: { cssName: 'css-rule' },
    result: 'css-rule: val;',
  },
  {
    testName: 'value as const',
    propName: 'cs',
    propValue: 'val',
    propsMapValue: { cssName: 'css-rule', valueHelper: 'const-val' },
    result: 'css-rule: const-val;',
  },
  {
    testName: 'value helper fn',
    propName: 'cs',
    propValue: 'val',
    propsMapValue: {
      cssName: 'css-rule',
      valueHelper: (propVal, props) => `${props.prefix}-${propVal}-${props.postfix}`,
    },
    result: 'css-rule: prefix-val-postfix;',
  },
  {
    testName: 'utilFn',
    propName: 'cs',
    propValue: 'val',
    propsMapValue: {
      cssName: 'css-rule',
      utilFn: propVal => props => `${props.prefix}-${propVal}-${props.postfix}`,
    },
    result: 'css-rule: prefix-val-postfix;',
  },
  {
    testName: 'minimal params (responsive)',
    propName: 'cs',
    propValue: ['val1', 'val2', 'val3', 'val4', 'val5'],
    propsMapValue: { cssName: 'css-rule' },
    result: [
      'css-rule: val1;',
      `@media screen and (min-width: ${bp[0]}em) { css-rule: val2; }`,
      `@media screen and (min-width: ${bp[1]}em) { css-rule: val3; }`,
      `@media screen and (min-width: ${bp[2]}em) { css-rule: val4; }`,
      `@media screen and (min-width: ${bp[2]}em) { css-rule: val5; }`,
    ].join('\n'),
  },
  {
    testName: 'missing values in the array (responsive)',
    propName: 'cs',
    propValue: ['val1', 'val2', null, 'val4', 'val5'],
    propsMapValue: { cssName: 'css-rule' },
    result: [
      'css-rule: val1;',
      `@media screen and (min-width: ${bp[0]}em) { css-rule: val2; }`,
      `@media screen and (min-width: ${bp[2]}em) { css-rule: val4; }`,
      `@media screen and (min-width: ${bp[2]}em) { css-rule: val5; }`,
    ].join('\n'),
  },
  {
    testName: 'value as const (responsive)',
    propName: 'cs',
    propValue: ['val1', 'val2', null, 'val4', 'val5'],
    propsMapValue: { cssName: 'css-rule', valueHelper: 'const-val' },
    result: [
      'css-rule: const-val;',
      `@media screen and (min-width: ${bp[0]}em) { css-rule: const-val; }`,
      `@media screen and (min-width: ${bp[2]}em) { css-rule: const-val; }`,
      `@media screen and (min-width: ${bp[2]}em) { css-rule: const-val; }`,
    ].join('\n'),
  },
  {
    testName: 'value helper fn (responsive)',
    propName: 'cs',
    propValue: ['val1', 'val2', null, 'val4', 'val5'],
    propsMapValue: {
      cssName: 'css-rule',
      valueHelper: (propVal, props) => `${props.prefix}-${propVal}-${props.postfix}`,
    },
    result: [
      'css-rule: prefix-val1-postfix;',
      `@media screen and (min-width: ${bp[0]}em) { css-rule: prefix-val2-postfix; }`,
      `@media screen and (min-width: ${bp[2]}em) { css-rule: prefix-val4-postfix; }`,
      `@media screen and (min-width: ${bp[2]}em) { css-rule: prefix-val5-postfix; }`,
    ].join('\n'),
  },
  {
    testName: 'utilFn (responsive)',
    propName: 'cs',
    propValue: ['val1', 'val2', null, 'val4', 'val5'],
    propsMapValue: {
      cssName: 'css-rule',
      utilFn: propVal => props => `${props.prefix}-${propVal}-${props.postfix}`,
    },
    result: [
      'css-rule: prefix-val1-postfix;',
      `@media screen and (min-width: ${bp[0]}em) { css-rule: prefix-val2-postfix; }`,
      `@media screen and (min-width: ${bp[2]}em) { css-rule: prefix-val4-postfix; }`,
      `@media screen and (min-width: ${bp[2]}em) { css-rule: prefix-val5-postfix; }`,
    ].join('\n'),
  },
];

describe('getCssRuleForProp', () => {
  propsMapValuesWithResults.forEach(d => {
    it(`should work with ${d.testName}`, () => {
      expect(
        getCssRuleForProp(
          d.propName,
          d.propsMapValue,
        )({
          theme,
          prefix: 'prefix',
          postfix: 'postfix',
          [d.propName]: d.propValue,
        }),
      ).toBe(d.result);
    });
  });
});

describe('widthValueFn', () => {
  it('should return percentage for values <= 1', () => {
    expect(widthValueFn(1 / 2)).toBe('50%');
    expect(widthValueFn(1 / 3)).toBe('33.33333333333333%');
    expect(widthValueFn(1)).toBe('100%');
  });
  it('should return px for values > 1', () => {
    expect(widthValueFn(1.1)).toBe('1.1px');
    expect(widthValueFn(2)).toBe('2px');
    expect(widthValueFn(300)).toBe('300px');
  });
  it('should not modify non number values', () => {
    expect(widthValueFn('string val')).toBe('string val');
    expect(widthValueFn(null)).toBe(null);
    expect(widthValueFn(undefined)).toBe(undefined);
    const obj = { foo: 'bar' };
    expect(widthValueFn(obj)).toBe(obj);
  });
});

test('spaceValueHelper', () => {
  const props = { theme: { space: [0, 4, 8, 16] } };
  expect(spaceValueHelper(123, props)).toBe('123px');
  expect(spaceValueHelper(-123, props)).toBe('-123px');
  expect(spaceValueHelper(1, props)).toBe('4px');
  expect(spaceValueHelper(-1, props)).toBe('-4px');
  expect(spaceValueHelper('1', props)).toBe('1');
  expect(spaceValueHelper('-1', props)).toBe('-1');
  expect(spaceValueHelper(null, props)).toBe(null);
});

describe('getCssFromProps', () => {
  it('should handle no input', () => {
    expect(getCssFromProps({})({})).toBe('');
  });
  it('should handle propsMap', () => {
    const propsMap: PropsMap = {};
    const props: any = {
      theme,
      prefix: 'prefix',
      postfix: 'postfix',
    };
    const results: any[] = [];

    propsMapValuesWithResults.forEach((d, i) => {
      propsMap[d.propName + i] = d.propsMapValue;
      props[d.propName + i] = d.propValue;
      results.push(d.result);
    });

    expect(getCssFromProps(propsMap)(props)).toBe(results.join('\n'));
  });
  it('should handle propsMap that includes order', () => {
    const orderedPropsMapValuesWithResults = [
      {
        testName: 'minimal params',
        propName: 'cs',
        propValue: 'first',
        propsMapValue: { cssName: 'css-rule' } as PropsMapValue,
        result: 'css-rule: first;',
      },
      {
        testName: 'value as const',
        propName: 'cs',
        propValue: 'second',
        propsMapValue: { cssName: 'css-rule', valueHelper: 'const-second', order: 1 },
        result: 'css-rule: const-second;',
      },
      {
        testName: 'value helper fn',
        propName: 'cs',
        propValue: 'third',
        propsMapValue: {
          cssName: 'css-rule',
          valueHelper: (propVal: string, props: any) => `${props.prefix}-${propVal}-${props.postfix}`,
        },
        result: 'css-rule: prefix-third-postfix;',
      },
      {
        testName: 'minimal params (responsive)',
        propName: 'cs',
        propValue: ['val1', 'val2', 'val3', 'val4', 'val5'],
        propsMapValue: { cssName: 'css-rule', order: -1 },
        result: [
          'css-rule: val1;',
          `@media screen and (min-width: ${bp[0]}em) { css-rule: val2; }`,
          `@media screen and (min-width: ${bp[1]}em) { css-rule: val3; }`,
          `@media screen and (min-width: ${bp[2]}em) { css-rule: val4; }`,
          `@media screen and (min-width: ${bp[2]}em) { css-rule: val5; }`,
        ].join('\n'),
      },
    ];

    const propsMap: PropsMap = {};
    const props: any = {
      theme,
      prefix: 'prefix',
      postfix: 'postfix',
    };
    orderedPropsMapValuesWithResults.forEach((d, i) => {
      propsMap[d.propName + i] = d.propsMapValue;
      props[d.propName + i] = d.propValue;
    });

    const resultsAccountingForOrder = [
      orderedPropsMapValuesWithResults[3].result,
      orderedPropsMapValuesWithResults[0].result,
      orderedPropsMapValuesWithResults[2].result,
      orderedPropsMapValuesWithResults[1].result,
    ];
    expect(getCssFromProps(propsMap)(props)).toBe(resultsAccountingForOrder.join('\n'));
  });
});
