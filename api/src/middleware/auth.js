const { execute } = require("../db/oracle");

async function auth(req, res, next) {
  try {
    const h = req.headers.authorization || "";
    const token = h.startWith("Bearer ") ? h.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const sRes = await execute(
      `SELECT s.user_id
        FROM sessions s
        WHERE s.token = :token AND s.expires_at > SYSDATE`,
      { token },
    );

    if (!sRes.rows || sRes.rows.length === 0) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = sRes.rows[0].USER_ID;
    req.token = token;
    next();
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = auth;
