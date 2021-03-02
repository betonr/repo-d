/**
 * Variables selected for the production environment
 */
export const environment = {
  /** app version on package */
  appVersion: `${require('../../package.json').version}`,
  /** environment */
  production: true,
  apiBasePath: ''
};
