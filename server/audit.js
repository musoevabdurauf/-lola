const fs = require('fs').promises;
const path = require('path');

const auditPath = path.join(__dirname, 'data/audit.log');
const MAX_LOG_SIZE = 5 * 1024 * 1024;
const MAX_USERNAME_LENGTH = 64;
const MAX_USER_AGENT_LENGTH = 200;

function normalizeIp(req) {
  const ip = req.ip || req.socket?.remoteAddress || '';
  return ip.replace(/^::ffff:/, '');
}

function sanitize(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

async function writeLine(line) {
  try {
    const stat = await fs.stat(auditPath).catch(() => null);
    if (stat && stat.size >= MAX_LOG_SIZE) {
      const rotated = `${auditPath}.1`;
      await fs.rm(rotated, { force: true });
      await fs.rename(auditPath, rotated);
    }
    await fs.appendFile(auditPath, line, 'utf8');
  } catch (error) {
    console.error('Не удалось записать аудит-лог:', error.message);
  }
}

async function logLogin(req, { username, success, reason, user }) {
  const entry = {
    timestamp: new Date().toISOString(),
    event: 'login',
    success: Boolean(success),
    username: sanitize(username, MAX_USERNAME_LENGTH),
    role: user?.role ?? null,
    ip: normalizeIp(req),
    userAgent: sanitize(req.headers?.['user-agent'], MAX_USER_AGENT_LENGTH),
  };

  if (reason) {
    entry.reason = reason;
  }

  await writeLine(`${JSON.stringify(entry)}\n`);
}

async function readLoginEvents(limit) {
  let content;

  try {
    content = await fs.readFile(auditPath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }

  const events = [];

  for (const line of content.split('\n')) {
    if (!line.trim()) {
      continue;
    }

    try {
      const entry = JSON.parse(line);
      if (entry.event === 'login') {
        events.push(entry);
      }
    } catch {
      // повреждённую строку пропускаем, остальной журнал остаётся доступным
    }
  }

  return events.slice(-limit).reverse();
}

module.exports = { auditPath, logLogin, readLoginEvents };
