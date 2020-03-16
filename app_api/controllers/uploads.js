const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
let BumpData = require("../models/bump-data")
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

const upload = multer({
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
  res.sendFile('index.html', { root: path.join(__dirname, '../../public') });
}

const uploadsSaveBumpData = (req,res) => {
  var bump = new BumpData({
    bumpID: '123456789',
    sensorData: [{location:{type:"Point", coordinates:[102,125]}}]
  });
  bump.save((err) => {
    if (err) res.sendStatus(500);
    res.sendStatus(200);
  });
  
}


module.exports = {
  uploadsSaveImages,
  uploadsGetForm,
  uploadsSaveBumpData
};
