import adminModel from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ADMIN SIGNUP
export const registerAdmin = async (req, res) => {
    let image_filename = `${req.file.filename}`

    try {
        const { name, email, password } = req.body;

        const existed = await adminModel.findOne({ email });
        if (existed) {
            return res.json({ success: false, message: "Admin already exists" });
        }

        const admin = await adminModel.create({ name, email, password, image_filename });

        res.json({
            success: true,
            message: "Admin registered successfully",
            adminId: admin._id
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
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: admin._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
