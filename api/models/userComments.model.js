import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
    },
    comment: {
        type: String,
        required: true
    }
})

const userCommentsModel = mongoose.models.comment || mongoose.model("comments", commentsSchema);

export default userCommentsModel;