const mongoose = require('mongoose');

const drawingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  drawingData: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Drawing = mongoose.model('Drawing', drawingSchema);

module.exports = Drawing;