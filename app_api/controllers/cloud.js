const express = require("express");
const bodyParser = require("body-parser");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const util = require('util')


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'True'}));
app.use(bodyParser.raw({type: 'application/json'}))

const cloudMockResponse = (req,res) => {
  console.log("data received by mocked cloud: ")
  console.log(util.inspect(req.files))
  console.log(util.inspect(req.body.data))
  res.sendStatus(200)
}


module.exports = {cloudMockResponse}