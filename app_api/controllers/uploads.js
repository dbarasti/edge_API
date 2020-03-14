const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
require("dotenv/config");

var app = express();

app.use(bodyParser.json());

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, "./Images");
  },
  filename: function(req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

var upload = multer({
  storage: Storage
}).array("imgUploader", process.env.MAX_IMAGES_UPLOAD); //Field name and max count


const uploadsSaveImages = (req, res) => {
  upload(req, res, function(err) {
    if (err) {
        console.log(err)
        return res.end("Something went wrong!");
    }
    return res.end("File uploaded sucessfully!.");
  });
};

const uploadsGetForm = (req, res) => {
  res.sendFile(__dirname + "/index.html");
}


module.exports = {
  uploadsSaveImages,
  uploadsGetForm
};
