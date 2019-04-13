const { findGetConfig, mergeCsp } = require('z-frontend-webpack');

const getConfig = findGetConfig();
// Cosmos uses an iframe with inline styles
const contentSecurityPolicy = defaultCsp => {
  const appCsp = { 'script-src': ["'self'", "'unsafe-inline'"] };
  return mergeCsp(defaultCsp, appCsp);
};
const config = getConfig({ contentSecurityPolicy });

module.exports = config;
