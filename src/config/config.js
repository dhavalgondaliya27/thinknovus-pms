const config = {
  auth: {
    opts: {
      passReqToCallback: true,
      salt: 10,
    },
    token: {
      tokenExpire: '30d',
      refreshTokenExpire: '120d',
      secret: 'tom and jerry',
    },
  },
};

module.exports.config = config;
