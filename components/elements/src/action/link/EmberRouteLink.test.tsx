import { buildEmberRouteRedirect } from './EmberRouteLink';

describe('route querystring formatting', () => {
  it('includes "to" param in the output querystring', () => {
    expect(buildEmberRouteRedirect({ to: 'employee.profile' })).toBe(
      '/dashboard/#/redirect-to-route?to=employee.profile',
    );
  });

  const routeParamsArray1 = [1];
  const routeParamsArray2 = [1, 2, 3];
  const routeParamsQuerystring1 = 'routeParams=1';
  const routeParamsQuerystring2 = 'routeParams=1&routeParams=2&routeParams=3';

  it('includes "routeParams" param in the output querystring as repeat-encoded array', () => {
    expect(buildEmberRouteRedirect({ to: undefined as any, routeParams: routeParamsArray1 })).toBe(
      `/dashboard/#/redirect-to-route?${routeParamsQuerystring1}`,
    );
    expect(buildEmberRouteRedirect({ to: undefined as any, routeParams: routeParamsArray2 })).toBe(
      `/dashboard/#/redirect-to-route?${routeParamsQuerystring2}`,
    );
  });

  const queryParamsObject = {
    foo: 'bar',
    hello: 'world',
  };
  const serializedQueryParamsQuerystring = 'queryParams=%7B%22foo%22%3A%22bar%22%2C%22hello%22%3A%22world%22%7D';

  it('includes "queryParams" param in the output querystring as encoded JSON', () => {
    expect(buildEmberRouteRedirect({ to: undefined as any, queryParams: queryParamsObject })).toBe(
      `/dashboard/#/redirect-to-route?${serializedQueryParamsQuerystring}`,
    );
  });

  it('can generate querystring with all options passed', () => {
    const redirect = buildEmberRouteRedirect({
      to: 'employee.profile',
      routeParams: routeParamsArray2,
      queryParams: queryParamsObject,
    });

    expect(redirect.includes('to=employee.profile')).toBe(true);
    expect(redirect.includes(routeParamsQuerystring2)).toBe(true);
    expect(redirect.includes(serializedQueryParamsQuerystring)).toBe(true);
  });
});
