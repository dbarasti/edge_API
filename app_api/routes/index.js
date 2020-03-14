const express = require("express");
const router = express.Router();
const ctrlPosts = require("../controllers/posts");
const ctrlUploads = require("../controllers/uploads")

//uploads
router.route("/upload/images")
  .post(ctrlUploads.uploadsSaveImages)
  .get(ctrlUploads.uploadsGetForm)

module.exports = router;
