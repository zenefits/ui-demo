import { parseZenefitsUrl } from './utils';

describe('parseZenefitsUrl', () => {
  it('should parse zenefits:// type urls correctly', () => {
    const route = 'zenefits://client/route1/route2/route3';
    const parsed = parseZenefitsUrl(route);
    expect((parsed as any).route).toBe('route1.route2.route3');
  });
  it('should parse urls with query params correctly', () => {
    const route = 'zenefits://client/route1/route2/route3?a=b&c=d';
    const parsed = parseZenefitsUrl(route);
    expect((parsed as any).params.queryParams).toEqual({ a: 'b', c: 'd' });
  });
  it('should not modify non-zenefits urls', () => {
    const routes = ['/client/route1/route2', '/app/talent/', 'www.google.com'];
    expect(routes.map(parseZenefitsUrl)).toEqual(routes);
  });
});
