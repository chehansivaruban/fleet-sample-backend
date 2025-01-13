const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  licensePlate: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
