import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    name: { 
        type:String, 
        required:true 
    },
    description: { 
        type: String, 
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const carModel =mongoose.models.car || mongoose.model("car", carSchema);

export default carModel;