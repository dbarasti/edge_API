const axios = require('axios').default;
require("dotenv/config");

const nnEndpoint = process.env.NN_ENDPOINT;

async function sendBumpDataToAnalyse(bumps){
  axios.post(nnEndpoint, bumps)
  .then(function (res) {
    console.log("Successfully lauched analysis on monitoring with id: " + bumps[0].monitoringID);
  })
  .catch(function (error) {
    console.log(error);
  });
}

module.exports = {sendBumpDataToAnalyse}