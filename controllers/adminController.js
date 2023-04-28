// Import necessary modules
import express from "express";
import bcrypt from "bcrypt";

import { Admin } from "../models/adminModel.js";
import jwt from "jsonwebtoken";
// Create Express router
const adminRoutes = express.Router();

// Register route
adminRoutes.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email is already registered
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({ email, password: hashedPassword });

    // Save admin to database
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
adminRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email is registered
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default adminRoutes;
