const express = require('express');
const { requireRole } = require('../auth');
const { readLoginEvents } = require('../audit');

const router = express.Router();
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

router.use(requireRole('owner'));

router.get('/logins', async (req, res) => {
  const requested = Number(req.query.limit);
  const limit = Number.isInteger(requested) && requested > 0
    ? Math.min(requested, MAX_LIMIT)
    : DEFAULT_LIMIT;

  try {
    res.json(await readLoginEvents(limit));
  } catch (error) {
    console.error('Не удалось прочитать аудит-лог:', error);
    res.status(500).json({ error: 'Не удалось прочитать журнал входов' });
  }
});

module.exports = router;
