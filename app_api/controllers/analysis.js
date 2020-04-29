const express = require("express");
const bodyParser = require("body-parser");
const models = require('../models/bump-data');
const utils = require('../utils/utils');




var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'True'}));
app.use(bodyParser.raw({type: 'application/json'}))


const analysisCallback = (req,res) => {
   console.log(req.body)
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


module.exports = {
  analysisCallback,
  triggerAnalysis
};

