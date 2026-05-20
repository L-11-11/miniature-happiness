const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'movie_secret';

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ code: 1, msg: '未提供 Token' });
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader;

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    res.status(401).json({ code: 1, msg: 'Token 无效或已过期' });
  }
}

module.exports = auth;
