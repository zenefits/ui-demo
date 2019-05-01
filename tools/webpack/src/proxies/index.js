const appProxy = require('./apps');
const graphqlProxy = require('./graphql');
const ypProxy = require('./yp');
const deployProxy = require('./deploy');

const allProxies = [appProxy, deployProxy, ypProxy];

if (!process.env.USE_YP_GRAPHQL) {
  allProxies.push(graphqlProxy);
}

module.exports = allProxies;
