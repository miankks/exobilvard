import express from "express";
import {
  addCar,
  listCar,
  removeCar,
  editCar,
} from "../controllers/car.controller.js";
import multer from "multer";
import { protectAdmin } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const carRouter = express.Router();

carRouter.post("/addcar", upload.single("image"), protectAdmin, addCar);
carRouter.get("/listcar", listCar);
carRouter.post("/removecar", protectAdmin, removeCar);
carRouter.put("/editcar/:id", upload.single("image"), protectAdmin, editCar);

export default carRouter;
