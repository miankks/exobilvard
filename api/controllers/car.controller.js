import carModel from "../models/car.model.js";
import fs from "fs";

// add car item

const addCar = async (req, res, next) => {
  let image_url = req.file.path; // Cloudinary URL
  // let image_filename = `${req.file.filename}`;
  console.log(req.body);

  const car = new carModel({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    image: image_url,
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

    await carModel.findByIdAndDelete(req.body.id);
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
      // Delete old image
      if (car.image) {
        fs.unlink(`uploads/${car.image}`, (err) => {
          if (err) console.log("Error deleting old image", err);
        });
      }
      car.image = req.file.filename;
    }

    await car.save();
    res.json({ success: true, message: "Car updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Error updating car" });
  }
};

export { addCar, listCar, removeCar, editCar };
