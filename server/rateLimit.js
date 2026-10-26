const rateLimit = require('express-rate-limit');

function createLimiter({ windowMs, limit, message, skipSuccessfulRequests = false }) {
  return rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skipSuccessfulRequests,
    handler(req, res) {
      res.status(429).json({ error: message });
    },
  });
}

const apiLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  message: 'Слишком много запросов. Попробуйте позже.',
});

const loginLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  message: 'Слишком много попыток входа. Повторите через 15 минут.',
});

const orderLimiter = createLimiter({
  windowMs: 60 * 1000,
  limit: 10,
  message: 'Слишком много заказов подряд. Подождите минуту.',
});

module.exports = { apiLimiter, loginLimiter, orderLimiter };
