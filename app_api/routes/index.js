const express = require("express");
const router = express.Router();
const ctrlUploads = require("../controllers/uploads")

//uploads
router.route("/upload/images")
  .post(ctrlUploads.uploadsSaveImages)
  .get(ctrlUploads.uploadsGetForm);
router.route("/upload/bump-data")
  .post(ctrlUploads.uploadsSaveBumpData);

module.exports = router;
