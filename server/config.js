const path = require('path');

try {
  process.loadEnvFile(path.join(__dirname, '.env'));
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error;
  }
}

const trustProxyHops = Number(process.env.TRUST_PROXY || 0);

const missing = ['ADMIN_PASSWORD', 'AUTH_SECRET'].filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(
    `Не заданы переменные окружения: ${missing.join(', ')}. ` +
      'Скопируйте server/.env.example в server/.env и заполните значения.'
  );
  process.exit(1);
}

const MIN_AUTH_SECRET_LENGTH = 32;
const MIN_UNIQUE_SECRET_CHARS = 10;
const PLACEHOLDER_SECRETS = new Set([
  'secret',
  'changeme',
  'change-me',
  'your-secret-key',
  'замените-на-случайную-строку',
]);

function getAuthSecretError(secret, adminPassword) {
  if (secret.length < MIN_AUTH_SECRET_LENGTH) {
    return `AUTH_SECRET слишком короткий (${secret.length} символов, нужно минимум ${MIN_AUTH_SECRET_LENGTH}).`;
  }

  if (PLACEHOLDER_SECRETS.has(secret.trim().toLowerCase())) {
    return 'AUTH_SECRET содержит значение-заглушку из примера.';
  }

  if (new Set(secret).size < MIN_UNIQUE_SECRET_CHARS) {
    return 'AUTH_SECRET слишком однообразный.';
  }

  if (secret === adminPassword) {
    return 'AUTH_SECRET не должен совпадать с паролем администратора.';
  }

  return null;
}

const authSecretError = getAuthSecretError(process.env.AUTH_SECRET, process.env.ADMIN_PASSWORD);

if (authSecretError) {
  console.error(`${authSecretError} Сгенерируйте новый: npm run gen:secret`);
  process.exit(1);
}

module.exports = {
  port: Number(process.env.PORT) || 5000,
  adminLogin: process.env.ADMIN_LOGIN || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD,
  authSecret: process.env.AUTH_SECRET,
  trustProxyHops: Number.isInteger(trustProxyHops) && trustProxyHops > 0 ? trustProxyHops : null,
  allowedOrigins: (process.env.ALLOWED_ORIGIN || 'http://localhost:5173,http://localhost:8000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};
