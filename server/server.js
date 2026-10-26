const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { port, allowedOrigins, trustProxyHops } = require('./config');
const { apiLimiter, loginLimiter } = require('./rateLimit');
const { login, requireAuth, toSessionUser } = require('./auth');
const productsRouter = require('./routers/products');
const slidesRouter = require('./routers/slides');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');
const auditRouter = require('./routers/audit');

const app = express();

if (trustProxyHops) {
  app.set('trust proxy', trustProxyHops);
}

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        baseUri: ["'none'"],
        frameAncestors: ["'none'"],
        formAction: ["'none'"],
      },
    },
  })
);
app.use(
  cors({
    origin(origin, callback) {
      callback(null, !origin || allowedOrigins.includes(origin));
    },
  })
);
app.use('/api', apiLimiter);
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Express сервер работает!' });
});

app.post('/api/auth/login', loginLimiter, login);
app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json(toSessionUser(req.account));
});

app.use('/api/products', productsRouter);
app.use('/api/slides', slidesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);
app.use('/api/audit', auditRouter);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});