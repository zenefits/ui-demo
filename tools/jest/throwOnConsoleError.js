const originalConsoleError = console.error;

let loggedBefore = false;

console.error = (...args) => {
  originalConsoleError(...args);
  if (!loggedBefore) {
    loggedBefore = true;
    throw new Error(`Called console.error with:\n\n${args.join('\n')}\n\n`); // ensure test fails
  }
};
