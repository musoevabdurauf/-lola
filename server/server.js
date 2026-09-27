const express = require('express');
const cors = require('cors');
const productsRouter = require('./routers/products');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Разрешает запросы с вашего React-приложения
app.use(express.json()); // Позволяет принимать JSON в body (для POST запросов)

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Express сервер работает!' });
});

app.use('/api/products', productsRouter);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});