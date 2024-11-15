const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to protect routes

// Create a car
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, tags, imageUrl } = req.body;
  console.log(req.body)

  // Simple validation
  if (!title || !description || !tags || !imageUrl || imageUrl.length === 0) {
    return res.status(400).json({ message: "Please fill all fields and add at least one image" });
  }

  try {
    const car = new Car({
      userId: req.body.userId,  // From authMiddleware
      title,
      description,
      tags,
      imageUrl,
    });

    await car.save();
    res.status(201).json({ message: "Car added successfully", car });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all cars of the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cars = await Car.find({ userId: req.body.userId });
    res.json({ cars });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a particular car's details
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.params.id, userId: req.body.userId });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ car });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a car
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, description, tags, images } = req.body;

  try {
    let car = await Car.findOne({ _id: req.params.id, userID: req.body.userId });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Update car
    if(title){
      car.title = title;
    }

    if(description){
      car.description = description;
    }

    if(tags){
      car.tags = tags;
    }

    if(images){
      car.images = images
    }

    await car.save();
    res.json({ message: "Car updated successfully", car });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a car
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.params.id, userId: req.body.userId });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    await Car.deleteOne({ _id: req.params.id, userId: req.body.userId });
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
