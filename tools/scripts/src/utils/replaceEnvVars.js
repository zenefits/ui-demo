// @ts-check

// Replace all process.env.* and process.env['*'] by the actual current values

module.exports = function replaceEnvVars(src) {
  return src.replace(
    /process\.env(\.|\[['"])([a-z0-9_-]+)(['"]\])?/gi,
    (m, p1, p2) => (process.env[p2] ? `'${process.env[p2]}'` : undefined),
  );
};
