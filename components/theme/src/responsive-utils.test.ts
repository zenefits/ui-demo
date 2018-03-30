import { buildMediaQueries } from './responsive-utils';

describe('Responsive-utiles - buildMediaQueries ', () => {
  it('returns all media queries', () => {
    expect(buildMediaQueries()).toEqual([
      '(max-width: 511px)',
      '(min-width: 512px) and (max-width: 767px)',
      '(min-width: 768px) and (max-width: 1023px)',
      '(min-width: 1024px) and (max-width: 1279px)',
      '(min-width: 1280px)',
    ]);
  });
});
