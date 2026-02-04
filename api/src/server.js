require("dotenv").config();
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_CONNECT_STRING =", process.env.DB_CONNECT_STRING);
const app = require("./app");
const { initPool } = require("./db/oracle");

const port = process.env.PORT || 4000;

(async () => {
  await initPool();
  app.listen(port, () => console.log(`API running on :${port}`));
})();
