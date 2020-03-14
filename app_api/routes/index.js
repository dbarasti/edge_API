const express = require("express");
const router = express.Router();
const ctrlUsers = require("../controllers/users.js");
const ctrlPosts = require("../controllers/posts");

// users
router
  .route("/users/:userid")
  .get(ctrlUsers.usersGetOne)
  .put(ctrlUsers.usersUpdateOne)
  .delete(ctrlUsers.usersDeleteOne);

// posts
router.route("/posts/:location").get(ctrlPosts.postsListByLocation);
router
  .route("/posts/:postid")
  .get(ctrlPosts.postsGetOne)
  .post(ctrlPosts.postsCreateOne)
  .delete(ctrlPosts.postsDeleteOne);

module.exports = router;
