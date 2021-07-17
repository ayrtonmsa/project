const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(403).send("Access denied.");
  if (!auth_user_id) return res.status(401).send("Unauthorized.");

  try {
    req.user = jwt.verify(token, process.env.JWTPRIVATEKEY);
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
