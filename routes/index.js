var express = require('express');
var router = express.Router();
const request = require("request");

const apiKey = process.env.API_KEY;
// * Mars Rover Photos
const apiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity";
const apiParamSol = `/photos?sol=1000&api_key=${apiKey}`;
const apiParamCamera = `/photos?sol=1000&camera=fhaz&api_key=${apiKey}`;
const apiPage2 = `/photos?sol=1000&page=2&api_key=${apiKey}`;
const apiParamEarthDate = `/photos?earth_date=2015-6-3&api_key=${apiKey}`
//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY
const currentPhoto = `${apiUrl}${apiParamSol}`;
/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(currentPhoto, (error, response, roverData) => {
    // console.log("===================The Error===================");
    // console.log(error);
    // console.log("===================The Response===================");
    // console.log(response);
  })
  res.render('index', { title: 'My Express Space App' });
  // console.log("apiKey: ", apiKey)
});

module.exports = router;
