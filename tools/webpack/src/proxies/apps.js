const getAppName = require('../getAppName');
const { createProxyServer } = require('http-proxy');
const { getAppPorts } = require('z-frontend-scripts');

module.exports = app => {
  const appProxies = getAppPorts().map(appWithPort => ({
    appName: getAppName(appWithPort.appName),
    port: appWithPort.port,
  }));

  appProxies.forEach(appProxy => {
    if (getAppName() !== appProxy.appName) {
      const target = `http://localhost:${appProxy.port}`;
      const route = `/app/${appProxy.appName}/:resource`;
      const proxy = createProxyServer({ target, changeOrigin: true });
      app.use(route, (req, res) => {
        req.url = req.params.resource ? `/app/${appProxy.appName}/${req.params.resource}` : `/app/${appProxy.appName}/`;
        proxy.web(req, res, { target });
        proxy.on('error', () => {
          console.log(`Could not reach port: ${appProxy.port}.  Is the ${appProxy.appName} app running locally?`);
        });
      });
    }
  });
};
