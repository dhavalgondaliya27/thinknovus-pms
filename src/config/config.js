const appConfig = require('./appConfig');

const config = {
  auth: {
    opts: {
      passReqToCallback: true,
      salt: 10,
    },
    token: {
      tokenExpire: '30d',
      refreshTokenExpire: '36500d', //100 years
      secret: appConfig.jwtSecret,
    },
  },
};

module.exports.config = config;
