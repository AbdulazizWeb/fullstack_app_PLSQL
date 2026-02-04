const oracledb = require("oracledb");
require("dotenv").config();

let pool;

async function initPool() {
  if (pool) return pool;

  pool = await oracledb.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionString: process.env.DB_CONNECT_STRING,
    poolMin: 1,
    poolMax: 10,
    poolIncrement: 1,
  });
  return pool;
}

async function execute(sql, binds = {}, options = {}) {
  const p = await initPool();
  let conn;

  try {
    conn = await p.getConnection();
    const result = await conn.execute(sql, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      autoCommit: true,
      ...options,
    });
    return result;
  } finally {
    if (conn) await conn.close();
  }
}

module.exports = { execute, initPool };
