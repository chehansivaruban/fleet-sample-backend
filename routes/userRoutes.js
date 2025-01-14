const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Create User
router.post("/create", async (req, res) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;
    const newUser = new User({
      email,
      username,
      password,
      firstName,
      lastName,
    });
    await newUser.save();
    res.status(201).json({
      isSuccess: true,
      errorCode: 0,
      message: "User created successfully",
      data: {
        userId: newUser._id,
        email: newUser.email,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      errorCode: 1001, // Example error code
      message: "Error creating user",
      data: {},
    });
  }
});
// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        errorCode: 1002, // Example error code for "User not found"
        message: "User not found",
        data: {},
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        isSuccess: false,
        errorCode: 1003, // Example error code for "Invalid credentials"
        message: "Invalid credentials",
        data: {},
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      isSuccess: true,
      errorCode: 0,
      message: "Login successful",
      data: {
        token,
        id: user._id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`, // Combine first and last name for full name
        status: user.status || "active", // Default status to "active" if not present
        role: user.role || "user", // Default role to "user" if not present
      },
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      errorCode: 1004, // Example error code
      message: "Error logging in",
      data: {},
    });
  }
});

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from response
    res.json({
      isSuccess: true,
      errorCode: 0,
      message: "Users fetched successfully",
      data: { users },
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      errorCode: 1005, // Example error code
      message: "Error fetching users",
      data: {},
    });
  }
});

module.exports = router;
