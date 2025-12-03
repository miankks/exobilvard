import userCommentsModel from "../models/userComments.model.js";

export const sendComments = async (req, res) => {
    try {
         // creating new comment
        const { name, email, comments, rating } = req.body;
        const newComment = new userCommentsModel({
            name,
            email,
            comments,
            rating
        })        
        
        // save new comment in mongoDB
        const savedComment = await newComment.save();
        res.status(201).json({
            success: true,
            message: 'Comment is stored',
            comments: savedComment
        })

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Add comment Error"})
        
    }
}

// all comments list
export const getAllComments = async (req, res) => {
        try {
            const comments = await userCommentsModel.find({});
            res.json({success: true, comments})
        } catch (error) {
            console.log(error);
            res.json({success: false, message: "List car Error"})
        }
}
