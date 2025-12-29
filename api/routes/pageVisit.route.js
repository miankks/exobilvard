import express from "express";
import pageVisitTrack from "../controllers/pageVisitTrack.controller.js";

const pageVisitRouter = express.Router();

pageVisitRouter.post("/visittrack", pageVisitTrack);

export default pageVisitRouter;
