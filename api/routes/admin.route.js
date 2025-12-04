import express from "express";
import { registerAdmin, loginAdmin, getAdmin } from "../controllers/admin.controller.js";
import multer from 'multer';
import { protectAdmin } from "../middleware/auth.js";


const adminRouter = express.Router();

// Image storage engine
// cb is callback
const storage = multer.diskStorage({
    destination: "uploads/adminimage",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage:storage})

adminRouter.post("/register", upload.single("image"), registerAdmin);
adminRouter.get("/getadmin", protectAdmin, getAdmin);
adminRouter.post("/login", loginAdmin);


export default adminRouter;
