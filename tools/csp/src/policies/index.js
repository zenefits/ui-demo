const sharedCsp = require('./shared');
const fireflyCsp = require('./firefly');
const intercomCsp = require('./intercom');
const salesforceCsp = require('./salesforce');
const googleMapsCsp = require('./googleMaps');
const walkMeCsp = require('./walkMe');
const plaidCsp = require('./plaid');
const driftCsp = require('./drift');
const coveo = require('./coveo');

module.exports = {
  sharedCsp,
  fireflyCsp,
  intercomCsp,
  salesforceCsp,
  googleMapsCsp,
  walkMeCsp,
  plaidCsp,
  driftCsp,
  // TODO: make it optional so only apps that needs this have the policy
  coveo,
};
