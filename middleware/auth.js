const jwt = require('jsonwebtoken');
const config = require('config');

function authToken(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'no token, auth denied' });
  }

  try {
    req.member = jwt.verify(token, config.get('jsonwebtokensecret')).member;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'token not valid' });
  }
}

module.exports = authToken;
