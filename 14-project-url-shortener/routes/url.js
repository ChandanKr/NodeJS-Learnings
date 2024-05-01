const express = require("express");
const {
  handleGenerateNewShortURL,
  handleRedirectionURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/:shortID", handleRedirectionURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
