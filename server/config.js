const path = require('path');

try {
  process.loadEnvFile(path.join(__dirname, '.env'));
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error;
  }
}

const missing = ['ADMIN_PASSWORD', 'AUTH_SECRET'].filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(
    `Не заданы переменные окружения: ${missing.join(', ')}. ` +
      'Скопируйте server/.env.example в server/.env и заполните значения.'
  );
  process.exit(1);
}

module.exports = {
  port: Number(process.env.PORT) || 5000,
  adminLogin: process.env.ADMIN_LOGIN || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD,
  authSecret: process.env.AUTH_SECRET,
  allowedOrigins: (process.env.ALLOWED_ORIGIN || 'http://localhost:5173,http://localhost:8000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};
