/**
 * Variables selected for the production environment
 */
export const environment = {
  /** app version on package */
  appVersion: `${require('../../package.json').version}-dev`,
  /** environment */
  production: false,
  apiBasePath: 'http://localhost:8000'
};
