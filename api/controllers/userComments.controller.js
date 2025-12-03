import userCommentsModel from "../models/userComments.model.js";

export const sendComments = async (req, res) => {
    console.log(req.body);
    
    try {
         // creating new comment
        const { name, email, comments } = req.body;
        const newComment = new userCommentsModel({
            name,
            email,
            comments
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
