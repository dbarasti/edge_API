const mongoose = require("mongoose");
const Posts = mongoose.model("Post");

const postsGetOne = (req, res) => {
  Posts.findById(req.params.postid).exec((err, post) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(post);
  });
};

const postsCreateOne = (req, res) => {
  res.status(200).json({ status: "todo" });
};

const postsDeleteOne = (req, res) => {
  res.status(200).json({ status: "todo" });
};

//:location
const postsListByLocation = (req, res) => {
  Posts.find({ city: req.params.location }).exec((err, posts) => {
    if (err) {
      res.json(err);
    }
    res.status(200).json(posts);
  });
};

module.exports = {
  postsGetOne,
  postsCreateOne,
  postsDeleteOne,
  postsListByLocation
};
