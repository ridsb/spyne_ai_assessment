const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Add CORS support
const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Routes
try {
  app.use("/auth", require("./routes/auth"));
  app.use("/cars", authMiddleware, require("./routes/car"));
} catch (err) {
  console.error("Error setting up routes:", err.message);
}

// MongoDB Connection with Error Handling
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// Basic 404 Route Handler for Undefined Routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
  // console.log(req);
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
