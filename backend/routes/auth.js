const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");  // Assuming you have a User model

// Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Simple validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    user = new User({
      username,
      email,
      password: password//await bcrypt.hash(password, 10), // Hash the password
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("testuserexist");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed password:", hashedPassword);
    // console.log(user.password, password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
