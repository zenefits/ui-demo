// note the name of the file is important since this needs
// to be the last proxy *after* graphql and others
// since it has a catch all
const createProxyServer = require('http-proxy').createProxyServer;
const https = require('https');
const http = require('http');

module.exports = function ypProxy(app) {
  // You can call yarn start with `YP_BASEURL=http://yp3.dev` to proxy
  // gimli. By default we proxy locallhost:8000
  const ypTarget = process.env.YP_BASEURL || 'http://localhost:8000';
  const proxy = createProxyServer({
    target: ypTarget,
    secure: true,
    agent: http.globalAgent,
    autoRewrite: true,
    changeOrigin: true,
  });

  proxy.on('error', (err, req) => {
    console.error(err, req.url);
  });

  proxy.on('proxyRes', proxyRes => {
    const setCookieHeaders = proxyRes.headers['set-cookie'];
    if (setCookieHeaders && setCookieHeaders.length) {
      setCookieHeaders.forEach((v, i) => {
        if (v.indexOf('sessionid=') !== -1) {
          setCookieHeaders[i] = setCookieHeaders[i].replace('; secure', '');
        }
      });
    }
  });

  app.all(
    [
      '/accounts/*',
      '/companySelector',
      '/dashboard/',
      '/console',
      '/securefile/*',
      '/push_back_firefly_link',
      '/toAppRedirect',
    ],
    (req, res) => {
      proxy.web(req, res, {});
    },
  );

  app.use((req, res, next) => {
    if (req.url.match(/^\/(api|custom_api|service-api|internal-services|session|static\/)/)) {
      proxy.web(req, res);
    } else {
      next();
    }
  });
};
