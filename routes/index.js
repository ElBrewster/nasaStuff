var express = require('express');
var router = express.Router();

const apiKey = process.env.API_KEY;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Express Space App' });
  console.log("apiKey: ", apiKey)
});

module.exports = router;
