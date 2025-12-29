// models/PageVisit.js
import mongoose from "mongoose";

const PageVisitSchema = new mongoose.Schema({
  page: String,
  referrer: String,
  ip: String,
  userAgent: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const pageVisitModel =
  mongoose.models.pageVisitModel ||
  mongoose.model("PageVisit", PageVisitSchema);
export default pageVisitModel;
