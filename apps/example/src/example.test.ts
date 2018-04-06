import reducer, { setFooAction } from './example';

test('foo actions creator setFooAction', () => {
  const newFoo = 'new foo';
  expect(setFooAction(newFoo).payload.foo).toBe(newFoo);
});

test('foo reducer', () => {
  const newFoo = 'new foo';
  expect(reducer({}, setFooAction(newFoo)).foo).toBe(newFoo);
});
