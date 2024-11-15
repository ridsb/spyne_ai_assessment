const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Car", carSchema);
