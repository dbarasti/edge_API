const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const models = require('../models/bump-data');
const mkdirp = require('mkdirp');
const axios = require('axios').default;


require("dotenv/config");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'True'}));
app.use(bodyParser.raw({type: 'application/json'}))


var Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // the file.fieldname MUST be a unique id
    const dir = `./Frames`
    mkdirp.sync(dir) // creates the directory, if not already present
    callback(null, dir)
  },
  filename: function(req, file, callback) {
    // the file.originalname MUST be a unique id inside the folder
    callback(null, file.originalname);
  }
});

const upload = multer({
  storage: Storage
}).any();


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
  let bumps = []
  req.body.data.forEach(bumpEvent => {
    let bumpData = [];
    bumpEvent.attached_sensors_data.forEach(sensorData=>{
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
      sensorData: bumpData,
      attachedImages: bumpEvent.attached_images
    });

    bump.save((err) => {
      if (err) console.error(err);
    });
    bumps.push(bump)
  });
  //make call to neural network endpoint localhost:5000/analyze
  sendBumpDataToAnalyse(bumps)
  res.sendStatus(200)
}

async function sendBumpDataToAnalyse(bumps){
  //console.log(bumps)
  axios.post('localhost:5000/analyze', bumps)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}


module.exports = {
  uploadsSaveImages,
  uploadsGetForm,
  uploadsSaveBumpData
};
