// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy

// awsS3Bucket - only listing prod in the CSP for now. Beta and Spoof will be broken for this until we adjust how we do the CSP to be more dynamic
// also see the file uploader docs for more information
//  prod : `https://zenefits.s3.amazonaws.com`
//  beta : `https://zenefits-beta-us-west-2.s3.amazonaws.com`
//  local/spoof: `https://zenefits-test.s3.amazonaws.com`

const _ = require('lodash');
const contentSecurityPolicies = require('./policies');
const mergeCsp = require('./mergeCsp');

module.exports = function processCspParam(cspParam, ...additionalPolicies) {
  const defaultCsps = [
    contentSecurityPolicies.sharedCsp,
    contentSecurityPolicies.fireflyCsp,
    contentSecurityPolicies.salesforceCsp,
    contentSecurityPolicies.intercomCsp,
    contentSecurityPolicies.googleMapsCsp,
    contentSecurityPolicies.walkMeCsp,
    contentSecurityPolicies.plaidCsp,
    contentSecurityPolicies.driftCsp,
    contentSecurityPolicies.coveo,
  ];

  const allCsps = defaultCsps.concat(additionalPolicies);

  let contentSecurityPolicyValue = allCsps.reduce((acc, csp) => mergeCsp(acc, csp), {});

  if (cspParam) {
    if (typeof cspParam === 'function') {
      contentSecurityPolicyValue = cspParam(contentSecurityPolicyValue);
    } else if (typeof cspParam === 'string' || typeof cspParam === 'object') {
      // Overwrite default csp if object or string is passed
      contentSecurityPolicyValue = cspParam;
    } else {
      throw new Error('Argument passed to processCspParam must be object, string, or function.');
    }
  }

  if (typeof contentSecurityPolicyValue === 'object') {
    return Object.keys(contentSecurityPolicyValue)
      .sort()
      .map(directive => `${directive} ${_.uniq(contentSecurityPolicyValue[directive]).join(' ')}`)
      .join('; ');
  }

  return contentSecurityPolicyValue;
};
