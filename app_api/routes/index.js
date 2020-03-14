const express = require("express");
const router = express.Router();
const ctrlPosts = require("../controllers/posts");


// posts
router.route("/posts/:location").get(ctrlPosts.postsListByLocation);
router
  .route("/posts/:postid")
  .get(ctrlPosts.postsGetOne)
  .post(ctrlPosts.postsCreateOne)
  .delete(ctrlPosts.postsDeleteOne);

module.exports = router;
