const express = require("express");
const router = express.Router();
const ctrlUploads = require("../controllers/uploads")
const ctrlAnalysis = require("../controllers/analysis")
const ctrlCloud = require("../controllers/cloud")
var multer  = require('multer')
var upload = multer({ dest: 'confirmed-images/' })

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

//cloud
router.route("/cloud/mock")
  .post(upload.array('images'), ctrlCloud.cloudMockResponse);

module.exports = router;
