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
// TODO: Add time zone options so my friend in Germany can pick their local time

const apiKey = process.env.API_KEY;

const roversList = ["curiosity", "opportunity", "perseverance", "spirit"];

// * Mars Rover Photos URL bits
const apiRoversUrlDefault = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity";
const apiRoversBaseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers";
const apiParamEarthDate = `/photos?earth_date=${today}&page=1&api_key=${apiKey}`;
const apiParamLatestPhotos = `/latest_photos?api_key=${apiKey}`;
const currentPhoto = `${apiRoversUrlDefault}${apiParamLatestPhotos}`;
const manifestEndpoint = `${apiRoversBaseUrl}/${roversList[0]}?&api_key=${apiKey}`;
// TODO: Add rover data to home page instead of photo sample with `apiRoversUrlDefault` endpoint
// TODO: Add toggle between Sol date and Earth date search field

router.use((req, res, next) => {
  res.locals.roversList = roversList;
  res.locals.apiRoversBaseUrl = apiRoversBaseUrl;
  res.locals.apiParamEarthDate = apiParamEarthDate;
  next();
});

router.get('/', function(req, res, next) {
  request.get(currentPhoto, (error, response, roverData) => {
    const parsedData = JSON.parse(roverData);
    res.render("index", {
      parsedData: parsedData.latest_photos
    })
  });
});

router.get("/curiosity", (req, res, next) => {
  const curiosityPicsToday = `${apiRoversBaseUrl}/curiosity${apiParamLatestPhotos}`;
  request.get(curiosityPicsToday, (error, response, curiosityData) => {
    const parsedData2 = JSON.parse(curiosityData);
    res.render("curiosity", {
      parsedData2: parsedData2.latest_photos
    })
  })
});

router.get("/opportunity", (req, res, next) => {
  const curiosityPicsToday = `${apiRoversBaseUrl}/opportunity${apiParamLatestPhotos}`;
  request.get(curiosityPicsToday, (error, response, curiosityData) => {
    const parsedData3 = JSON.parse(curiosityData);
    res.render("opportunity", {
      parsedData3: parsedData3.latest_photos
    }) 
  })
});


router.get("/perseverance", (req, res, next) => {
  const curiosityPicsToday = `${apiRoversBaseUrl}/perseverance${apiParamLatestPhotos}`;
  request.get(curiosityPicsToday, (error, response, curiosityData) => {
    const parsedData4 = JSON.parse(curiosityData);
    res.render("perseverance", {
      parsedData4: parsedData4.latest_photos
    })
  })
});

router.get("/spirit", (req, res, next) => {
  const curiosityPicsToday = `${apiRoversBaseUrl}/spirit${apiParamLatestPhotos}`;
  request.get(curiosityPicsToday, (error, response, curiosityData) => {
    const parsedData5 = JSON.parse(curiosityData);
    res.render("spirit", {
      parsedData5: parsedData5.latest_photos
    })
  })
});

router.post("/search", (req, res, next) => {
  const searchTerm = req.body.roverSelection;
  const searchDate = req.body.solDate;
  const searchDateUrl = `${apiRoversBaseUrl}/${searchTerm}/photos?sol=${searchDate}&api_key=${apiKey}`;
  request.get(searchDateUrl, (error, response, oneSolData) => {
    const parsedData = JSON.parse(oneSolData);
    res.render("search", {
      parsedData: parsedData.photos
    })
  })
});
// TODO: Need error handling for sols that have no photos
// TODO: Need search bar limitations so that only 1-4 digits can be entered, and perhaps a legend to indicate what dates are available

module.exports = router;


