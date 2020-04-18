import { IBasicPoint } from 'signature_pad/dist/types/point';

import { estimateSignatureLength, getSignatureCoverage, validateSignature } from './signatureUtil';

const makePoint = (x: number, y: number): IBasicPoint => {
  return { x, y, time: null };
};

const canvasSize = 350;

const lShape = [
  {
    color: 'black',
    points: Array.from({ length: 151 }).map((value, i) => makePoint(0, i)),
  },
  {
    color: 'black',
    points: Array.from({ length: 151 }).map((value, i) => makePoint(i, 0)),
  },
];

const verticalLine = {
  color: 'black',
  points: Array.from({ length: 305 }).map((value, i) => makePoint(0, i)),
};

describe('validateSignatureData', () => {
  it('handles null', () => {
    expect(validateSignature(null, null, null)).toBe(false);
    expect(validateSignature(null, canvasSize, canvasSize)).toBe(false);
    expect(validateSignature([], canvasSize, canvasSize)).toBe(false);
  });

  it('too short', () => {
    const pointGroup = [
      {
        color: 'black',
        points: [makePoint(1, 1), makePoint(2, 2), makePoint(3, 3)],
      },
    ];
    expect(validateSignature(pointGroup, canvasSize, canvasSize)).toBe(false);
  });

  it('long enough but not enough coverage in x dimension', () => {
    const pointGroup = [verticalLine];
    expect(validateSignature(pointGroup, canvasSize, canvasSize)).toBe(false);
  });

  it('long enough and enough coverage', () => {
    const pointGroup = lShape;
    expect(validateSignature(pointGroup, canvasSize, canvasSize)).toBe(true);
  });
});

describe('estimateSignatureLength', () => {
  it('multiple strokes', () => {
    const pointGroup = lShape;
    expect(estimateSignatureLength(pointGroup)).toBe(300);
  });
});

describe('getSignatureCoverage', () => {
  it('vertical line', () => {
    const pointGroup = [verticalLine];
    const coverage = getSignatureCoverage(pointGroup, canvasSize, canvasSize);
    expect(coverage.x).toBeCloseTo(0);
    expect(coverage.y).toBeCloseTo(0.87);
  });

  it('L shape', () => {
    const pointGroup = lShape;
    const coverage = getSignatureCoverage(pointGroup, canvasSize, canvasSize);
    expect(coverage.x).toBeCloseTo(0.43);
    expect(coverage.y).toBeCloseTo(0.43);
  });
});
