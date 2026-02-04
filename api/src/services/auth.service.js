const { execute } = require("../db/oracle");

async function login(email, password) {
  const userRes = await execute(
    `SELECT id, first_name, last_name, email FROM users
    WHERE email = :email AND password_hash = :password`,
    { email, password },
  );

  if (!userRes.rows || userRes.rows.length === 0) {
    const err = new Error("Invalid credential");
    err.status = 401;
    throw err;
  }

  const user = userRes.rows[0];

  const tokRes = await execute(
    `SELECT LOWER(RAWTOHEX(SYS_GUID())) AS token FROM dual`,
  );
  const token = tokRes.rows[0].TOKEN;

  await execute(
    `INSERT INTO sessions(token, user_id, expires_at)
    VALUES (:token, :userId, SYSDATE + 7)`,
    { token, userId: user.ID },
  );

  return { token, user };
}
module.exports = { login };
