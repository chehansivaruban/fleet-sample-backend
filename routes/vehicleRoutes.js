const express = require("express");
const Vehicle = require("../models/Vehicle");

const router = express.Router();

// Create Vehicle
router.post("/", async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    await newVehicle.save();
    res.status(201).json({
      isSuccess: true,
      errorCode: 0,
      message: "Vehicle created successfully",
      data: { vehicle: newVehicle },
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      errorCode: 3001, // Example error code for "Error creating vehicle"
      message: "Error creating vehicle",
      data: {},
    });
  }
});

// Get All Vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json({
      isSuccess: true,
      errorCode: 0,
      message: "Vehicles fetched successfully",
      data: { vehicles },
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      errorCode: 3002, // Example error code for "Error fetching vehicles"
      message: "Error fetching vehicles",
      data: {},
    });
  }
});

// Get a Single Vehicle by ID
router.get("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({
        isSuccess: false,
        errorCode: 3003, // Example error code for "Vehicle not found"
        message: "Vehicle not found",
        data: {},
      });
    }
    res.json({
      isSuccess: true,
      errorCode: 0,
      message: "Vehicle fetched successfully",
      data: { vehicle },
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      errorCode: 3004, // Example error code for "Error fetching vehicle"
      message: "Error fetching vehicle",
      data: {},
    });
  }
});

// Update Vehicle
router.put("/:id", async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // Validate before updating
      }
    );
    if (!updatedVehicle) {
      return res.status(404).json({
        isSuccess: false,
        errorCode: 3005, // Example error code for "Vehicle not found"
        message: "Vehicle not found",
        data: {},
      });
    }
    res.json({
      isSuccess: true,
      errorCode: 0,
      message: "Vehicle updated successfully",
      data: { vehicle: updatedVehicle },
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      errorCode: 3006, // Example error code for "Error updating vehicle"
      message: "Error updating vehicle",
      data: {},
    });
  }
});

// Delete Vehicle
router.delete("/:id", async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) {
      return res.status(404).json({
        isSuccess: false,
        errorCode: 3007, // Example error code for "Vehicle not found"
        message: "Vehicle not found",
        data: {},
      });
    }
    res.json({
      isSuccess: true,
      errorCode: 0,
      message: "Vehicle deleted successfully",
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      errorCode: 3008, // Example error code for "Error deleting vehicle"
      message: "Error deleting vehicle",
      data: {},
    });
  }
});

module.exports = router;
