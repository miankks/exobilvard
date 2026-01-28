import adminModel from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

// ADMIN SIGNUP
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if logged in user is super admin
    if (req.admin.role !== "superadmin") {
      return res.status(403).json({
        success: false,
        message: "Only super-admin can create new admins",
      });
    }

    // validate pasword length
    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 8 characters",
      });
    }

    // check if admin already exists
    const existed = await adminModel.findOne({ email });
    if (existed) {
      return res.json({ success: false, message: "Admin already exists" });
    }
    const image_filename = req.file ? req.file.filename : null;

    // create admin
    const admin = await adminModel.create({
      name,
      email,
      password,
      image: image_filename,
      createdBy: req.admin.id,
      role: "admin",
    });

    // Generate token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      success: true,
      message: "Admin registered successfully",
      adminId: admin._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ADMIN LOGIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// admin list

export const getAdmin = async (req, res) => {
  try {
    const admin = await adminModel.findById(req.admin.id); // use req.admin
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    res.json({ success: true, data: admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Admin fetch error" });
  }
};

export const getAllAdmins = async (req, res) => {
  const { admin } = req;

  try {
    if (req.admin.role !== "superadmin") {
      return res.status(404).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const admins = await adminModel
      .find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: admin.length,
      data: admins,
    });
  } catch (error) {
    console.error("Fetch admins error:", error);
    res.status(500).json({
      success: false,
      message: "Admin fetch error",
    });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    // Authorization check
    if (req.admin.id !== req.params.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const adminId = req.params.id;
    const { name, email, oldPassword, newPassword } = req.body;

    const admin = await adminModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // update name and email
    if (name) admin.name = name;
    if (email) admin.email = email;

    // update password only if requested
    if (newPassword) {
      if (!oldPassword) {
        return res
          .status(400)
          .json({ message: "Old password is required to change password" });
      }

      const isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(newPassword, salt);
    }

    const updatedAdmin = await admin.save();

    res.status(200).json({
      id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      image: updatedAdmin.image,
    });
  } catch (error) {
    console.error("Update admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
