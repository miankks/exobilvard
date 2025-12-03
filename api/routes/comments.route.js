import express from 'express';
import { getAllComments, sendComments } from '../controllers/userComments.controller.js'

const commentRouter = express.Router();

commentRouter.post("/placecomment", sendComments);
commentRouter.get("/getallcomments", getAllComments);

export default commentRouter;