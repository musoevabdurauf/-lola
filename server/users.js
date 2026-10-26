const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');

const scrypt = promisify(crypto.scrypt);
const usersPath = path.join(__dirname, 'data/users.json');

const ROLES = ['owner', 'manager', 'content'];
const USERNAME_PATTERN = /^[a-zA-Z0-9._-]{3,32}$/;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;
const KEY_LENGTH = 64;

class UserStoreError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = 'UserStoreError';
    this.status = status;
  }
}

async function readUsers() {
  try {
    const data = await fs.readFile(usersPath, 'utf8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeUsers(users) {
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf8');
}

function toPublic(user) {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    createdAt: user.createdAt ?? null,
    updatedAt: user.updatedAt ?? null,
  };
}

function validateUsername(username) {
  if (typeof username !== 'string' || !username.trim()) {
    return 'Укажите логин';
  }
  if (!USERNAME_PATTERN.test(username.trim())) {
    return 'Логин: 3–32 символа, латиница, цифры, точка, дефис или подчёркивание';
  }
  return '';
}

function validatePassword(password) {
  if (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
    return `Пароль должен содержать минимум ${MIN_PASSWORD_LENGTH} символов`;
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    return `Пароль не должен превышать ${MAX_PASSWORD_LENGTH} символов`;
  }
  return '';
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = await scrypt(password, salt, KEY_LENGTH);
  return {
    passwordSalt: salt,
    passwordHash: derived.toString('hex'),
  };
}

async function verifyPassword(password, user) {
  if (typeof password !== 'string' || !user.passwordSalt || !user.passwordHash) {
    return false;
  }

  const stored = Buffer.from(user.passwordHash, 'hex');
  if (stored.length !== KEY_LENGTH) {
    return false;
  }

  const derived = await scrypt(password, user.passwordSalt, KEY_LENGTH);
  return crypto.timingSafeEqual(stored, derived);
}

async function findRawByUsername(username) {
  if (typeof username !== 'string') {
    return null;
  }

  const users = await readUsers();
  const normalized = username.trim().toLowerCase();
  return users.find((user) => user.username.toLowerCase() === normalized) ?? null;
}

async function listUsers() {
  const users = await readUsers();
  return users
    .slice()
    .sort((first, second) => String(first.createdAt).localeCompare(String(second.createdAt)))
    .map(toPublic);
}

async function getUserById(id) {
  const users = await readUsers();
  const user = users.find((item) => item.id === id);
  return user ? toPublic(user) : null;
}

async function getUserByUsername(username) {
  const user = await findRawByUsername(username);
  return user ? toPublic(user) : null;
}

async function createUser({ username, password, role }) {
  const cleanUsername = typeof username === 'string' ? username.trim() : '';

  const usernameError = validateUsername(cleanUsername);
  if (usernameError) {
    throw new UserStoreError(usernameError);
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    throw new UserStoreError(passwordError);
  }

  if (!ROLES.includes(role)) {
    throw new UserStoreError('Некорректная роль');
  }

  const users = await readUsers();
  const duplicate = users.some(
    (user) => user.username.toLowerCase() === cleanUsername.toLowerCase()
  );
  if (duplicate) {
    throw new UserStoreError('Пользователь с таким логином уже существует', 409);
  }

  const now = new Date().toISOString();
  const credentials = await hashPassword(password);
  const user = {
    id: crypto.randomUUID(),
    username: cleanUsername,
    role,
    ...credentials,
    createdAt: now,
    updatedAt: now,
  };

  users.push(user);
  await writeUsers(users);

  return toPublic(user);
}

async function updateUser(id, { role, password } = {}) {
  const users = await readUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new UserStoreError('Пользователь не найден', 404);
  }

  const updates = {};

  if (role !== undefined) {
    if (!ROLES.includes(role)) {
      throw new UserStoreError('Некорректная роль');
    }
    updates.role = role;
  }

  if (password !== undefined) {
    const passwordError = validatePassword(password);
    if (passwordError) {
      throw new UserStoreError(passwordError);
    }
    Object.assign(updates, await hashPassword(password));
  }

  if (Object.keys(updates).length === 0) {
    throw new UserStoreError('Нет данных для обновления');
  }

  users[index] = {
    ...users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  await writeUsers(users);

  return toPublic(users[index]);
}

async function deleteUser(id) {
  const users = await readUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new UserStoreError('Пользователь не найден', 404);
  }

  users.splice(index, 1);
  await writeUsers(users);
}

async function verifyCredentials(username, password) {
  const user = await findRawByUsername(username);
  if (!user) {
    return null;
  }

  const matches = await verifyPassword(password, user);
  return matches ? toPublic(user) : null;
}

module.exports = {
  ROLES,
  UserStoreError,
  listUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  verifyCredentials,
};
