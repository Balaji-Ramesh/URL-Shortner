const short_id = require("shortid");
const URL = require("../models/url")

async function handleShortnerURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    const newId = short_id();
    await URL.create({
      shortId: newId,
      redirectURL: body.url,
      visitHistory: [],
    });

    res.json({ id: newId });
}

async function handleClickInURL(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleShortnerURL,
  handleClickInURL,
}