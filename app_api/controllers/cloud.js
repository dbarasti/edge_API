const express = require("express");
const bodyParser = require("body-parser");
const util = require('util')


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'True'}));
app.use(bodyParser.raw({type: 'application/json'}))

const cloudMockResponse = (req,res) => {
  console.log("data received on mocked cloud:")
  //console.log(util.inspect(req.files))
  parsed = JSON.parse(req.body.data)
  console.log(util.inspect(parsed))
  //console.log(parsed[0].bumpID)
  res.sendStatus(200)
}


module.exports = {cloudMockResponse}