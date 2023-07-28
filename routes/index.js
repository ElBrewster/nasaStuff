var express = require('express');
var router = express.Router();
const request = require("request");

const dayjs = require("dayjs");
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
// dayjs().format(); 
dayjs.extend(utc);
dayjs.extend(timezone);
let nowObject = dayjs();
let nowYear = nowObject.$y;
let nowMonth = nowObject.$M;
let nowDay = nowObject.$D;
let today = `${nowYear}-${nowMonth}-${nowDay}`;

const apiKey = process.env.API_KEY;

// * Mars Rover Photos
const apiRoversUrlDefault = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity";
const apiRoversUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers";
//need rover name after this url piece ^
const apiParamSol = `/photos?sol=1000&api_key=${apiKey}`;
const apiParamCamera = `/photos?sol=1000&camera=fhaz&api_key=${apiKey}`;
const apiPage2 = `/photos?sol=1000&page=2&api_key=${apiKey}`;
// const apiParamEarthDate = `/photos?earth_date=${today}&api_key=${apiKey}`;≠–
const apiParamEarthDate = `/photos?earth_date=${today}&page=1&api_key=${apiKey}`;

const apiParamLatestPhotos = `/latest_photos?api_key=${apiKey}`;
//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY
const currentPhoto = `${apiRoversUrlDefault}${apiParamSol}`;
const picturesToday = `${apiRoversUrl}/roverName${apiParamEarthDate}`;
// template ^
router.use((req, res, next) => {
  res.locals.apiRoversUrl = apiRoversUrl;
  res.locals.apiParamEarthDate = apiParamEarthDate;
  next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(currentPhoto, (error, response, roverData) => {
    const parsedData = JSON.parse(roverData);
    res.render("index", {
      parsedData: parsedData.photos
    })
  });
  // request.get(picturesToday, (error, response, roverData) => {
  //   const parsedData = JSON.parse(roverData);
  //   res.render("index", {
  //     parsedData: parsedData.photos
  //   })
  // })
});

module.exports = router;
