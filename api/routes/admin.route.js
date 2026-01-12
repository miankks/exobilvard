import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdmin,
} from "../controllers/admin.controller.js";
// import multer from "multer";
import { protectAdmin } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const adminRouter = express.Router();

// Image storage engine
// cb is callback
// const storage = multer.diskStorage({
//   destination: "uploads/adminimage",
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}${file.originalname}`);
//   },
// });
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype === "image/jpeg" ||
//       file.mimetype === "image/png" ||
//       file.mimetype === "image/jpg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only jpeg png and jpg images allowed"));
//     }
//   },
// });

adminRouter.post(
  "/register",
  upload.single("image"),
  protectAdmin,
  registerAdmin
);
adminRouter.get("/getadmin", protectAdmin, getAdmin);
adminRouter.post("/login", loginAdmin);

export default adminRouter;
