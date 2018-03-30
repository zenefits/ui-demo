const originalConsoleError = console.error;
console.error = (...args) => {
  originalConsoleError(...args);
  throw new Error('Called console.error');
};
