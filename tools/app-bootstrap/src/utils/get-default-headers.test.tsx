import getDefaultHeaders from './get-default-headers';

describe('getDefaultHeaders', () => {
  it('should return an object', () => {
    const defaultHeaders = getDefaultHeaders();
    expect(defaultHeaders !== null && typeof defaultHeaders === 'object').toBe(true);
  });
  it('should return the right key values', () => {
    const defaultHeaders = getDefaultHeaders();
    // there is no cookie for this test
    expect(defaultHeaders['X-PAGEUrl']).toBe('http://localhost/');
    expect(defaultHeaders['X-CSRFToken']).toBe(undefined);
    expect(defaultHeaders['X-AJAXToken']).toBe(undefined);
  });
});
