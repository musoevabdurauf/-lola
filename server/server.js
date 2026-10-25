const express = require('express');
const cors = require('cors');
const { port, allowedOrigins } = require('./config');
const { login, requireAuth } = require('./auth');
const productsRouter = require('./routers/products');
const slidesRouter = require('./routers/slides');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      callback(null, !origin || allowedOrigins.includes(origin));
    },
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Express сервер работает!' });
});

app.post('/api/auth/login', login);
app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ username: req.user });
});

app.use('/api/products', productsRouter);
app.use('/api/slides', slidesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders', ordersRouter);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});