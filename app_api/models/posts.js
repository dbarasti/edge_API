const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: String,
  city: String
});

/*
const addressSchema = new mongoose.Schema({
  city: String,
  street: String,
  number: String
});
*/

//locationSchema.index({ coords: "2dsphere" });

mongoose.model("Post", postSchema, "posts");
