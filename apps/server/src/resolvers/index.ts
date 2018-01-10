import { Query } from './Query';
// import { auth } from './Mutation/auth';
import { post } from './Mutation/post';
import { AuthPayload } from './AuthPayload';

export default {
  Query,
  // AuthPayload,
  Mutation: {
    // ...auth,
    ...post,
  },
};
