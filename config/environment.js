/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'font-jam',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    contentSecurityPolicy: {
      'report-uri': "'self'",
      'default-src': "'none'",
      'script-src': "'self'",
      'connect-src': "'self' https://api.parse.com",
      'img-src': "'self' http://files.parsetfss.com",
      'media-src': "'self'",
      'font-src': "'self' data: fonts.gstatic.com",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com"
    },

    'simple-auth': {
      crossOriginWhitelist: ['https://api.parse.com'],
      authorizer: 'authorizer:parse'
    },

    parseKeys: {
      applicationId: 'cs7F7nKIT9OpYCKgnqiRiFQHh80I9AkULRHaJoI7',
      restApi: 'ECiVuwZuMaQbEVTny4qx0XbEF493961s8Si0kk4t'
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
