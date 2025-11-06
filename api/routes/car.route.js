import express from 'express'
import { addCar, listCar, removeCar } from '../controllers/car.controller.js';
import multer from 'multer';

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

carRouter.post('/addcar',upload.single("image"), addCar);
carRouter.get("/listcar", listCar)
carRouter.post("/remove", removeCar)

export default carRouter;