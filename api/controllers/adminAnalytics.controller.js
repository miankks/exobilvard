// GET /api/admin/analytics
import pageVisitModel from "../models/pageVisit.model.js";

const getAnalytics = async (req, res) => {
  const filter = req.query.filter || "all"; // daily | monthly | all
  const today = new Date();
  let match = {};

  if (filter === "daily") {
    today.setHours(0, 0, 0, 0);
    match = { createdAt: { $gte: today } };
  } else if (filter === "monthly") {
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    match = { createdAt: { $gte: firstDayOfMonth } };
  }

  try {
    const totalVisits = await pageVisitModel.countDocuments(match);

    const pageStats = await pageVisitModel.aggregate([
      { $match: match },
      { $group: { _id: "$page", views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 5 },
    ]);

    res.json({ totalVisits, pageStats });
  } catch (err) {
    res.status(500).json({ error: "Analytics failed" });
  }
};

export default getAnalytics;
