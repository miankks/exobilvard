import express from 'express';
import { sendComments } from '../controllers/userComments.controller.js'

const commentRouter = express.Router();

commentRouter.post("/placecomment", sendComments);

export default commentRouter;