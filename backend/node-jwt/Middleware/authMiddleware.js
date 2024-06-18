const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log('token', token);

  if (!token) {
    return res.status(401).json({ error: "Authorization token is missing" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('dec', decoded);
    // Fetch the user from the database using the decoded ID
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach the user object to the request for further use in controllers
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
