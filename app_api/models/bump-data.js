const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const sensorDataSchema = new mongoose.Schema({
  timestamp: Number,
  x: Number,
  y: Number,
  z: Number,
  location: {
    type: pointSchema,
    required: true
  }
})

const bumpDataSchema = new mongoose.Schema({
  bumpID: String,
  bumpLocation: {
    type: pointSchema,
    required: true
  },
  sensorData: [sensorDataSchema]
});

var BumpModel = mongoose.model("BumpData", bumpDataSchema, "bumps");
var SensorDataModel = mongoose.model("SensorData", sensorDataSchema, "sensordata")
var PointModel = mongoose.model("Point", pointSchema)

module.exports = {
  BumpModel,
  SensorDataModel,
  PointModel
}