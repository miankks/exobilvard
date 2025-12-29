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

export default mongoose.model("PageVisit", PageVisitSchema);
