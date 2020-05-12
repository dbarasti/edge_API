const express = require("express");
const bodyParser = require("body-parser");
const models = require('../models/bump-data');
const utils = require('../utils/utils');
const axios = require('axios').default;
const FormData = require("form-data");
require("dotenv/config");
var app = express();
const fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'True'}));
app.use(bodyParser.raw({type: 'application/json'}))


const analysisCallback = (req,res) => {
  // must collect images referred to in the response and send both the response and the images to the cloud 
  imagesFolder = process.env.FRAMES_OUT_PATH
  cloud = process.env.CLOUD_ENDPOINT

  const formData = new FormData();
  //appending data
  formData.append("data", JSON.serialize(req.body))
  images = [];
  req.body.forEach(hole=>{
    filePath = imagesFolder + '/' + hole.attached_images[0]["filename"]
    formData.append("images", fs.createReadStream(filePath), {knownLength: fs.statSync(filePath).size });
  })

  const headers = {
    ...formData.getHeaders(),
    "Content-Length": formData.getLengthSync()
  };

  axios.post(cloud, formData, {headers})
  .then(function (res) {
    console.log("Successfully sent data to cloud");
  })
  .catch(function (error) {
    console.log(error);
  });
  res.sendStatus(200)
}

const triggerAnalysis = (req,res) => {
  query = models.BumpModel.find({monitoringID:req.body.monitoringID})
    query.exec((err,bumps)=>{
      if(err){
        console.log("Error while getting bumps with monitoringID: " + req.body.monitoringID)
      } else{
        utils.sendBumpDataToAnalyse(bumps)
      }
    })
    return res.end("Analysis triggered successfully for monitoringID: " + req.body.monitoringID);
}


async function sendConfirmedDataToCloud(data,images){
  
}

module.exports = {
  analysisCallback,
  triggerAnalysis
};

