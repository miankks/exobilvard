// GET /api/admin/analytics
import pageVisitModel from "../models/pageVisit.model.js";

const getAnalytics = async (req, res) => {
  try {
    const totalVisits = await pageVisitModel.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayVisits = await pageVisitModel.countDocuments({
      createdAt: { $gte: today },
    });

    const pageStats = await pageVisitModel.aggregate([
      { $group: { _id: "$page", views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 5 },
    ]);

    res.json({ totalVisits, todayVisits, pageStats });
  } catch (err) {
    res.status(500).json({ error: "Analytics failed" });
  }
};

export default getAnalytics;
