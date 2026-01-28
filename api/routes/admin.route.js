import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdmin,
  updateAdmin,
  getAllAdmins,
} from "../controllers/admin.controller.js";
// import multer from "multer";
import { protectAdmin } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const adminRouter = express.Router();

adminRouter.post(
  "/register",
  upload.single("image"),
  protectAdmin,
  registerAdmin,
);
adminRouter.get("/getadmin", protectAdmin, getAdmin);
adminRouter.get("/getalladmins", protectAdmin, getAllAdmins);
adminRouter.post("/login", loginAdmin);
adminRouter.put("/update/:id", protectAdmin, updateAdmin);

export default adminRouter;
