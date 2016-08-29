var shared = {
  apiUrl: process.env.API_URL || "http://localhost:3000",
};

var environments = {
  development: {
    ENV_VARS: shared
  },
  staging: {
    ENV_VARS: shared
  },
  production: {
    ENV_VARS: shared
  }
};
environments.production.buildpack  = process.env.BUILDPACK_URL;

module.exports = environments;
