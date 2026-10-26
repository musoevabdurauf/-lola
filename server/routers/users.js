const express = require('express');
const { adminLogin } = require('../config');
const { ENV_OWNER_ID, getEnvOwnerUser, requireRole, toSessionUser } = require('../auth');
const {
  UserStoreError,
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../users');

const router = express.Router();

router.use(requireRole('owner'));

function sendError(res, error) {
  if (error instanceof UserStoreError) {
    return res.status(error.status).json({ error: error.message });
  }
  console.error('Ошибка управления пользователями:', error);
  return res.status(500).json({ error: 'Не удалось выполнить операцию' });
}

function isReservedUsername(username) {
  return String(username).trim().toLowerCase() === adminLogin.trim().toLowerCase();
}

// GET all users (environment owner is listed as a read-only system account)
router.get('/', async (req, res) => {
  try {
    const users = await listUsers();
    res.json([
      toSessionUser(getEnvOwnerUser()),
      ...users.map((user) => ({ ...user, isEnvOwner: false })),
    ]);
  } catch (error) {
    sendError(res, error);
  }
});

// POST create user
router.post('/', async (req, res) => {
  try {
    const { username, password, role } = req.body || {};

    if (isReservedUsername(username)) {
      return res.status(409).json({ error: 'Этот логин зарезервирован для системного администратора' });
    }

    const user = await createUser({ username, password, role });
    res.status(201).json({ ...user, isEnvOwner: false });
  } catch (error) {
    sendError(res, error);
  }
});

// PUT update user role or password
router.put('/:id', async (req, res) => {
  try {
    if (req.params.id === ENV_OWNER_ID) {
      return res.status(400).json({ error: 'Системного администратора нельзя изменить' });
    }

    const { role, password } = req.body || {};

    if (req.params.id === req.account.id && role !== undefined && role !== req.account.role) {
      return res.status(400).json({ error: 'Нельзя изменить собственную роль' });
    }

    const user = await updateUser(req.params.id, { role, password });
    res.json({ ...user, isEnvOwner: false });
  } catch (error) {
    sendError(res, error);
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    if (req.params.id === ENV_OWNER_ID) {
      return res.status(400).json({ error: 'Системного администратора нельзя удалить' });
    }

    if (req.params.id === req.account.id) {
      return res.status(400).json({ error: 'Нельзя удалить собственную учётную запись' });
    }

    await deleteUser(req.params.id);
    res.json({ message: 'Пользователь удалён' });
  } catch (error) {
    sendError(res, error);
  }
});

module.exports = router;
