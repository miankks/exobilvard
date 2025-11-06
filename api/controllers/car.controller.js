import carModel from "../models/car.model.js";
import fs from 'fs';

// add car item

const addCar = async (req, res, next) => {
    let image_filename = `${req.file.filename}`

    const car = new carModel({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        image: image_filename
    })

    try {
        await car.save();
        res.json({success: true, message: "Car Added"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Car add Error detected"})
    }
}

// all car list

const listCar = async (req,res) => {
    try {
        const cars = await carModel.find({});
        res.json({success: true, data: cars})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "List car Error"})
    }
}


// remove car item
const removeCar = async (req, res) => {
    try {
        const car = await carModel.findById(req.body.id);
        fs.unlink(`uploads/${car.image}`, () => {})

        await carModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: 'Car removed'})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Car remove Error'})
    }
}

export {addCar, listCar, removeCar}
