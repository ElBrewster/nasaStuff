var express = require('express');
var router = express.Router();
const request = require("request");

const dayjs = require("dayjs");
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
let nowObject = dayjs();

let nowYear = nowObject.$y;
let nowMonth = nowObject.$M;
let nowDay = nowObject.$D;
let today = `${nowYear}-${nowMonth}-${nowDay}`;

const apiKey = process.env.API_KEY;

// * Mars Rover Photos
const apiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity";
const apiParamEarthDate = `/photos?earth_date=${today}&api_key=${apiKey}`;
const apiParamLatestPhotos = `/latest_photos?api_key=${apiKey}`;
const picturesToday = `${apiUrl}${apiParamEarthDate}`;
const mostRecentPhotos = `${apiUrl}${apiParamLatestPhotos}`;

/* GET home page. */
router.get('/', function(req, res, next) {
  // request.get(mostRecentPhotos, (error, response, roverData) => {
  //   const parsedData = JSON.parse(roverData);
  //   res.render("index", {
  //     parsedData: parsedData.photos
  //   })
  // });
  request.get(mostRecentPhotos, (error, response, roverData) => {
    const parsedData = JSON.parse(roverData);
    res.render("index", {
      parsedData: parsedData.latest_photos
    })
  })
});

module.exports = router;