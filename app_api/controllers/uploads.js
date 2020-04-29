const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const models = require('../models/bump-data');
const mkdirp = require('mkdirp');
const utils = require('../utils/utils');


require("dotenv/config");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'True'}));
app.use(bodyParser.raw({type: 'application/json'}))


var Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // the file.fieldname MUST be a unique id
    const dir = process.env.FRAMES_IN_PATH
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
    query = models.BumpModel.find({monitoringID:req.header('monitoringID')})
    query.exec((err,bumps)=>{
      if(err){
        console.log("Error while getting bumps with monitoringID: " + req.header('monitoringID'))
      } else{
        utils.sendBumpDataToAnalyse(bumps)
      }
    })
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
        latitude: sensorData.latitude,
        longitude: sensorData.longitude
      }));
    })
    let bump = new models.BumpModel({
      bumpID: bumpEvent.bumpID,
      monitoringID: req.body.monitoringID,
      latitude: bumpEvent.latitude,
      longitude: bumpEvent.longitude,
      attached_sensors_data: bumpData,
      attached_images: bumpEvent.attached_images
    });

    bump.save((err) => {
      if (err) console.error(err);
    });
    bumps.push(bump)
  });
  
  res.sendStatus(200)
}


module.exports = {
  uploadsSaveImages,
  uploadsGetForm,
  uploadsSaveBumpData
};
