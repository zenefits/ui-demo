// note the name of the file is important since this needs
// to be the last proxy *after* graphql and others
// since it has a catch all
const { createProxyServer } = require('http-proxy');
const https = require('https');
const http = require('http');

function isSpoof(target) {
  return /^https:\/\/.+spoof\.zenefits\.com/.test(target);
}

const { YP_BASEURL, USE_YP_GRAPHQL } = process.env;

function isHttpsProxyWhitelisted(location) {
  const httpsProxyWhitelist = ['amazonaws.com'];
  const regexp = new RegExp(httpsProxyWhitelist.join('|'));
  return location && location.match(regexp);
}

module.exports = function ypProxy(app) {
  // You can call yarn start with `YP_BASEURL=http://yp3.dev` to proxy
  // gimli. By default we proxy locallhost:8000
  if (YP_BASEURL && YP_BASEURL.indexOf('http') !== 0) {
    throw new Error('when using YP_BASEURL please define the url with http:// or https://');
  }
  if (YP_BASEURL) {
    console.log(`YP_BASEURL is set - proxying yp requests to ${YP_BASEURL}`);
  }
  if (USE_YP_GRAPHQL) {
    console.log(`USE_YP_GRAPHQL is set - sending graphql requests to yp target (${YP_BASEURL})`);
  }
  const ypTarget = YP_BASEURL || 'http://localhost:8000';

  const proxy = createProxyServer({
    target: ypTarget,
    secure: !isSpoof(ypTarget),
    agent: ypTarget.indexOf('https') === 0 ? https.globalAgent : http.globalAgent,
    autoRewrite: true,
    changeOrigin: true,
  });

  proxy.on('error', (err, req) => {
    console.error(err, req.url);
  });

  proxy.on('proxyReq', proxyReq => {
    // to fix login
    proxyReq.setHeader('referer', ypTarget);

    // to fix graphql
    if (USE_YP_GRAPHQL && proxyReq.getHeader('x-origin')) {
      proxyReq.setHeader('x-origin', ypTarget);
      proxyReq.setHeader('origin', ypTarget);
    }
  });

  proxy.on('proxyRes', proxyRes => {
    const setCookieHeaders = proxyRes.headers['set-cookie'];
    if (setCookieHeaders && setCookieHeaders.length) {
      setCookieHeaders.forEach((v, i) => {
        setCookieHeaders[i] = setCookieHeaders[i].replace('; secure', '');
      });
    }

    // need to fix location headers since locally we use
    if (
      proxyRes.headers.location &&
      proxyRes.headers.location.indexOf('https') === 0 &&
      !isHttpsProxyWhitelisted(proxyRes.headers.location)
    ) {
      proxyRes.headers.location = proxyRes.headers.location.replace('https', 'http'); // eslint-disable-line
    }
  });

  const urlsToProxy = [
    '/accounts/*',
    '/companySelector',
    '/dashboard/',
    '/console',
    '/securefile/*',
    '/push_back_firefly_link',
    '/toAppRedirect',
  ];

  if (USE_YP_GRAPHQL) {
    urlsToProxy.push('/graphql');
  }

  app.all(urlsToProxy, (req, res) => {
    proxy.web(req, res, {});
  });

  app.use((req, res, next) => {
    if (req.url.match(/^\/(api|custom_api|service-api|internal-services|session|static\/)/)) {
      proxy.web(req, res);
    } else {
      next();
    }
  });
};
