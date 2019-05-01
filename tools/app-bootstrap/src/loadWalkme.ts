export type WalkMeEnvironment = 'test' | 'production';

export default function(environment: WalkMeEnvironment) {
  if (environment === 'test') {
    return import(/* webpackChunkName: "walkme-test" */ 'walkme-dist/dist/walkme-test');
  }
  return import(/* webpackChunkName: "walkme-prod" */ 'walkme-dist/dist/walkme-prod');
}
