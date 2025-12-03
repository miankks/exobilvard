import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
    },
    comments: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    }
})

const userCommentsModel = mongoose.models.comment || mongoose.model("comments", commentsSchema);

export default userCommentsModel;