const { execute } = require("../db/oracle");

async function me(userId) {
  const res = await execute(
    `SELECT id, email, first_name, created_at FROM users WHERE id = :id`,
    { id: userId },
  );
  return res.rows?.[0] || null;
}

async function listUsers() {
  const res = await execute(
    `SELECT id, email, first_name, created_at FROM users ORDER BY id DESC`,
  );
  return res.rows || [];
}

module.exports = { me, listUsers };
