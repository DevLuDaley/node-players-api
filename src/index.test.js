const playersApi = require('./index');

test('2 to equal 4', () => {
  expect(playersApi(2)).toBe(4);
});
