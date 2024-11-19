const jwt = require('jsonwebtoken');
const {
  config: {
    auth: {
      token: { tokenExpire, refreshTokenExpire, secret },
    },
  },
} = require('../../config/config');

module.exports.generateToken = (user) => {
  const payload = {
    _id: user._id,
    first_name: user.firstname,
    last_name: user.lastname,
    email: user.email,
  };

  const accessToken = jwt.sign(payload, secret, { expiresIn: tokenExpire });
  const refreshToken = jwt.sign(payload, secret, {
    expiresIn: refreshTokenExpire,
  });

  return {
    accessToken,
    refreshToken,
  };
};

module.exports.decodeToken = async (token) => {
  return jwt.verify(token, secret);
};
