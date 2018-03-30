/**
 * This is a transformer to replace a single file - tools/app-bootstrap/src/loadPolyfills.ts
 * because it contains dynamic import and ts-jest does not support it properly
 * https://github.com/kulshekhar/ts-jest/issues/258
 *
 * The polyfill itself is not needed for jest, so we just return resolve promise instead.
 */

function process() {
  return `
    module.exports = function() {
      return Promise.resolve();
    }
  `;
}

module.exports = {
  process,
};
