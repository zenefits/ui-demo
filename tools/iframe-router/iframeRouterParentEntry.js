import IframeRouter from './src/parent.ts';
import routes from './src/configuredRoutes.ts';

const iframeRouter = new IframeRouter(routes, {
  handleNewUrlPath(urlPath) {
    return {
      publicUrlPath: urlPath,
      resourceUrlPath: urlPath.replace('index.html', 'app.html'),
    };
  },
  getResourceUrlPath: ({ publicUrlPath }) => `${publicUrlPath}app.html`,
});
