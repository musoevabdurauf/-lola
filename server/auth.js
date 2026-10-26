const crypto = require('crypto');
const { adminLogin, adminPassword, authSecret } = require('./config');
const { getUserByUsername, verifyCredentials } = require('./users');
const { logLogin } = require('./audit');

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;
const ENV_OWNER_ID = 'env-owner';

function safeEqual(first, second) {
  if (typeof first !== 'string' || typeof second !== 'string') {
    return false;
  }

  const firstHash = crypto.createHash('sha256').update(first).digest();
  const secondHash = crypto.createHash('sha256').update(second).digest();
  return crypto.timingSafeEqual(firstHash, secondHash);
}

function getEnvOwnerUser() {
  return {
    id: ENV_OWNER_ID,
    username: adminLogin,
    role: 'owner',
    isEnvOwner: true,
    createdAt: null,
    updatedAt: null,
  };
}

function toSessionUser(user) {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    isEnvOwner: Boolean(user.isEnvOwner),
  };
}

function signToken(user) {
  const payload = Buffer.from(
    JSON.stringify({
      sub: user.username,
      role: user.role,
      exp: Date.now() + TOKEN_TTL_MS,
    })
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

async function login(req, res) {
  const { username, password } = req.body || {};

  try {
    if (safeEqual(username, adminLogin) && safeEqual(password, adminPassword)) {
      const user = getEnvOwnerUser();
      await logLogin(req, { username, success: true, user });
      return res.json({ token: signToken(user), user: toSessionUser(user) });
    }

    const user = await verifyCredentials(username, password);
    if (!user) {
      await logLogin(req, { username, success: false, reason: 'invalid_credentials' });
      return res.status(401).json({ error: 'Неверный логин или пароль' });
    }

    await logLogin(req, { username, success: true, user });
    return res.json({ token: signToken(user), user: toSessionUser(user) });
  } catch (error) {
    console.error('Ошибка входа:', error);
    await logLogin(req, { username, success: false, reason: 'error' });
    return res.status(500).json({ error: 'Не удалось выполнить вход' });
  }
}

async function resolveAccount(username) {
  if (typeof username !== 'string' || !username) {
    return null;
  }
  if (safeEqual(username, adminLogin)) {
    return getEnvOwnerUser();
  }
  return getUserByUsername(username);
}

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ error: 'Требуется авторизация' });
  }

  let account;
  try {
    account = await resolveAccount(payload.sub);
  } catch (error) {
    console.error('Ошибка проверки пользователя:', error);
    return res.status(500).json({ error: 'Не удалось проверить пользователя' });
  }

  if (!account) {
    return res.status(401).json({ error: 'Учётная запись не найдена' });
  }

  req.user = account.username;
  req.role = account.role;
  req.account = account;
  return next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    requireAuth(req, res, () => {
      if (!roles.includes(req.role)) {
        return res.status(403).json({ error: 'Недостаточно прав для этого действия' });
      }
      return next();
    }).catch(next);
  };
}

module.exports = {
  ENV_OWNER_ID,
  getEnvOwnerUser,
  toSessionUser,
  login,
  requireAuth,
  requireRole,
};
