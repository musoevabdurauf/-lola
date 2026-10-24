const crypto = require('crypto');
const { adminLogin, adminPassword, authSecret } = require('./config');

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

function safeEqual(first, second) {
  if (typeof first !== 'string' || typeof second !== 'string') {
    return false;
  }

  const firstHash = crypto.createHash('sha256').update(first).digest();
  const secondHash = crypto.createHash('sha256').update(second).digest();
  return crypto.timingSafeEqual(firstHash, secondHash);
}

function signToken(username) {
  const payload = Buffer.from(
    JSON.stringify({ sub: username, exp: Date.now() + TOKEN_TTL_MS })
  ).toString('base64url');
  const signature = crypto.createHmac('sha256', authSecret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function verifyToken(token) {
  if (typeof token !== 'string') {
    return null;
  }

  const [payload, signature] = token.split('.');
  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = crypto
    .createHmac('sha256', authSecret)
    .update(payload)
    .digest('base64url');

  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (typeof data.exp !== 'number' || data.exp < Date.now()) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function login(req, res) {
  const { username, password } = req.body || {};

  if (!safeEqual(username, adminLogin) || !safeEqual(password, adminPassword)) {
    return res.status(401).json({ error: 'Неверный логин или пароль' });
  }

  return res.json({ token: signToken(username) });
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ error: 'Требуется авторизация' });
  }

  req.user = payload.sub;
  return next();
}

module.exports = { login, requireAuth };
