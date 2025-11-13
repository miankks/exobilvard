import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({

     username: {
        type: String
    },
    email: {
        type: String,
    },
    subject: {
        type: String,
    },
    regnumber: {
        type: String
    }
})

const emailModel = mongoose.models.order || mongoose.model("email", emailSchema);
export default emailModel;
