const express = require("express");
const { handleShortnerURL, handleClickInURL } = require("../controllers/url");

const router = express.Router();

router.post("/", handleShortnerURL);
router.get("/analytics/:shortId", handleClickInURL);

module.exports = router;