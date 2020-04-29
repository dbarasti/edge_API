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
  timestamp: String,
  x: Number,
  y: Number,
  z: Number,
  latitude: String,
  longitude: String
})

const bumpDataSchema = new mongoose.Schema({
  bumpID: String,
  monitoringID: String,
  latitude: String,
  longitude: String,
  attached_sensors_data: [sensorDataSchema],
  attached_images: [{filename: String}]
});

var BumpModel = mongoose.model("BumpData", bumpDataSchema, "bumps");
var SensorDataModel = mongoose.model("SensorData", sensorDataSchema, "sensordata")
var PointModel = mongoose.model("Point", pointSchema)

module.exports = {
  BumpModel,
  SensorDataModel,
  PointModel
}