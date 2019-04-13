import MockDate from 'mockdate';

export default function(timestamp: Number) {
  beforeAll(() => {
    MockDate.set(timestamp);
  });

  afterAll(() => {
    MockDate.reset();
  });
}
