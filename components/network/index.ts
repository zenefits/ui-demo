/** @styleguide-autodiscovery-ignore-start */
export { default as ConnectionManager, ConnectionManagerContext } from './src/ConnectionManager';
export {
  default as PermissionManager,
  PermissionsContext,
  PermissionsContextProps,
} from './src/permission-checker/PermissionManager';
export { default as SwitchProvider } from './src/switch-checker/SwitchProvider';
export { Permissions } from './src/permission-checker/permissionTypes';
export { default as withGraphqlProgress } from './src/graphql/withGraphqlProgress';
export { default as useQueryWithProgress } from './src/graphql/useQueryWithProgress';
/** @styleguide-autodiscovery-ignore-end */

export { default as ConnectionErrorBanner } from './src/ConnectionErrorBanner';
export { default as PermissionChecker } from './src/permission-checker/PermissionChecker';
export { default as SwitchChecker } from './src/switch-checker/SwitchChecker';
// Alias for backwards compatibility on react-apollo 2->3
export { default as Query, QueryProps } from './src/graphql/Query';
export { default as Mutation, DataProxy, MutationFunction } from './src/graphql/Mutation';
