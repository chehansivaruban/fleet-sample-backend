const express = require("express");
const Driver = require("../models/Driver"); // Import the Driver model

const router = express.Router();

// Create a new driver
router.post("/", async (req, res) => {
  try {
    const { name, licenseNumber, phone } = req.body;
    const newDriver = new Driver({ name, licenseNumber, phone });
    await newDriver.save();
    res.status(201).json({
      isSuccess: true,
      errorCode: 0,
      message: "Driver created successfully",
      data: { driver: newDriver },
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      errorCode: 2001, // Example error code for "Error creating driver"
      message: "Error creating driver",
      data: {},
    });
  }
});

// Get all drivers
router.get("/", async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json({
      isSuccess: true,
      errorCode: 0,
      message: "Drivers fetched successfully",
      data: { drivers },
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      errorCode: 2002, // Example error code for "Error fetching drivers"
      message: "Error fetching drivers",
      data: {},
    });
  }
});

// Get a single driver by ID
router.get("/:id", async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({
        isSuccess: false,
        errorCode: 2003, // Example error code for "Driver not found"
        message: "Driver not found",
        data: {},
      });
    }
    res.json({
      isSuccess: true,
      errorCode: 0,
      message: "Driver fetched successfully",
      data: { driver },
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      errorCode: 2004, // Example error code for "Error fetching driver"
      message: "Error fetching driver",
      data: {},
    });
  }
});

// Update a driver by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Validate before updating
      }
    );
    if (!updatedDriver) {
      return res.status(404).json({
        isSuccess: false,
        errorCode: 2005, // Example error code for "Driver not found"
        message: "Driver not found",
        data: {},
      });
    }
    res.json({
      isSuccess: true,
      errorCode: 0,
      message: "Driver updated successfully",
      data: { driver: updatedDriver },
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      errorCode: 2006, // Example error code for "Error updating driver"
      message: "Error updating driver",
      data: {},
    });
  }
});

// Delete a driver by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
    if (!deletedDriver) {
      return res.status(404).json({
        isSuccess: false,
        errorCode: 2007, // Example error code for "Driver not found"
        message: "Driver not found",
        data: {},
      });
    }
    res.json({
      isSuccess: true,
      errorCode: 0,
      message: "Driver deleted successfully",
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      errorCode: 2008, // Example error code for "Error deleting driver"
      message: "Error deleting driver",
      data: {},
    });
  }
});

module.exports = router;
