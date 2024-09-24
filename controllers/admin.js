"use strict"
import mongoose from "mongoose";
import { Admin } from "../models/admin.js";


export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingadmin = await Admin.findOne({ email });
  if (existingadmin) {
    return res
      .status(409)
      .json({ message: "Admin with this email already exists" });
  }

  const newadmin = new Admin({ name, email, password });

  await newadmin.save();

  return res
    .status(201)
    .json({ message: "Admin created successfully", admin: newadmin });
};





export const add_batch = async (req, res) => {
  const { adminid } = req.params;
  const { batch } = req.body;

  // Check if adminid is a valid ObjectId
  if (!mongoose.isValidObjectId(adminid)) {
    return res.status(400).json({ message: "Invalid Admin ID format!" });
  }

  // Check if batch is provided
  if (!batch) {
    return res.status(400).json({ message: "Batch is required!" });
  }

  // Find the admin by ID
  const admin = await Admin.findById(adminid);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found!" });
  }

  // Check if the batch already exists
  if (admin.batch.includes(batch)) {
    return res.status(200).json({ message: "Batch already exists!" });
  }

  // Add the batch to the admin's batch list
  const result = await Admin.updateOne(
    { _id: adminid },
    { $push: { batch: batch } }
  );

  // Check if the update was successful
  if (result.modifiedCount === 0) {
    return res.status(400).json({ message: "No changes made or batch already exists!" });
  }

  // Return success response
  return res.status(200).json({ message: "Batch added successfully!" });
};
