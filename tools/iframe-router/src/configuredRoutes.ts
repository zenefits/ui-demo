import { RouteConfig } from './routes';

const routes: RouteConfig[] = [
  { publicUrlPath: '/app/benconnect/', resourceUrlPath: '' },
  { publicUrlPath: '/app/iframe-router-example-A/', defaultFragment: '/route1', resourceUrlPath: '' },
  { publicUrlPath: '/app/iframe-router-example-B/', defaultFragment: '/route3', resourceUrlPath: '' },
  { publicUrlPath: '/dashboard/', resourceUrlPath: '/dashboard/' },
];

export default routes;
