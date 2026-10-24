const jwt = require("jsonwebtoken");

// Protects routes: only logged-in users (with a token) can pass
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // The token is sent like this:  Authorization: Bearer <token>
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the signature and expiration before trusting the user id.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === "string" || !decoded.id) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }

    // Save the verified user id so the controllers can use it
    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Not authorized, token expired" });
    }

    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = protect;