import express from 'express'
import { addCar, listCar, removeCar } from '../controllers/car.controller.js';
import multer from 'multer';
import { protectAdmin } from '../middleware/auth.js';

const carRouter = express.Router();

// Image storage engine
// cb is callback
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

carRouter.post('/addcar',upload.single("image"),protectAdmin, addCar);
carRouter.get("/listcar", protectAdmin,listCar)
carRouter.post("/removecar", protectAdmin,removeCar)

export default carRouter;