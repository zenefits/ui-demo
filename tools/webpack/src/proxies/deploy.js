const { createProxyServer } = require('http-proxy');

module.exports = function deployProxy(app) {
  // You can call yarn start with `DEPLOY_SERVICE_BASEURL=http://localhost:3032` to proxy
  // your local server instead of the host.
  const deployTarget = process.env.DEPLOY_SERVICE_BASEURL || 'http://localhost:3032';
  const proxy = createProxyServer({
    // TODO: add options
    target: deployTarget,
  });

  proxy.on('error', (err, req) => {
    console.error(err, req.url);
  });
  app.use('/manual_activation', (req, res) => {
    // include root path in proxied request
    req.url = `/manual_activation/${req.url}`;
    proxy.web(req, res, {});
  });

  app.use('/activation_info', (req, res) => {
    // include root path in proxied request
    req.url = `/activation_info/${req.url}`;
    proxy.web(req, res, {});
  });

  app.use('/zf_apps', (req, res) => {
    // include root path in proxied request
    req.url = `/zf_apps/${req.url}`;
    proxy.web(req, res, {});
  });
};
