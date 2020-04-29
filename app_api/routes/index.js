const express = require("express");
const router = express.Router();
const ctrlUploads = require("../controllers/uploads")
const ctrlAnalysis = require("../controllers/analysis")

//uploads
router.route("/upload/images")
  .post(ctrlUploads.uploadsSaveImages)
  .get(ctrlUploads.uploadsGetForm);
router.route("/upload/bump-data")
  .post(ctrlUploads.uploadsSaveBumpData);

//analysis  
router.route("/analysis/callback")
  .post(ctrlAnalysis.analysisCallback);
router.route("/analysis/trigger")  
  .post(ctrlAnalysis.triggerAnalysis);

module.exports = router;
