import express from "express";
import pageVisitTrack from "../controllers/pageVisitTrack.controller.js";
import getAnalytics from "../controllers/adminAnalytics.controller.js";

const pageVisitRouter = express.Router();

pageVisitRouter.post("/visittrack", pageVisitTrack);
pageVisitRouter.get("/analytics", getAnalytics);

export { pageVisitRouter };
