import * as jwt from 'jsonwebtoken';
import { Graphcool } from './generated/graphcool';
import auth0 = require('auth0');

const ManagementClient = auth0.ManagementClient;

const management = new ManagementClient({
  domain: `${process.env.AUTH0_DOMAIN}.auth0.com`,
  clientId: `${process.env.AUTH0_CLIENT_ID}`,
  clientSecret: `${process.env.AUTH0_CLIENT_SECRET}`,
  scope: 'read:users',
  audience: `https://${process.env.AUTH0_DOMAIN}.auth0.com/api/v2/`,
  tokenProvider: {
    enableCache: true,
    cacheTTLInSeconds: 10,
  },
});

export const loadUser = async (userId: string) => {
  return management.getUser({ id: userId });
};

export interface Context {
  db: Graphcool;
  request: any;
}

export function getUserId(ctx: Context) {
  const userId = ctx.request.user && ctx.request.user.sub;
  if (userId) {
    return userId;
  }

  throw new AuthError();
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}
