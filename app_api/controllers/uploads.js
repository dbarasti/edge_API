const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const models = require('../models/bump-data');
const mkdirp = require('mkdirp');
require("dotenv/config");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'True'}));
app.use(bodyParser.raw({type: 'application/json'}))


var Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = `./Frames/${file.fieldname}`
    mkdirp.sync(dir) // creates the directory, if not already present
    callback(null, dir)
  },
  filename: function(req, file, callback) {
    // the file.originalname MUST be a unique id
    callback(null, file.originalname);
  }
});

const upload = multer({
  storage: Storage
}).array(process.env.FIELD_NAME, process.env.MAX_IMAGES_UPLOAD);


const uploadsSaveImages = (req, res) => {
  upload(req, res, (err) => {
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
  req.body.data.forEach(bumpEvent => {
    let bumpCoordinates = bumpEvent.attached_sensors_data.forEach(sensorData=>{
      let bumpData = [];
      bumpData.push(new models.SensorDataModel({
        timestamp: sensorData.timestamp,
        x: sensorData.x,
        y: sensorData.y,
        z: sensorData.z,
        location: {
          type: 'Point',
          coordinates: [sensorData.latitude, sensorData.longitude]
        }
      }));
    })
    let bump = new models.BumpModel({
      bumpID: bumpEvent.bumpID,
      bumpLocation: {
        type: 'Point',
        coordinates: [bumpEvent.latitude,bumpEvent.longitude]
      },
      sensorData: bumpCoordinates
    });

    bump.save((err) => {
      if (err) console.error(err);
    });
  });
  res.sendStatus(200)
}


module.exports = {
  uploadsSaveImages,
  uploadsGetForm,
  uploadsSaveBumpData
};
