const _ = require('lodash');

module.exports = (sourceCsp, targetCsp) => {
  const outputCsp = Object.assign({}, sourceCsp);

  Object.keys(targetCsp || {}).forEach(directive => {
    outputCsp[directive] = (outputCsp[directive] || []).concat(targetCsp[directive]);
  });

  Object.keys(outputCsp).forEach(directive => {
    outputCsp[directive] = _.uniq(outputCsp[directive]).sort();
  });

  return outputCsp;
};
