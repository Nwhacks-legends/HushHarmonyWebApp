import '@testing-library/jest-dom';

// Polyfill for setImmediate, as it's not available in all environments
if (typeof setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}
