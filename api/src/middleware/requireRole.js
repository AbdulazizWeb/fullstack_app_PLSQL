const { execute } = require("../db/oracle");

function requireRole(roleName) {
  return async (req, res, next) => {
    try {
      const rRes = await execute(
        ` 
        SELECT 1 AS ok
        FROM user_roles ur
        JOIN roles r ON r.id = ur.role_id
        WHERE ur.user_id = :userId AND r.name = :roleName`,
        { userId: req.userId, roleName },
      );

      if (!rRes.rows || rRes.rows.length === 0) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (e) {
      res.status(500).json({ message: "Server error" });
    }
  };
}

module.exports = requireRole;
