const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // Check if the Authorization header exists
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      console.log("Authorization header missing");
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //  console.log(decoded, "decoded")
    const user = await User.findById(decoded.userId);
    // console.log("User fetched:", user);  // Log user to verify it's fetched correctly

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: "User not found" });
    }

    req.userId = user._id; // Attach user to request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error("Authorization error:", error.message);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
