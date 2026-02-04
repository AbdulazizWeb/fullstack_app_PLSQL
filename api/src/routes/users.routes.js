const router = require("express").Router();
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");
const { me, listUsers } = require("../services/users.service");

router.get("/me", auth, async (req, res) => {
  const user = await me(req.userId);
  res.json({ user });
});

router.get("/", auth, requireRole("ADMIN"), async (req, res) => {
  const users = await listUsers();
  res.json({ users });
});

module.exports = router;
