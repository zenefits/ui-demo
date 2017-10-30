const createProxyServer = require('http-proxy').createProxyServer;

module.exports = function graphqlProxy(app) {
  // You can call yarn start with `GRAPHQL_BASEURL=http://localhost:3000` to proxy
  // your local server instead of the host.
  const graphqlTarget = process.env.GRAPHQL_BASEURL || 'http://localhost:3000';
  const proxy = createProxyServer({
    // TODO: add options
    target: graphqlTarget,
  });

  proxy.on('error', (err, req) => {
    console.error(err, req.url);
  });
  app.use('/graphql', (req, res) => {
    // include root path in proxied request
    req.url = `/graphql/${req.url}`;
    proxy.web(req, res, {});
  });
  app.use('/graphiql', (req, res) => {
    // include root path in proxied request
    req.url = `/graphiql/${req.url}`;
    proxy.web(req, res, {});
  });
};
