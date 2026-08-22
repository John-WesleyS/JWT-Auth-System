const jwt = require("jsonwebtoken");

const generateAccessToken = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1hr",
    },
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// ---------------------------------------------
// Refresh token: lives much longer than the access
// token. Its only job is to get a new access token
// once the old one expires, without logging in again.
// ---------------------------------------------

const generateRefreshToken = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
