// routes/track.js
import pageVisitModel from "../models/pageVisit.model.js";

const pageVisitTrack = async (req, res) => {
  try {
    const { page, referrer } = req.body;

    await pageVisitModel.create({
      page,
      referrer,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Tracking failed" });
  }
};

export default pageVisitTrack;
