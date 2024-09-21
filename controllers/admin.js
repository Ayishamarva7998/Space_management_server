import { Admin } from "../models/admin.js";

export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
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
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
