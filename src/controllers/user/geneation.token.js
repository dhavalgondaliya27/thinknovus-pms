const jwt = require('jsonwebtoken');
const moment = require('moment');
const {
  config: {
    auth: {
      token: { tokenExpire, refreshTokenExpire, secret },
    },
  },
} = require('../../config/config');

const getUnixEpoch = () => {
  const time = moment();
  return time.unix() * 1000;
};

module.exports.getUnixEpoch = getUnixEpoch;

const getUnixEpochWithAddSeconds = (seconds) => getUnixEpoch() + seconds;

module.exports.getUnixEpochWithAddSeconds = getUnixEpochWithAddSeconds;

module.exports.generateToken = (user) => {
  const payload = {
    user_id: user._id,
    first_name: user.firstname,
    last_name: user.lastname,
    email: user.email,
  };

  const token = jwt.sign(payload, secret, { expiresIn: tokenExpire });
  const refreshToken = jwt.sign(payload, secret, {
    expiresIn: refreshTokenExpire,
  });

  return {
    token: { value: token, expiresAt: getUnixEpochWithAddSeconds(tokenExpire) },
    refreshToken: {
      value: refreshToken,
      expiresAt: getUnixEpochWithAddSeconds(refreshTokenExpire),
    },
  };
};

module.exports.decodeToken = async (token) => {
  return await jwt.verify(token, secret);
};
