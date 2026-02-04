const router = require("express").Router();
const { login } = require("../services/auth.service");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ message: "email/password required" });

    const result = await login(email, password);
    res.json(result);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message || "Server error" });
  }
});

module.exports = router;
