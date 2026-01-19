import carModel from "../models/car.model.js";
import fs from "fs";
import path from "path";

// add car item
const addCar = async (req, res, next) => {
  let image_filename = `${req.file.filename}`;

  const car = new carModel({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await car.save();
    res.json({ success: true, message: "Car Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Car add Error detected" });
  }
};

// all car list

const listCar = async (req, res) => {
  try {
    const cars = await carModel.find({});
    res.json({ success: true, data: cars });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "List car Error" });
  }
};

// remove car item
const removeCar = async (req, res) => {
  try {
    const car = await carModel.findById(req.body.id);
    fs.unlink(`uploads/${car.image}`, () => {});
    // await cloudinary.uploader.destroy(car.image.public_id);

    await carModel.findByIdAndDelete(req.body.id);

    // Delete from Cloudinary
    res.json({ success: true, message: "Car removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Car remove Error" });
  }
};

const editCar = async (req, res) => {
  try {
    const car = await carModel.findById(req.params.id);
    if (!car)
      return res.status(404).json({ success: false, message: "Car not found" });

    // update fields
    car.name = req.body.name || car.name;
    car.description = req.body.description || car.description;
    car.category = req.body.category || car.category;

    if (req.file) {
      const oldImage = car.image; // 👈 store old image filename

      // Save new image filename
      car.image = req.file.filename;

      // Delete old image
      if (oldImage) {
        const oldPath = path.join("uploads", oldImage);
        fs.unlink(oldPath, (err) => {
          if (err) console.log("Error deleting old image:", err.message);
        });
      }
    }
    await car.save();
    res.json({ success: true, message: "Car updated successfully", data: car });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Error updating car" });
  }
};

export { addCar, listCar, removeCar, editCar };
